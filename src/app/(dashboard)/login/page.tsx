'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

const ROLES = ['employee', 'manager', 'admin'] as const;

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState<typeof ROLES[number]>('employee');

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!role) return;
    localStorage.setItem('demo-role', role);
    router.push('/');
  };

  return (
    <main style={mainStyle}>
      <section style={cardStyle}>
        <h1 style={{ marginBottom: '12px' }}>Demo Task Dashboard</h1>
        <p style={{ marginTop: 0, color: '#334155' }}>Select a demo role to continue.</p>
        <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <label style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <span>Role</span>
            <select value={role} onChange={(e) => setRole(e.target.value as typeof ROLES[number])} style={inputStyle}>
              {ROLES.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </label>
          <button type="submit" style={buttonStyle}>
            Enter Dashboard
          </button>
        </form>
      </section>
    </main>
  );
}

const mainStyle: React.CSSProperties = {
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '24px',
};

const cardStyle: React.CSSProperties = {
  width: '100%',
  maxWidth: '420px',
  background: '#fff',
  borderRadius: '12px',
  padding: '24px',
  boxShadow: '0 10px 30px rgba(15, 23, 42, 0.08)',
  border: '1px solid #e2e8f0',
};

const inputStyle: React.CSSProperties = {
  padding: '10px 12px',
  borderRadius: '8px',
  border: '1px solid #cbd5e1',
  background: '#f8fafc',
};

const buttonStyle: React.CSSProperties = {
  padding: '12px',
  borderRadius: '10px',
  border: 'none',
  background: '#0ea5e9',
  color: '#fff',
  fontWeight: 600,
  cursor: 'pointer',
};

