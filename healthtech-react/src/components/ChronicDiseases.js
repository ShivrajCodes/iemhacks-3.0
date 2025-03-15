import React from "react";

const diseases = [
  { name: "Diabetes", about: "Affects blood sugar levels", doctors: ["Dr. John Doe", "Dr. Jane Smith"] },
  { name: "Hypertension", about: "High blood pressure", doctors: ["Dr. Emily Brown", "Dr. Michael Green"] }
];

const ChronicDiseases = () => {
  return (
    <div className="column">
      <h2>Chronic Diseases</h2>
      {diseases.map((disease, index) => (
        <div key={index} className="card chronic">
          <h3>{disease.name}</h3>
          <p><strong>About:</strong> {disease.about}</p>
          <p><strong>Doctors:</strong> {disease.doctors.join(", ")}</p>
        </div>
      ))}
    </div>
  );
};

export default ChronicDiseases;
