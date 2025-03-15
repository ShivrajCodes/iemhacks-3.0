import React, { useState } from "react";
import SplashScreen from "./components/SplashScreen";
import Auth from "./components/Auth"; // Replacing Signup with Auth
import Dashboard from "./components/Dashboard";

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (showSplash) {
    return <SplashScreen setShowSplash={setShowSplash} />;
  }

  return (
    <div>
      {!isAuthenticated ? (
        <Auth setIsAuthenticated={setIsAuthenticated} />
      ) : (
        <Dashboard setIsAuthenticated={setIsAuthenticated} />
      )}
    </div>
  );
}

export default App;
