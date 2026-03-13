import React from 'react';
import { NavLink } from 'react-router-dom';

const mainNav = [
  { label: 'Dashboard', path: '/dashboard', icon: '⊞' },
  { label: 'Peko Capital', path: '/capital', icon: '💎' },
  { label: 'Bill Payments', path: '/bill-payments', icon: '⚡' },
  { label: 'Corporate Travel', path: '#', icon: '✈' },
  { label: 'Payroll', path: '#', icon: '💼' },
  { label: 'Office Supplies', path: '#', icon: '📦' },
  { label: 'Softwares', path: '#', icon: '💻' },
  { label: 'Logistics', path: '#', icon: '🚚' },
  { label: 'Gift Cards', path: '#', icon: '🎁' },
  { label: 'Marketplace', path: '#', icon: '🛍' },
  { label: 'Accounting & Tax', path: '#', icon: '📊' },
  { label: 'The Collector', path: '#', icon: '🔔' },
  { label: 'Insurance', path: '#', icon: '🛡' },
  { label: 'Peko Cloud', path: '#', icon: '☁' },
  { label: 'More Services', path: '#', icon: '⋯' },
];
const bottomNav = [
  { label: 'Reports', path: '#', icon: '📋' },
  { label: 'Need Help?', path: '#', icon: '❓' },
  { label: 'Settings', path: '#', icon: '⚙' },
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">Peko<span>.</span></div>
      <nav className="sidebar-nav">
        {mainNav.map(item => (
          item.path === '#' ? (
            <span key={item.label} className="sidebar-nav-item">
              <span>{item.icon}</span>{item.label}
            </span>
          ) : (
            <NavLink
              key={item.label}
              to={item.path}
              className={({ isActive }) => isActive ? 'active' : ''}
            >
              <span>{item.icon}</span>{item.label}
            </NavLink>
          )
        ))}
      </nav>
      <div className="sidebar-bottom">
        {bottomNav.map(item => (
          <span key={item.label} className="sidebar-nav-item">
            <span>{item.icon}</span>{item.label}
          </span>
        ))}
      </div>
    </aside>
  );
}
