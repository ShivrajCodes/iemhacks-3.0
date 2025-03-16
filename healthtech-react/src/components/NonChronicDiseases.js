import React from "react";
import { useNavigate } from "react-router-dom";

const nonChronicDiseases = [
  { 
    name: "Influenza", 
    about: "Viral infection causing fever, chills, cough, and fatigue.", 
    remedy: "Rest, hydration, and antiviral medications if prescribed.", 
    image: "https://source.unsplash.com/100x100/?flu,virus"
  },
  { 
    name: "Common Cold", 
    about: "Mild viral respiratory infection causing congestion and sore throat.", 
    remedy: "Plenty of fluids, rest, and vitamin C-rich foods.", 
    image: "https://source.unsplash.com/100x100/?cold,medicine"
  },
  { 
    name: "Food Poisoning", 
    about: "Illness caused by contaminated food, leading to nausea and diarrhea.", 
    remedy: "Hydration, probiotics, and electrolyte replenishment.", 
    image: "https://source.unsplash.com/100x100/?food,sickness"
  },
  { 
    name: "Malaria", 
    about: "Mosquito-borne disease causing fever, chills, and sweating.", 
    remedy: "Antimalarial drugs and protective mosquito nets.", 
    image: "https://source.unsplash.com/100x100/?mosquito,fever"
  },
  { 
    name: "Typhoid", 
    about: "Bacterial infection from contaminated food or water.", 
    remedy: "Antibiotics, proper hydration, and rest.", 
    image: "https://source.unsplash.com/100x100/?bacteria,medicine"
  },
  { 
    name: "Dengue", 
    about: "Viral infection spread by mosquitoes, causing fever and body aches.", 
    remedy: "Hydration, fever control, and mosquito bite prevention.", 
    image: "https://source.unsplash.com/100x100/?mosquito,disease"
  },
  { 
    name: "Pneumonia", 
    about: "Lung infection causing breathing difficulty and fever.", 
    remedy: "Antibiotics (if bacterial), rest, and oxygen therapy if needed.", 
    image: "https://source.unsplash.com/100x100/?lungs,infection"
  },
  { 
    name: "Chickenpox", 
    about: "Highly contagious viral infection causing itchy blisters.", 
    remedy: "Calamine lotion, antihistamines, and staying hydrated.", 
    image: "https://source.unsplash.com/100x100/?rash,virus"
  },
  { 
    name: "Measles", 
    about: "Viral infection with rash, fever, and cough.", 
    remedy: "Vitamin A supplements and fever management.", 
    image: "https://source.unsplash.com/100x100/?measles,rash"
  },
  { 
    name: "Tonsillitis", 
    about: "Inflammation of the tonsils causing sore throat.", 
    remedy: "Warm saltwater gargles, pain relievers, and antibiotics if needed.", 
    image: "https://source.unsplash.com/100x100/?throat,pain"
  },
];

const NonChronicDiseases = () => {
  const navigate = useNavigate();

  return (
    <div className="disease-container">
      <button className="back-button" onClick={() => navigate("/dashboard")}>
        ⬅ Back to Dashboard
      </button>
      <h2>Non-Chronic Diseases</h2>
      <div className="disease-grid">
        {nonChronicDiseases.map((disease, index) => (
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
  margin-top: 30px; /* Lowered by 30px */
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

/* Ensure Background Stays Uniform Even on Scroll */
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

export default NonChronicDiseases;
