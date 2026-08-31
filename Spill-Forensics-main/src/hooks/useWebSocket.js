/**
 * useWebSocket.js — Custom hook for WebSocket / SSE real-time data streaming
 * Connects to backend WebSocket server for push-based live telemetry and alerts.
 * Gracefully degrades when the WebSocket server is unavailable.
 */
import { useState, useEffect, useRef, useCallback } from 'react';

const WS_URL = import.meta.env.VITE_WS_URL || 'ws://localhost:8000/ws';

/**
 * @param {string} channel - e.g. 'telemetry', 'alerts', 'vessels'
 * @param {function} onMessage - callback invoked with parsed JSON message
 */
export const useWebSocket = (channel, onMessage) => {
  const wsRef = useRef(null);
  const [status, setStatus] = useState('disconnected'); // 'connecting' | 'connected' | 'disconnected' | 'error'
  const [lastMessage, setLastMessage] = useState(null);
  const reconnectTimeoutRef = useRef(null);

  const connect = useCallback(() => {
    if (wsRef.current?.readyState === WebSocket.OPEN) return;

    setStatus('connecting');

    try {
      const ws = new WebSocket(`${WS_URL}/${channel}`);
      wsRef.current = ws;

      ws.onopen = () => {
        setStatus('connected');
        // Clear any pending reconnect
        if (reconnectTimeoutRef.current) {
          clearTimeout(reconnectTimeoutRef.current);
          reconnectTimeoutRef.current = null;
        }
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          setLastMessage(data);
          if (onMessage) onMessage(data);
        } catch {
          // Non-JSON message — ignore
        }
      };

      ws.onerror = () => {
        setStatus('error');
      };

      ws.onclose = () => {
        setStatus('disconnected');
        // Auto-reconnect after 5s
        reconnectTimeoutRef.current = setTimeout(connect, 5000);
      };
    } catch {
      // WebSocket not available (e.g. dev without backend)
      setStatus('error');
    }
  }, [channel, onMessage]);

  useEffect(() => {
    connect();
    return () => {
      if (reconnectTimeoutRef.current) clearTimeout(reconnectTimeoutRef.current);
      if (wsRef.current) {
        wsRef.current.onclose = null; // Prevent reconnect on intentional close
        wsRef.current.close();
      }
    };
  }, [connect]);

  const send = useCallback((data) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(data));
    }
  }, []);

  return { status, lastMessage, send };
};

export default useWebSocket;
