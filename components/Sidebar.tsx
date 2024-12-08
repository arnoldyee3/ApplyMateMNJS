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
        backgroundColor: '#f8f8fa',
        boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)'
      }}
    >
      <div
          onClick={() => router.push('/')}
          style={{
            display: 'flex',
            alignItems: 'center',
            fontSize: '48px',
            fontWeight: 600,
            paddingTop: '10px',
            paddingLeft: '20px',
            paddingRight: '20px',
            paddingBottom: '10px',
            borderBottom: '2px solid #e0e0e0',  // Border at the 300px mark (right of the logo)
            flex: '0 0 280px',  // Ensures the logo stays within the left area
            cursor: 'pointer',
            width: "300px",
          }}
        >
          {/* Replace the text with the logo image */}
          <img src="/images/logo.png" alt="ApplyMate Logo" width="267.2" height="80" style={{ marginRight: '16.4px' }} />
      </div>
      {/* Applications Button */}
      <NavLink
        label={
          <div style={{ display: 'flex', alignItems: 'center', fontSize: '24px', padding: '20px' }}>
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
          <div style={{ display: 'flex', alignItems: 'center', fontSize: '24px', padding: '20px' }}>
            <img src="/images/statistics-icon.png" alt="Statistics" width="48" height="48" style={{ marginRight: '10px' }}  />
            Statistics
          </div>
        }
        onClick={() => router.push('/statsApplications')}
        style={{ marginBottom: '50px' }}
      />

      {/* Journaling Button */}
      <NavLink
        label={
          <div style={{ display: 'flex', alignItems: 'center', fontSize: '24px', padding: '20px' }}>
            <img src="/images/journaling-icon.png" alt="Journaling" width="48" height="48" style={{ marginRight: '10px' }} />
            Journaling
          </div>
        }
        onClick={() => router.push('/journaling')}
      />
    </div>
  );
}
