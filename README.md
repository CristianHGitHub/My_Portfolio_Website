# Cristian Hernandez - Portfolio Website

A modern, responsive portfolio website built with React.js and TypeScript, designed for software engineers. Features a dark theme with smooth animations and integrates with WordPress as a headless CMS.

## 🚀 Features

- **Modern React Frontend**: Built with React 19, TypeScript, and modern tooling
- **Dark Theme**: Professional black and dark blue color scheme
- **Smooth Animations**: Framer Motion animations and typing effects
- **Responsive Design**: Mobile-first approach with modern CSS
- **WordPress Integration**: Headless WordPress backend for content management
- **Performance Optimized**: Fast loading with optimized assets
- **SEO Ready**: Meta tags, Open Graph, and Twitter Cards

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Styled Components
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Backend**: WordPress REST API
- **Deployment**: Custom deployment script for Hostinger

## 📁 Project Structure

```
portfolio-frontend/
├── public/
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Skills.tsx
│   │   ├── Projects.tsx
│   │   ├── Contact.tsx
│   │   └── Footer.tsx
│   ├── styles/
│   │   ├── GlobalStyle.ts
│   │   └── theme.ts
│   ├── services/
│   │   └── wordpressApi.ts
│   ├── App.tsx
│   └── index.tsx
├── scripts/
│   └── deploy.js
└── package.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- WordPress installation on Hostinger

### Installation

1. **Clone and install dependencies**:

   ```bash
   cd portfolio-frontend
   npm install
   ```

2. **Configure environment variables**:

   ```bash
   cp env.example .env
   ```

   Update the `.env` file with your WordPress URL and other configurations:

   ```env
   REACT_APP_WORDPRESS_URL=https://devcristianh.com/wp-json/wp/v2
   REACT_APP_GITHUB_URL=https://github.com/yourusername
   REACT_APP_LINKEDIN_URL=https://linkedin.com/in/yourusername
   ```

3. **Start development server**:

   ```bash
   npm start
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

## 🚀 Deployment to Hostinger

### Method 1: Automated Deployment (Recommended)

1. **Run the deployment script**:

   ```bash
   npm run deploy
   ```

   This will:

   - Build the React app for production
   - Create a backup of your current WordPress files
   - Deploy the React build to your WordPress directory
   - Create integration files for WordPress compatibility

### Method 2: Manual Deployment

1. **Build the React app**:

   ```bash
   npm run build:production
   ```

2. **Upload build files**:

   - Copy all files from the `build/` directory
   - Upload them to your WordPress `public_html/` directory
   - Replace the existing `index.php` with the custom one

3. **Configure .htaccess**:
   - Update your `.htaccess` file to handle React routing
   - Ensure WordPress admin and API requests are preserved

## 🔧 WordPress Configuration

### Enable REST API

1. **Access WordPress Admin**:

   - Go to `https://devcristianh.com/wp-admin/`

2. **Install Required Plugins** (Optional):

   - **Custom Post Type UI**: For custom content types
   - **Advanced Custom Fields**: For custom fields
   - **WP REST API Controller**: For API management

3. **Configure Permalinks**:
   - Go to Settings → Permalinks
   - Select "Post name" structure
   - Save changes

### Content Management

The React frontend will automatically fetch content from WordPress using the REST API:

- **Posts**: Available at `/wp-json/wp/v2/posts`
- **Pages**: Available at `/wp-json/wp/v2/pages`
- **Media**: Available at `/wp-json/wp/v2/media`
- **Categories**: Available at `/wp-json/wp/v2/categories`

## 🎨 Customization

### Colors and Theme

Edit `src/styles/theme.ts` to customize colors:

```typescript
export const theme = {
  colors: {
    primary: "#0a0a0a", // Deep black
    secondary: "#1a1a2e", // Dark blue
    accent: "#16213e", // Darker blue
    accentCyan: "#00d4ff", // Cyan for highlights
    // ... more colors
  },
};
```

### Content Updates

1. **Projects**: Update the projects array in `src/components/Projects.tsx`
2. **Skills**: Modify skills data in `src/components/Skills.tsx`
3. **About**: Edit content in `src/components/About.tsx`
4. **Contact**: Update contact information in `src/components/Contact.tsx`

### WordPress Content

- **Blog Posts**: Manage through WordPress admin
- **Pages**: Create custom pages in WordPress
- **Media**: Upload images through WordPress media library

## 📱 Responsive Design

The website is fully responsive with breakpoints:

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## ⚡ Performance Optimization

- **Code Splitting**: Automatic with React
- **Image Optimization**: Optimized images and lazy loading
- **Caching**: Browser caching headers in .htaccess
- **Compression**: Gzip compression enabled
- **Bundle Analysis**: Run `npm run analyze` to analyze bundle size

## 🔍 SEO Features

- **Meta Tags**: Comprehensive meta tags for search engines
- **Open Graph**: Social media sharing optimization
- **Twitter Cards**: Twitter sharing optimization
- **Structured Data**: Ready for schema markup
- **Sitemap**: WordPress sitemap integration

## 🛠️ Development

### Available Scripts

- `npm start`: Start development server
- `npm run build`: Build for production
- `npm run build:production`: Build without source maps
- `npm run deploy`: Build and deploy to WordPress
- `npm run analyze`: Analyze bundle size
- `npm test`: Run tests

### Code Style

- **TypeScript**: Strict type checking enabled
- **ESLint**: Configured for React and TypeScript
- **Prettier**: Code formatting (recommended)

## 🐛 Troubleshooting

### Common Issues

1. **Build fails**: Check Node.js version and dependencies
2. **Deployment fails**: Verify WordPress directory path
3. **API errors**: Check WordPress REST API is enabled
4. **Routing issues**: Verify .htaccess configuration

### Debug Mode

Enable debug mode in WordPress:

```php
// In wp-config.php
define('WP_DEBUG', true);
define('WP_DEBUG_LOG', true);
```

## 📞 Support

For issues or questions:

- **Email**: contact@devcristianh.com
- **GitHub**: Create an issue in the repository
- **LinkedIn**: Connect on LinkedIn

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **React**: For the amazing frontend framework
- **Framer Motion**: For smooth animations
- **WordPress**: For the robust CMS backend
- **Hostinger**: For reliable hosting

---

**Built with ❤️ by Cristian Hernandez**
