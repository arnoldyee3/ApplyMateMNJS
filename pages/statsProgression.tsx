import Header from '../components/header';
import Sidebar from '../components/side';
import StatsHeader  from '../components/statsHeader'; 
import SankeyDiagram from '../components/SankeyDiagram';

export default function statsPage() {
    return (
      <div>
        <Sidebar />
        <Header />
        <StatsHeader />
        <div style={{ padding: "20px", maxWidth: "1400px", margin: "0 auto", marginLeft: "200px", overflowX: "auto" }}>
          <SankeyDiagram />
        </div>
      </div>
    );
  }