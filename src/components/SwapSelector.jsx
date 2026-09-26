import React from 'react';

export function SwapSelector({ swaps }) {
  if (!swaps || swaps.length === 0) return null;

  return (
    <div style={{ marginTop: '20px', padding: '16px', background: 'var(--accent-light)', borderRadius: 'var(--radius-md)', border: '1px solid var(--accent)' }}>
      <h4 style={{ fontSize: '14px', color: 'var(--accent)', marginBottom: '8px' }}>💡 Ingredient Swap Suggestions</h4>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {swaps.map((swap, idx) => (
          <div key={idx} style={{ fontSize: '13px' }}>
            <span style={{ fontWeight: 'bold' }}>{swap.ingredient}:</span> Replace with{' '}
            {swap.alternatives.map((alt, aIdx) => (
              <span
                key={aIdx}
                style={{
                  background: 'white',
                  padding: '2px 8px',
                  borderRadius: 'var(--radius-pill)',
                  margin: '0 4px',
                  border: '1px solid var(--border-color)',
                  fontWeight: '500',
                }}
              >
                {alt}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
