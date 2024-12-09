import { Group, Box, Flex, Text } from "@mantine/core";
import Header from '../components/header';
import Sidebar from '../components/side';
import StatsHeader  from '../components/statsHeader'; // Import the new component

export default function statsPage() {
    return (
      <div>
        <Header />
        <Sidebar />
        {/* <div style={{ position: 'relative', height: '300px' }}>
          <Group
            style={{
              position: 'absolute',
              top: '0px', // Adjust the position as needed
              left: '450px', // Center horizontally
              transform: 'translateX(-50%)', // Center adjustment
              textAlign: 'center',
            }}
          >
            <h1>Select a tab to start</h1>
          </Group>
        </div> */}
      </div>
    );
}