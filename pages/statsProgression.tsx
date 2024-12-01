import { Group, Box, Flex, Text } from "@mantine/core";
import Header from '../components/header';
import Sidebar from '../components/sidebar';
import StatsHeader  from '../components/statsHeader'; 
import SankeyDiagram from '../components/SankeyDiagram';

export default function statsPage() {
    return (
      <div>
        <Header />
        <Sidebar />
        <StatsHeader />
        <div style={{paddingLeft: '410px', paddingTop: '50px', position: 'relative', height: '400px'}}>
          <SankeyDiagram />
        </div>
      </div>
    );
  }