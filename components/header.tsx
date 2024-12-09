import { Text } from '@mantine/core';
import { useRouter } from 'next/router';

export default function Header() {
  const router = useRouter();

  // Function to get page name based on the current route
  const getPageName = () => {
    const path = router.pathname;

    if (path === '/applications') {
      return 'Job Applications';
    }
    if (path === '/stats') {
      return 'Statistics';
    }
    if (path === '/statsAnalysis') {
      return 'Statistics - Analysis';
    }
    if (path === '/statsProgression') {
      return 'Statistics - Progression';
    }
    if (path === '/statsApplications') {
      return 'Statistics - Applications';
    }
    if (path === '/journaling') {
      return 'Journaling';
    }
    return ''; // Default if no match
  };

  return (
    <div>
      {/* Top Bar */}
      <div
        style={{
          height: '60px',
          backgroundColor: '#f8f9fa',
          display: 'flex',
          alignItems: 'center', // Vertically center the items
          padding: '0 10px',
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
          borderBottom: '2px solid #e0e0e0', // Border line below the top bar
        }}
      >
        {/* Left side - ApplyMate Text */}

        <img src="/images/logo.png" width="167" height="50" style={{ marginRight: '60px' }}  />

        {/* Right side - Page Name Text */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',  // Horizontally center the text in the right side
            alignItems: 'center',  // Vertically center the text
            paddingRight: '20px',  // Space between the right edge and text
          }}
        >
          <Text
            style={{
              fontSize: '30px',
              fontWeight: 400,
            }}
          >
            {getPageName()}
          </Text>
        </div>
      </div>
    </div>
  );
}