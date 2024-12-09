import {
  Group,
  Button,
  Checkbox,
  ActionIcon,
  Text,
  Card,
  Modal,
  TextInput,
  Select,
  Rating,
  Textarea,
} from "@mantine/core";
import { DateInput } from '@mantine/dates';
import '@mantine/dates/styles.css';
import { IconStar, IconPlus, IconFilter, IconEdit } from "@tabler/icons-react";
import { SetStateAction, useState } from "react";
import Header from "../components/header";
import Sidebar from "../components/side";

export default function ApplicationsPage() {
  const [selectedCount, setSelectedCount] = useState(0);
  const [entries, setEntries] = useState([
    {
      id: 1,
      dateCreated: "2024-10-5",
      title: "Thoughts about current progress",
      body: "I'm making good progress on my projects, but I need to work on my time management skills.",
      selected: false,
    },
    {
      id: 2,
      dateCreated: "2024-10-19",
      title: "What I can do better on technical interviews",
      body: "I need to practice more on coding problems and improve my communication skills.",
      selected: false,
    },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [currentEntry, setCurrentEntry] = useState<{
    id: number;
    dateCreated: string;
    title: string;
    body: string;
  } | null>(null);

  const handleSelect = (id: number) => {
    const updatedApplications = entries.map((app) =>
      app.id === id ? { ...app, selected: !app.selected } : app
    );
    setEntries(updatedApplications);
    setSelectedCount(updatedApplications.filter((app) => app.selected).length);
  };

  const handleAddNewEntry = () => {
    setCurrentEntry({
      id: entries.length + 1,
      title: "",
      dateCreated: new Date().toISOString().split('T')[0],
      body: "",
    });
    setModalOpen(true);
  };

  const handleSaveEntry = () => {
    if (currentEntry) {
      if (currentEntry.id > entries.length) {
        setEntries((prev) => [
          ...prev,
          { ...currentEntry, selected: false },
        ]);
      } else {
        setEntries((prev) =>
          prev.map((app) => 
            app.id === currentEntry.id 
              ? { ...currentEntry, selected: app.selected } 
              : app
          )
        );
      }
    }
    setModalOpen(false);
    setCurrentEntry(null);
  };

  const handleEditEntry = (entry: SetStateAction<{ id: number; dateCreated: string; title: string; body: string; } | null>) => {
    setCurrentEntry(entry);
    setModalOpen(true);
  };

  const handleDeleteEntry = () => {
    if (currentEntry) {
      setEntries((prev) => prev.filter((app) => app.id !== currentEntry.id));
    }
    setModalOpen(false);
    setCurrentEntry(null);
  };

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      {/* Main Content Area */}
      <div style={{ flex: 1, borderLeft: "1px solid #ddd" }}>
        {/* Topbar */}
        <Sidebar />
        <Header />

        {/* Job Applications Section */}
        <div
          style={{
            padding: "20px",
            maxWidth: "1200px",
            margin: "0 auto",
            marginLeft: "200px", // Adjusted for the sidebar
          }}
        >
          {/* Header */}
          <Group
            mb="md"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {/* Left Section */}
            <Text style={{ marginLeft: "20px" }}>{selectedCount} Selected</Text>

            {/* Right Section */}
            <div style={{ display: "flex", gap: "10px" }}>
              <Button
                radius="md"
                variant="outline"
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <IconFilter size={16} style={{ marginRight: "8px" }} />
                Filter By
              </Button>
              <Button
                radius="md"
                onClick={handleAddNewEntry}
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <IconPlus size={16} style={{ marginRight: "8px" }} />
                Add a New Journal Entry
              </Button>
            </div>
          </Group>

          {/* Table Headers */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "5% 6% 15% 19% 55%",
              padding: "10px 0",
              backgroundColor: "#f5f5f5",
              borderBottom: "1px solid #ddd",
              fontWeight: "bold",
            }}
          >
            <span />
            <span />
            <span>Date Created</span>
            <span>Title</span>
            <span>Body</span>
          </div>

          {/* Applications */}
          <div>
            {entries.map((app) => (
              <Card
                key={app.id}
                shadow="sm"
                radius="md"
                withBorder
                style={{
                  marginBottom: "10px",
                  display: "grid",
                  gridTemplateColumns: "5% 5% 15% 20% 55%",
                  alignItems: "center",
                }}
              >
                <Checkbox
                  checked={app.selected}
                  onChange={() => handleSelect(app.id)}
                />
                <ActionIcon
                  color="blue"
                  onClick={() => handleEditEntry(app)}
                  title="Edit Job"
                >
                <IconEdit size={16} />
                </ActionIcon>
                <Text>{app.dateCreated}</Text>
                <Text>{app.title}</Text>
                <Text c="dimmed" size="xs" lineClamp={4}>{app.body}</Text>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Modal for Adding/Editing Job */}
      <Modal
        opened={modalOpen}
        onClose={() => setModalOpen(false)}
        title={currentEntry && currentEntry.id > entries.length ? "Add a New Journal Entry" : "Edit Journal Entry"}
        centered
        fullScreen
        radius={0}
        transitionProps={{ transition: 'fade', duration: 200 }}
      >
        <TextInput
          label="Title"
          placeholder="Enter journal entry title"
          value={currentEntry?.title || ""}
          onChange={(e) =>
            setCurrentEntry((prev) => prev ? ({ ...prev, title: e.target.value }) : null)
          }
        />
        <Textarea
          label="Body"
          placeholder="Write here..."
          value={currentEntry?.body || ""}
          onChange={(e) =>
            setCurrentEntry((prev) => prev ? ({ ...prev, body: e.target.value }) : null)
          }
          autosize= {true}
          minRows={10}
        />
        <Group mt="md">
          <Button onClick={handleSaveEntry}>
            Save Entry
          </Button>
          {currentEntry && currentEntry.id <= entries.length && (
            <Button
              color="red"
              onClick={handleDeleteEntry}
              style={{ marginLeft: "0px" }}
            >
              Delete Entry
            </Button>
          )}
        </Group>
      </Modal>
    </div>
  );
}

