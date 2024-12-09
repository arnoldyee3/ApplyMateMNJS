import { Group, Box, Flex, Text } from "@mantine/core";
import Header from '../components/header';
import Sidebar from '../components/side';
import StatsHeader  from '../components/statsHeader'; 
import SankeyDiagram from '../components/SankeyDiagram';

export default function statsPage() {
    return (
      <div>
        <Header />
        <Sidebar />
        <StatsHeader />
        <div style={{left: '300px', padding: '50px', position: 'relative', height: '400px', alignItems: 'center'}}>
          <SankeyDiagram />
        </div>
      </div>
    );
  }