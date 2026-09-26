import React from 'react';

export function QuantityEditor({ quantity, unit, onUpdate }) {
  const units = ['g', 'kg', 'ml', 'l', 'pcs', 'tbsp', 'tsp'];

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'var(--orange-qty-bg)', padding: '3px 8px', borderRadius: 'var(--radius-pill)', border: '1.5px solid var(--accent-light)' }}>
      {/* Minus Button */}
      <button
        style={{
          width: '24px',
          height: '24px',
          borderRadius: '50%',
          border: 'none',
          background: 'var(--accent)',
          color: 'white',
          fontWeight: 'bold',
          fontSize: '14px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onClick={() => onUpdate(Math.max(1, quantity - (unit === 'g' || unit === 'ml' ? 50 : 1)), unit)}
      >
        −
      </button>

      {/* Orange Quantity Value Input */}
      <input
        type="number"
        value={quantity}
        onChange={(e) => onUpdate(Math.max(1, parseInt(e.target.value) || 1), unit)}
        style={{
          width: '52px',
          textAlign: 'center',
          border: '1.5px solid var(--accent)',
          borderRadius: '8px',
          padding: '2px 4px',
          fontSize: '13px',
          fontWeight: '800',
          background: '#ffffff',
          color: 'var(--accent)',
          boxShadow: '0 1px 3px rgba(255, 107, 53, 0.15)',
        }}
      />

      {/* Plus Button */}
      <button
        style={{
          width: '24px',
          height: '24px',
          borderRadius: '50%',
          border: 'none',
          background: 'var(--accent)',
          color: 'white',
          fontWeight: 'bold',
          fontSize: '14px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onClick={() => onUpdate(quantity + (unit === 'g' || unit === 'ml' ? 50 : 1), unit)}
      >
        +
      </button>

      {/* Orange Unit Selector */}
      <select
        value={unit}
        onChange={(e) => onUpdate(quantity, e.target.value)}
        style={{
          border: '1.5px solid var(--accent)',
          borderRadius: '8px',
          padding: '2px 6px',
          fontSize: '12px',
          fontWeight: '700',
          background: '#ffffff',
          color: 'var(--accent)',
          cursor: 'pointer',
        }}
      >
        {units.map((u) => (
          <option key={u} value={u}>
            {u}
          </option>
        ))}
      </select>
    </div>
  );
}
