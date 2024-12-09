import React, { useState } from 'react';
import Header from '../components/header';
import Sidebar from '../components/side';
import StatsHeader from '../components/statsHeader';
import SankeyDiagram from '../components/SankeyDiagram';
import { Select } from '@mantine/core'; // Or replace with your preferred UI library

export default function StatsPage() {
  const [timeFrame, setTimeFrame] = useState('1 Week'); // Default time frame

  return (
    <div>
      {/* Sidebar */}
      <Sidebar />
      <Header />
      <StatsHeader />
      
      <div style={{ flex: 1, marginLeft: '200px' }}>
        
        {/* Time Frame Filter - Positioned on the top left, underneath StatsHeader */}
        <div style={{ 
          padding: '20px', 
          display: 'flex', 
          justifyContent: 'flex-start', 
          marginBottom: '0px'
        }}>
          <Select
            label="Filter By Time Frame"
            placeholder="Select Time Frame"
            value={timeFrame}
            onChange={setTimeFrame} // Update state on selection
            data={[
              { value: '1 Week', label: '1 Week' },
              { value: '1 Month', label: '1 Month' },
              { value: '3 Months', label: '3 Months' },
              { value: '6 Months', label: '6 Months' },
            ]}
            style={{ maxWidth: '200px' }}
          />
        </div>

        {/* Title and Sankey Diagram */}
        <div style={{ padding: "20px", maxWidth: "75%", margin: "0 auto", marginTop: '-100px' }}>
          {/* Title */}
          <h2 
            style={{ 
              textAlign: 'center', 
              marginBottom: '20px' 
            }}
          >
            Job Application Progression - {timeFrame}
          </h2>

          {/* Sankey Diagram Container */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '600px', // Increased height for the Sankey diagram
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: '20px',
              backgroundColor: '#fff',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            }}
          >
            <SankeyDiagram />
          </div>
        </div>
      </div>
    </div>
  );
}
