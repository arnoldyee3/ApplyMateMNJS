import { NavLink } from '@mantine/core';
import { useRouter } from 'next/router';

export default function Sidebar() {
  const router = useRouter();

  return (
    <div
      style={{
        width: '200px',
        height: '100vh',
        position: 'fixed',
        backgroundColor: '#f8f9fa',
        padding: '0px',
        boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)'
      }}
    >
      {/* Logo Button */}
      <NavLink
        label={
          <div style={{ display: 'flex', alignItems: 'center', fontSize: '20px', borderBottom:'2px solid #e0e0e0' }}>
            <img src="/images/logo.png" alt="Job Applications"width="167" height="50"  style={{ marginRight: '10px' }} />
          </div>
        }
        onClick={() => router.push('/')}
        style={{ marginBottom: '0px', marginTop: '0px' }}
      />

      {/* Applications Button */}
      <NavLink
        label={
          <div style={{ display: 'flex', alignItems: 'center', fontSize: '20px' }}>
            <img src="/images/applications-icon.png" alt="Job Applications"width="48" height="48"  style={{ marginRight: '10px' }} />
            Job Applications
          </div>
        }
        onClick={() => router.push('/applications')}
        style={{ marginBottom: '20px', marginTop: '0px' }}
      />

      {/* Statistics Button */}
      <NavLink
        label={
          <div style={{ display: 'flex', alignItems: 'center', fontSize: '20px' }}>
            <img src="/images/statistics-icon.png" alt="Statistics" width="48" height="48" style={{ marginRight: '10px' }}  />
            Statistics
          </div>
        }
        onClick={() => router.push('/statsApplications')}
        style={{ marginBottom: '20px' }}
      />

      {/* Journaling Button */}
      <NavLink
        label={
          <div style={{ display: 'flex', alignItems: 'center', fontSize: '20px' }}>
            <img src="/images/journaling-icon.png" alt="Journaling" width="48" height="48" style={{ marginRight: '10px' }} />
            Journaling
          </div>
        }
        onClick={() => router.push('/journaling')}
      />
    </div>
  );
}