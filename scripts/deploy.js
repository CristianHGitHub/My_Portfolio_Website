const fs = require("fs");
const path = require("path");

// Configuration
const config = {
  // Path to your WordPress installation's public_html directory
  wordpressPath: "../public_html",
  // Files/folders to copy from build to WordPress
  buildPath: "./build",
  // Files to exclude from deployment
  excludeFiles: [".htaccess", "wp-config.php"],
  // Backup directory
  backupPath: "../backup",
};

console.log("🚀 Starting deployment to WordPress...");

// Create backup directory if it doesn't exist
if (!fs.existsSync(config.backupPath)) {
  fs.mkdirSync(config.backupPath, { recursive: true });
}

// Function to copy files recursively
function copyRecursive(src, dest) {
  const stats = fs.statSync(src);

  if (stats.isDirectory()) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }

    const files = fs.readdirSync(src);
    files.forEach((file) => {
      const srcPath = path.join(src, file);
      const destPath = path.join(dest, file);

      // Skip excluded files
      if (config.excludeFiles.includes(file)) {
        console.log(`⏭️  Skipping excluded file: ${file}`);
        return;
      }

      copyRecursive(srcPath, destPath);
    });
  } else {
    fs.copyFileSync(src, dest);
    console.log(`📄 Copied: ${path.relative(config.buildPath, src)}`);
  }
}

// Function to create backup
function createBackup() {
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const backupDir = path.join(config.backupPath, `backup-${timestamp}`);

  console.log(`💾 Creating backup to: ${backupDir}`);

  // Backup current WordPress files (excluding wp-content/uploads and wp-config.php)
  const wpFiles = fs.readdirSync(config.wordpressPath);
  wpFiles.forEach((file) => {
    if (
      file !== "wp-content" &&
      file !== "wp-config.php" &&
      file !== ".htaccess"
    ) {
      const srcPath = path.join(config.wordpressPath, file);
      const destPath = path.join(backupDir, file);

      if (fs.statSync(srcPath).isDirectory()) {
        copyRecursive(srcPath, destPath);
      } else {
        fs.copyFileSync(srcPath, destPath);
      }
    }
  });

  console.log("✅ Backup created successfully");
}

// Function to deploy React build
function deployReactBuild() {
  console.log("📦 Deploying React build...");

  // Copy build files to WordPress directory
  copyRecursive(config.buildPath, config.wordpressPath);

  console.log("✅ React build deployed successfully");
}

// Function to create WordPress integration files
function createWordPressIntegration() {
  console.log("🔧 Creating WordPress integration files...");

  // Create a custom index.php that loads React
  const indexPhp = `<?php
/**
 * Custom index.php for React Portfolio
 * This file serves the React app while maintaining WordPress functionality
 */

// Load WordPress
require_once('./wp-blog-header.php');

// Check if this is an API request
if (strpos($_SERVER['REQUEST_URI'], '/wp-json/') !== false || 
    strpos($_SERVER['REQUEST_URI'], '/wp-admin/') !== false ||
    strpos($_SERVER['REQUEST_URI'], '/wp-login.php') !== false) {
    // Let WordPress handle API and admin requests
    return;
}

// For all other requests, serve the React app
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <link rel="icon" href="/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#0a0a0a" />
    <meta name="description" content="Cristian Hernandez - Full-stack developer specializing in React, Node.js, and modern web technologies." />
    <meta name="keywords" content="software engineer, full-stack developer, React, Node.js, JavaScript, TypeScript, web development, portfolio" />
    <meta name="author" content="Cristian Hernandez" />
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://devcristianh.com/" />
    <meta property="og:title" content="Cristian Hernandez - Software Engineer" />
    <meta property="og:description" content="Full-stack developer specializing in React, Node.js, and modern web technologies." />
    
    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content="https://devcristianh.com/" />
    <meta property="twitter:title" content="Cristian Hernandez - Software Engineer" />
    <meta property="twitter:description" content="Full-stack developer specializing in React, Node.js, and modern web technologies." />
    
    <link rel="apple-touch-icon" href="/logo192.png" />
    <link rel="manifest" href="/manifest.json" />
    
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    
    <title>Cristian Hernandez - Software Engineer</title>
    
    <!-- Load React app assets -->
    <link href="/static/css/main.css" rel="stylesheet">
</head>
<body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
    
    <!-- Load React app JavaScript -->
    <script src="/static/js/main.js"></script>
</body>
</html>`;

  fs.writeFileSync(path.join(config.wordpressPath, "index.php"), indexPhp);
  console.log("📄 Created custom index.php");

  // Create .htaccess for React routing
  const htaccess = `# WordPress .htaccess with React Router support
RewriteEngine On

# Handle WordPress admin and API requests
RewriteCond %{REQUEST_URI} ^/wp-(admin|json|login|content) [NC]
RewriteRule ^(.*)$ - [L]

# Handle WordPress core files
RewriteCond %{REQUEST_URI} ^/wp-(includes|config) [NC]
RewriteRule ^(.*)$ - [L]

# Handle WordPress plugins and themes
RewriteCond %{REQUEST_URI} ^/wp-content [NC]
RewriteRule ^(.*)$ - [L]

# Handle WordPress XML files
RewriteCond %{REQUEST_URI} \.(xml|txt)$ [NC]
RewriteRule ^(.*)$ - [L]

# Handle static assets (CSS, JS, images)
RewriteCond %{REQUEST_URI} \.(css|js|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ [NC]
RewriteRule ^(.*)$ - [L]

# Handle React Router - redirect all other requests to index.php
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ /index.php [L,QSA]

# WordPress security and performance optimizations
<Files "wp-config.php">
    Order allow,deny
    Deny from all
</Files>

# Enable compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>

# Browser caching
<IfModule mod_expires.c>
    ExpiresActive on
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/gif "access plus 1 year"
    ExpiresByType image/svg+xml "access plus 1 year"
</IfModule>`;

  fs.writeFileSync(path.join(config.wordpressPath, ".htaccess"), htaccess);
  console.log("📄 Created .htaccess for React routing");

  console.log("✅ WordPress integration files created");
}

// Main deployment function
function main() {
  try {
    // Check if build directory exists
    if (!fs.existsSync(config.buildPath)) {
      console.error(
        '❌ Build directory not found. Please run "npm run build" first.'
      );
      process.exit(1);
    }

    // Check if WordPress directory exists
    if (!fs.existsSync(config.wordpressPath)) {
      console.error(
        "❌ WordPress directory not found. Please check the path in deploy.js"
      );
      process.exit(1);
    }

    // Create backup
    createBackup();

    // Deploy React build
    deployReactBuild();

    // Create WordPress integration files
    createWordPressIntegration();

    console.log("🎉 Deployment completed successfully!");
    console.log("📝 Next steps:");
    console.log("   1. Update your WordPress site URL if needed");
    console.log("   2. Test the React app at your domain");
    console.log("   3. Configure WordPress REST API if needed");
    console.log("   4. Set up contact form handling");
  } catch (error) {
    console.error("❌ Deployment failed:", error.message);
    process.exit(1);
  }
}

// Run deployment
main();

