import { Box, Flex, Text } from "@mantine/core";

export default function StatsHeader() {
    return (
      <Box 
      style={{
        backgroundColor: '#f5f5f5',
        padding: '10px',
        borderBottom: '1px solid #ccc',
        marginLeft: '300px', // Reserve space for the sidebar (adjust to match your sidebar width)
      }}>
        <Flex justify="space-between" align="center">
          <Box>
            <Text>Applications</Text>
          </Box>
  
          <Box>
            <Text>Progression</Text>
          </Box>
  
          <Box>
            <Text>Analysis</Text>
          </Box>
        </Flex>
      </Box>
    );
  }