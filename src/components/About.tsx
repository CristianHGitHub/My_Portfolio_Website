import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Code, Coffee, Rocket, Heart } from "lucide-react";

const AboutSection = styled.section`
  padding: ${({ theme }) => theme.spacing.xxl}
    ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.secondary};
  position: relative;
  overflow: hidden;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionTitle = styled(motion.h2)`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 3px;
    background: linear-gradient(
      90deg,
      ${({ theme }) => theme.colors.accentCyan},
      ${({ theme }) => theme.colors.accentPurple}
    );
    border-radius: 2px;
  }
`;

const AboutContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.xxl};
  align-items: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing.xl};
  }
`;

const AboutText = styled.div`
  font-size: 1.1rem;
  line-height: 1.8;
`;

const Highlight = styled.span`
  color: ${({ theme }) => theme.colors.accentCyan};
  font-weight: 600;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({ theme }) => theme.spacing.lg};
  margin-top: ${({ theme }) => theme.spacing.xl};
`;

const StatCard = styled(motion.div)`
  background: ${({ theme }) => theme.colors.accent};
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: 12px;
  text-align: center;
  border: 1px solid ${({ theme }) => theme.colors.border};
  transition: all ${({ theme }) => theme.animations.normal} ease;

  &:hover {
    transform: translateY(-5px);
    border-color: ${({ theme }) => theme.colors.accentCyan};
    box-shadow: 0 10px 30px rgba(0, 212, 255, 0.1);
  }
`;

const StatNumber = styled.div`
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: 2.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.accentCyan};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const StatLabel = styled.div`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const AboutImage = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ImageContainer = styled(motion.div)`
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.accentCyan} 0%,
    ${({ theme }) => theme.colors.accentPurple} 100%
  );
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 4px;
    left: 4px;
    right: 4px;
    bottom: 4px;
    background: ${({ theme }) => theme.colors.secondary};
    border-radius: 50%;
    z-index: 1;
  }
`;

const ImagePlaceholder = styled.div`
  width: 280px;
  height: 280px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.accent};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4rem;
  color: ${({ theme }) => theme.colors.accentCyan};
  z-index: 2;
`;

const FloatingElements = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
`;

const FloatingElement = styled(motion.div)`
  position: absolute;
  color: ${({ theme }) => theme.colors.accentCyan};
  opacity: 0.3;
`;

const About: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const stats = [
    { number: "3+", label: "Years Experience" },
    { number: "50+", label: "Projects Completed" },
    { number: "100%", label: "Client Satisfaction" },
    { number: "24/7", label: "Available Support" },
  ];

  const floatingElements = [
    { icon: Code, x: "10%", y: "20%", delay: 0 },
    { icon: Coffee, x: "80%", y: "30%", delay: 0.5 },
    { icon: Rocket, x: "20%", y: "70%", delay: 1 },
    { icon: Heart, x: "70%", y: "80%", delay: 1.5 },
  ];

  return (
    <AboutSection id="about" ref={ref}>
      <Container>
        <SectionTitle
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          About Me
        </SectionTitle>

        <AboutContent>
          <AboutText>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <p>
                I'm a passionate <Highlight>full-stack developer</Highlight>{" "}
                with a love for creating innovative digital solutions. With
                expertise in modern web technologies, I specialize in building
                scalable applications that deliver exceptional user experiences.
              </p>

              <p>
                My journey in software development began with curiosity and has
                evolved into a deep understanding of both frontend and backend
                technologies. I enjoy tackling complex challenges and turning
                ideas into reality through clean, efficient code.
              </p>

              <p>
                When I'm not coding, you can find me exploring new technologies,
                contributing to open-source projects, or sharing knowledge with
                the developer community.
              </p>
            </motion.div>

            <StatsGrid>
              {stats.map((stat, index) => (
                <StatCard
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <StatNumber>{stat.number}</StatNumber>
                  <StatLabel>{stat.label}</StatLabel>
                </StatCard>
              ))}
            </StatsGrid>
          </AboutText>

          <AboutImage>
            <ImageContainer
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              whileHover={{ scale: 1.05 }}
            >
              <ImagePlaceholder>
                <Code size={80} />
              </ImagePlaceholder>
            </ImageContainer>

            <FloatingElements>
              {floatingElements.map((element, index) => (
                <FloatingElement
                  key={index}
                  style={{ left: element.x, top: element.y }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={isInView ? { opacity: 0.3, scale: 1 } : {}}
                  transition={{
                    duration: 0.6,
                    delay: element.delay,
                    repeat: Infinity,
                    repeatType: "reverse",
                    repeatDelay: 2,
                  }}
                >
                  <element.icon size={24} />
                </FloatingElement>
              ))}
            </FloatingElements>
          </AboutImage>
        </AboutContent>
      </Container>
    </AboutSection>
  );
};

export default About;
