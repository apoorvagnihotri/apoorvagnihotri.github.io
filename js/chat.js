// Chat functionality for the personal website
document.addEventListener('DOMContentLoaded', () => {
    // DOM elements
    const chatMessages = document.getElementById('chat-messages');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');

    // Chat state
    let conversation = [];
    let sessionId = null;

    // Constants
    const OPENAI_API_BASE_URL = "https://api.openai.com/v1/chat/completions";
    const NETLIFY_FUNCTION_URL = "/.netlify/functions/chat-ai"; // We'll create this Netlify function
    const MAX_RETRIES = 3;
    
    // Initialize chat
    initChat();

    // Event Listeners
    sendButton.addEventListener('click', handleSendMessage);
    userInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    });

    // Initialize chat and user identification
    async function initChat() {
        // Generate or retrieve session ID
        sessionId = localStorage.getItem('chat_session_id');
        if (!sessionId) {
            sessionId = generateUUID();
            localStorage.setItem('chat_session_id', sessionId);
        }

        // Try to get Google Analytics Client ID if available
        let gaClientId = getGoogleAnalyticsClientId();
        
        // Store initial metadata about the session
        try {
            const metadata = {
                sessionId: sessionId,
                timestamp: new Date().toISOString(),
                gaClientId: gaClientId,
                userAgent: navigator.userAgent,
                referrer: document.referrer,
                screenSize: `${window.screen.width}x${window.screen.height}`
            };
            
            // Add welcome message to the chat (this doesn't need to be sent to API)
            conversation.push({
                role: "assistant",
                content: "Hello! I'm an AI assistant that can tell you more about this website's owner. What would you like to know?"
            });
            
            // Store session metadata
            await storeConversationMetadata(metadata);
        } catch (error) {
            console.error("Failed to initialize chat:", error);
        }
    }

    // Handle sending a message
    async function handleSendMessage() {
        const message = userInput.value.trim();
        if (!message) return;
        
        // Clear input
        userInput.value = '';
        
        // Add user message to UI
        appendMessage('user', message);
        
        // Add user message to conversation history
        conversation.push({
            role: "user",
            content: message
        });
        
        try {
            // Show typing indicator
            const typingIndicator = showTypingIndicator();
            
            // Get AI response
            const response = await getAIResponse(message);
            
            // Remove typing indicator
            typingIndicator.remove();
            
            // Add AI response to conversation history
            conversation.push({
                role: "assistant",
                content: response
            });
            
            // Add AI response to UI
            appendMessage('assistant', response);
            
            // Store updated conversation
            await storeConversation();
            
        } catch (error) {
            console.error("Error getting AI response:", error);
            appendMessage('assistant', "Sorry, I encountered an error. Please try again later.");
        }
    }

    // Append a message to the chat UI
    function appendMessage(sender, content) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', sender);
        
        const contentDiv = document.createElement('div');
        contentDiv.classList.add('message-content');
        contentDiv.textContent = content;
        
        messageDiv.appendChild(contentDiv);
        chatMessages.appendChild(messageDiv);
        
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Show typing indicator
    function showTypingIndicator() {
        const indicatorDiv = document.createElement('div');
        indicatorDiv.classList.add('message', 'assistant', 'typing-indicator');
        
        const contentDiv = document.createElement('div');
        contentDiv.classList.add('message-content');
        contentDiv.innerHTML = '<span>.</span><span>.</span><span>.</span>';
        
        indicatorDiv.appendChild(contentDiv);
        chatMessages.appendChild(indicatorDiv);
        
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        return indicatorDiv;
    }

    // Get AI response from our serverless function
    async function getAIResponse(message) {
        let retries = 0;
        
        while (retries < MAX_RETRIES) {
            try {
                const response = await fetch(NETLIFY_FUNCTION_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        sessionId: sessionId,
                        messages: conversation
                    })
                });
                
                if (!response.ok) {
                    const error = await response.text();
                    throw new Error(`API request failed: ${error}`);
                }
                
                const data = await response.json();
                return data.message;
                
            } catch (error) {
                console.error(`Attempt ${retries + 1} failed:`, error);
                retries++;
                
                if (retries >= MAX_RETRIES) {
                    throw error;
                }
                
                // Wait before retrying (exponential backoff)
                await new Promise(resolve => setTimeout(resolve, 1000 * (2 ** retries)));
            }
        }
    }
    
    // Store conversation metadata to our serverless function
    async function storeConversationMetadata(metadata) {
        try {
            await fetch(NETLIFY_FUNCTION_URL + '/metadata', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(metadata)
            });
        } catch (error) {
            console.error("Failed to store metadata:", error);
        }
    }
    
    // Store conversation to our serverless function
    async function storeConversation() {
        try {
            await fetch(NETLIFY_FUNCTION_URL + '/store', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    sessionId: sessionId,
                    timestamp: new Date().toISOString(),
                    conversation: conversation
                })
            });
        } catch (error) {
            console.error("Failed to store conversation:", error);
        }
    }

    // Helper function to get Google Analytics Client ID
    function getGoogleAnalyticsClientId() {
        try {
            // Try to get GA4 client ID
            if (window.gtag) {
                let clientId = '';
                gtag('get', 'G-XXXXXXXXXX', 'client_id', (id) => {
                    clientId = id;
                });
                return clientId;
            }
            return null;
        } catch (error) {
            console.error("Failed to get GA client ID:", error);
            return null;
        }
    }

    // Generate a UUID for session ID
    function generateUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
});
