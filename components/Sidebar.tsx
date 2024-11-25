import { NavLink } from '@mantine/core';
import { useRouter } from 'next/router';

export default function Sidebar() {
  const router = useRouter();

  return (
    <div
      style={{
        width: '300px',
        height: '100vh',
        position: 'fixed',
        backgroundColor: '#f8f9fa',
        padding: '20px',
        boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)'
      }}
    >
      {/* Applications Button */}
      <NavLink
        label={
          <div style={{ display: 'flex', alignItems: 'center', fontSize: '24px' }}>
            <img src="/images/applications-icon.png" alt="Job Applications"width="48" height="48"  style={{ marginRight: '10px' }} />
            Job Applications
          </div>
        }
        onClick={() => router.push('/applications')}
        style={{ marginBottom: '50px', marginTop: '50px' }}
      />

      {/* Statistics Button */}
      <NavLink
        label={
          <div style={{ display: 'flex', alignItems: 'center', fontSize: '24px' }}>
            <img src="/images/statistics-icon.png" alt="Statistics" width="48" height="48" style={{ marginRight: '10px' }}  />
            Statistics
          </div>
        }
        onClick={() => router.push('/stats')}
        style={{ marginBottom: '50px' }}
      />

      {/* Journaling Button */}
      <NavLink
        label={
          <div style={{ display: 'flex', alignItems: 'center', fontSize: '24px' }}>
            <img src="/images/journaling-icon.png" alt="Journaling" width="48" height="48" style={{ marginRight: '10px' }} />
            Journaling
          </div>
        }
        onClick={() => router.push('/journaling')}
      />
    </div>
  );
}