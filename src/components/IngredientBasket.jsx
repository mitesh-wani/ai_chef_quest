import React from 'react';
import { QuantityEditor } from './QuantityEditor';

export function IngredientBasket({
  selectedIngredients,
  onUpdateQuantity,
  onRemove,
  onDrop,
  onGenerate,
  loading,
}) {
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDrop={onDrop}
      style={{
        background: 'var(--bg-card)',
        border: '2px dashed var(--accent)',
        borderRadius: 'var(--radius-lg)',
        padding: '18px',
        display: 'flex',
        flexDirection: 'column',
        gap: '14px',
        minHeight: '220px',
        boxShadow: 'var(--shadow-md)',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ fontSize: '17px', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          🧺 Your Basket ({selectedIngredients.length})
        </h3>
        {selectedIngredients.length > 0 && (
          <span style={{ fontSize: '12px', color: 'var(--accent)', fontWeight: 'bold' }}>
            Live Selection
          </span>
        )}
      </div>

      {selectedIngredients.length === 0 ? (
        <div style={{ margin: 'auto', textAlign: 'center', color: 'var(--text-muted)', padding: '28px 0' }}>
          <p style={{ fontSize: '32px', marginBottom: '8px' }}>🥕</p>
          <p style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-main)' }}>Your basket is empty</p>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Click, drag, or type ingredients to add!</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '280px', overflowY: 'auto', paddingRight: '4px' }}>
          {selectedIngredients.map((item) => (
            <div
              key={item.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: 'var(--bg-main)',
                padding: '10px 12px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-color)',
                boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>{item.emoji || '✨'}</span>
                <span style={{ fontWeight: '700', fontSize: '14px', color: 'var(--text-main)' }}>{item.name}</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <QuantityEditor
                  quantity={item.quantity}
                  unit={item.unit}
                  onUpdate={(qty, unit) => onUpdateQuantity(item.id, qty, unit)}
                />
                <button
                  onClick={() => onRemove(item.id)}
                  style={{ color: '#ef4444', fontSize: '16px', cursor: 'pointer', padding: '2px' }}
                  title="Remove ingredient"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedIngredients.length > 0 && (
        <button
          onClick={onGenerate}
          disabled={loading}
          style={{
            marginTop: '6px',
            background: 'var(--accent)',
            color: '#ffffff',
            fontWeight: '800',
            fontSize: '15px',
            padding: '14px',
            borderRadius: 'var(--radius-pill)',
            boxShadow: 'var(--shadow-accent)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            opacity: loading ? 0.7 : 1,
            cursor: loading ? 'not-allowed' : 'pointer',
          }}
        >
          {loading ? '✨ Generating Recipes...' : `🔥 Generate Recipes (${selectedIngredients.length} items)`}
        </button>
      )}
    </div>
  );
}
