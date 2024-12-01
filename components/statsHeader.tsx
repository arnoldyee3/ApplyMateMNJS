import { Box, Flex, Button } from "@mantine/core";
import { useRouter } from "next/router";

export default function StatsHeader() {
  const router = useRouter();

  return (
    <Box 
      style={{
        backgroundColor: '#f5f5f5',
        padding: '10px',
        borderBottom: '1px solid #ccc',
        marginLeft: '300px', // Reserve space for the sidebar (adjust to match your sidebar width)
      }}
    >
      <Flex justify="space-between" align="center">
        <Button 
          variant="subtle" 
          size="sm" 
          style={{ 
            background: 'none', 
            flex: 1, // Make buttons equal in size
            textAlign: 'center', // Ensure text is centered
            borderRight: '1px solid #ccc', // Add borders between buttons
          }}
          onClick={() => router.push("/statsApplications")}
        >
          Applications
        </Button>

        <Button 
          variant="subtle" 
          size="sm" 
          style={{ 
            background: 'none', 
            flex: 1, // Make buttons equal in size
            textAlign: 'center', // Ensure text is centered
            borderRight: '1px solid #ccc', // Add borders between buttons
          }}
          onClick={() => router.push("/statsProgression")}
        >
          Progression
        </Button>

        <Button 
          variant="subtle" 
          size="sm" 
          style={{ 
            background: 'none', 
            flex: 1, // Make buttons equal in size
            textAlign: 'center', // Ensure text is centered
            borderRight: 'none', // No border for the last button
          }}
          onClick={() => router.push("/statsAnalysis")}
        >
          Analysis
        </Button>
      </Flex>
    </Box>
  );
}

