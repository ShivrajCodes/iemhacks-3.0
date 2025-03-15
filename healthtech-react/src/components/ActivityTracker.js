import React, { useState, useEffect } from "react";

const ActivityTracker = () => {
  const [steps, setSteps] = useState(0);
  const [heartRate, setHeartRate] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSteps(Math.floor(Math.random() * 10000));
      setHeartRate(Math.floor(Math.random() * 100));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="column">
      <h2>Daily Activities Monitor</h2>
      <p>Steps: {steps}</p>
      <p>Heart Rate: {heartRate} bpm</p>
    </div>
  );
};

export default ActivityTracker;
