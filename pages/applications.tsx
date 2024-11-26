import { Group } from "@mantine/core";
import Header from '../components/header';
import Sidebar from '../components/sidebar';

export default function ApplicationsPage() {
    return (
      <div>
        <Header />
        <Sidebar />
        <Group mt={50} justify="center">
          <h1>Job Applications</h1>
        </Group>
      </div>
    );
}