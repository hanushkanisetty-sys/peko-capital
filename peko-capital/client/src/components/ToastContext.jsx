import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';

const ToastContext = createContext(null);

const ICONS = {
  success: '✓',
  error:   '✕',
  warning: '⚠',
  info:    'ℹ',
};

const COLORS = {
  success: { bg: '#F0FFF4', border: '#16A34A', icon: '#16A34A', bar: '#16A34A' },
  error:   { bg: '#FEF2F2', border: '#DC2626', icon: '#DC2626', bar: '#DC2626' },
  warning: { bg: '#FFFBEB', border: '#F59E0B', icon: '#F59E0B', bar: '#F59E0B' },
  info:    { bg: '#EFF6FF', border: '#3B82F6', icon: '#3B82F6', bar: '#3B82F6' },
};

let idCounter = 0;

function Toast({ toast, onRemove }) {
  const [visible, setVisible] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const c = COLORS[toast.type] || COLORS.info;

  useEffect(() => {
    // mount → slide in
    const t0 = setTimeout(() => setVisible(true), 10);
    // auto-dismiss
    const t1 = setTimeout(() => dismiss(), toast.duration || 4000);
    return () => { clearTimeout(t0); clearTimeout(t1); };
  }, []); // eslint-disable-line

  const dismiss = () => {
    setLeaving(true);
    setTimeout(() => onRemove(toast.id), 320);
  };

  return (
    <div
      onClick={dismiss}
      style={{
        position: 'relative', overflow: 'hidden',
        display: 'flex', alignItems: 'flex-start', gap: 12,
        background: c.bg,
        border: `1px solid ${c.border}`,
        borderRadius: 10,
        padding: '14px 40px 14px 14px',
        boxShadow: '0 4px 16px rgba(0,0,0,0.10)',
        cursor: 'pointer',
        minWidth: 300, maxWidth: 380,
        transform: visible && !leaving ? 'translateX(0)' : 'translateX(calc(100% + 24px))',
        opacity: visible && !leaving ? 1 : 0,
        transition: 'transform 0.32s cubic-bezier(0.34,1.2,0.64,1), opacity 0.28s ease',
        marginBottom: 8,
        userSelect: 'none',
      }}
    >
      {/* Type icon */}
      <div style={{
        width: 28, height: 28, borderRadius: '50%',
        background: c.border, color: '#fff',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 13, fontWeight: 700, flexShrink: 0,
      }}>
        {ICONS[toast.type]}
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        {toast.title && (
          <div style={{ fontWeight: 700, fontSize: 13, color: '#1A1A1A', marginBottom: 2 }}>
            {toast.title}
          </div>
        )}
        <div style={{ fontSize: 12, color: '#374151', lineHeight: 1.45 }}>{toast.message}</div>
      </div>

      {/* Close × */}
      <div style={{
        position: 'absolute', top: 10, right: 12,
        color: '#9CA3AF', fontSize: 14, lineHeight: 1,
      }}>×</div>

      {/* Progress bar */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 3,
        background: c.bar, opacity: 0.35,
        animation: `toast-shrink ${toast.duration || 4000}ms linear forwards`,
      }} />
    </div>
  );
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const add = useCallback((type, message, title, duration) => {
    const id = ++idCounter;
    setToasts(prev => [...prev, { id, type, message, title, duration }]);
  }, []);

  const remove = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  // Convenience shorthands
  const toast = {
    success: (msg, title, dur) => add('success', msg, title, dur),
    error:   (msg, title, dur) => add('error',   msg, title, dur),
    warning: (msg, title, dur) => add('warning', msg, title, dur),
    info:    (msg, title, dur) => add('info',    msg, title, dur),
  };

  return (
    <ToastContext.Provider value={toast}>
      {children}

      {/* Toast container — top-right */}
      <div style={{
        position: 'fixed', top: 70, right: 20,
        zIndex: 9999, display: 'flex', flexDirection: 'column',
        alignItems: 'flex-end', pointerEvents: 'none',
      }}>
        {toasts.map(t => (
          <div key={t.id} style={{ pointerEvents: 'auto' }}>
            <Toast toast={t} onRemove={remove} />
          </div>
        ))}
      </div>

      {/* Keyframe for progress bar */}
      <style>{`
        @keyframes toast-shrink {
          from { width: 100%; }
          to   { width: 0%;   }
        }
      `}</style>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used inside ToastProvider');
  return ctx;
}
