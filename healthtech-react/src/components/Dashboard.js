import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import ChronicDisease from "./ChronicDiseases";
import NonChronicDiseases from "./NonChronicDiseases";
import Doctors from "./Doctors";
import HeartAttackPrediction from "./HeartAttackPrediction";

const Dashboard = ({ setIsAuthenticated }) => {
  const [showChronic, setShowChronic] = useState(false);
  const [showNonChronic, setShowNonChronic] = useState(false);
  const [showDoctors, setShowDoctors] = useState(false);
  const [showHeartAttackPrediction, setShowHeartAttackPrediction] = useState(false);
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        setIsAuthenticated(false);
      })
      .catch((error) => {
        console.error("Logout Error:", error);
      });
  };

  return (
    <div className="dashboard">
      <header>
        <h1>HealthSync Dashboard</h1>

        {user && (
          <div className="profile-section" onClick={() => setDropdownOpen(!dropdownOpen)}>
            <img src={user.photoURL || "/default-avatar.png"} alt="Profile" className="profile-img" />
            <span className="dropdown-arrow">▼</span>
            {dropdownOpen && (
              <div className="dropdown-menu">
                <button onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        )}
      </header>

      {!showChronic && !showNonChronic && !showDoctors && !showHeartAttackPrediction ? (
        <div className="cards-container">
          <div className="card chronic">
            <img src="/images/chronic.png" alt="Chronic" className="card-img" />
            <div className="content">
              <span>Chronic Diseases</span>
              <p>Details about chronic diseases will be here.</p>
              <button className="know-more" onClick={() => setShowChronic(true)}>Know More →</button>
            </div>
          </div>

          <div className="card non-chronic">
            <img src="/images/nonchronic.png" alt="Non-Chronic" className="card-img" />
            <div className="content">
              <span>Non-Chronic Diseases</span>
              <p>Details about non-chronic diseases will be here.</p>
              <button className="know-more" onClick={() => setShowNonChronic(true)}>Know More →</button>
            </div>
          </div>

          <div className="card doctors">
            <img src="/images/doctors.png" alt="Doctors" className="card-img" />
            <div className="content">
              <span>Find Doctors</span>
              <p>Connect with experienced doctors for consultations.</p>
              <button className="know-more" onClick={() => setShowDoctors(true)}>Know More →</button>
            </div>
          </div>

          <div className="card mental">
            <img src="/images/heartattk.png" alt="Mental Health" className="card-img" />
            <div className="content">
              <span>Heart Attack Prediction</span>
              <p>Predict the chances of your heart attack using advanced AI algorithms</p>
              <button className="know-more" onClick={() => setShowHeartAttackPrediction(true)}>Know More →</button>
            </div>
          </div>
        </div>
      ) : showChronic ? (
        <ChronicDisease goBack={() => setShowChronic(false)} />
      ) : showNonChronic ? (
        <NonChronicDiseases goBack={() => setShowNonChronic(false)} />
      ) : showDoctors ? (
        <Doctors goBack={() => setShowDoctors(false)} />
      ) : (
        <HeartAttackPrediction goBack={() => setShowHeartAttackPrediction(false)} />
      )}

      <style>{`
        .dashboard {
          height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: linear-gradient(to bottom right, #80d0ff, #5ba3ff);
          position: relative;
        }

        header {
          position: absolute;
          top: 20px;
          width: 100%;
          display: flex;
          justify-content: space-between;
          padding: 0 40px;
          box-sizing: border-box;
        }

        h1 {
          font-size: 16px;
          font-weight: bold;
          color: white;
          margin: 0;
          font-family: 'Poppins', sans-serif;
        }

        .profile-section {
          display: flex;
          align-items: center;
          cursor: pointer;
          position: relative;
        }

        .profile-img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          margin-right: 5px;
        }

        .dropdown-arrow {
          color: white;
          font-size: 14px;
        }

        .dropdown-menu {
          position: absolute;
          top: 50px;
          right: 0;
          background: white;
          padding: 10px;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }

        .dropdown-menu button {
          background: none;
          border: none;
          cursor: pointer;
          font-weight: bold;
          padding: 8px 12px;
          transition: 0.3s;
        }

        .dropdown-menu button:hover {
          color: red;
        }

        .cards-container {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          margin-top: -30px;
        }

        .card {
          width: 220px;
          height: 320px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          padding: 15px;
          border-radius: 12px;
          text-align: center;
          font-size: 18px;
          font-weight: bold;
          transition: transform 0.3s ease;
          font-family: 'Poppins', sans-serif;
          box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
        }

        .chronic {
          background: linear-gradient(to right, #ff6f61, #ff8a75);
          color: black;
        }

        .non-chronic {
          background: linear-gradient(to right, #42b883, #65d28f);
          color: black;
        }

        .doctors {
          background: linear-gradient(to right, #ffcc00, #ffdd44);
          color: black;
        }

        .mental {
          background: linear-gradient(to right, #ff4d4d, #ff6666);
          color: black;
        }

        .card:hover {
          transform: scale(1.05);
        }

        .card-img {
          width: 100%;
          height: 140px;
          border-radius: 8px;
          object-fit: cover;
        }

        .content {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
        }

        .know-more {
          margin-top: 10px;
          background: rgba(255, 255, 255, 0.8);
          border: none;
          padding: 10px 16px;
          border-radius: 20px;
          cursor: pointer;
          font-weight: bold;
          transition: all 0.3s ease;
        }

        .know-more:hover {
          background: white;
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
