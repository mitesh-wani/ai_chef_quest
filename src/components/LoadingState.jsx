import React from 'react';

export function LoadingState({ message = 'Combining your ingredients with AI...' }) {
  return (
    <div style={{ textAlign: 'center', padding: '60px 20px' }}>
      <div style={{ fontSize: '48px', animation: 'bounce 1s infinite alternate', marginBottom: '16px' }}>✨ 🍳 ✨</div>
      <h3 style={{ fontSize: '18px', marginBottom: '6px' }}>{message}</h3>
      <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Crafting perfect structured recipes just for you.</p>
    </div>
  );
}
