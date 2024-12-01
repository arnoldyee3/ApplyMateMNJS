import {
  Group,
  Button,
  TextInput,
  Modal,
  Text,
  Card,
  Table,
} from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useState } from "react";
import Header from "../components/header";
import Sidebar from "../components/sidebar";

export default function JournalingPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [entries, setEntries] = useState([
    { date: "Sep 30", title: "First Entry!" },
  ]);
  const [newEntry, setNewEntry] = useState({ date: "", title: "" });

  const handleAddEntry = () => {
    setEntries((prev) => [...prev, newEntry]);
    setNewEntry({ date: "", title: "" });
    setModalOpen(false);
  };

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div style={{ flex: 1, borderLeft: "1px solid #ddd" }}>
        {/* Header */}
        <Header />

        {/* Journaling Section */}
        <div
          style={{
            padding: "20px",
            maxWidth: "1200px",
            margin: "0 auto",
            marginLeft: "280px", // Adjust for the sidebar
          }}
        >
          {/* Top Buttons */}
          <Group
            position="apart"
            mb="md"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: "1px solid #ddd",
              paddingBottom: "10px",
            }}
          >
            <div style={{ display: "flex", gap: "10px" }}>
              <Button
                radius="md"
                variant="outline"
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
                onClick={() => setModalOpen(true)}
              >
                <IconPlus size={16} style={{ marginRight: "8px" }} />
                Add a New Journal Entry
              </Button>
              <Button
                radius="md"
                variant="outline"
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                View Past Journal Entries
              </Button>
            </div>
          </Group>

          {/* Table Headers */}
          <Table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              borderSpacing: 0,
            }}
          >
            <thead>
              <tr style={{ backgroundColor: "#f5f5f5", borderBottom: "1px solid #ddd" }}>
                <th style={{ textAlign: "left", padding: "10px" }}>Date</th>
                <th style={{ textAlign: "left", padding: "10px" }}>Title</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry, index) => (
                <tr key={index}>
                  <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
                    {entry.date}
                  </td>
                  <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
                    {entry.title}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>

      {/* Modal for Adding a New Entry */}
      <Modal
        opened={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Add a New Journal Entry"
        centered
      >
        <TextInput
          label="Date"
          placeholder="Enter date (e.g. Sep 30)"
          value={newEntry.date}
          onChange={(e) =>
            setNewEntry((prev) => ({ ...prev, date: e.target.value }))
          }
        />
        <TextInput
          label="Title"
          placeholder="Enter entry title"
          value={newEntry.title}
          onChange={(e) =>
            setNewEntry((prev) => ({ ...prev, title: e.target.value }))
          }
        />
        <Group mt="md">
          <Button fullWidth onClick={handleAddEntry}>
            Add Entry
          </Button>
        </Group>
      </Modal>
    </div>
  );
}
