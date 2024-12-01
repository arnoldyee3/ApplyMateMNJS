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
  Select,
  Rating,
  Textarea
} from "@mantine/core";
import { DateInput } from '@mantine/dates';
import { IconStar, IconPlus, IconTrash } from "@tabler/icons-react";
import { useState, useEffect } from "react";
import Header from "../components/header";
import Sidebar from "../components/sidebar";
import axios from "axios"; // Make sure axios is installed for API calls

// Interface for the Application type
interface Application {
  id: number;
  job_title: string;
  company_name: string;
  pay: string;
  location: string;
  job_status: string;
  job_deadline: string;
  job_rank: number;
}

export default function ApplicationsPage() {
  const [selectedCount, setSelectedCount] = useState(0);
  const [applications, setApplications] = useState<Application[]>([]);
  const [categories, setCategories] = useState<string[]>([]); // Categories dynamically extracted from applications
  const [modalOpen, setModalOpen] = useState(false);
  const [currentJob, setCurrentJob] = useState<Application | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>(''); // Filter category (e.g., job status)
  const [selectedApplications, setSelectedApplications] = useState<number[]>([]); // Store selected applications

  // Modal form fields
  const [jobTitle, setJobTitle] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [pay, setPay] = useState(null);
  const [location, setLocation] = useState("");
  const [jobStatus, setJobStatus] = useState("Applied");
  const [jobDeadline, setJobDeadline] = useState(new Date());
  const [jobRank, setJobRank] = useState(0);
  const [jobDesc, setJobDesc] = useState("");
  const [jobNotes, setJobNotes] = useState("");
  const [jobPros, setJobPros] = useState("");
  const [jobCons, setJobCons] = useState("");
  
  // Fetch job applications from the SQL database
  // useEffect(() => {
  //   async function fetchApplications() {
  //     try {
  //       const response = await axios.get('/api/applications');
  //       setApplications(response.data);
  //     } catch (error) {
  //       console.error('Error fetching applications:', error);
  //     }
  //   }
  //   fetchApplications();
  // }, []);
  
  useEffect(() => {
    async function fetchData() {
      try {
        const applicationsResponse = await axios.get("/api/applications"); // Adjust API endpoint
        setApplications(applicationsResponse.data);

        // Extract unique job statuses from the applications data (or use another field if needed)
        const jobStatuses = [
          ...new Set(applicationsResponse.data.map((app: Application) => app.job_status)),
        ];
        setCategories(jobStatuses); // Set unique categories (e.g., job status)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  // Handle selecting and deselecting applications
  const handleSelect = (id: number) => {
    const updatedSelected = selectedApplications.includes(id)
      ? selectedApplications.filter((selectedId) => selectedId !== id)
      : [...selectedApplications, id];

    setSelectedApplications(updatedSelected);
    setSelectedCount(updatedSelected.length);
  };

  // Handle adding a new job (modal)
  const handleAddNewJob = () => {
    setCurrentJob({
      id: 0,
      job_title: "",
      company_name: "",
      pay: "",
      location: "",
      job_status: "Applied",
      job_deadline: "",
      job_rank: 0,
    });
    setModalOpen(true);
  };

  // Handle saving a job (add or edit)
  const handleSaveJob = async () => {
    try {
      const payload = {
        job_title: jobTitle,
        company_name: companyName,
        pay,
        location,
        job_status: jobStatus,
        job_deadline: jobDeadline.toISOString().split('T')[0],
        job_rank: jobRank,
        job_desc: jobDesc,
        job_notes: jobNotes,
        job_pros: jobPros,
        job_cons: jobCons,
      };
  
      if (currentJob && currentJob.id) {
        // Update existing application
        await axios.put(`/api/applications?id=${currentJob.id}`, payload);
      } else {
        // Add new application
        await axios.post('/api/applications', payload);
      }
  
      // Refresh applications list
      const updatedApplications = await axios.get('/api/applications');
      setApplications(updatedApplications.data);
      setModalOpen(false);
    } catch (error) {
      console.error('Error saving application:', error);
    } finally {
      // Reset fields
      setJobTitle('');
      setCompanyName('');
      setPay(null);
      setLocation('');
      setJobStatus("Applied");
      setJobDeadline(new Date()); // Default to today or desired date
      setJobRank(0); // Default rank
      setJobDesc('');
      setJobNotes('');
      setJobPros('');
      setJobCons('');
      setModalOpen(false); // Close modal
      setCurrentJob(null); // Clear current job
    }
  };
  
  // const handleSaveJob = () => {
  //   if (currentJob) {
  //     if (currentJob.id > 0) {
  //       // Edit existing job logic here
  //       setApplications((prev) =>
  //         prev.map((app) => (app.id === currentJob.id ? currentJob : app))
  //       );
  //     } else {
  //       // Add new job logic here
  //       setApplications((prev) => [...prev, currentJob]);
  //     }
  //   }
  //   setModalOpen(false);
  //   setCurrentJob(null);
  // };

  // Handle deleting selected job applications
  const handleDeleteSelectedJobs = async () => {
    try {
      await Promise.all(
        selectedApplications.map((id) => axios.delete(`/api/applications?id=${id}`))
      );
  
      // Refresh applications list
      const updatedApplications = await axios.get('/api/applications');
      setApplications(updatedApplications.data);
      setSelectedApplications([]);
      setSelectedCount(0);
    } catch (error) {
      console.error('Error deleting applications:', error);
    }
  };
  
  // const handleDeleteSelectedJobs = async () => {
  //   try {
  //     for (const appId of selectedApplications) {
  //       await axios.delete(`/api/applications/${appId}`);
  //     }
  //     setApplications((prev) =>
  //       prev.filter((app) => !selectedApplications.includes(app.id))
  //     );
  //     setSelectedApplications([]);
  //     setSelectedCount(0);
  //   } catch (error) {
  //     console.error("Error deleting applications:", error);
  //   }
  // };

  // Handle navigating to detailed job view
  const handleJobClick = (id: number) => {
    // Navigate to detailed view (example using React Router)
    window.location.href = `/applications/${id}`;
  };

  const formatDate = (datetime: string) => {
    const date = new Date(datetime); // Convert string to Date object
    if (isNaN(date.getTime())) {
      console.error('Invalid date:', datetime);
      return ''; // Return a default or error message
    }
    return date.toISOString().split("T")[0]; // Returns date in the format YYYY-MM-DD
  };

  return (
    <div>
      {/* Main Content Area */}
      <div style={{ flex: 1, borderLeft: "1px solid #ddd" }}>
        {/* Topbar */}
        <Header />

        {/* Selection and Filters */}
        <div style={{ padding: "20px", maxWidth: "1400px", margin: "0 auto", marginTop: "20px", marginLeft: "300px" }}>
          <Group position="apart" mb="md" style={{ display: "flex", justifyContent: "space-between" }}>
            {/* Left Section */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <Text>{selectedCount} Selected</Text>
              <Button
                radius="md"
                onClick={handleDeleteSelectedJobs}
                disabled={selectedCount === 0}
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <IconTrash size={16} style={{ marginRight: "8px" }} />
                Delete Selected
              </Button>
            </div>

            {/* Right Section */}
            <div style={{ display: "flex", gap: "10px" }}>
              <Select
                placeholder="Filter by Category"
                data={categories}
                value={filterCategory}
                onChange={setFilterCategory}
              />
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

          {/* Categories Row */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "5% 18% 15% 12% 15% 15% 10% 10%",
              padding: "10px 0",
              backgroundColor: "#f5f5f5",
              borderBottom: "1px solid #ddd",
              fontWeight: "bold",
            }}
          >
            <span />
            <span>Job Title</span>
            <span>Company</span>
            <span>Pay</span>
            <span>Location</span>
            <span>Status</span>
            <span>Deadline</span>
            <span>Rank</span>
          </div>

          {/* Applications Table */}
          <div>
            {applications
              .filter((app) => app.job_status === filterCategory || !filterCategory) // Filter by selected category
              .map((app) => (
                <Card
                  key={app.id}
                  shadow="sm"
                  radius="md"
                  withBorder
                  style={{
                    marginBottom: "10px",
                    display: "grid",
                    gridTemplateColumns: "3.5% 18.75% 15.25% 12.5% 15.5% 15% 9.5% 10%",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                  onClick={(event) => {
                    const target = event.target as HTMLElement;

                    if (target.closest('input[type="checkbox"]'))
                      return
                    handleJobClick(app.id)
                  }} // Navigate to job details page
                >
                  <Checkbox
                    checked={selectedApplications.includes(app.id)}
                    onChange={(event) => handleSelect(app.id)}
                  />
                  <Text>{app.job_title}</Text>
                  <Text>{app.company_name}</Text>
                  <Text>{app.pay}</Text>
                  <Text>{app.location}</Text>
                  <Text>{app.job_status}</Text>
                  <Text>{formatDate(app.job_deadline)}</Text>
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
                          backgroundColor: "transparent",
                          border: "none",
                          padding: "0",
                        }}
                      >
                        <IconStar size={12} color={i < app.job_rank ? "black" : "black"} fill={i < app.job_rank ? "#4299e1" : "white"}/>
                      </ActionIcon>
                    ))}
                  </div>
                </Card>
              ))}
          </div>
        </div>
      </div>
      
      <div style={{position:"absolute", top:"100px", left:"0", bottom:"0", width: "250px"}}>
        <Sidebar />
      </div>

      
      {/* Modal for Adding New Job */}
      <Modal
        opened={modalOpen}
        onClose={() => setModalOpen(false)}
        title={
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: "24px",
            fontWeight: "bold",
            left:'500px'
          }}>
            Add New Job
          </div>
        } 
        size = "70vw"
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          
          <div style={{flex: 1, marginRight:'20px'}}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
              <label style={{ marginRight: '10px' }}>Job Title <span style={{ color: 'red' }}>*</span></label>
              <TextInput
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                style={{
                  width: '455px',  // You can customize the width
                  fontSize: '16px',
                }}
                required
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
              <label style={{ marginRight: '10px' }}>Company Name <span style={{ color: 'red' }}>*</span></label>
              <TextInput
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                style={{
                  width: '400px',  // You can customize the width
                  fontSize: '16px',
                }}
                required
              />
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
              <label style={{ marginRight: '10px' }}>Pay </label>
              <TextInput
                value={pay}
                onChange={(e) => setPay(e.target.value)}
                style={{
                  width: '500px',  // You can customize the width
                  fontSize: '16px',
                }}
                required
              />
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
              <label style={{ marginRight: '10px' }}>Location</label>
              <TextInput
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                style={{
                  width: '465px',  // You can customize the width
                  fontSize: '16px',
                }}
                required
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
              <label style={{ marginRight: '10px' }}>Job Status <span style={{ color: 'red' }}>*</span></label>
              <Select
                data={["Not Applied", "Applied", "Interviewing", "Offered", "Accepted", "Rejected"]}
                value={jobStatus}
                onChange={setJobStatus}
                required
                style={{
                  position:"center",
                  width: '442px',  // You can customize the width
                  fontSize: '16px',
                }}
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
              <label style={{ marginRight: '10px' }}>Deadline</label>
              <DateInput
                placeholder="Enter deadline"
                value={jobDeadline}
                onChange={setJobDeadline}
                style={{
                  width: '463px',  // You can customize the width
                  fontSize: '16px',
                }}
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                <label style={{ marginRight: '10px' }}>Rank</label>
                <Rating
                  value={jobRank || 0}
                  onChange={setJobRank}
                  style={{
                    width: '80px',  // You can customize the width
                    fontSize: '16px',
                  }}
                />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ marginRight: '10px' }}>Notes</label>
              <Textarea
                value={jobNotes}
                onChange={(e) => setJobNotes(e.target.value)}
                rows='12'
                style={{
                  width: '520px',
                  fontSize: '16px',
                }}
              />
            </div>
          </div>
            
          <div style={{width:'600px', marginTop:'-20px'}}>
            <div style={{ display: 'absolute', top:'0px', right:'0px', margin: '15px', }}>
              <label style={{ marginRight: '10px' }}>Job Description</label>
              <Textarea
                value={jobDesc}
                onChange={(e) => setJobDesc(e.target.value)}
                rows='12'
                style={{
                  width: '550px',
                  fontSize: '16px',
                }}
              />
            </div>
          
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginTop:'37.5px' }}>
              <div style={{flex: 1, marginRight:'20px'}}>
                <div style={{ display: 'absolute', top:'0px', right:'0px', margin: '15px', }}>
                  <label style={{ marginRight: '10px' }}>Pros</label>
                  <Textarea
                    value={jobPros}
                    onChange={(e) => setJobPros(e.target.value)}
                    rows='12'
                    style={{
                      width: '250px',
                      fontSize: '16px',
                    }}
                  />
                </div>
              </div>
              
              <div style={{width:'400px'}}>
                
                <div style={{ display: 'absolute', top:'0px', right:'0px', margin: '15px', }}>
                  <label style={{ marginRight: '10px' }}>Cons</label>
                  <Textarea
                    value={jobCons}
                    onChange={(e) => setJobCons(e.target.value)}
                    rows='12'
                    style={{
                      width: '250px',
                      fontSize: '16px',
                    }}
                  />
                </div>
              </div>
            </div>

          </div>
        </div>
        
        <Button onClick={handleSaveJob} style={{padding: '0px 24px', fontSize: '16px', top:'-20px', left:'1015px', marginTop: "20px" }}>
          Save Job
        </Button>
      </Modal>
    </div>
  );
}
