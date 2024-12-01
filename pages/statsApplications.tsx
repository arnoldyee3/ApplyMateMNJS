import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from "chart.js";
  import { Bar } from "react-chartjs-2";
  import { Box, Flex, Text, Progress, Select } from "@mantine/core";
  import Header from "../components/header";
  import Sidebar from "../components/sidebar";
  import StatsHeader from "../components/statsHeader";
  
  // Register Chart.js components
  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
  
  export default function statsPage() {
    // Mock data for the bar chart
    const barData = {
      labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
      datasets: [
        {
          label: "Applications",
          data: [10, 15, 12, 9],
          backgroundColor: "rgba(75, 192, 192, 0.6)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    };
  
    const barOptions = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          title: {
            display: true,
            text: "Weeks",
          },
        },
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: "Applications",
          },
        },
      },
    };
  
    return (
      <div>
        <div>
          {/* Full-width Header */}
          <Header />
          <StatsHeader />
    
          {/* Main layout: Sidebar and Content */}

          <div style={{ padding: "20px", maxWidth: "1400px", margin: "0 auto", marginTop: "20px", marginLeft: "300px" }}>
            {/* Padded Main Content */}
            <div style={{ flex: 1, padding: "20px" }}>
              {/* Lifetime Applications Section */}
              <Box style={{ marginBottom: "20px" }}>
                <Text weight={700} size="lg">Lifetime Applications</Text>
                <Flex align="center" style={{ marginTop: "10px" }}>
                  <Box style={{ fontSize: "24px", marginRight: "10px" }}>
                    96 jobs applied to
                  </Box>
                  <Text>
                    Your milestone number: <strong>2</strong>
                  </Text>
                </Flex>
              </Box>
    
              {/* Progression Bar */}
              <Box style={{ marginBottom: "20px" }}>
                <Text weight={700} size="lg">Progression</Text>
                <Progress
                  value={(96 / 100) * 100}
                  label="96/100"
                  style={{ marginTop: "10px", width: "300px" }}
                />
                <Text style={{ marginTop: "5px" }}>4 more jobs to go!</Text>
              </Box>
    
              {/* Time Range Selector */}
              <Box style={{ marginBottom: "20px" }}>
                <Text weight={700} size="lg">Time Range</Text>
                <Select
                  data={[
                    "Last week",
                    "Last month",
                    "Last 3 months",
                    "Last 6 months",
                    "Last year",
                  ]}
                  placeholder="Select range"
                  style={{ marginTop: "10px", width: "200px" }}
                />
              </Box>
    
              {/* Bar Chart */}
              <Box style={{ height: "300px" }}>
                <Text weight={700} size="lg">Weekly Applications</Text>
                <div style={{ marginTop: "20px", height: "250px" }}>
                  <Bar data={barData} options={barOptions} />
                </div>
              </Box>
            </div>
          </div>
        </div>
          
        <div style={{position:"absolute", top:"100px", left:"0", bottom:"0", width: "250px"}}>
          <Sidebar />
        </div>
      </div>
    );
  }
  