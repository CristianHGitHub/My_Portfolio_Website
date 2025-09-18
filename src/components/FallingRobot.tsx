import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Zap, Heart } from "lucide-react";

const RobotContainer = styled(motion.div)`
  position: fixed;
  top: -100px;
  right: 20px;
  z-index: 9999;
  pointer-events: none;
`;

const Robot = styled(motion.div)`
  width: 60px;
  height: 60px;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.accentCyan},
    ${({ theme }) => theme.colors.accentPurple}
  );
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 30px rgba(0, 212, 255, 0.3);
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: -5px;
    left: -5px;
    right: -5px;
    bottom: -5px;
    background: linear-gradient(
      135deg,
      ${({ theme }) => theme.colors.accentCyan},
      ${({ theme }) => theme.colors.accentPurple}
    );
    border-radius: 50%;
    opacity: 0.3;
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0%,
    100% {
      transform: scale(1);
      opacity: 0.3;
    }
    50% {
      transform: scale(1.1);
      opacity: 0.6;
    }
  }
`;

const RobotIcon = styled(Bot)`
  color: ${({ theme }) => theme.colors.primary};
  z-index: 2;
`;

const Sparkle = styled(motion.div)`
  position: absolute;
  width: 4px;
  height: 4px;
  background: ${({ theme }) => theme.colors.accentCyan};
  border-radius: 50%;
`;

const SpeechBubble = styled(motion.div)`
  position: absolute;
  bottom: 70px;
  right: 0;
  background: ${({ theme }) => theme.colors.secondary};
  border: 2px solid ${({ theme }) => theme.colors.accentCyan};
  border-radius: 12px;
  padding: 8px 12px;
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.text};
  white-space: nowrap;

  &::after {
    content: "";
    position: absolute;
    bottom: -8px;
    right: 20px;
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-top: 8px solid ${({ theme }) => theme.colors.accentCyan};
  }
`;

const FloatingHearts = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
`;

const HeartIcon = styled(motion.div)`
  position: absolute;
  color: ${({ theme }) => theme.colors.error};
`;

const FallingRobot: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showSpeech, setShowSpeech] = useState(false);
  const [speechText, setSpeechText] = useState("");

  const speechMessages = [
    "Hello! 👋",
    "I'm your coding buddy!",
    "Let's build something amazing!",
    "Data science is awesome! 🤖",
    "Machine learning rocks! 🚀",
    "Full-stack for the win! 💪",
  ];

  useEffect(() => {
    // Show robot after 2 seconds
    const showTimer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    // Show speech bubble after robot appears
    const speechTimer = setTimeout(() => {
      setShowSpeech(true);
      setSpeechText(
        speechMessages[Math.floor(Math.random() * speechMessages.length)]
      );
    }, 4000);

    // Hide speech after 3 seconds
    const hideSpeechTimer = setTimeout(() => {
      setShowSpeech(false);
    }, 7000);

    // Repeat the animation every 30 seconds
    const repeatTimer = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setIsVisible(true);
        setTimeout(() => {
          setShowSpeech(true);
          setSpeechText(
            speechMessages[Math.floor(Math.random() * speechMessages.length)]
          );
          setTimeout(() => setShowSpeech(false), 3000);
        }, 2000);
      }, 1000);
    }, 30000);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(speechTimer);
      clearTimeout(hideSpeechTimer);
      clearInterval(repeatTimer);
    };
  }, []);

  const sparkles = Array.from({ length: 4 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 2,
  }));

  const hearts = Array.from({ length: 2 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 3,
  }));

  return (
    <AnimatePresence>
      {isVisible && (
        <RobotContainer
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{
            duration: 1.5,
            ease: "easeOut",
            type: "spring",
            stiffness: 100,
            damping: 15,
          }}
        >
          <Robot
            animate={{
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            <RobotIcon size={30} />

            {/* Sparkles around robot */}
            {sparkles.map((sparkle) => (
              <Sparkle
                key={sparkle.id}
                style={{
                  left: `${sparkle.x}%`,
                  top: `${sparkle.y}%`,
                }}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 1.5,
                  delay: sparkle.delay,
                  repeat: Infinity,
                  repeatDelay: 2,
                }}
              />
            ))}
          </Robot>

          {/* Floating hearts */}
          <FloatingHearts>
            {hearts.map((heart) => (
              <HeartIcon
                key={heart.id}
                style={{
                  left: `${heart.x}%`,
                  top: `${heart.y}%`,
                }}
                animate={{
                  y: [-20, -40, -20],
                  opacity: [0, 1, 0],
                  scale: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  delay: heart.delay,
                  repeat: Infinity,
                  repeatDelay: 3,
                }}
              >
                <Heart size={12} fill="currentColor" />
              </HeartIcon>
            ))}
          </FloatingHearts>

          {/* Speech bubble */}
          <AnimatePresence>
            {showSpeech && (
              <SpeechBubble
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 10 }}
                transition={{ duration: 0.3 }}
              >
                {speechText}
              </SpeechBubble>
            )}
          </AnimatePresence>
        </RobotContainer>
      )}
    </AnimatePresence>
  );
};

export default FallingRobot;
