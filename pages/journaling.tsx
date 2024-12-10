import {
  Group,
  Button,
  Checkbox,
  ActionIcon,
  Text,
  Card,
  Modal,
  TextInput,
  Textarea,
  FileInput,
  Select,
} from "@mantine/core";
import { DateInput } from '@mantine/dates';
import '@mantine/dates/styles.css';
import { IconStar, IconPlus, IconFilter, IconEdit, IconTrash, IconSearch } from "@tabler/icons-react";
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
      template: "Blank",
      file: null,
      selected: false,
    },
    {
      id: 2,
      dateCreated: "2024-10-19",
      title: "What I can do better on technical interviews",
      body: "I need to practice more on coding problems and improve my communication skills.",
      template: "Blank",
      file: null,
      selected: false,
    },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [currentEntry, setCurrentEntry] = useState<{
    id: number;
    dateCreated: string;
    title: string;
    body: string;
    template: "Blank";
    file: null;
  } | null>(null);
  const [template, setTemplate] = useState("Blank");
  const [searchQuery, setSearchQuery] = useState("");

  // Predefined questions
  const mindfulnessQuestions = [
    "What are you grateful for today?",
    "Describe a moment of peace you experienced recently.",
    "What’s one thing you can do to reduce stress today?",
    "What made you smile today?",
    "What is one thing you love about yourself?",
    "How did you take care of yourself today?",
    "What is one positive thing that happened today?",
    "What is something you are looking forward to?",
    "What is one thing you can do to make tomorrow better?",
    "What is a recent accomplishment you are proud of?",
    "What is one thing you learned today?",
    "How did you show kindness to someone today?",
    "What is one thing you are excited about?",
    "What is one thing you can let go of?",
    "What is one thing you appreciate about your life?",
    "What is one thing you can do to improve your well-being?",
    "What is one thing you are grateful for in your relationships?",
    "What is one thing you can do to be more mindful?",
    "What is one thing you can do to be more present?",
    "What is one thing you can do to be more positive?",
  ];
  const interviewQuestions = [
    "What are your strengths and weaknesses?",
    "How would you handle a conflict with a coworker?",
    "Why do you want this job?",
    "Can you tell me about a time when you demonstrated leadership skills?",
    "How do you prioritize your work when you have multiple deadlines?",
    "Describe a challenging project you worked on and how you overcame the challenges.",
    "How do you handle feedback and criticism?",
    "What motivates you to perform well in your job?",
    "Can you give an example of how you handled a difficult situation at work?",
    "How do you stay current with industry trends and advancements?",
    "Describe a time when you had to learn a new skill quickly.",
    "How do you manage stress and pressure in the workplace?",
    "What are your career goals for the next five years?",
    "Can you provide an example of a time when you worked effectively in a team?",
    "How do you handle conflicts within a team?",
    "What is your approach to problem-solving?",
    "Can you describe a time when you went above and beyond your job responsibilities?",
    "How do you ensure the quality of your work?",
    "What do you consider to be your greatest professional achievement?",
    "How do you handle tight deadlines and unexpected changes in your work?"
  ];

  // Handle template selection
  const handleTemplateChange = (value) => {
    setTemplate(value);
    let content = "";

    if (value === "Mindfulness") {
      const selectedQuestions = [];
      const usedIndexes = new Set();
      while (selectedQuestions.length < 3) {
        const randomIndex = Math.floor(Math.random() * mindfulnessQuestions.length);
        if (!usedIndexes.has(randomIndex)) {
          usedIndexes.add(randomIndex);
          selectedQuestions.push(mindfulnessQuestions[randomIndex]);
        }
      }
      content = selectedQuestions.map((q, index) => `${index + 1}. ${q}`).join("\n");
    } else if (value === "Interview") {
      const selectedQuestions = [];
      const usedIndexes = new Set();
      while (selectedQuestions.length < 3) {
        const randomIndex = Math.floor(Math.random() * interviewQuestions.length);
        if (!usedIndexes.has(randomIndex)) {
          usedIndexes.add(randomIndex);
          selectedQuestions.push(interviewQuestions[randomIndex]);
        }
      }
      content = selectedQuestions.map((q, index) => `${index + 1}. ${q}`).join("\n");
    }

    setCurrentEntry((prev) => prev ? ({ ...prev, body: content, template: value }) : null);
  };

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
      template: "Blank",
      file: null,
    });
    setModalOpen(true);
  };

  // Handle file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setCurrentEntry((prev) => prev ? ({ ...prev, file: file.name }) : null); // Store file name for simplicity
    }
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
    setTemplate("Blank");
  };

  const filteredEntries = entries.filter((entry) =>
    entry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    entry.body.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEditEntry = (entry) => {
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

        <div
          style={{
            padding: "20px",
            maxWidth: "100%",
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
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Text style={{ marginLeft: "20px" }}>{selectedCount} Selected</Text>
            <Button
                radius="md"
                onClick={() => {
                  const updatedEntries = entries.filter((entry) => !entry.selected);
                  setEntries(updatedEntries);
                  setSelectedCount(0);
                }}
                disabled={selectedCount === 0}
                style={{
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: selectedCount > 0 ? "red" : ""
                }}
                >
                <IconTrash size={16} style={{ marginRight: "8px" }} />
                Delete Selected
            </Button>
            </div>

            {/* Right Section */}
            <div style={{ display: "flex", gap: "10px" }}>
              <TextInput
                placeholder="Search entries..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
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
            {filteredEntries.map((app) => (
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
          disabled={currentEntry ? currentEntry.id <= entries.length : false}
        />
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
        <Text fw={500}>Attach a file</Text>
        <Button
            component="label"
            variant="light"
          >
            Upload
            <input
              type="file"
              accept="*/*"
              onChange={handleFileUpload}
              style={{ display: "none" }}
            />
        </Button>
        <p>{currentEntry ? currentEntry.file : ""}</p>
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

