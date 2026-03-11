'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

type Role = 'employee' | 'manager' | 'admin';

type Task = {
  id: string;
  title: string;
  status: 'To Do' | 'In Progress' | 'Done';
  description?: string;
  assignedRole: Role;
  createdByRole: Role;
};

const EMPTY_STATE = 'No tasks yet. Add or reset demo data to begin.';

const STORAGE_KEYS = {
  ROLE: 'demo-role',
  TASKS: 'demo-tasks',
};

const demoSeed: Task[] = [];

export default function DashboardPage() {
  const [role, setRole] = useState<Role | null>(null);
  const [tasks, setTasks] = useState<Task[]>(demoSeed);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const storedRole = localStorage.getItem(STORAGE_KEYS.ROLE) as Role | null;
    if (!storedRole) {
      window.location.href = '/login';
      return;
    }
    setRole(storedRole);

    const storedTasks = localStorage.getItem(STORAGE_KEYS.TASKS);
    if (storedTasks) {
      try {
        setTasks(JSON.parse(storedTasks));
      } catch {
        setTasks(demoSeed);
      }
    }
  }, []);

  const visibleTasks = useMemo(() => {
    if (!role) return [] as Task[];
    if (role === 'employee') return tasks.filter((t) => t.assignedRole === 'employee');
    return tasks;
  }, [role, tasks]);

  const summary = useMemo(() => {
    const base = { total: 0, toDo: 0, inProgress: 0, done: 0 };
    for (const t of visibleTasks) {
      base.total += 1;
      if (t.status === 'To Do') base.toDo += 1;
      if (t.status === 'In Progress') base.inProgress += 1;
      if (t.status === 'Done') base.done += 1;
    }
    return base;
  }, [visibleTasks]);

  if (!role) return null;

  return (
    <main style={mainStyle}>
      <header style={headerStyle}>
        <div>
          <p style={eyebrow}>Role</p>
          <h1 style={titleStyle}>{role}</h1>
        </div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <SummaryChips summary={summary} />
          <Link href="/login" style={linkButtonStyle}>
            Switch Role
          </Link>
        </div>
      </header>

      <section style={cardStyle}>
        {visibleTasks.length === 0 ? (
          <EmptyState message={EMPTY_STATE} />
        ) : (
          <ul style={listStyle}>
            {visibleTasks.map((t) => (
              <li key={t.id} style={listItemStyle}>
                <div>
                  <div style={{ fontWeight: 600 }}>{t.title}</div>
                  {t.description && <p style={mutedStyle}>{t.description}</p>}
                </div>
                <span style={pillStyle}>{t.status}</span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}

function SummaryChips({
  summary,
}: {
  summary: { total: number; toDo: number; inProgress: number; done: number };
}) {
  const chips = [
    { label: 'Total', value: summary.total },
    { label: 'To Do', value: summary.toDo },
    { label: 'In Progress', value: summary.inProgress },
    { label: 'Done', value: summary.done },
  ];
  return (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      {chips.map((chip) => (
        <div key={chip.label} style={chipStyle}>
          <div style={{ fontSize: '12px', color: '#475569' }}>{chip.label}</div>
          <div style={{ fontWeight: 700 }}>{chip.value}</div>
        </div>
      ))}
    </div>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div style={emptyStyle}>
      <p style={{ margin: 0 }}>{message}</p>
    </div>
  );
}

const mainStyle: React.CSSProperties = {
  minHeight: '100vh',
  padding: '24px',
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
};

const headerStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: '12px',
};

const titleStyle: React.CSSProperties = {
  margin: 0,
};

const eyebrow: React.CSSProperties = {
  margin: 0,
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  fontSize: '12px',
  color: '#475569',
};

const cardStyle: React.CSSProperties = {
  background: '#fff',
  borderRadius: '12px',
  padding: '16px',
  border: '1px solid #e2e8f0',
  boxShadow: '0 6px 18px rgba(15, 23, 42, 0.06)',
};

const listStyle: React.CSSProperties = {
  listStyle: 'none',
  margin: 0,
  padding: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
};

const listItemStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '12px',
  borderRadius: '10px',
  border: '1px solid #e2e8f0',
  background: '#f8fafc',
};

const pillStyle: React.CSSProperties = {
  padding: '6px 10px',
  borderRadius: '999px',
  background: '#e0f2fe',
  color: '#075985',
  fontWeight: 600,
};

const chipStyle: React.CSSProperties = {
  padding: '8px 10px',
  borderRadius: '10px',
  background: '#f8fafc',
  border: '1px solid #e2e8f0',
  minWidth: '80px',
};

const emptyStyle: React.CSSProperties = {
  padding: '24px',
  textAlign: 'center',
  color: '#475569',
  background: '#f8fafc',
  borderRadius: '10px',
  border: '1px solid #e2e8f0',
};

const mutedStyle: React.CSSProperties = {
  margin: '6px 0 0',
  color: '#475569',
};

const linkButtonStyle: React.CSSProperties = {
  padding: '10px 14px',
  borderRadius: '10px',
  border: '1px solid #cbd5e1',
  background: '#fff',
  color: '#0f172a',
  fontWeight: 600,
};

