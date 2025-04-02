AI Models Dashboard
Comprehensive Deployment & Configuration Guide

Table of Contents

Introduction
Prerequisites
Local Development Setup
GitHub Repository Setup
GitHub Pages Deployment
API Integration Configuration
Customization Options
Troubleshooting
Security Best Practices
Advanced Configuration
Maintenance and Updates


Introduction
The AI Models Dashboard is a comprehensive web application that allows you to interact with multiple AI models via their APIs. This guide will walk you through the complete process of setting up, deploying, and customizing your dashboard.
Key Features:

Query multiple AI models simultaneously
Compare responses side-by-side with difference highlighting
Track usage, costs, and performance metrics
Organize queries into custom categories
Search and filter your query history

This guide is designed for users with basic familiarity with GitHub, command line, and web development concepts.

Prerequisites
Before you begin, make sure you have the following:
Required Software

Node.js (version 16.x or later) and npm (version 8.x or later)
Git for version control
A code editor (VS Code, Sublime Text, etc.)

Accounts and API Keys

GitHub account for hosting the repository and deploying
API keys for the AI models you want to integrate:

OpenAI API key
Anthropic API key
Google AI API key



Verify Software Installation
Check if Node.js and npm are installed correctly:
bashCopynode --version
npm --version
Check if Git is installed correctly:
bashCopygit --version

Local Development Setup
1. Download or Clone the Repository
Create a directory for your project and navigate into it:
bashCopymkdir ai-models-dashboard
cd ai-models-dashboard
Clone the repository:
bashCopygit clone https://github.com/yourusername/ai-models-dashboard.git .
2. Install Dependencies
Install all required packages:
bashCopynpm install
This will install React, Tailwind CSS, Chart.js, and all other dependencies defined in the package.json file.
3. Configure Environment Variables
Create a .env file in the root directory:
bashCopycp .env.example .env
Open the .env file in your editor and add your API keys:
CopyREACT_APP_OPENAI_API_KEY=your_openai_api_key_here
REACT_APP_ANTHROPIC_API_KEY=your_anthropic_api_key_here
REACT_APP_GOOGLE_API_KEY=your_google_api_key_here
4. Start the Development Server
Launch the local development server:
bashCopynpm start
This will start the application at http://localhost:3000. Open this URL in your browser to see the dashboard.
5. Verify Functionality
Test the main features:

Navigate to the Questions page and try sending a query
Check model selection and parameters
Navigate to other sections to ensure they load correctly


GitHub Repository Setup
1. Create a New GitHub Repository

Log in to your GitHub account
Click the "+" icon in the top right corner and select "New repository"
Enter a name for your repository (e.g., "ai-models-dashboard")
Add a description (optional)
Select whether the repository should be public or private
Do not initialize the repository with a README, .gitignore, or license
Click "Create repository"

2. Connect Your Local Repository to GitHub
Add your GitHub repository as the remote origin:
bashCopygit remote add origin https://github.com/yourusername/ai-models-dashboard.git
3. Add and Commit Your Files
Add all project files to Git:
bashCopygit add .
Commit the files:
bashCopygit commit -m "Initial commit: AI Models Dashboard"
4. Push to GitHub
Push your code to the main branch:
bashCopygit push -u origin main
Verify that all files have been pushed by checking your repository on GitHub.

GitHub Pages Deployment
1. Configure GitHub Pages in Repository Settings

Navigate to your repository on GitHub
Click on "Settings"
Scroll down to the "Pages" section in the left sidebar
Under "Build and deployment" section:

Source: Select "GitHub Actions"
This will use the workflow file already included in the repository



2. Verify the GitHub Actions Workflow
The repository includes a .github/workflows/deploy.yml file that configures the automatic deployment. Ensure this file exists and has the correct configuration.
3. Configure Repository Secrets for API Keys (Optional)
For added security, you can store your API keys as GitHub secrets:

In your repository, navigate to "Settings" > "Secrets and variables" > "Actions"
Click "New repository secret"
Add each API key:

Name: REACT_APP_OPENAI_API_KEY, Value: your OpenAI key
Name: REACT_APP_ANTHROPIC_API_KEY, Value: your Anthropic key
Name: REACT_APP_GOOGLE_API_KEY, Value: your Google key


Click "Add secret" after each entry

4. Trigger Deployment
The deployment will automatically trigger when you push to the main branch. To manually trigger a deployment:

Go to your repository
Click on "Actions"
Select the "Deploy to GitHub Pages" workflow
Click "Run workflow" > "Run workflow"

5. Access Your Deployed Application
After the workflow completes:

