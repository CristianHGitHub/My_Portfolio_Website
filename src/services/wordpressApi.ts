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

// Types for WordPress data
export interface WordPressPost {
  id: number;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  slug: string;
  date: string;
  modified: string;
  featured_media: number;
  categories: number[];
  tags: number[];
  _embedded?: {
    "wp:featuredmedia"?: Array<{
      id: number;
      source_url: string;
      alt_text: string;
    }>;
    "wp:term"?: Array<
      Array<{
        id: number;
        name: string;
        slug: string;
      }>
    >;
  };
}

export interface WordPressPage {
  id: number;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  slug: string;
  date: string;
  modified: string;
}

export interface WordPressMedia {
  id: number;
  source_url: string;
  alt_text: string;
  media_details: {
    width: number;
    height: number;
    sizes: {
      [key: string]: {
        source_url: string;
        width: number;
        height: number;
      };
    };
  };
}

export interface WordPressCategory {
  id: number;
  name: string;
  slug: string;
  description: string;
  count: number;
}

export interface WordPressTag {
  id: number;
  name: string;
  slug: string;
  description: string;
  count: number;
}

// API service class
class WordPressApiService {
  // Get all posts with embedded media and terms
  async getPosts(
    params: {
      per_page?: number;
      page?: number;
      categories?: number[];
      tags?: number[];
      search?: string;
    } = {}
  ): Promise<WordPressPost[]> {
    try {
      const response = await api.get("/posts", {
        params: {
          per_page: 10,
          _embed: true,
          ...params,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw error;
    }
  }

  // Get a single post by ID
  async getPost(id: number): Promise<WordPressPost> {
    try {
      const response = await api.get(`/posts/${id}`, {
        params: {
          _embed: true,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching post:", error);
      throw error;
    }
  }

  // Get a post by slug
  async getPostBySlug(slug: string): Promise<WordPressPost> {
    try {
      const response = await api.get("/posts", {
        params: {
          slug,
          _embed: true,
        },
      });
      return response.data[0];
    } catch (error) {
      console.error("Error fetching post by slug:", error);
      throw error;
    }
  }

  // Get all pages
  async getPages(): Promise<WordPressPage[]> {
    try {
      const response = await api.get("/pages");
      return response.data;
    } catch (error) {
      console.error("Error fetching pages:", error);
      throw error;
    }
  }

  // Get a single page by ID
  async getPage(id: number): Promise<WordPressPage> {
    try {
      const response = await api.get(`/pages/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching page:", error);
      throw error;
    }
  }

  // Get a page by slug
  async getPageBySlug(slug: string): Promise<WordPressPage> {
    try {
      const response = await api.get("/pages", {
        params: {
          slug,
        },
      });
      return response.data[0];
    } catch (error) {
      console.error("Error fetching page by slug:", error);
      throw error;
    }
  }

  // Get media by ID
  async getMedia(id: number): Promise<WordPressMedia> {
    try {
      const response = await api.get(`/media/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching media:", error);
      throw error;
    }
  }

  // Get all categories
  async getCategories(): Promise<WordPressCategory[]> {
    try {
      const response = await api.get("/categories");
      return response.data;
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error;
    }
  }

  // Get all tags
  async getTags(): Promise<WordPressTag[]> {
    try {
      const response = await api.get("/tags");
      return response.data;
    } catch (error) {
      console.error("Error fetching tags:", error);
      throw error;
    }
  }

  // Search posts and pages
  async search(
    query: string,
    type: "posts" | "pages" | "both" = "both"
  ): Promise<{
    posts?: WordPressPost[];
    pages?: WordPressPage[];
  }> {
    try {
      const results: { posts?: WordPressPost[]; pages?: WordPressPage[] } = {};

      if (type === "posts" || type === "both") {
        const postsResponse = await api.get("/posts", {
          params: {
            search: query,
            _embed: true,
          },
        });
        results.posts = postsResponse.data;
      }

      if (type === "pages" || type === "both") {
        const pagesResponse = await api.get("/pages", {
          params: {
            search: query,
          },
        });
        results.pages = pagesResponse.data;
      }

      return results;
    } catch (error) {
      console.error("Error searching:", error);
      throw error;
    }
  }

  // Get custom post types (if you have any)
  async getCustomPostType(postType: string, params: any = {}): Promise<any[]> {
    try {
      const response = await api.get(`/${postType}`, {
        params: {
          _embed: true,
          ...params,
        },
      });
      return response.data;
    } catch (error) {
      console.error(`Error fetching ${postType}:`, error);
      throw error;
    }
  }

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

// Export individual methods for convenience
export const {
  getPosts,
  getPost,
  getPostBySlug,
  getPages,
  getPage,
  getPageBySlug,
  getMedia,
  getCategories,
  getTags,
  search,
  getCustomPostType,
  submitContactForm,
} = wordpressApi;
