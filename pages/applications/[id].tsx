import { Rating, Button } from "@mantine/core"
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Header from "../../components/header";
import Sidebar from "../../components/side";
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
      <Sidebar />
      <Header />
      
      <div
        style={{
          padding: "20px",
          maxWidth: "100%",
          margin: "0 auto",
          marginTop: "0px",
          marginLeft: "200px",
        }}
      >

        <div
          style={{
            position: "absolute",
            top: "110px",
            right: "10px",
          }}
        >
          <Button
            color="transparent"
            onClick={() => router.push("/applications")}
            style={{
              padding: "10", // Remove padding to avoid extra space
              fontSize: "0", // Remove inherited font size
              borderRadius: "0", // No rounded edges
              background: "none", // Remove any default background
              border: "none", // Remove the border
              lineHeight: "0", // Prevent vertical alignment issues
            }}
          >
            <img src="/images/exit.png" alt="exit" width="24" height="24"/>
          </Button>
        </div>

        {/* Individual input fields */}
        <div>
          {/* Job Title and Pay */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <input
              type="text"
              value={editableFields.job_title || ""}
              onChange={(e) => handleFieldChange("job_title", e.target.value)}
              onBlur={() => saveField("job_title")}
              style={{ padding: "5px", border: "0px solid #ccc", borderRadius: "4px", fontSize: "48px", width: "50%" }}
            />
          <div style={{ display: "flex", alignItems: "center" }}>
              <label style={{ fontSize: "18px", marginRight: "10px" }}>Pay:</label>
              <input
                type="text"
                value={editableFields.pay || ""}
                onChange={(e) => handleFieldChange("pay", e.target.value)}
                onBlur={() => saveField("pay")}
                style={{
                  padding: "5px",
                  border: "0px solid #ccc",
                  borderRadius: "4px",
                  fontSize: "18px",
                  width: "200px",
                }}
              />
            </div>
          </div>
        </div>


        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>

          {/* Company Name, Location, and Rank */}
          <div style={{ flex: "1", marginRight: "10px" }}>
            <input
              type="text"
              value={editableFields.company_name || ""}
              onChange={(e) => handleFieldChange("company_name", e.target.value)}
              onBlur={() => saveField("company_name")}
              style={{ padding: "5px", border: "0px solid #ccc", borderRadius: "4px", fontSize: "18px", width: "fit-content" }}
            />
            <span></span>
            <input
              type="text"
              value={editableFields.location || ""}
              onChange={(e) => handleFieldChange("location", e.target.value)}
              onBlur={() => saveField("location")}
              style={{ padding: "5px", border: "0px solid #ccc", borderRadius: "4px", fontSize: "18px", width: "fit-content" }}
            />
          </div>
          <div style={{ display: "flex", alignItems: "center", minWidth: "240px" }}>
            <label style={{ fontSize: "18px", marginRight: "10px" }}>Rank:</label>
            <Rating
              value={editableFields.job_rank || 0}
              onChange={(e) => handleFieldChange("job_rank", e.toString())}
              onBlur={() => saveField("job_rank")}
              style={{ fontSize: "18px" }}
            />
          </div>
        </div>

        {/* Progress Bar */}
        <div>
          <ApplicationProgressBar
            applicationId={parseInt(id as string, 10)} // Convert the application ID to a number
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

        
        <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", marginBottom: "5px" }}>
          <div style={{ flex: "1", minWidth: "50%" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>Notes:</label>
            <textarea
              value={editableFields.job_notes || ""}
              onChange={(e) => handleFieldChange("job_notes", e.target.value)}
              onBlur={() => saveField("job_notes")}
              style={{
                width: "100%",
                height: "220px",  
                minHeight: "100px",
                padding: "5px",
                resize: "none",
                border: "1px solid #ccc",
              }}
            />
          </div>

          <div style={{ flex: "1" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>Pros:</label>
            <textarea
              value={editableFields.job_pros || ""}
              onChange={(e) => handleFieldChange("job_pros", e.target.value)}
              onBlur={() => saveField("job_pros")}
              style={{
                width: "100%",
                height: "220px",
                padding: "5px",
                resize: "none",
                border: "1px solid #ccc",
              }}
            />
          </div>

          <div style={{ flex: "1" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>Cons:</label>
            <textarea
              value={editableFields.job_cons || ""}
              onChange={(e) => handleFieldChange("job_cons", e.target.value)}
              onBlur={() => saveField("job_cons")}
              style={{
                width: "100%",
                height: "220px",
                padding: "5px",
                resize: "none",
                border: "1px solid #ccc",
              }}
            />
          </div>
        </div>
        
        <div style={{ position: "relative", height: "0" }}> 
          <Button
            color="red"
            onClick={() => handleFieldChange("job_status", "Rejected")}
            onBlur={async () => {
              await saveField("job_status");
              window.location.reload(); // Forces a reload of the current page
            }}
            style={{
              position: "absolute", // Absolute positioning relative to its container
              right: "0", // Align it to the right side of the container
              padding: "8px 24px",
              fontSize: "16px",
            }}
          >
            Rejection
          </Button>
        </div>

      </div>
    </div>
  );
};

export default ApplicationDetails;