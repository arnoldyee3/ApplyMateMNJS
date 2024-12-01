import { Text } from '@mantine/core';
import { useRouter } from 'next/router';

export default function Header() {
  const router = useRouter();

  // Function to get page name based on the current route
  const getPageName = () => {
    const path = router.pathname;

    if (path === '/applications' || path === '/applications/[id]') {
      return 'Job Applications';
    }
    if (path === '/stats' || path === '/statsAnalysis' || path === '/statsProgression' || path === '/statsApplications') {
      return 'Statistics';
    }
    if (path === '/journaling') {
      return 'Journaling';
    }
    return 'Page'; // Default if no match
  };

  return (
    <div>
      {/* Top Bar */}
      <div
        style={{
          height: '100px',
          backgroundColor: '#f8f9fa',
          display: 'flex',
          alignItems: 'center', // Vertically center the items
          padding: '0 16.4px',
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
          borderBottom: '2px solid #e0e0e0', // Border line below the top bar
        }}
      >
        {/* Left side - ApplyMate Text */}
        {/* <Text
          style={{
            fontSize: '48px',
            fontWeight: 600,
            borderRight: '2px solid #e0e0e0',  // Border at 300px mark (right of "ApplyMate")
            flex: '0 0 280px',  // Ensures the "ApplyMate" stays within the left area
            cursor: 'pointer'
          }}
          onClick={() => router.push('/')}
        >
          ApplyMate
        </Text> */}
        
        <div
          onClick={() => router.push('/')}
          style={{
            display: 'flex',
            alignItems: 'center',
            fontSize: '48px',
            fontWeight: 600,
            borderRight: '2px solid #e0e0e0',  // Border at the 300px mark (right of the logo)
            flex: '0 0 280px',  // Ensures the logo stays within the left area
            cursor: 'pointer',
          }}
        >
          {/* Replace the text with the logo image */}
          <img src="/images/logo.png" alt="ApplyMate Logo" width="267.2" height="80" style={{ marginRight: '16.4px' }} />
        </div>


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
              fontSize: '60px',
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
