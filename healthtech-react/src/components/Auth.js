import React, { useState } from "react";
import styled from "styled-components";
import { auth, googleProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, db, setDoc, doc } from "../firebase";
import googleLogo from "../assets/google-logo.png";
import MagicCard from "./MagicCard"; // Import MagicCard

const Auth = ({ setIsAuthenticated }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [healthInfo, setHealthInfo] = useState("");

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      setIsAuthenticated(true);
    } catch (error) {
      alert("Google Sign-in Failed: " + error.message);
    }
  };

  const handleGoogleRegister = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      await setDoc(doc(db, "users", user.uid), {
        name: user.displayName || "N/A",
        email: user.email,
        age: "N/A",
        bloodGroup: "N/A",
        healthInfo: "N/A"
      });
      setIsAuthenticated(true);
    } catch (error) {
      alert("Google Registration Failed: " + error.message);
    }
  };

  const handleEmailSignIn = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setIsAuthenticated(true);
    } catch (error) {
      alert("Email Sign-in Failed: " + error.message);
    }
  };

  const handleEmailRegister = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, "users", userCredential.user.uid), {
        name,
        email,
        age,
        bloodGroup,
        healthInfo
      });
      setIsAuthenticated(true);
    } catch (error) {
      alert("Registration Failed: " + error.message);
    }
  };

  return (
    <AuthContainer>
      <MagicCard>
        <h2>👋🏻 Hi! Welcome to HealthSync - your one-stop solution for all your basic health-related needs</h2>

        <GoogleButton onClick={isRegistering ? handleGoogleRegister : handleGoogleSignIn}>
          <GoogleIcon src={googleLogo} alt="Google Logo" />
          {isRegistering ? "Register" : "Sign In"} with Google
        </GoogleButton>

        <h3>OR</h3>

        <Form onSubmit={isRegistering ? handleEmailRegister : handleEmailSignIn}>
          {isRegistering && (
            <>
              <Input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required />
              <Input type="number" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} required />
              <Input type="text" placeholder="Blood Group" value={bloodGroup} onChange={(e) => setBloodGroup(e.target.value)} required />
              <TextArea placeholder="Health Information" value={healthInfo} onChange={(e) => setHealthInfo(e.target.value)} required />
            </>
          )}
          <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <Button type="submit">{isRegistering ? "Register" : "Sign In"} with Email</Button>
        </Form>

        <ToggleLink onClick={() => setIsRegistering(!isRegistering)}>
          {isRegistering ? "Already have an account? Sign in" : "New user? Register here"}
        </ToggleLink>
      </MagicCard>
    </AuthContainer>
  );
};

export default Auth;

// Styled Components (✅ Added Missing Styles)

const AuthContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(135deg, #89f7fe, #66a6ff);
`;

const GoogleButton = styled.button`
  background-color: white;
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-weight: bold;
  border: none;
  padding: 12px;
  width: 100%;
  cursor: pointer;
  margin: 15px 0;
  border-radius: 5px;
  font-size: 16px;
`;

const GoogleIcon = styled.img`
  width: 20px;
  height: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Input = styled.input`
  margin: 10px 0;
  padding: 12px;
  border-radius: 5px;
  border: none;
  font-size: 16px;
`;

const TextArea = styled.textarea`
  margin: 10px 0;
  padding: 12px;
  border-radius: 5px;
  border: none;
  height: 80px;
  font-size: 16px;
`;

const Button = styled.button`
  background-color: blue;
  color: white;
  padding: 12px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
`;

const ToggleLink = styled.p`
  margin-top: 10px;
  color: yellow;
  cursor: pointer;
`;
