import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import React, { useCallback, useEffect, useRef } from "react";
import styled from "styled-components";

const MagicCard = ({ children, className, gradientSize = 200, gradientColor = "#262626", gradientOpacity = 0.8, gradientFrom = "#9E7AFF", gradientTo = "#FE8BBB" }) => {
  const cardRef = useRef(null);
  const mouseX = useMotionValue(-gradientSize);
  const mouseY = useMotionValue(-gradientSize);

  const handleMouseMove = useCallback((e) => {
    if (cardRef.current) {
      const { left, top } = cardRef.current.getBoundingClientRect();
      mouseX.set(e.clientX - left);
      mouseY.set(e.clientY - top);
    }
  }, [mouseX, mouseY]);

  const handleMouseOut = useCallback(() => {
    mouseX.set(-gradientSize);
    mouseY.set(-gradientSize);
  }, [mouseX, gradientSize, mouseY]);

  useEffect(() => {
    if (cardRef.current) {
      cardRef.current.addEventListener("mousemove", handleMouseMove);
      cardRef.current.addEventListener("mouseleave", handleMouseOut);
    }
    return () => {
      if (cardRef.current) {
        cardRef.current.removeEventListener("mousemove", handleMouseMove);
        cardRef.current.removeEventListener("mouseleave", handleMouseOut);
      }
    };
  }, [handleMouseMove, handleMouseOut]);

  return (
    <StyledCard ref={cardRef} className={className}>
      <motion.div
        className="gradient-effect"
        style={{
          background: useMotionTemplate`
            radial-gradient(${gradientSize}px circle at ${mouseX}px ${mouseY}px,
            ${gradientFrom}, ${gradientTo}, transparent 100%)
          `,
          opacity: gradientOpacity,
        }}
      />
      <div className="content">{children}</div>
    </StyledCard>
  );
};

export default MagicCard;

// Styled Components (CSS inside JS)
const StyledCard = styled.div`
  position: relative;
  padding: 30px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  width: 80%;
  max-width: 400px;
  overflow: hidden;
  text-align: center;
  
  .gradient-effect {
    position: absolute;
    inset: 0;
    border-radius: inherit;
    transition: opacity 0.3s ease-in-out;
  }

  .content {
    position: relative;
    z-index: 10;
  }
`;
