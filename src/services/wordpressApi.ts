import axios from "axios";

// WordPress REST API configuration
const WORDPRESS_API_URL =
  process.env.REACT_APP_WORDPRESS_URL ||
  "https://devcristianh.com/wp-json/wp/v2";

// Create axios instance with default config
const api = axios.create({
  baseURL: WORDPRESS_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Simplified types - only what's actually used

// Simplified API service class - only includes methods actually used
class WordPressApiService {
  // Simple contact form submission - just logs the data
  // In a real Fluent Forms setup, this would be handled by the form plugin
  async submitContactForm(formData: {
    name: string;
    email: string;
    subject: string;
    message: string;
  }): Promise<{ success: boolean; message: string }> {
    // Simple implementation - just return success
    // In production, this would integrate with Fluent Forms or similar
    console.log("Contact form submission:", formData);

    return {
      success: true,
      message: "Thank you for your message! I'll get back to you soon.",
    };
  }
}

// Create and export singleton instance
const wordpressApi = new WordPressApiService();
export default wordpressApi;
