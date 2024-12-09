import { Group, Box, Flex, Text } from "@mantine/core";
import Header from '../components/header';
import Sidebar from '../components/sidebar';
import StatsHeader  from '../components/statsHeader'; 
import SankeyDiagram from '../components/SankeyDiagram';

export default function statsPage() {
    return (
      <div>
        <Sidebar />
        <Header />
        <StatsHeader />
        <div style={{left: '300px', padding: '50px', position: 'relative', height: '400px', alignItems: 'center'}}>
          <SankeyDiagram />
        </div>
      </div>
    );
  }