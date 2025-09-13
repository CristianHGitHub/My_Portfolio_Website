import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, Phone, MapPin, Send, Github, Linkedin } from "lucide-react";
import wordpressApi from "../services/wordpressApi";

const ContactSection = styled.section`
  padding: ${({ theme }) => theme.spacing.xxl}
    ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.primary};
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

const ContactContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.xxl};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing.xl};
  }
`;

const ContactInfo = styled.div``;

const ContactTitle = styled(motion.h3)`
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: 1.8rem;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.accentCyan};
`;

const ContactDescription = styled(motion.p)`
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  line-height: 1.8;
`;

const ContactMethods = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const ContactMethod = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.secondary};
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  transition: all ${({ theme }) => theme.animations.normal} ease;

  &:hover {
    transform: translateX(10px);
    border-color: ${({ theme }) => theme.colors.accentCyan};
    box-shadow: 0 10px 30px rgba(0, 212, 255, 0.1);
  }
`;

const ContactIcon = styled.div`
  width: 50px;
  height: 50px;
  background: ${({ theme }) => theme.colors.accentCyan};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.primary};
`;

const ContactDetails = styled.div``;

const ContactLabel = styled.div`
  font-family: ${({ theme }) => theme.fonts.primary};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const ContactValue = styled.div`
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const SocialLinks = styled.div`
  margin-top: ${({ theme }) => theme.spacing.xl};
`;

const SocialTitle = styled(motion.h4)`
  font-family: ${({ theme }) => theme.fonts.primary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.accentCyan};
`;

const SocialGrid = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
`;

const SocialLink = styled(motion.a)`
  width: 50px;
  height: 50px;
  background: ${({ theme }) => theme.colors.secondary};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.textSecondary};
  transition: all ${({ theme }) => theme.animations.fast} ease;

  &:hover {
    background: ${({ theme }) => theme.colors.accentCyan};
    color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-5px);
  }
`;

const ContactForm = styled(motion.form)`
  background: ${({ theme }) => theme.colors.secondary};
  padding: ${({ theme }) => theme.spacing.xl};
  border-radius: 16px;
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const FormGroup = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const Label = styled.label`
  display: block;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  font-family: ${({ theme }) => theme.fonts.primary};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

const Input = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.accent};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.secondary};
  transition: all ${({ theme }) => theme.animations.fast} ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.accentCyan};
    box-shadow: 0 0 0 3px rgba(0, 212, 255, 0.1);
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.accent};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.secondary};
  resize: vertical;
  min-height: 120px;
  transition: all ${({ theme }) => theme.animations.fast} ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.accentCyan};
    box-shadow: 0 0 0 3px rgba(0, 212, 255, 0.1);
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

const SubmitButton = styled(motion.button)`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.accentCyan},
    ${({ theme }) => theme.colors.accentPurple}
  );
  color: ${({ theme }) => theme.colors.primary};
  border: none;
  border-radius: 8px;
  font-family: ${({ theme }) => theme.fonts.primary};
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  transition: all ${({ theme }) => theme.animations.fast} ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(0, 212, 255, 0.3);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const Contact: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const contactMethods = [
    {
      icon: Mail,
      label: "Email",
      value: "cristianhernandezr234@gmail.com",
      href: "mailto:cristianhernandezr234@gmail.com",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "(813) 965-3146",
      href: "tel:+18139653146",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Tampa, Florida",
      href: "#",
    },
  ];

  const socialLinks = [
    {
      icon: Github,
      href: "https://github.com/CristianHGitHub",
      label: "GitHub",
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/cristian-hernandez-710a152b0/",
      label: "LinkedIn",
    },
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Submit the form using the simplified API
      const result = await wordpressApi.submitContactForm(formData);

      if (result.success) {
        // Reset form
        setFormData({ name: "", email: "", subject: "", message: "" });
        alert(result.message);
      } else {
        alert("Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting contact form:", error);
      alert("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ContactSection id="contact" ref={ref}>
      <Container>
        <SectionTitle
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Get In Touch
        </SectionTitle>

        <ContactContent>
          <ContactInfo>
            <ContactTitle
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Let's Connect
            </ContactTitle>

            <ContactDescription
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              I'm always interested in new opportunities and exciting projects.
              Whether you have a question, want to collaborate, or just want to
              say hi, feel free to reach out! I'm also open to hearing about job
              opportunities that align with my skills and career goals.
            </ContactDescription>

            <ContactMethods>
              {contactMethods.map((method, index) => (
                <ContactMethod
                  key={method.label}
                  as={method.href ? "a" : "div"}
                  href={method.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <ContactIcon>
                    <method.icon size={24} />
                  </ContactIcon>
                  <ContactDetails>
                    <ContactLabel>{method.label}</ContactLabel>
                    <ContactValue>{method.value}</ContactValue>
                  </ContactDetails>
                </ContactMethod>
              ))}
            </ContactMethods>

            <SocialLinks>
              <SocialTitle
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                Follow Me
              </SocialTitle>
              <SocialGrid>
                {socialLinks.map((social, index) => (
                  <SocialLink
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <social.icon size={20} />
                  </SocialLink>
                ))}
              </SocialGrid>
            </SocialLinks>
          </ContactInfo>

          <ContactForm
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <FormGroup>
              <Label htmlFor="name">Name</Label>
              <Input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Your name"
                required
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="your.email@example.com"
                required
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="subject">Subject</Label>
              <Input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                placeholder="What's this about?"
                required
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="message">Message</Label>
              <TextArea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Tell me about your project or just say hello!"
                required
              />
            </FormGroup>

            <SubmitButton
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Send size={20} />
              {isSubmitting ? "Sending..." : "Send Message"}
            </SubmitButton>
          </ContactForm>
        </ContactContent>
      </Container>
    </ContactSection>
  );
};

export default Contact;
