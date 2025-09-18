import React, { useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Github, Eye, X } from "lucide-react";

const ProjectsSection = styled.section`
  padding: ${({ theme }) => theme.spacing.xxl}
    ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.secondary};
  position: relative;
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

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
`;

const ProjectCard = styled(motion.div)`
  background: ${({ theme }) => theme.colors.primary};
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.border};
  transition: all ${({ theme }) => theme.animations.normal} ease;

  &:hover {
    transform: translateY(-10px);
    border-color: ${({ theme }) => theme.colors.accentCyan};
    box-shadow: 0 20px 40px rgba(0, 212, 255, 0.15);
  }
`;

const ProjectImage = styled.div`
  height: 200px;
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
`;

const ProjectImagePlaceholder = styled.div`
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.colors.accent};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  color: ${({ theme }) => theme.colors.accentCyan};
`;

const ProjectOverlay = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.md};
  opacity: 0;
`;

const ProjectButton = styled(motion.a)`
  padding: ${({ theme }) => theme.spacing.sm};
  background: ${({ theme }) => theme.colors.accentCyan};
  color: ${({ theme }) => theme.colors.primary};
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  font-family: ${({ theme }) => theme.fonts.primary};
  font-weight: 600;
  transition: all ${({ theme }) => theme.animations.fast} ease;

  &:hover {
    background: ${({ theme }) => theme.colors.text};
    transform: scale(1.05);
  }
`;

const ProjectContent = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
`;

const ProjectTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: 1.3rem;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.text};
`;

const ProjectDescription = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  line-height: 1.6;
`;

const ProjectTech = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.xs};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const TechTag = styled.span`
  background: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.accentCyan};
  padding: 0.2rem 0.6rem;
  border-radius: 4px;
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: 0.8rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const ProjectLinks = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
`;

// Modal Components
const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: ${({ theme }) => theme.spacing.md};
`;

const ModalContent = styled(motion.div)`
  background: ${({ theme }) => theme.colors.secondary};
  border: 2px solid ${({ theme }) => theme.colors.accentCyan};
  border-radius: 16px;
  padding: ${({ theme }) => theme.spacing.xl};
  max-width: 500px;
  width: 100%;
  position: relative;
  box-shadow: 0 20px 60px rgba(0, 212, 255, 0.3);
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const ModalTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.accentCyan};
  margin: 0;
`;

const CloseButton = styled(motion.button)`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.textSecondary};
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing.sm};
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all ${({ theme }) => theme.animations.fast} ease;

  &:hover {
    background: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.text};
  }
`;

const ModalBody = styled.div`
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.6;
  font-size: 1rem;
`;

const ModalFooter = styled.div`
  margin-top: ${({ theme }) => theme.spacing.lg};
  display: flex;
  justify-content: flex-end;
`;

const ModalButton = styled(motion.button)`
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.accentCyan},
    ${({ theme }) => theme.colors.accentPurple}
  );
  color: ${({ theme }) => theme.colors.primary};
  border: none;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  border-radius: 8px;
  font-family: ${({ theme }) => theme.fonts.primary};
  font-weight: 600;
  cursor: pointer;
  transition: all ${({ theme }) => theme.animations.fast} ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(0, 212, 255, 0.3);
  }
