import React, { useEffect } from "react";
import styled, { keyframes } from "styled-components";
import logo from "../assets/logo.png";

const SplashScreen = ({ setShowSplash }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false); 
    }, 6000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Container>
      <Logo src={logo} alt="Logo" />
      <Tagline>Your Health, Our Priority</Tagline>
      <SubText>Personalizing Your Experience</SubText>
      <DotsContainer>
        <Dot />
        <Dot delay="0.2s" />
        <Dot delay="0.4s" />
      </DotsContainer>
    </Container>
  );
};

export default SplashScreen;


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(135deg, #89f7fe, #66a6ff);
  color: white;
  text-align: center;
`;

const Logo = styled.img`
  width: 300px; 
  height: auto;
  margin-bottom: 20px;
`;

const Tagline = styled.h1`
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 10px;
`;

const SubText = styled.p`
  font-size: 1.2rem;
  font-weight: 500;
  margin-bottom: 20px;
`;

const bounce = keyframes`
  0%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-10px); }
`;

const DotsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
`;

const Dot = styled.span`
  width: 10px;
  height: 10px;
  background: white;
  border-radius: 50%;
  animation: ${bounce} 1.5s infinite ease-in-out;
  animation-delay: ${(props) => props.delay || "0s"};
`;
