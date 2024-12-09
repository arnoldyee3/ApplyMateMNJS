import {
  Group,
  Button,
  TextInput,
  Modal,
  Textarea,
  Table,
  Select,
} from "@mantine/core";
import { IconPlus, IconSearch } from "@tabler/icons-react";
import { useState } from "react";
import Header from "../components/header";
import Sidebar from "../components/sidebar";

export default function JournalingPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [entries, setEntries] = useState([
    { date: "September", title: "First Entry!", content: "", voiceNote: null, file: null, template: "Blank" },
  ]);
  const [newEntry, setNewEntry] = useState({
    date: "",
    title: "",
    content: "",
    voiceNote: null,
    file: null,
    template: "Blank",
  });
  const [selectedEntry, setSelectedEntry] = useState(null); // Selected entry for viewing/editing
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc"); // Ascending or descending order
  const [template, setTemplate] = useState("Blank");

  // Predefined questions
  const mindfulnessQuestions = [
    "What are you grateful for today?",
    "Describe a moment of peace you experienced recently.",
    "What’s one thing you can do to reduce stress today?",
  ];
  const interviewQuestions = [
    "What are your strengths and weaknesses?",
    "How would you handle a conflict with a coworker?",
    "Why do you want this job?",
  ];

  // Handle template selection
  const handleTemplateChange = (value) => {
    setTemplate(value);
    let content = "";

    if (value === "Mindfulness") {
      content = mindfulnessQuestions[Math.floor(Math.random() * mindfulnessQuestions.length)];
    } else if (value === "Interview") {
      content = interviewQuestions[Math.floor(Math.random() * interviewQuestions.length)];
    }

    setNewEntry((prev) => ({ ...prev, content, template: value }));
  };

  // Handle adding a new entry
  const handleAddEntry = () => {
    setEntries((prev) => [...prev, newEntry]);
    setNewEntry({ date: "", title: "", content: "", voiceNote: null, file: null, template: "Blank" });
    setModalOpen(false);
  };

  // Handle voice recording upload
  const handleVoiceUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setNewEntry((prev) => ({ ...prev, voiceNote: URL.createObjectURL(file) }));
    }
  };

  // Handle file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setNewEntry((prev) => ({ ...prev, file: file.name })); // Store file name for simplicity
    }
  };

  // Handle clicking on an entry for detailed view
  const handleEntryClick = (entry) => {
    setSelectedEntry(entry);
  };

  // Save edits to an entry
  const handleSaveEntry = () => {
    setEntries((prev) =>
      prev.map((entry) =>
        entry.title === selectedEntry.title ? selectedEntry : entry
      )
    );
    setSelectedEntry(null);
  };

  // Filter entries by search query
  const filteredEntries = entries.filter((entry) =>
    entry.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
                onClick={() => setModalOpen(true)}
              >
                ✍️ Add a New Journal Entry
              </Button>
            </div>

            {/* Search and Sort */}
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <TextInput
                icon={<IconSearch />}
                placeholder="Search entries..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Select
                label="Sort By Date"
                placeholder="Select order"
                data={[
                  { value: "asc", label: "Ascending" },
                  { value: "desc", label: "Descending" },
                ]}
                value={sortOrder}
                onChange={(value) => setSortOrder(value)}
              />
            </div>
          </Group>

          {/* Table of Entries */}
          <Table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ backgroundColor: "#f5f5f5", borderBottom: "1px solid #ddd" }}>
                <th style={{ textAlign: "left", padding: "10px" }}>Date</th>
                <th style={{ textAlign: "left", padding: "10px" }}>Title</th>
                <th style={{ textAlign: "left", padding: "10px" }}>Template</th>
              </tr>
            </thead>
            <tbody>
              {filteredEntries.map((entry, index) => (
                <tr
                  key={index}
                  onClick={() => handleEntryClick(entry)}
                  style={{ cursor: "pointer" }}
                >
                  <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
                    {entry.date}
                  </td>
                  <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
                    {entry.title}
                  </td>
                  <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
                    {entry.template}
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
          placeholder="Enter any date (e.g. September or Sept 30)"
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
        <Select
          label="Template"
          placeholder="Choose a template"
          data={[
            { value: "Blank", label: "Blank Template" },
            { value: "Mindfulness", label: "Mindfulness Questions" },
            { value: "Interview", label: "Interview Preparation" },
          ]}
          value={template}
          onChange={handleTemplateChange}
        />
        <Textarea
          label="Entry Content"
          placeholder="Write your thoughts here..."
          value={newEntry.content}
          onChange={(e) =>
            setNewEntry((prev) => ({ ...prev, content: e.target.value }))
          }
        />
        <Group mt="md" position="apart">
          <Button
            component="label"
            variant="light"
            leftIcon={"🎙️"}
          >
            Upload Voice Note
            <input
              type="file"
              accept="audio/*"
              onChange={handleVoiceUpload}
              style={{ display: "none" }}
            />
          </Button>
          <Button
            component="label"
            variant="light"
            leftIcon={"📎"}
          >
            Upload Media
            <input
              type="file"
              accept="*/*"
              onChange={handleFileUpload}
              style={{ display: "none" }}
            />
          </Button>
        </Group>
        <Group mt="md">
          <Button fullWidth onClick={handleAddEntry}>
            Add Entry
          </Button>
        </Group>
      </Modal>

      {/* Modal for Viewing/Editing Entry */}
      <Modal
        opened={!!selectedEntry}
        onClose={() => setSelectedEntry(null)}
        title="Edit Journal Entry"
        centered
      >
        {selectedEntry && (
          <>
            <TextInput
              label="Date"
              value={selectedEntry.date}
              onChange={(e) =>
                setSelectedEntry((prev) => ({
                  ...prev,
                  date: e.target.value,
                }))
              }
            />
            <TextInput
              label="Title"
              value={selectedEntry.title}
              onChange={(e) =>
                setSelectedEntry((prev) => ({
                  ...prev,
                  title: e.target.value,
                }))
              }
            />
            <Textarea
              label="Entry Content"
              value={selectedEntry.content}
              onChange={(e) =>
                setSelectedEntry((prev) => ({
                  ...prev,
                  content: e.target.value,
                }))
              }
            />
            {selectedEntry.voiceNote && (
              <audio controls src={selectedEntry.voiceNote}></audio>
            )}
            {selectedEntry.file && (
              <p>📎 Attached file: {selectedEntry.file}</p>
            )}
            <Group mt="md">
              <Button fullWidth onClick={handleSaveEntry}>
                Save Changes
              </Button>
            </Group>
          </>
        )}
      </Modal>
    </div>
  );
}

