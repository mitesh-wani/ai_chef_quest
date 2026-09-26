import React from 'react';

export function PreferenceInput({ value, onChange }) {
  return (
    <div style={{ marginBottom: '16px' }}>
      <label style={{ display: 'block', fontSize: '14px', marginBottom: '6px', color: 'var(--text-muted)' }}>
        Free-form Intent / Specific Craving:
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="e.g., Something crispy, spicy and quick to cook, not too oily..."
        rows={2}
        style={{
          width: '100%',
          padding: '10px 12px',
          borderRadius: 'var(--radius-md)',
          border: '1.5px solid var(--border-color)',
          background: 'var(--bg-card)',
          color: 'var(--text-main)',
          fontSize: '13px',
          resize: 'none',
        }}
      />
    </div>
  );
}
