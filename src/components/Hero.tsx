import React, { useState, useEffect, useMemo } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { ChevronDown, Download } from "lucide-react";

const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.md};
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.primary} 0%,
    ${({ theme }) => theme.colors.secondary} 50%,
    ${({ theme }) => theme.colors.accent} 100%
  );
`;

const HeroContent = styled.div`
  text-align: center;
  max-width: 800px;
  z-index: 2;
`;

const Greeting = styled(motion.div)`
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.accentCyan};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const Name = styled(motion.h1)`
  font-size: 4rem;
  font-weight: 700;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  background: linear-gradient(
    45deg,
    ${({ theme }) => theme.colors.text} 0%,
    ${({ theme }) => theme.colors.accentCyan} 50%,
    ${({ theme }) => theme.colors.accentPurple} 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 2.5rem;
  }
`;

const TypingContainer = styled.div`
  min-height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const TypingText = styled(motion.span)`
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.textSecondary};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 1.2rem;
  }
`;

const Cursor = styled.span`
  display: inline-block;
  width: 2px;
  height: 1.5rem;
  background: ${({ theme }) => theme.colors.accentCyan};
  margin-left: 2px;
  animation: blink 1s infinite;

  @keyframes blink {
    0%,
    50% {
      opacity: 1;
    }
    51%,
    100% {
      opacity: 0;
    }
  }
`;

const Description = styled(motion.p)`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  line-height: 1.8;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 1rem;
  }
`;

const ButtonGroup = styled(motion.div)`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  justify-content: center;
  flex-wrap: wrap;
`;

const Button = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  border: 2px solid ${({ theme }) => theme.colors.accentCyan};
  border-radius: 8px;
  font-family: ${({ theme }) => theme.fonts.primary};
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all ${({ theme }) => theme.animations.fast} ease;

  &:first-child {
    background: ${({ theme }) => theme.colors.accentCyan};
    color: ${({ theme }) => theme.colors.primary};

    &:hover {
      background: transparent;
      color: ${({ theme }) => theme.colors.accentCyan};
      transform: translateY(-2px);
    }
  }

  &:last-child {
    background: transparent;
    color: ${({ theme }) => theme.colors.accentCyan};

    &:hover {
      background: ${({ theme }) => theme.colors.accentCyan};
      color: ${({ theme }) => theme.colors.primary};
      transform: translateY(-2px);
    }
  }
`;

const ScrollIndicator = styled(motion.div)`
  position: absolute;
  bottom: ${({ theme }) => theme.spacing.xl};
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const Hero: React.FC = () => {
  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const texts = useMemo(
    () => [
      "Full-Stack Developer",
      "Data Science Specialist",
      "Machine Learning Enthusiast",
      "React & Node.js Expert",
      "Problem Solver",
    ],
    []
  );

  useEffect(() => {
    const typeSpeed = isDeleting ? 50 : 100;
    const pauseTime = 2000;

    const timer = setTimeout(() => {
      const current = texts[currentIndex];

      if (isDeleting) {
        setCurrentText(current.substring(0, currentText.length - 1));
      } else {
        setCurrentText(current.substring(0, currentText.length + 1));
      }

      if (!isDeleting && currentText === current) {
        setTimeout(() => setIsDeleting(true), pauseTime);
      } else if (isDeleting && currentText === "") {
        setIsDeleting(false);
        setCurrentIndex((prev) => (prev + 1) % texts.length);
      }
    }, typeSpeed);

    return () => clearTimeout(timer);
  }, [currentText, currentIndex, isDeleting, texts]);

  return (
    <HeroSection id="home">
      <HeroContent>
        <Greeting
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Hello, I'm
        </Greeting>

        <Name
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Cristian Hernandez
        </Name>

        <TypingContainer>
          <TypingText
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {currentText}
            <Cursor />
          </TypingText>
        </TypingContainer>

          <Description
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            I specialize in full-stack development, data science, and machine learning. 
            I craft exceptional digital experiences through clean code, innovative solutions, 
            and a passion for turning complex problems into elegant software.
          </Description>

        <ButtonGroup
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Button
            href="#projects"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View My Work
          </Button>
          <Button
            href="/resume.pdf"
            download="Cristian-Hernandez-Resume.pdf"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Download size={20} />
            Download Resume
          </Button>
        </ButtonGroup>
      </HeroContent>

      <ScrollIndicator
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1 }}
      >
        <span>Scroll Down</span>
        <ChevronDown size={20} />
      </ScrollIndicator>
    </HeroSection>
  );
};

export default Hero;
