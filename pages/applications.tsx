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
  MenuDropdown,
  Select,
  Rating,
  Textarea,
} from "@mantine/core";
import { DateInput } from '@mantine/dates';
import '@mantine/dates/styles.css';
import { IconStar, IconPlus, IconFilter, IconEdit } from "@tabler/icons-react";
import { SetStateAction, useState } from "react";
import Header from "../components/header";
import Sidebar from "../components/sidebar";

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
      deadline: "2024-11-30",
      rank: 4,
      selected: false,
      description: "Work on the Google Search team to improve search results.",
      notes: "Interview scheduled for 11/15/2024.",
    },
    {
      id: 2,
      title: "Product Manager",
      company: "Meta",
      pay: "$110/hr",
      location: "Menlo Park, CA",
      status: "Applied",
      deadline: "2024-12-15",
      rank: 3,
      selected: false,
      description: "Work on the Facebook app to improve user experience.",
      notes: "Applied on 11/1/2024.",
    },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [currentJob, setCurrentJob] = useState<{
    id: number;
    title: string;
    company: string;
    pay: string;
    location: string;
    status: string;
    deadline: Date;
    rank: number;
    description: string;
    notes: string;
  } | null>(null);

  const handleSelect = (id: number) => {
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
      deadline: new Date(),
      rank: 0,
      description: "",
      notes: "",
    });
    setModalOpen(true);
  };

  const handleSaveJob = () => {
    if (currentJob) {
      if (currentJob.id > applications.length) {
        setApplications((prev) => [
          ...prev,
          { ...currentJob, deadline: currentJob.deadline.toISOString().split('T')[0], selected: false },
        ]);
      } else {
        setApplications((prev) =>
          prev.map((app) => 
            app.id === currentJob.id 
              ? { ...currentJob, deadline: currentJob.deadline.toISOString().split('T')[0], selected: app.selected } 
              : app
          )
        );
      }
    }
    setModalOpen(false);
    setCurrentJob(null);
  };

  const handleEditJob = (job: SetStateAction<{ id: number; title: string; company: string; pay: string; location: string; status: string; deadline: Date; rank: number; description: string; notes: string} | null>) => {
    setCurrentJob(job);
    setModalOpen(true);
  };

  const handleDeleteJob = () => {
    if (currentJob) {
      setApplications((prev) => prev.filter((app) => app.id !== currentJob.id));
    }
    setModalOpen(false);
    setCurrentJob(null);
  };

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      {/* Main Content Area */}
      <div style={{ flex: 1, borderLeft: "1px solid #ddd" }}>
        {/* Topbar */}
        <Header />
        <Sidebar />

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
                  onClick={() => handleEditJob({ ...app, deadline: new Date(app.deadline), description: app.description, notes: app.description })}
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
                      <IconStar size={12} color={i < app.rank ? "yellow" : "black"} fill = {i < app.rank ? "yellow" : "black"}/>
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
        title={currentJob && currentJob.id > applications.length ? "Add a New Job" : "Edit Job"}
        centered
      >
        <TextInput
          label="Job Title"
          placeholder="Enter job title"
          value={currentJob?.title || ""}
          onChange={(e) =>
            setCurrentJob((prev) => prev ? ({ ...prev, title: e.target.value }) : null)
          }
        />
        <TextInput
          label="Company"
          placeholder="Enter company name"
          value={currentJob?.company || ""}
          onChange={(e) =>
            setCurrentJob((prev) => prev ? ({ ...prev, company: e.target.value }) : null)
          }
        />
        <TextInput
          label="Pay"
          placeholder="e.g. $120/hr"
          value={currentJob?.pay || ""}
          onChange={(e) =>
            setCurrentJob((prev) => prev ? ({ ...prev, pay: e.target.value }) : null)
          }
        />
        <TextInput
          label="Location"
          placeholder="Enter job location"
          value={currentJob?.location || ""}
          onChange={(e) =>
            setCurrentJob((prev) => prev ? ({ ...prev, location: e.target.value }) : null)
          }
        />
        <Select
          label="Status"
          placeholder="Select application status"
          data={[
            { label: "Not Applied", value: "Not Applied" },
            { label: "Applied", value: "Applied" },
            { label: "Interviewing", value: "Interviewing" },
            { label: "Offered", value: "Offered" },
            { label: "Rejected", value: "Rejected" },
          ]}
          value={currentJob?.status || ""}
          onChange={(value) =>
            setCurrentJob((prev) => prev ? ({ ...prev, status: value || "" }) : null)
          }
        />
        <DateInput
          label="Deadline"
          placeholder="Enter deadline"
          value={currentJob?.deadline instanceof Date ? currentJob.deadline : new Date()}
          onChange={(value) =>
            setCurrentJob((prev) => prev ? ({ ...prev, deadline: value as Date }) : null)
          }
        />
        <Text fw={500}>Rank</Text>
        <Rating
          value={currentJob?.rank || 0}
          onChange={(value) =>
            setCurrentJob((prev) => prev ? ({ ...prev, rank: value }) : null)
          }
        />
        <Textarea
          label="Description"
          placeholder="Job description"
          value={currentJob?.description || ""}
          onChange={(e) =>
            setCurrentJob((prev) => prev ? ({ ...prev, description: e.target.value }) : null)
          }
          autosize= {true}
          minRows={5}
        />
        <Textarea
          label="Notes"
          placeholder="Any notes about the job"
          value={currentJob?.notes || ""}
          onChange={(e) =>
            setCurrentJob((prev) => prev ? ({ ...prev, notes: e.target.value }) : null)
          }
          autosize= {true}
          minRows={5}
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
              style={{ marginLeft: "0px" }}
            >
              Delete Job
            </Button>
          )}
        </Group>
      </Modal>
    </div>
  );
}
