import React from 'react';

export function ServingScaler({ servings, onServingsChange }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'var(--bg-main)', padding: '8px 16px', borderRadius: 'var(--radius-pill)', border: '1px solid var(--border-color)' }}>
      <span style={{ fontSize: '13px', fontWeight: '600' }}>Servings:</span>
      <button
        onClick={() => onServingsChange(Math.max(1, servings - 1))}
        style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--bg-card)', border: '1px solid var(--border-color)', fontWeight: 'bold' }}
      >
        −
      </button>
      <span style={{ fontWeight: 'bold', minWidth: '20px', textAlign: 'center' }}>{servings}</span>
      <button
        onClick={() => onServingsChange(servings + 1)}
        style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--bg-card)', border: '1px solid var(--border-color)', fontWeight: 'bold' }}
      >
        +
      </button>
    </div>
  );
}
