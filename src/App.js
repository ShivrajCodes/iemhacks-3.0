import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SplashScreen from "./components/SplashScreen";
import Auth from "./components/Auth";
import Dashboard from "./components/Dashboard";
import ChronicDiseases from "./components/ChronicDiseases";
import NonChronicDiseases from "./components/NonChronicDiseases";

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (showSplash) {
    return <SplashScreen setShowSplash={setShowSplash} />;
  }

  return (
    <Router>
      {!isAuthenticated ? (
        <Auth setIsAuthenticated={setIsAuthenticated} />
      ) : (
        <Routes>
          <Route path="/" element={<Dashboard setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/chronic-diseases" element={<ChronicDiseases />} />
          <Route path="/non-chronic-diseases" element={<NonChronicDiseases />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;
