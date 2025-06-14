# Personal Website with AI Chat Assistant

This repository contains code for a personal website with an interactive AI chat feature, designed to work with GitHub Pages (static hosting) by leveraging serverless functions.

## How It Works

Although GitHub Pages only serves static content, this project uses:

1. **Static website** hosted on GitHub Pages
2. **Netlify Functions** to provide serverless backend capabilities
3. **MongoDB Atlas** (free tier) to store chat conversations
4. **OpenAI API** to power the AI chat responses

## Setup and Deployment Instructions

### Step 1: Configure GitHub Pages

1. Create a GitHub repository for your website (or use an existing one)
2. Enable GitHub Pages in your repository settings (Settings > Pages)
3. Choose the branch and folder for your GitHub Pages site

### Step 2: Set Up MongoDB Atlas (Free Tier)

1. Sign up for a free [MongoDB Atlas account](https://www.mongodb.com/cloud/atlas/register)
2. Create a new cluster (the free tier is sufficient)
3. Set up database access with a username and password
4. Configure network access to allow connections from anywhere (for Netlify Functions)
5. Get your MongoDB connection string (It will look like: `mongodb+srv://username:password@cluster0.mongodb.net/dbname`)

### Step 3: Get OpenAI API Key

1. Sign up for [OpenAI API access](https://openai.com/api/)
2. Create an API key in your account dashboard
3. Note: OpenAI is not free, but offers reasonable pricing with some free credits for new users

### Step 4: Set Up Netlify

1. Sign up for a free [Netlify account](https://app.netlify.com/signup)
2. Create a new site from Git and connect to your GitHub repository
3. Configure the build settings:
   - Base directory: `homepage` (adjust if your files are in a different directory)
   - Publish directory: `/` (as specified in netlify.toml)
4. Add the following environment variables in Netlify (Site settings > Environment variables):
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `MONGODB_DB_NAME`: The name of your database (e.g., `website_chat`)
   - `OPENAI_API_KEY`: Your OpenAI API key
   - `OPENAI_MODEL`: Optional, defaults to `gpt-3.5-turbo`

### Step 5: Update Configuration

1. Replace the Google Analytics ID in `index.html` with your own GA4 tracking ID
2. Update the content in `index.html` with your personal information
3. Customize the AI assistant's system prompt in `netlify/functions/chat-ai.js` to reflect accurate information about you

### Step 6: Deploy

1. Commit and push your changes to GitHub
2. Netlify will automatically deploy your site and functions

## Multiple Domain Setup

Since you'll have both GitHub Pages and Netlify domains, you have two options:

1. **Use GitHub Pages for your main site, with Netlify for functions only:**
   - Configure CORS in your Netlify function to allow requests from your GitHub Pages domain
   - Update the `NETLIFY_FUNCTION_URL` in `chat.js` to point to your Netlify function URL

2. **Use Netlify for everything (simpler):**
   - Just deploy everything to Netlify and use their domain
   - If desired, configure a custom domain in Netlify settings

## Monitoring and Limits

- **MongoDB Atlas Free Tier**: 512MB storage (sufficient for thousands of conversations)
- **Netlify Free Tier**: 125,000 function invocations per month, 100 hours of function runtime
- **OpenAI API**: Paid service, costs depend on usage (monitor your billing settings)

## Accessing Chat Data

You can access stored conversations and metadata through:

1. MongoDB Atlas dashboard
2. Create additional Netlify functions to build a simple admin panel

## Security Considerations

- Your OpenAI API key is stored as an environment variable in Netlify, not exposed to clients
- MongoDB connection is similarly secured
- If storing personal/sensitive user data, consider adding a privacy notice to your website

## Customization

Feel free to customize:
- Website design and content in HTML/CSS
- Conversation prompt for the AI assistant
- MongoDB schema for storing additional data

## Troubleshooting

- Check Netlify function logs for any errors
- Ensure all environment variables are correctly set
- Test the MongoDB connection independently if having database issues
