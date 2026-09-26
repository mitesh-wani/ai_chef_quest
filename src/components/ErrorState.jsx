import React from 'react';

export function ErrorState({ error, onRetry }) {
  return (
    <div style={{ maxWidth: '450px', margin: '40px auto', textAlign: 'center', background: 'var(--bg-card)', padding: '24px', borderRadius: 'var(--radius-lg)', border: '1.5px solid #ef4444' }}>
      <div style={{ fontSize: '40px', marginBottom: '12px' }}>⚠️</div>
      <h3 style={{ fontSize: '18px', color: '#ef4444', marginBottom: '8px' }}>Recipe Generation Issue</h3>
      <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '20px' }}>
        {error || "We couldn't generate recipes right now. Please try again."}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          style={{
            background: 'var(--accent)',
            color: 'white',
            fontWeight: 'bold',
            padding: '10px 24px',
            borderRadius: 'var(--radius-pill)',
          }}
        >
          🔄 Try Again
        </button>
      )}
    </div>
  );
}
