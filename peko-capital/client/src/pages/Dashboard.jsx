import React from 'react';

export default function Dashboard() {
  return (
    <div>
      <h1 className="page-title">Dashboard</h1>
      <p className="page-subtitle">Welcome back, SAVOLL LLC</p>
      <div className="card" style={{ padding: 32, marginTop: 8, color: '#6B7280', fontSize: 14 }}>
        Select a service from the sidebar to get started.
      </div>
    </div>
  );
}
