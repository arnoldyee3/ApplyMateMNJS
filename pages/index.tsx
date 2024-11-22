import { Button, Group } from "@mantine/core";
import { useRouter } from 'next/router'

export default function IndexPage() {
  const router = useRouter()

  return (
    <div>
      <Group mt={50} justify="center">
        <h1>ApplyMate</h1>
      </Group>
      <Group mt={50} justify="center">
        <Button size="xl" onClick={() => router.push('/applications')}>Applications</Button>
        <Button size="xl" onClick={() => router.push('/journaling')}>Journaling</Button>
        <Button size="xl" onClick={() => router.push('/stats')}>Stats </Button>
      </Group>
    </div>
  );
}
