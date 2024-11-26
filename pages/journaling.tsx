import { Group } from "@mantine/core";
import Header from '../components/header';
import Sidebar from '../components/sidebar';

export default function JournalingPage() {
    return (
      <div>
        <Header />
        <Sidebar />
        <Group mt={50} justify="center">
          <h1>Journaling Page</h1>
        </Group>
      </div>
    );
}