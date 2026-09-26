import React from 'react';

export function PreferenceChips({ availableTastes, selectedTastes, onToggle }) {
  return (
    <div style={{ margin: '16px 0' }}>
      <h4 style={{ fontSize: '14px', marginBottom: '8px', color: 'var(--text-muted)' }}>
        What are you craving?
      </h4>
      <div
        style={{
          display: 'flex',
          gap: '8px',
          overflowX: 'auto',
          paddingBottom: '4px',
        }}
      >
        {availableTastes.map((taste) => {
          const isSelected = selectedTastes.includes(taste.id);
          return (
            <button
              key={taste.id}
              onClick={() => onToggle(taste.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 14px',
                borderRadius: 'var(--radius-pill)',
                fontSize: '13px',
                fontWeight: '600',
                whiteSpace: 'nowrap',
                border: isSelected ? '1.5px solid var(--accent)' : '1.5px solid var(--border-color)',
                background: isSelected ? 'var(--accent)' : 'var(--bg-card)',
                color: isSelected ? 'white' : 'var(--text-main)',
                boxShadow: isSelected ? 'var(--shadow-accent)' : 'none',
                transition: 'all var(--transition-fast)',
              }}
            >
              <span>{taste.emoji}</span>
              <span>{taste.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
