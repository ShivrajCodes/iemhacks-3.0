import React from "react";

const diseases = [
  { name: "Common Cold", about: "Viral infection", cure: "Rest, hydration, paracetamol" },
  { name: "Flu", about: "Influenza virus", cure: "Rest, antiviral medications" }
];

const NonChronicDiseases = () => {
  return (
    <div className="column">
      <h2>Non-Chronic Diseases</h2>
      {diseases.map((disease, index) => (
        <div key={index} className="card non-chronic">
          <h3>{disease.name}</h3>
          <p><strong>About:</strong> {disease.about}</p>
          <p><strong>Cure:</strong> {disease.cure}</p>
        </div>
      ))}
    </div>
  );
};

export default NonChronicDiseases;
