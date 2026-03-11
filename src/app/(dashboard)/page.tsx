'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

type Role = 'employee' | 'manager' | 'admin';

type Status = 'To Do' | 'In Progress' | 'Done';

type Task = {
  id: string;
  title: string;
  status: Status;
  description?: string;
  assignedRole: Role;
  createdByRole: Role;
};

const EMPTY_STATE = 'No tasks yet. Add or reset demo data to begin.';
const STATUSES: Status[] = ['To Do', 'In Progress', 'Done'];

const STORAGE_KEYS = {
  ROLE: 'demo-role',
  TASKS: 'demo-tasks',
};

const demoSeed: Task[] = [
  {
    id: 't-emp-1',
    title: 'Submit weekly report',
    status: 'To Do',
    description: 'Upload summary of completed tasks',
    assignedRole: 'employee',
    createdByRole: 'manager',
  },
  {
    id: 't-emp-2',
    title: 'Review demo checklist',
    status: 'In Progress',
    description: 'Validate login and dashboard flows',
    assignedRole: 'employee',
    createdByRole: 'manager',
  },
];

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
        const parsed: Task[] = JSON.parse(storedTasks);
        setTasks(parsed.length > 0 ? parsed : demoSeed);
        return;
      } catch {
        // fall through to seed
      }
    }
    // seed defaults if none
    localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(demoSeed));
    setTasks(demoSeed);
  }, []);

  const persistTasks = (next: Task[]) => {
    setTasks(next);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(next));
    }
  };

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

  const handleStatusChange = useMemo(
    () => handleStatusChangeFactory(role, tasks, persistTasks),
    [role, tasks],
  );

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
                {role === 'employee' ? (
                  <select
                    value={t.status}
                    onChange={(e) =>
                      handleStatusChange(t.id, e.target.value as Status)
                    }
                    style={selectStyle}
                  >
                    {STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                ) : (
                  <span style={pillStyle}>{t.status}</span>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}

function handleStatusChangeFactory(
  role: Role | null,
  tasks: Task[],
  persist: (next: Task[]) => void,
) {
  return (taskId: string, nextStatus: Status) => {
    if (role !== 'employee') return; // only employee updates in this phase
    if (!STATUSES.includes(nextStatus)) return;
    const next = tasks.map((t) =>
      t.id === taskId && t.assignedRole === 'employee'
        ? { ...t, status: nextStatus }
        : t,
    );
    persist(next);
  };
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

const selectStyle: React.CSSProperties = {
  padding: '8px 10px',
  borderRadius: '10px',
  border: '1px solid #cbd5e1',
  background: '#fff',
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

