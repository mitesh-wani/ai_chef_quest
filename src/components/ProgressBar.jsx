import React from 'react';

export function ProgressBar({ progress, label }) {
  return (
    <div>
      {label && (
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '6px', fontWeight: '600' }}>
          <span>{label}</span>
          <span>{progress}%</span>
        </div>
      )}
      <div style={{ width: '100%', height: '10px', background: 'var(--border-color)', borderRadius: 'var(--radius-pill)', overflow: 'hidden' }}>
        <div
          style={{
            width: `${progress}%`,
            height: '100%',
            background: 'var(--accent)',
            borderRadius: 'var(--radius-pill)',
            transition: 'width 0.3s ease',
          }}
        />
      </div>
    </div>
  );
}
