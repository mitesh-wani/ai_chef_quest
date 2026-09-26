import React from 'react';

export function IngredientPreview({ ingredient, onClose, onAdd }) {
  if (!ingredient) return null;

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
      <div style={{ background: 'var(--bg-card)', padding: '24px', borderRadius: 'var(--radius-lg)', width: '90%', maxWidth: '350px', textAlign: 'center' }}>
        <div style={{ width: '100px', height: '100px', margin: '0 auto 16px auto', borderRadius: '50%', overflow: 'hidden', border: '2px solid var(--border-color)' }}>
          {ingredient.image ? (
            <img src={ingredient.image} alt={ingredient.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <span style={{ fontSize: '64px' }}>{ingredient.emoji}</span>
          )}
        </div>
        <h3 style={{ fontSize: '20px', marginBottom: '4px' }}>{ingredient.name}</h3>
        <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '16px' }}>Category: {ingredient.category}</p>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={onClose} style={{ flex: 1, padding: '10px', borderRadius: 'var(--radius-pill)', border: '1px solid var(--border-color)' }}>
            Close
          </button>
          <button onClick={() => { onAdd(ingredient); onClose(); }} style={{ flex: 1, padding: '10px', borderRadius: 'var(--radius-pill)', background: 'var(--accent)', color: 'white', fontWeight: 'bold' }}>
            + Add Item
          </button>
        </div>
      </div>
    </div>
  );
}