`;

const Projects: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<"robot" | "incollege" | null>(
    null
  );

  const handleGitHubClick = (project: any, e: React.MouseEvent) => {
    if (project.title === "Autonomous Robot Navigation System") {
      e.preventDefault();
      setModalType("robot");
      setShowModal(true);
    }
  };

  const handleViewProjectClick = (project: any, e: React.MouseEvent) => {
    if (project.title === "InCollege Social Networking Platform") {
      e.preventDefault();
      setModalType("incollege");
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setModalType(null);
  };

  const projects = [
    {
      id: 1,
      title: "Financial Tracker",
      description:
        "Built and deployed a secure full-stack financial tracking platform with user authentication and persistent data storage, enabling real-time expense monitoring. Leveraged AI-powered insights to analyze spending habits and deliver personalized recommendations, helping users cut expenses by 30% through data-driven guidance.",
      image: "💰",
      tech: ["Node.js", "TypeScript", "React", "PostgreSQL"],
      category: "Full Stack",
      liveUrl: "https://financial-tracker-ten-theta.vercel.app/",
      githubUrl: "https://github.com/CristianHGitHub/Financial-Tracker",
    },
    {
      id: 2,
      title: "InCollege Social Networking Platform",
      description:
        "Collaborated in a 5-person Agile Scrum team using Jira and Git branching strategies to deliver a modular COBOL-based social networking platform with authentication, account management, and interactive navigation features across 3 sprints. Streamlined development by designing reusable subprogram architecture and automating builds with Make, improving maintainability and workflow efficiency by 60%.",
      image: "🎓",
      tech: ["COBOL", "Agile", "Git"],
      category: "Backend",
      liveUrl: "#",
      githubUrl: "https://github.com/CristianHGitHub/Group-Project-InCollege",
    },
    {
      id: 3,
      title: "Autonomous Robot Navigation System",
      description:
        "Developed a robot navigation model using navigation techniques and particle filters for localization, achieving a 98% collision-free rate in simulated environments. Integrated multiple sensor inputs using OOP principles for real-time navigation and obstacle detection.",
      image: "🤖",
      tech: ["Python", "Webots"],
      category: "Machine Learning",
      liveUrl: "https://youtu.be/dvUPCyYr3IQ",
      githubUrl: "#",
    },
  ];

  return (
    <ProjectsSection id="projects" ref={ref}>
      <Container>
        <SectionTitle
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Featured Projects
        </SectionTitle>

        <ProjectsGrid>
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <ProjectImage>
                <ProjectImagePlaceholder>
                  {project.image}
                </ProjectImagePlaceholder>
                <ProjectOverlay
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <ProjectButton
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Eye size={16} />
                    Live Demo
                  </ProjectButton>
                  <ProjectButton
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => handleGitHubClick(project, e)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Github size={16} />
                    Code
                  </ProjectButton>
                </ProjectOverlay>
              </ProjectImage>

              <ProjectContent>
                <ProjectTitle>{project.title}</ProjectTitle>
                <ProjectDescription>{project.description}</ProjectDescription>

                <ProjectTech>
                  {project.tech.map((tech) => (
                    <TechTag key={tech}>{tech}</TechTag>
                  ))}
                </ProjectTech>

                <ProjectLinks>
                  <ProjectButton
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => handleViewProjectClick(project, e)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ExternalLink size={16} />
                    View Project
                  </ProjectButton>
                  <ProjectButton
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => handleGitHubClick(project, e)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Github size={16} />
                    GitHub
                  </ProjectButton>
                </ProjectLinks>
              </ProjectContent>
            </ProjectCard>
          ))}
        </ProjectsGrid>
      </Container>

      {/* Private Repository Modal */}
      <AnimatePresence>
        {showModal && (
          <ModalOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <ModalContent
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
              onClick={(e) => e.stopPropagation()}
            >
              <ModalHeader>
                <ModalTitle>
                  {modalType === "robot"
                    ? "🔒 Private Repository"
                    : "🚧 Project in Development"}
                </ModalTitle>
                <CloseButton
                  onClick={closeModal}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X size={24} />
                </CloseButton>
              </ModalHeader>

              <ModalBody>
                {modalType === "robot" ? (
                  <>
                    <p>
                      Sorry, this project repository is private and cannot be
                      accessed publicly. The professor requested that students
                      maintain this project private to prevent future students
                      from accessing complete solutions, ensuring academic
                      integrity and encouraging original problem-solving
                      approaches.
                    </p>
                    <p>
                      However, you can view the project demonstration video
                      through the
                      <strong style={{ color: "#00d4ff" }}>
                        {" "}
                        "Live Demo"{" "}
                      </strong>
                      link above to see the robot navigation system in action!
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      Sorry, the visual aspect of this project is still in
                      progress. The InCollege Social Networking Platform was
                      originally designed as a backend-focused project,
                      emphasizing core functionality and system architecture
                      rather than frontend presentation.
                    </p>
                    <p>
                      This project demonstrates strong backend development
                      skills, including
                      <strong style={{ color: "#00d4ff" }}>
                        {" "}
                        COBOL programming
                      </strong>
                      ,
                      <strong style={{ color: "#00d4ff" }}>
                        {" "}
                        Agile methodologies
                      </strong>
                      , and
                      <strong style={{ color: "#00d4ff" }}>
                        {" "}
                        collaborative development
                      </strong>{" "}
                      practices. You can explore the source code through the
                      GitHub repository.
                    </p>
                  </>
                )}
              </ModalBody>

              <ModalFooter>
                <ModalButton
                  onClick={closeModal}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Understood
                </ModalButton>
              </ModalFooter>
            </ModalContent>
          </ModalOverlay>
        )}
      </AnimatePresence>
    </ProjectsSection>
  );
};

export default Projects;
