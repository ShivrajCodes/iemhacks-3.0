import React, { useState } from "react";
import styled from "styled-components";
import { auth, googleProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, db, setDoc, doc } from "../firebase";

const Auth = ({ setIsAuthenticated }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [healthInfo, setHealthInfo] = useState("");

  // Sign in with Google
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      setIsAuthenticated(true);
    } catch (error) {
      alert("Google Sign-in Failed: " + error.message);
    }
  };

  // Register with Google
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

  // Sign in with Email
  const handleEmailSignIn = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setIsAuthenticated(true);
    } catch (error) {
      alert("Email Sign-in Failed: " + error.message);
    }
  };

  // Register with Email
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
      <h1>{isRegistering ? "Register" : "Sign In"}</h1>

      <GoogleButton onClick={isRegistering ? handleGoogleRegister : handleGoogleSignIn}>
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
    </AuthContainer>
  );
};

export default Auth;

// Styled Components (CSS inside the same file)
const AuthContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(135deg, #89f7fe, #66a6ff);
  color: white;
  text-align: center;
`;

const GoogleButton = styled.button`
  background-color: red;
  color: white;
  border: none;
  padding: 10px;
  width: 80%;
  cursor: pointer;
  margin: 10px 0;
  border-radius: 5px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 80%;
`;

const Input = styled.input`
  margin: 10px 0;
  padding: 10px;
  border-radius: 5px;
  border: none;
`;

const TextArea = styled.textarea`
  margin: 10px 0;
  padding: 10px;
  border-radius: 5px;
  border: none;
  height: 80px;
`;

const Button = styled.button`
  background-color: blue;
  color: white;
  padding: 10px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
`;

const ToggleLink = styled.p`
  margin-top: 10px;
  color: yellow;
  cursor: pointer;
`;
