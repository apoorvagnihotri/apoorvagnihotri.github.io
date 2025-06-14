// Netlify serverless function for AI chat
const { MongoClient } = require('mongodb');
const axios = require('axios');

// Environment variables - you'll need to set these in Netlify
const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB_NAME = process.env.MONGODB_DB_NAME || 'website_chat';
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_MODEL = process.env.OPENAI_MODEL || 'gpt-3.5-turbo';

// MongoDB collections
const COLLECTION_CONVERSATIONS = 'conversations';
const COLLECTION_METADATA = 'metadata';

// MongoDB client
let cachedDb = null;

// Connect to MongoDB
async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }

  const client = new MongoClient(MONGODB_URI);
  await client.connect();
  const db = client.db(MONGODB_DB_NAME);
  
  cachedDb = db;
  return db;
}

// Main handler for the serverless function
exports.handler = async (event, context) => {
  // For keeping the Netlify Function warm & MongoDB connection alive
  context.callbackWaitsForEmptyEventLoop = false;

  // Handle preflight OPTIONS request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers: getCorsHeaders(),
      body: ''
    };
  }

  try {
    // Parse request path to determine action
    const path = event.path.replace('/.netlify/functions/chat-ai', '');
    
    // Handle different endpoints
    if (path === '/metadata' && event.httpMethod === 'POST') {
      return await handleMetadata(event);
    } else if (path === '/store' && event.httpMethod === 'POST') {
      return await handleStoreConversation(event);
    } else if (path === '' && event.httpMethod === 'POST') {
      return await handleChatCompletion(event);
    } else {
      return {
        statusCode: 404,
        headers: getCorsHeaders(),
        body: JSON.stringify({ error: 'Not found' })
      };
    }
  } catch (error) {
    console.error('Function error:', error);
    return {
      statusCode: 500,
      headers: getCorsHeaders(),
      body: JSON.stringify({ error: 'Server error', message: error.message })
    };
  }
};

// Handle metadata storage
async function handleMetadata(event) {
  try {
    const metadata = JSON.parse(event.body);
    
    // Add IP address from request
    metadata.ip = event.headers['x-forwarded-for'] || 'unknown';
    
    // Store metadata in MongoDB
    const db = await connectToDatabase();
    await db.collection(COLLECTION_METADATA).insertOne({
      ...metadata,
      createdAt: new Date()
    });

    return {
      statusCode: 200,
      headers: getCorsHeaders(),
      body: JSON.stringify({ success: true })
    };
  } catch (error) {
    console.error('Metadata storage error:', error);
    return {
      statusCode: 500,
      headers: getCorsHeaders(),
      body: JSON.stringify({ error: 'Failed to store metadata' })
    };
  }
}

// Handle conversation storage
async function handleStoreConversation(event) {
  try {
    const data = JSON.parse(event.body);
    
    // Add IP address from request
    data.ip = event.headers['x-forwarded-for'] || 'unknown';
    
    // Store conversation in MongoDB
    const db = await connectToDatabase();
    await db.collection(COLLECTION_CONVERSATIONS).updateOne(
      { sessionId: data.sessionId },
      { 
        $set: {
          conversation: data.conversation,
          updatedAt: new Date()
        },
        $setOnInsert: {
          createdAt: new Date()
        }
      },
      { upsert: true }
    );

    return {
      statusCode: 200,
      headers: getCorsHeaders(),
      body: JSON.stringify({ success: true })
    };
  } catch (error) {
    console.error('Conversation storage error:', error);
    return {
      statusCode: 500,
      headers: getCorsHeaders(),
      body: JSON.stringify({ error: 'Failed to store conversation' })
    };
  }
}

// Handle chat completion request
async function handleChatCompletion(event) {
  try {
    const data = JSON.parse(event.body);
    
    // Prepend system message
    const messages = [
      {
        role: "system",
        content: `You are an AI assistant for a personal website. Your job is to answer questions about the website owner.
        
Key facts about the website owner:
- They are passionate about building tools for writers
- They focus on education and interactive content
- They studied at IIT Gandhinagar and worked with Prof. Nipun on visualization projects
- They worked at Wadhwani AI, a non-profit organization
- They are interested in creating interactive articles and content
- They believe current tooling limits the creation of interactive expositions
- They want to help writers convey insights better with interactive content

Be concise, friendly, and conversational. If asked about topics not related to the website owner, politely redirect the conversation back to the website or decline to answer if inappropriate.`
      },
      ...data.messages
    ];
    
    // Get AI response from OpenAI API
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: OPENAI_MODEL,
        messages: messages,
        max_tokens: 500,
        temperature: 0.7,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`
        }
      }
    );
    
    // Extract response message
    const assistantMessage = response.data.choices[0].message.content;
    
    return {
      statusCode: 200,
      headers: getCorsHeaders(),
      body: JSON.stringify({ message: assistantMessage })
    };
  } catch (error) {
    console.error('Chat completion error:', error);
    return {
      statusCode: 500,
      headers: getCorsHeaders(),
      body: JSON.stringify({ error: 'Failed to get AI response', message: error.message })
    };
  }
}

// CORS headers helper
function getCorsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
  };
}