Go to the "Actions" tab to verify the deployment succeeded
Go to "Settings" > "Pages" to find your site URL
Open the URL to access your deployed dashboard (typically https://yourusername.github.io/ai-models-dashboard/)

6. Verify Deployment
Test the main features of your deployed application to ensure everything works correctly. Pay special attention to API integrations, as they might behave differently in the production environment.

API Integration Configuration
1. Understanding the API Integration Structure
The dashboard is designed with a modular API integration system:

src/services/api.js: Central API request handler
src/services/models/modelRegistry.js: Registry of all model providers
src/services/models/openai.js: OpenAI-specific implementation
src/services/models/anthropic.js: Anthropic-specific implementation
src/services/models/google.js: Google AI-specific implementation

2. API Keys Management
API keys can be managed in two ways:
Option A: Environment Variables (Development)
In .env file:
CopyREACT_APP_OPENAI_API_KEY=your_key
REACT_APP_ANTHROPIC_API_KEY=your_key
REACT_APP_GOOGLE_API_KEY=your_key
Option B: In-App Storage (Production)
The application allows users to enter their own API keys, which are stored in localStorage:
javascriptCopylocalStorage.setItem('openai_api_key', 'user_provided_key');
3. Adding a New API Provider
To add a new model provider (e.g., Cohere):

Create a new file src/services/models/cohere.js with provider-specific implementations
Update src/services/models/modelRegistry.js to include the new provider
Add the new provider's logo to the public/logos/ directory

4. Customizing API Parameters
The dashboard supports customizing parameters for each API request. To modify available parameters:

Update src/components/questions/ParameterControls.js to include new parameters
Pass these parameters to the API calls in src/services/api.js


Customization Options
1. Theme and Colors
The dashboard uses Tailwind CSS for styling. To customize the theme:

Edit tailwind.config.js in the root directory to add custom colors or modify existing ones
Apply these custom colors in your components

2. Layout Customization
Modify the layout components to change the overall structure:

src/components/common/Header.js: Top navigation bar
src/components/common/Sidebar.js: Side navigation menu
src/components/common/Footer.js: Footer component

3. Adding New Pages
To add a new page to the dashboard:

Create a new component in src/pages/
Add the page to the router in src/App.js
Add a link to the page in the sidebar (src/components/common/Sidebar.js)

4. Custom Analytics Charts
The analytics dashboard uses Chart.js for visualizations. To add a new chart:

Create a new component in src/components/analytics/
Add the chart to the Analytics page (src/pages/Analytics.js)


Troubleshooting
1. Common Build Errors
"Module not found" Error
Problem: Error message like Module not found: Can't resolve 'some-module'
Solution:
bashCopynpm install some-module
CORS Issues with API Requests
Problem: Console errors about CORS policy when making API requests
Solution: This is typically an issue with the API provider. Options include:

Check if the API provider supports CORS
Implement a proxy server as middleware
Use a CORS proxy for development (not recommended for production)

2. Deployment Issues
GitHub Actions Workflow Failing
Problem: The GitHub Actions workflow fails during build or deployment
Solutions:

Check the workflow logs for specific errors
Verify your repository settings and permissions
Ensure the deploy.yml file is correctly configured
Check if your code builds successfully locally with npm run build

Environment Variables Not Working
Problem: API keys or other environment variables aren't available in the deployed app
Solutions:

Ensure you've set up repository secrets correctly
Verify that the workflow is using these secrets
Add console logs to debug environment variable access
Consider implementing client-side storage for API keys

3. API Integration Issues
API Keys Not Being Recognized
Problem: API requests fail with authentication errors
Solutions:

Verify the API key format is correct
Check if the key has the necessary permissions
Verify the authentication header format is correct for the API
Test the API key with a simple curl request

Response Parsing Errors
Problem: Errors when parsing API responses
Solution: Add error handling to manage unexpected response formats:
javascriptCopytry {
  const response = await api.makeRequest();
  if (!response.data) {
    throw new Error('Invalid response format');
  }
  // Process data
} catch (error) {
  console.error('API error:', error);
  // Handle error gracefully
}

Security Best Practices
1. API Key Security
Client-Side Risk
Issue: Storing API keys in client-side code is insecure as they can be exposed in the browser.
Best Practice: Implement a backend service to handle API requests, keeping your API keys secure on the server.
Temporary Solution
For demonstration or personal use, the dashboard allows storing API keys in localStorage. This is not recommended for production applications with multiple users.
2. Implementing a Backend Proxy (Recommended)
For a more secure deployment, create a simple backend service:

Create a new directory for your backend
Install required dependencies (express, axios, cors, dotenv)
Create a proxy server that forwards requests to the AI APIs
Update the frontend services to use this backend

3. Content Security
Implement Content Security Policy (CSP) in your public/index.html to improve security.

Advanced Configuration
1. Custom Webpack Configuration
For advanced customization of the build process, you can eject from Create React App and modify the webpack configuration.
2. Progressive Web App (PWA) Configuration
To make your dashboard available offline, update the PWA configuration in the project.
3. Setting Up CI/CD for Custom Domains
To deploy to a custom domain:

Register your domain name
Configure GitHub Pages to use your custom domain
Add a CNAME record at your DNS provider

4. Enabling User Authentication
For a multi-user deployment, implement authentication using a service like Firebase Auth or Auth0.

Maintenance and Updates
1. Regular Updates
Keep your dependencies up to date:
bashCopynpm update
# For major version updates, use npm-check-updates
npx npm-check-updates -u
npm install
2. Monitoring and Analytics
Consider adding monitoring to track usage and errors:

Add Google Analytics for usage tracking
Implement error tracking with a service like Sentry

3. Backup Strategy
Regularly backup your repository and important data.
4. Version Tagging
Use Git tags to mark important versions:
bashCopygit tag -a v1.0.0 -m "Version 1.0.0 release"
git push origin v1.0.0

Conclusion
You now have a comprehensive guide for deploying, configuring, and maintaining your AI Models Dashboard. For any additional assistance, refer to the following resources:

GitHub Pages documentation: https://docs.github.com/en/pages
React documentation: https://reactjs.org/docs
Tailwind CSS documentation: https://tailwindcss.com/docs
API provider documentation:

OpenAI: https://platform.openai.com/docs
Anthropic: https://docs.anthropic.com
Google AI: https://ai.google.dev/docs



Happy coding!
