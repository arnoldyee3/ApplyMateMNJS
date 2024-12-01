import { Textarea, Rating, Button } from "@mantine/core"
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Header from "../../components/header";
import Sidebar from "../../components/sidebar";
import ApplicationProgressBar from "../../components/progressbar";

const ApplicationDetails = () => {
  const router = useRouter();
  const { id } = router.query; // Get the application ID from the URL

  const [application, setApplication] = useState<any>(null); // Stores the fetched data
  const [editableFields, setEditableFields] = useState<any>(null); // Stores the fields to edit

  useEffect(() => {
    if (!id) return; // Wait until the ID is available

    // Fetch application details
    const fetchApplication = async () => {
      try {
        const response = await fetch(`/api/applications/${id}`);
        if (response.ok) {
          const data = await response.json();
          setApplication(data); // Populate the application data
          setEditableFields(data); // Initialize editable fields
        } else {
          console.error("Failed to fetch application");
        }
      } catch (error) {
        console.error("Error fetching application:", error);
      }
    };

    fetchApplication();
  }, [id]);

  const handleFieldChange = (field: string, value: string) => {
    // Update the field being edited
    setEditableFields((prev: any) => ({ ...prev, [field]: value }));
  };

  const saveField = async (field: string) => {
    try {
      const response = await fetch(`/api/applications/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [field]: editableFields[field] }),
      });

      if (response.ok) {
        const updatedValue = editableFields[field];
        setApplication((prev: any) => ({ ...prev, [field]: updatedValue })); // Update application state
      } else {
        console.error(`Failed to update ${field}`);
      }
    } catch (error) {
      console.error(`Error updating ${field}:`, error);
    }
  };

  if (!application || !editableFields) return <div>Loading application details...</div>;

  return (
    <div>
      <Header />
      <Sidebar />

      <div
        style={{
          padding: "20px",
          maxWidth: "1400px",
          margin: "0 auto",
          marginTop: "px",
          marginLeft: "300px",
        }}
      >

        {/* Individual input fields */}
        <div>

          <input
            type="text"
            value={editableFields.job_title || ""}
            onChange={(e) => handleFieldChange("job_title", e.target.value)}
            onBlur={() => saveField("job_title")}
            style={{ padding: "5px", border: "0px solid #ccc", borderRadius: "4px", width: "50%", fontSize: "48px" }}
          />

          <label>PAY:</label>
          <input
            type="text"
            value={editableFields.pay || ""}
            onChange={(e) => handleFieldChange("pay", e.target.value)}
            onBlur={() => saveField("pay")}
            style={{ padding: "5px", border: "0px solid #ccc", borderRadius: "4px", width: "fit-content", fontSize: "18px" }}
          />
        </div>

        <div style={{ display: "flex", alignItems: "center" }}>
          <input
            type="text"
            value={editableFields.company_name || "" }
            onChange={(e) => handleFieldChange("company_name", e.target.value)}
            onBlur={() => saveField("company_name")}
            style={{ display: "inline-block", padding: "5px", border: "0px solid #ccc", borderRadius: "4px", width: "fit-content", fontSize: "18px" }}
          />
           - 
          <input
            type="text"
            value={editableFields.location || ""}
            onChange={(e) => handleFieldChange("location", e.target.value)}
            onBlur={() => saveField("location")}
            style={{ display: "inline-block", padding: "5px", border: "0px solid #ccc", borderRadius: "4px", width: "fit-content", fontSize: "18px" }}
          />
          
          <label>RANK:</label>
          <Rating
            value={editableFields.job_rank || 0}
            // onChange={setJobRank}
            onChange={(e) => handleFieldChange("job_rank", e.toString())}
            onBlur={() => saveField("job_rank")}
            style={{
              display: "inline-flex",
              width: '80px',  // You can customize the width
              fontSize: '16px',
            }}
          />
        </div>

        {/* Progress Bar */}
        <div>
          <ApplicationProgressBar
            applicationId={id as string} // Pass the application ID
            initialStatus={editableFields.job_status} // Pass the initial job status
          />
        </div>

        {/* Individual text areas */}
        Description:
        <div>
          <textarea
            value={editableFields.job_desc || ""}
            onChange={(e) => handleFieldChange("job_desc", e.target.value)}
            onBlur={() => saveField("job_desc")}
            style={{ width: "100%", height: "120px", padding: "5px", resize: "none", border: "1px solid #ccc" }}
          />
        </div>

        
        <div style={{ display: "flex", gap: "20px" }}>
          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>Notes:</label>
            <textarea
              value={editableFields.job_notes || ""}
              onChange={(e) => handleFieldChange("job_notes", e.target.value)}
              onBlur={() => saveField("job_notes")}
              style={{
                width: "820px",
                height: "220px",  
                minHeight: "100px",
                padding: "5px",
                resize: "none",
                border: "1px solid #ccc",
              }}
            />
          </div>

          <div style={{ marginBottom: "10px" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>Pros:</label>
            <textarea
              value={editableFields.job_pros || ""}
              onChange={(e) => handleFieldChange("job_pros", e.target.value)}
              onBlur={() => saveField("job_pros")}
              style={{
                width: "250px",
                height: "220px",
                padding: "5px",
                resize: "none",
                border: "1px solid #ccc",
              }}
            />
          </div>

          <div style={{ marginBottom: "10px" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>Cons:</label>
            <textarea
              value={editableFields.job_cons || ""}
              onChange={(e) => handleFieldChange("job_cons", e.target.value)}
              onBlur={() => saveField("job_cons")}
              style={{
                width: "250px",
                height: "220px",
                padding: "5px",
                resize: "none",
                border: "1px solid #ccc",
              }}
            />
          </div>
        </div>

        <Button 
          color="red" 
          onClick={() => handleFieldChange("job_status", "Rejected")}
          onBlur={() => saveField("job_status")}
          style={{padding: '0px 24px', fontSize: '16px', top:'-20px', left:'1245px', marginTop: "20px" }}
        >
          Rejection
        </Button>

      </div>
    </div>
  );
};

export default ApplicationDetails;
