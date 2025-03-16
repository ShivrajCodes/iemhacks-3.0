import React, { useState } from "react";
import * as tf from "@tensorflow/tfjs";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title } from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Title);

const HeartAttackPrediction = ({ goBack }) => {
  const [formData, setFormData] = useState({
    age: "",
    cholesterol: "",
    bloodPressure: "",
    heartRate: ""
  });
  const [prediction, setPrediction] = useState(null);
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { age, cholesterol, bloodPressure, heartRate } = formData;
    if (!age || !cholesterol || !bloodPressure || !heartRate) {
      alert("Please fill in all fields correctly.");
      return;
    }
    
    // Mock ML model prediction (Replace with actual model in the future)
    const probability = (parseFloat(age) + parseFloat(cholesterol) + parseFloat(bloodPressure) + parseFloat(heartRate)) % 100;
    setPrediction(probability);
  };

  return (
    <div className="heart-prediction-container">
      <h2>Heart Attack Risk Prediction</h2>
      <form onSubmit={handleSubmit}>
        <label>Age:</label>
        <input
          type="number"
          name="age"
          placeholder="Enter your age (e.g., 45)"
          value={formData.age}
          onChange={handleChange}
          required
        />

        <label>Cholesterol Level (mg/dL):</label>
        <input
          type="number"
          name="cholesterol"
          placeholder="Total cholesterol (e.g., 200)"
          value={formData.cholesterol}
          onChange={handleChange}
          required
        />

        <label>Blood Pressure (mmHg):</label>
        <input
          type="number"
          name="bloodPressure"
          placeholder="Systolic BP (e.g., 120)"
          value={formData.bloodPressure}
          onChange={handleChange}
          required
        />

        <label>Heart Rate (bpm):</label>
        <input
          type="number"
          name="heartRate"
          placeholder="Resting heart rate (e.g., 75)"
          value={formData.heartRate}
          onChange={handleChange}
          required
        />

        <button type="submit">Predict Risk</button>
      </form>
      
      {prediction !== null && (
        <div className="prediction-result">
          <h3>Estimated Risk: {prediction.toFixed(2)}%</h3>
          <Bar 
            data={{
              labels: ["Risk Probability"],
              datasets: [{
                label: "% Risk",
                data: [prediction],
                backgroundColor: "#ff4757",
              }]
            }}
          />
        </div>
      )}

      <button className="back-btn" onClick={goBack}>← Back</button>

      <style>{`
        .heart-prediction-container {
          max-width: 400px;
          margin: auto;
          padding: 20px;
          background: white;
          border-radius: 10px;
          box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
          text-align: center;
        }
        h2 { color: #333; }
        label { display: block; margin: 10px 0 5px; font-weight: bold; }
        input {
          width: 100%;
          padding: 8px;
          margin-bottom: 10px;
          border: 1px solid #ddd;
          border-radius: 5px;
        }
        button {
          background: #ff4757;
          color: white;
          padding: 10px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          transition: 0.3s;
        }
        button:hover { background: #ff6b81; }
        .back-btn {
          background: #2f3542;
          margin-top: 10px;
        }
      `}</style>
    </div>
  );
};

export default HeartAttackPrediction;
