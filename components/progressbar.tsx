import React, { useState } from "react";
import { Progress, Text, Center } from "@mantine/core";

interface ApplicationProgressBarProps {
  applicationId: number; // ID of the application in the database
  initialStatus: string; // Initial status of the application
}

const ApplicationProgressBar: React.FC<ApplicationProgressBarProps> = ({
  applicationId,
  initialStatus,
}) => {
  const statuses = [
    "Not Applied",
    "Applied",
    "Interviewing",
    "Offered",
    "Accepted",
    "Rejected",
  ];

  const [currentStatus, setCurrentStatus] = useState(initialStatus);

  const currentIndex = statuses.indexOf(currentStatus);
  const currentProgress =
    currentStatus === "Rejected"
      ? 100 // Full bar for rejected
      : (currentIndex / (statuses.length - 2)) * 100; // Normal calculation

  const isRejected = currentStatus === "Rejected";

  const handleStatusClick = async (index: number) => {
    const newStatus = statuses[index];

    // Temporarily update the state for immediate feedback
    setCurrentStatus(newStatus);

    try {
      const response = await fetch(`/api/applications/${applicationId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ job_status: newStatus }),
      });

      if (!response.ok) {
        console.error("Failed to update status");
        // Revert to the previous state if the update fails
        setCurrentStatus(currentStatus);
      }
    } catch (error) {
      console.error("Error updating status:", error);
      setCurrentStatus(currentStatus);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "100%" }}>
      <Text mb="sm">
        Current Status: <b>{currentStatus}</b>
      </Text>

      <div style={{ position: "relative", marginBottom: "10px" }}>
        {/* Show full red bar with "Rejected" text if rejected */}
        <Progress
          value={currentProgress}
          color={isRejected ? "red" : "blue"}
          size="xl"
          radius="lg"
        />
        {isRejected && (
          <Center
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              color: "white",
              fontWeight: "bold",
            }}
          >
            Rejected
          </Center>
        )}
      </div>

      {!isRejected && (
        <div style={{ position: "relative" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {statuses.slice(0, -1).map((status, index) => (
              <div
                key={status}
                style={{
                  cursor: "pointer",
                  backgroundColor: index <= currentIndex ? "blue" : "gray",
                  color: "white",
                  padding: "10px 20px", // Make the button area larger
                  borderRadius: "10px", // Add rounded corners
                  fontSize: "14px", // Make text slightly larger
                  fontWeight: "bold",
                  textAlign: "center",
                  userSelect: "none",
                }}
                onClick={() => handleStatusClick(index)}
              >
                {status}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplicationProgressBar;
