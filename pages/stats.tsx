import { Group, Box, Flex, Text } from "@mantine/core";
import Header from '../components/header';
import Sidebar from '../components/side';
import StatsHeader from '../components/statsHeader'; // Import the new component

export default function statsPage() {
  return (
    <div>
      <div style={{ flex: 1, borderLeft: "1px solid #ddd" }}>
        <Sidebar />
        <Header />
        <StatsHeader />
        <div style={{ padding: "20px", maxWidth: "1400px", margin: "0 auto", marginLeft: "200px" }}>
          <h2>Select a tab to start</h2>
        </div>
      </div>
    </div>
  );
}