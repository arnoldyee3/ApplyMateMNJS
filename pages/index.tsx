import { Button, Stack } from "@mantine/core";
import { useRouter } from 'next/router'

export default function IndexPage() {
  const router = useRouter()

  const buttonStyle = {
    width: '300px',
    height: '80px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  return (
    <div>
      <Stack mt={70} align="center" >
        <img src="/images/logo.png" width="890.666" height="266.666" />
      </Stack>
      <Stack mt={70} align="center" gap={"xl"}>
        <Button size="xl" style={buttonStyle} variant= "default" radius="lg" onClick={() => router.push('/applications')}>
          <img src="/images/applications-icon.png" alt="Job Applications" width="48" height="48" style={{ marginRight: '10px' }} />
          Job Applications
        </Button>
        <Button size="xl" style={buttonStyle} variant= "default" radius="lg" onClick={() => router.push('/journaling')}>
          <img src="/images/journaling-icon.png" alt="Job Applications" width="48" height="48" style={{ marginRight: '10px' }} />
          Journaling
        </Button>
        <Button size="xl" style={buttonStyle} variant= "default" radius="lg" onClick={() => router.push('/statsApplications')}>
          <img src="/images/statistics-icon.png" alt="Job Applications" width="48" height="48" style={{ marginRight: '10px' }} />
          Statistics 
        </Button>
      </Stack>
    </div>
  );
}
