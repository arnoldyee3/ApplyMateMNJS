import { Group, Box, Flex, Text } from "@mantine/core";
import Header from '../components/header';
import Sidebar from '../components/side';
import StatsHeader  from '../components/statsHeader'; // Import the new component

export default function statsPage() {
    return (
      <div>
        <Sidebar />
        <Header />
        <StatsHeader />
        <div style={{ position: 'relative', height: '300px' }}>
          <Group
            style={{
              position: 'absolute',
              top: '0px',
              left: '415px', 
              transform: 'translateX(-50%)', 
              textAlign: 'center',
            }}
          >
            <h2>Select a tab to start</h2>
          </Group>
        </div>
      </div>
    );
}