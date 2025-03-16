import React from "react";
import { useNavigate } from "react-router-dom";

const chronicDiseases = [
  { name: "Diabetes", about: "Affects blood sugar levels", remedy: "Regular exercise, balanced diet, medication, and insulin therapy.", image: "https://source.unsplash.com/100x100/?diabetes" },
  { name: "Hypertension", about: "High blood pressure", remedy: "Reduce salt intake, manage stress, exercise, and prescribed medications.", image: "https://source.unsplash.com/100x100/?blood-pressure" },
  { name: "Arthritis", about: "Inflammation of joints", remedy: "Physical therapy, anti-inflammatory diet, and pain management medication.", image: "https://source.unsplash.com/100x100/?arthritis" },
  { name: "Asthma", about: "Chronic respiratory condition", remedy: "Avoid triggers, use prescribed inhalers, and practice breathing exercises.", image: "https://source.unsplash.com/100x100/?asthma" },
  { name: "Chronic Kidney Disease", about: "Gradual loss of kidney function", remedy: "Limit protein intake, control blood sugar, and manage blood pressure.", image: "https://source.unsplash.com/100x100/?kidney" },
  { name: "Heart Disease", about: "Affects heart function", remedy: "Heart-healthy diet, regular exercise, avoid smoking, and prescribed medications.", image: "https://source.unsplash.com/100x100/?heart" },
  { name: "COPD", about: "Lung disease", remedy: "Quit smoking, use bronchodilators, and pulmonary rehabilitation.", image: "https://source.unsplash.com/100x100/?lungs" },
  { name: "Osteoporosis", about: "Weakening of bones", remedy: "Calcium-rich diet, vitamin D supplements, and weight-bearing exercises.", image: "https://source.unsplash.com/100x100/?bones" },
  { name: "Cancer", about: "Uncontrolled cell growth", remedy: "Chemotherapy, radiation, immunotherapy, and lifestyle modifications.", image: "https://source.unsplash.com/100x100/?cancer" },
  { name: "Alzheimer’s", about: "Progressive memory loss", remedy: "Cognitive therapy, healthy diet, and regular mental stimulation.", image: "https://source.unsplash.com/100x100/?brain" },
];

const ChronicDiseases = () => {
  const navigate = useNavigate();

  return (
    <div className="disease-container">
      <button className="back-button" onClick={() => navigate("/dashboard")}>
        ⬅ Back to Dashboard
      </button>
      <h2>Chronic Diseases</h2>
      <div className="disease-grid">
        {chronicDiseases.map((disease, index) => (
          <div key={index} className="disease-card">
            <img src={disease.image} alt={disease.name} className="disease-image" />
            <h3>{disease.name}</h3>
            <p>{disease.about}</p>
            <p><strong>Remedy:</strong> {disease.remedy}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Add CSS inside the same file
const styles = `
.disease-container {
  background-color: #87CEFA;
  color: black;
  padding: 20px;
  text-align: center;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.back-button {
  background-color: red;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  font-size: 16px;
  border-radius: 5px;
  margin-top: 30px;
  margin-bottom: 20px;
  align-self: flex-start;
}

.back-button:hover {
  background-color: darkred;
}

.disease-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
  justify-content: center;
  padding: 20px;
  width: 100%;
}

.disease-card {
  background: rgba(255, 255, 255, 0.3);
  padding: 15px;
  border-radius: 10px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);
  text-align: center;
  transition: transform 0.3s ease;
}

.disease-card:hover {
  transform: scale(1.05);
}

.disease-image {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 10px;
}

h2 {
  font-size: 24px;
  margin-bottom: 20px;
}

h3 {
  font-size: 18px;
  margin: 10px 0;
}

p {
  font-size: 14px;
}

html, body {
  background-color: #87CEFA;
  margin: 0;
  padding: 0;
  height: 100%;
}
`;

// Inject CSS into the document
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default ChronicDiseases;