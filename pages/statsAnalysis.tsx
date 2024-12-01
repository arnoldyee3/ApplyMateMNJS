import React, { useState } from 'react';
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from 'recharts';
import { Select } from '@mantine/core'; // Import a dropdown from Mantine
import Header from '../components/header';
import Sidebar from '../components/sidebar';
import StatsHeader from '../components/statsHeader';

export default function StatsPage() {
  // Sample data for different filter criteria
  const dataOptions = {
    Rating: [
      { name: '5 Stars', value: 3 },
      { name: '4 Stars', value: 9 },
      { name: '3 Stars', value: 8 },
      { name: '2 Stars', value: 7 },
      { name: '1 Star', value: 2 },
    ],
    Location: [
      { name: 'New York', value: 12 },
      { name: 'San Francisco', value: 8 },
      { name: 'Austin', value: 6 },
      { name: 'Remote', value: 6 },
    ],
    Salary: [
      { name: '$100k+', value: 15 },
      { name: '$80k-$100k', value: 10 },
      { name: '$60k-$80k', value: 8 },
      { name: '< $60k', value: 3 },
    ],
    JobTitle: [
      { name: 'Software Engineer', value: 10 },
      { name: 'Data Scientist', value: 8 },
      { name: 'Product Manager', value: 6 },
      { name: 'Designer', value: 4 },
    ],
  };

  // State to handle selected filter and corresponding data
  const [selectedFilter, setSelectedFilter] = useState('Rating');
  const data = dataOptions[selectedFilter];

  // Colors for the chart segments
  const COLORS = ['#4CAF50', '#FFC107', '#FF5722', '#03A9F4', '#9C27B0'];

  return (
    <div>
      <Header />
      <Sidebar />
      <StatsHeader />
      <div style={{margin: '50px auto', maxWidth: '600px', textAlign: 'center' }}>
        <h2>Applications Filtered by {selectedFilter}</h2>
        {/* Dropdown to select filter */}
        <div style={{ marginBottom: '20px' }}>
          <Select
            label="Filter By"
            placeholder="Select Filter"
            value={selectedFilter}
            onChange={(value) => setSelectedFilter(value)}
            data={[
              { value: 'Rating', label: 'Rating' },
              { value: 'Location', label: 'Location' },
              { value: 'Salary', label: 'Salary' },
              { value: 'JobTitle', label: 'Job Title' },
            ]}
            style={{ maxWidth: '200px', margin: '0 auto' }}
          />
        </div>
        {/* Pie Chart */}
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={150}
              fill="#8884d8"
              label={({ name, value }) => `${name}: ${value}`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend layout="horizontal" verticalAlign="bottom" align="center" />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
