import React from "react";
import ChronicDiseases from "./ChronicDiseases";
import NonChronicDiseases from "./NonChronicDiseases";
import ActivityTracker from "./ActivityTracker";
import PrescriptionUpload from "./PrescriptionUpload";

const Dashboard = ({ setIsAuthenticated }) => {
  return (
    <div className="dashboard">
      <header>
        <h1>HealthTech Dashboard</h1>
        <button id="logout-button" onClick={() => setIsAuthenticated(false)}>Logout</button>
      </header>

      <div className="columns">
        <ChronicDiseases />
        <NonChronicDiseases />
        <ActivityTracker />
      </div>

      <PrescriptionUpload />
    </div>
  );
};

export default Dashboard;
