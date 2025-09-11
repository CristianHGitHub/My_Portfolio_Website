import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Code, Heart, ArrowUp } from "lucide-react";

const FooterContainer = styled.footer`
  background: ${({ theme }) => theme.colors.secondary};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.md};
  position: relative;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
`;

const FooterContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const Logo = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: 1.5rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.accentCyan};
`;

const FooterText = styled(motion.p)`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const HeartIcon = styled(motion.span)`
  color: ${({ theme }) => theme.colors.error};
  display: inline-block;
`;

const Copyright = styled(motion.div)`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.9rem;
  font-family: ${({ theme }) => theme.fonts.primary};
`;

const ScrollToTop = styled(motion.button)`
  position: fixed;
  bottom: ${({ theme }) => theme.spacing.lg};
  right: ${({ theme }) => theme.spacing.lg};
  width: 50px;
  height: 50px;
  background: ${({ theme }) => theme.colors.accentCyan};
  color: ${({ theme }) => theme.colors.primary};
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 1000;
  transition: all ${({ theme }) => theme.animations.fast} ease;

  &:hover {
    background: ${({ theme }) => theme.colors.text};
    transform: translateY(-2px);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    bottom: ${({ theme }) => theme.spacing.md};
    right: ${({ theme }) => theme.spacing.md};
    width: 45px;
    height: 45px;
  }
`;

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <FooterContainer>
        <Container>
          <FooterContent>
            <Logo
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Code size={28} />
              Cristian Hernandez
            </Logo>

            <FooterText
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              Made with
              <HeartIcon
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <Heart size={16} fill="currentColor" />
              </HeartIcon>
              and lots of coffee
            </FooterText>

            <Copyright
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              © {new Date().getFullYear()} Cristian Hernandez. All rights
              reserved.
            </Copyright>
          </FooterContent>
        </Container>
      </FooterContainer>

      <ScrollToTop
        onClick={scrollToTop}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <ArrowUp size={24} />
      </ScrollToTop>
    </>
  );
};

export default Footer;
