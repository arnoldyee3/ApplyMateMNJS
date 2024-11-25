import { Group } from "@mantine/core";
import Topbar from '../components/Topbar';
import Sidebar from '../components/Sidebar';

export default function JournalingPage() {
    return (
      <div>
        <Topbar />
        <Sidebar />
        <Group mt={50} justify="center">
          <h1>Journaling Page</h1>
        </Group>
      </div>
    );
}