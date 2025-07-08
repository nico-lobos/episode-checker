import React from 'react';

export default function Spinner() {
  return (
    <div role="status" aria-label="Cargando..." style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 80 }}>
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <circle cx="20" cy="20" r="16" stroke="#40cfff" strokeWidth="4" opacity="0.2" />
        <circle cx="20" cy="20" r="16" stroke="#00b5cc" strokeWidth="4" strokeDasharray="80" strokeDashoffset="60" strokeLinecap="round">
          <animateTransform attributeName="transform" type="rotate" from="0 20 20" to="360 20 20" dur="0.8s" repeatCount="indefinite" />
        </circle>
      </svg>
    </div>
  );
} 