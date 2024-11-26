import {
  Group,
  Button,
  Checkbox,
  ActionIcon,
  Text,
  Card,
  Modal,
  TextInput,
  NumberInput,
} from "@mantine/core";
import { IconStar, IconPlus, IconFilter, IconEdit } from "@tabler/icons-react";
import { useState } from "react";
import Topbar from "../components/Topbar";
import Sidebar from "../components/Sidebar";

export default function ApplicationsPage() {
  const [selectedCount, setSelectedCount] = useState(0);
  const [applications, setApplications] = useState([
    {
      id: 1,
      title: "Software Engineer",
      company: "Google",
      pay: "$120/hr",
      location: "San Jose, CA",
      status: "Interviewing",
      deadline: "11/30/2024",
      rank: 4,
      selected: false,
    },
    {
      id: 2,
      title: "Product Manager",
      company: "Meta",
      pay: "$110/hr",
      location: "Menlo Park, CA",
      status: "Applied",
      deadline: "12/15/2024",
      rank: 3,
      selected: false,
    },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [currentJob, setCurrentJob] = useState(null);

  const handleSelect = (id) => {
    const updatedApplications = applications.map((app) =>
      app.id === id ? { ...app, selected: !app.selected } : app
    );
    setApplications(updatedApplications);
    setSelectedCount(updatedApplications.filter((app) => app.selected).length);
  };

  const handleAddNewJob = () => {
    setCurrentJob({
      id: applications.length + 1,
      title: "",
      company: "",
      pay: "",
      location: "",
      status: "Applied",
      deadline: "",
      rank: 0,
    });
    setModalOpen(true);
  };

  const handleSaveJob = () => {
    if (currentJob.id > applications.length) {
      setApplications((prev) => [...prev, currentJob]);
    } else {
      setApplications((prev) =>
        prev.map((app) => (app.id === currentJob.id ? currentJob : app))
      );
    }
    setModalOpen(false);
    setCurrentJob(null);
  };

  const handleEditJob = (job) => {
    setCurrentJob(job);
    setModalOpen(true);
  };

  const handleDeleteJob = () => {
    setApplications((prev) => prev.filter((app) => app.id !== currentJob.id));
    setModalOpen(false);
    setCurrentJob(null);
  };

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div style={{ flex: 1, borderLeft: "1px solid #ddd" }}>
        {/* Topbar */}
        <Topbar />

        {/* Job Applications Section */}
        <div
          style={{
            padding: "20px",
            maxWidth: "1200px",
            margin: "0 auto",
            marginLeft: "280px", // Adjusted for the sidebar
          }}
        >
          {/* Header */}
          <Group
            position="apart"
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
                onClick={handleAddNewJob}
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <IconPlus size={16} style={{ marginRight: "8px" }} />
                Add a New Job
              </Button>
            </div>
          </Group>

          {/* Table Headers */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "5% 5% 15% 15% 10% 15% 10% 10% 10%",
              padding: "10px 0",
              backgroundColor: "#f5f5f5",
              borderBottom: "1px solid #ddd",
              fontWeight: "bold",
            }}
          >
            <span />
            <span />
            <span>Job Title</span>
            <span>Company</span>
            <span>Pay</span>
            <span>Location</span>
            <span>Status</span>
            <span>Deadline</span>
            <span>Rank</span>
          </div>

          {/* Applications */}
          <div>
            {applications.map((app) => (
              <Card
                key={app.id}
                shadow="sm"
                radius="md"
                withBorder
                style={{
                  marginBottom: "10px",
                  display: "grid",
                  gridTemplateColumns: "5% 5% 15% 15% 10% 15% 10% 10% 10%",
                  alignItems: "center",
                }}
              >
                <Checkbox
                  checked={app.selected}
                  onChange={() => handleSelect(app.id)}
                />
                <ActionIcon
                  color="blue"
                  onClick={() => handleEditJob(app)}
                  title="Edit Job"
                >
                  <IconEdit size={16} />
                </ActionIcon>
                <Text>{app.title}</Text>
                <Text>{app.company}</Text>
                <Text>{app.pay}</Text>
                <Text>{app.location}</Text>
                <Text>{app.status}</Text>
                <Text>{app.deadline}</Text>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "2px",
                  }}
                >
                  {[...Array(5)].map((_, i) => (
                    <ActionIcon
                      key={i}
                      radius="xl"
                      size="sm"
                      style={{
                        width: "20px",
                        height: "20px",
                      }}
                    >
                      <IconStar size={12} color={i < app.rank ? "yellow" : "gray"} />
                    </ActionIcon>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Modal for Adding/Editing Job */}
      <Modal
        opened={modalOpen}
        onClose={() => setModalOpen(false)}
        title={currentJob?.id > applications.length ? "Add a New Job" : "Edit Job"}
        centered
      >
        <TextInput
          label="Job Title"
          placeholder="Enter job title"
          value={currentJob?.title || ""}
          onChange={(e) =>
            setCurrentJob((prev) => ({ ...prev, title: e.target.value }))
          }
        />
        <TextInput
          label="Company"
          placeholder="Enter company name"
          value={currentJob?.company || ""}
          onChange={(e) =>
            setCurrentJob((prev) => ({ ...prev, company: e.target.value }))
          }
        />
        <TextInput
          label="Pay"
          placeholder="e.g. $120/hr"
          value={currentJob?.pay || ""}
          onChange={(e) =>
            setCurrentJob((prev) => ({ ...prev, pay: e.target.value }))
          }
        />
        <TextInput
          label="Location"
          placeholder="Enter job location"
          value={currentJob?.location || ""}
          onChange={(e) =>
            setCurrentJob((prev) => ({ ...prev, location: e.target.value }))
          }
        />
        <TextInput
          label="Deadline"
          placeholder="Enter deadline (e.g. 12/31/2024)"
          value={currentJob?.deadline || ""}
          onChange={(e) =>
            setCurrentJob((prev) => ({ ...prev, deadline: e.target.value }))
          }
        />
        <NumberInput
          label="Rank"
          placeholder="Rate this job (1-5)"
          value={currentJob?.rank || 0}
          onChange={(value) =>
            setCurrentJob((prev) => ({ ...prev, rank: value || 0 }))
          }
          min={0}
          max={5}
        />
        <Group mt="md">
          <Button fullWidth onClick={handleSaveJob}>
            Save Job
          </Button>
          {currentJob && currentJob.id <= applications.length && (
            <Button
              fullWidth
              color="red"
              onClick={handleDeleteJob}
              style={{ marginLeft: "10px" }}
            >
              Delete Job
            </Button>
          )}
        </Group>
      </Modal>
    </div>
  );
}





