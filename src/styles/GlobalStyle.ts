import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    font-family: ${({ theme }) => theme.fonts.secondary};
    background: linear-gradient(135deg, ${({ theme }) =>
      theme.colors.primary} 0%, ${({ theme }) => theme.colors.secondary} 100%);
    color: ${({ theme }) => theme.colors.text};
    line-height: 1.6;
    overflow-x: hidden;
    min-height: 100vh;
  }

  /* Custom scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.secondary};
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.accentBlue};
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.accentCyan};
  }

  /* Selection */
  ::selection {
    background: ${({ theme }) => theme.colors.accentCyan};
    color: ${({ theme }) => theme.colors.primary};
  }

  /* Focus styles */
  *:focus {
    outline: 2px solid ${({ theme }) => theme.colors.accentCyan};
    outline-offset: 2px;
  }

  /* Typography */
  h1, h2, h3, h4, h5, h6 {
    font-family: ${({ theme }) => theme.fonts.primary};
    font-weight: 600;
    line-height: 1.2;
  }

  h1 {
    font-size: 3.5rem;
    margin-bottom: ${({ theme }) => theme.spacing.lg};
  }

  h2 {
    font-size: 2.5rem;
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }

  h3 {
    font-size: 1.8rem;
    margin-bottom: ${({ theme }) => theme.spacing.sm};
  }

  p {
    margin-bottom: ${({ theme }) => theme.spacing.sm};
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  /* Links */
  a {
    color: ${({ theme }) => theme.colors.accentCyan};
    text-decoration: none;
    transition: color ${({ theme }) => theme.animations.fast} ease;
  }

  a:hover {
    color: ${({ theme }) => theme.colors.text};
  }

  /* Buttons */
  button {
    font-family: ${({ theme }) => theme.fonts.primary};
    cursor: pointer;
    border: none;
    transition: all ${({ theme }) => theme.animations.fast} ease;
  }

  /* Code blocks */
  code {
    font-family: ${({ theme }) => theme.fonts.primary};
    background: ${({ theme }) => theme.colors.accent};
    padding: 0.2rem 0.4rem;
    border-radius: 4px;
    font-size: 0.9em;
  }

  pre {
    background: ${({ theme }) => theme.colors.accent};
    padding: ${({ theme }) => theme.spacing.md};
    border-radius: 8px;
    overflow-x: auto;
    margin: ${({ theme }) => theme.spacing.md} 0;
  }

  pre code {
    background: none;
    padding: 0;
  }

  /* Responsive */
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    h1 {
      font-size: 2.5rem;
    }
    
    h2 {
      font-size: 2rem;
    }
    
    h3 {
      font-size: 1.5rem;
    }
  }
`;

