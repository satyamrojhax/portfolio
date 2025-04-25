// Gemini API Configuration
const GEMINI_API_KEY = 'AIzaSyCquiW-A6KKnhohqY6g2AOLmF4ZO60zo98';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

// Chatbot State
let chatHistory = [];
let isWaitingForResponse = false;

// DOM Elements
const chatbotMessages = document.querySelector('.chatbot-messages');
const chatbotInput = document.querySelector('.chatbot-input input');
const chatbotSend = document.querySelector('.chatbot-send');

// Static responses for fallback when API is unavailable
const fallbackResponses = [
    "I'm AxiomAI, Satyam's assistant. Satyam is an AI developer and startup founder.",
    "Satyam has created several projects including Science Exhibition Management Software, AI Calculator, Brick Breaker Game, and the Regain addiction control app.",
    "Satyam founded two companies: SatyamSync Media Ltd and Axioms Product.",
    "You can reach Satyam at satyamrojhax@gmail.com or +91 8092-710-478.",
    "Satyam's skills include HTML, CSS, JavaScript, Flutter, React/Node.js, and database technologies.",
    "Check out Satyam's Regain app at https://www.regainapp.ai/download - it helps users overcome addictions with AI assistance.",
    "Satyam created a fun Brick Breaker game that you can play at https://brickbreaker-game.netlify.app/.",
    "Satyam is currently a student who is passionate about AI technology and software development.",
    "Satyam has a portfolio website at https://satyamrojha.netlify.app.",
    "Feel free to contact Satyam through the contact form below or via his social media profiles."
];

// Initialize Chatbot
document.addEventListener('DOMContentLoaded', () => {
    // Set up event listeners
    chatbotSend.addEventListener('click', sendMessage);
    chatbotInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // Welcome message is already in HTML
    
    // Load chat history from localStorage if available
    const savedHistory = localStorage.getItem('chatHistory');
    if (savedHistory) {
        try {
            chatHistory = JSON.parse(savedHistory);
            // Display last 5 messages from history
            const recentMessages = chatHistory.slice(-5);
            recentMessages.forEach(msg => {
                appendMessage(msg.role, msg.content);
            });
        } catch (e) {
            // If there's an error parsing the saved history, clear it
            localStorage.removeItem('chatHistory');
            console.error('Error loading chat history:', e);
        }
    }
});

// Send user message and get AI response
function sendMessage() {
    if (isWaitingForResponse || !chatbotInput.value.trim()) return;
    
    const userMessage = chatbotInput.value.trim();
    chatbotInput.value = '';
    
    // Add user message to chat
    appendMessage('user', userMessage);
    
    // Add to chat history
    chatHistory.push({
        role: 'user',
        content: userMessage
    });
    
    // Show typing indicator
    showTypingIndicator();
    
    // Set waiting state
    isWaitingForResponse = true;
    
    // Use a try-catch block to handle potential API errors
    try {
        // Send to Gemini API and get response with a timeout
        const timeoutPromise = new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Request timed out')), 10000)
        );
        
        Promise.race([getGeminiResponse(userMessage), timeoutPromise])
            .then(response => {
                // Remove typing indicator
                removeTypingIndicator();
                
                // Add AI response to chat
                appendMessage('bot', response);
                
                // Add to chat history
                chatHistory.push({
                    role: 'bot',
                    content: response
                });
                
                // Save chat history
                saveHistory();
                
                // Reset waiting state
                isWaitingForResponse = false;
            })
            .catch(error => {
                console.error('Error getting response:', error);
                
                // Remove typing indicator
                removeTypingIndicator();
                
                // Use a fallback response
                const fallbackResponse = getFallbackResponse();
                appendMessage('bot', fallbackResponse);
                
                // Add to chat history
                chatHistory.push({
                    role: 'bot',
                    content: fallbackResponse
                });
                
                // Save chat history
                saveHistory();
                
                // Reset waiting state
                isWaitingForResponse = false;
            });
    } catch (error) {
        console.error('Error in sendMessage:', error);
        
        // Remove typing indicator
        removeTypingIndicator();
        
        // Use a fallback response
        const fallbackResponse = getFallbackResponse();
        appendMessage('bot', fallbackResponse);
        
        // Reset waiting state
        isWaitingForResponse = false;
    }
}

// Get a fallback response when API fails
function getFallbackResponse() {
    return "I'm having trouble connecting to my knowledge base right now. " + 
           fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
}

// Get response from Gemini API
async function getGeminiResponse(message) {
    // Create prompt with Satyam's information
    const systemContext = `You are AxiomAI, a helpful assistant chatbot for Satyam Rojha's portfolio website. You should provide accurate information about Satyam and his work.

Information about Satyam:
- Education: Class 1-8 at Children's Academy Care Zone, Bhabua; Class 9-10 at Children's Garden School, Bhabua
- Academic scores: Class 9: 94.3%, Class 10: Currently completing
- Projects: 
  * Science Exhibition Management Software (SEMS) - https://sciencesoftware.netlify.app
  * AI Calculator - https://ai-kalculator.netlify.app
  * Health Matrices Calculator - https://health-matrices-calculator.netlify.app
  * AI PDF Converter - https://ai-pdfconverter.netlify.app
  * AI Background Remover - https://aibackground-remover.netlify.app
  * Regain (Addiction Control App) - https://www.regainapp.ai/download
  * Brick Breaker Game - https://brickbreaker-game.netlify.app/
- Companies: 
  * SatyamSync Media Ltd - https://66efe655afde1.site123.me
  * Axioms Product - https://axiomsproduct.odoo.com
- Programming skills: HTML (90%), CSS (60%), JavaScript (80%), Flutter (70%), Java/Kotlin (50%), React/Node.js (70%), MySQL/NoSQL (80%)
- Social: Instagram, GitHub, Twitter/X, LinkedIn (username: satyamrojhax)
- Contact: Phone/WhatsApp: +91 8092-710-478, Email: satyamrojhax@gmail.com / satyamrojha@outlook.com
- Personal websites: https://satyamrojha.netlify.app, https://satyamrojhax.cooo.in

Your responses should be:
1. Helpful, friendly, and concise (under 150 words when possible)
2. Focused on Satyam's skills, projects, and professional information
3. Include relevant links when discussing specific projects
4. Suggest projects based on user interests
5. Formatted with occasional emoji use for friendly tone

If you don't know the answer to a question, acknowledge that it's beyond the information you have about Satyam.`;

    // Prepare recent chat context (last 5 messages)
    const recentChat = chatHistory.slice(-5).map(msg => {
        return `${msg.role === 'user' ? 'User' : 'AxiomAI'}: ${msg.content}`;
    }).join('\n');

    // Combine context and current message
    const fullPrompt = `${systemContext}\n\nRecent conversation:\n${recentChat}\n\nUser: ${message}\n\nAxiomAI:`;

    try {
        const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: fullPrompt
                    }]
                }],
                generationConfig: {
                    temperature: 0.7,
                    maxOutputTokens: 1024,
                }
            })
        });

        if (!response.ok) {
            throw new Error(`API responded with status: ${response.status}`);
        }

        const data = await response.json();
        
        if (data.error) {
            console.error('API error:', data.error);
            throw new Error(data.error.message || 'Unknown API error');
        }

        if (data.candidates && data.candidates[0] && data.candidates[0].content &&
            data.candidates[0].content.parts && data.candidates[0].content.parts[0]) {
            return data.candidates[0].content.parts[0].text;
        } else {
            throw new Error('Invalid response structure from API');
        }
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
}

// Append message to chat
function appendMessage(role, content) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('chatbot-message', role);
    
    const messageContent = document.createElement('div');
    messageContent.classList.add('message-content');
    
    // Process URLs in the content for clickable links
    const processedContent = processLinks(content);
    messageContent.innerHTML = `<p>${processedContent}</p>`;
    
    messageDiv.appendChild(messageContent);
    chatbotMessages.appendChild(messageDiv);
    
    // Auto scroll to bottom
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

// Process links in text to make them clickable
function processLinks(text) {
    // Regular expression to find URLs
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.replace(urlRegex, url => {
        return `<a href="${url}" target="_blank">${url}</a>`;
    });
}

// Show typing indicator
function showTypingIndicator() {
    const indicatorDiv = document.createElement('div');
    indicatorDiv.classList.add('chatbot-message', 'bot', 'typing-indicator');
    
    const indicatorContent = document.createElement('div');
    indicatorContent.classList.add('message-content');
    indicatorContent.innerHTML = `
        <div class="typing-dots">
            <span></span>
            <span></span>
            <span></span>
        </div>
    `;
    
    indicatorDiv.appendChild(indicatorContent);
    chatbotMessages.appendChild(indicatorDiv);
    
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

// Remove typing indicator
function removeTypingIndicator() {
    const indicator = document.querySelector('.typing-indicator');
    if (indicator) {
        indicator.remove();
    }
}

// Save chat history to localStorage
function saveHistory() {
    try {
        localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
    } catch (e) {
        console.error('Error saving chat history:', e);
        // If localStorage is full, clear it and try again
        localStorage.clear();
        try {
            localStorage.setItem('chatHistory', JSON.stringify(chatHistory.slice(-10)));
        } catch (e) {
            console.error('Still cannot save chat history:', e);
        }
    }
}

// Add typing animation for the dots
document.head.insertAdjacentHTML('beforeend', `
<style>
.typing-dots {
    display: flex;
    gap: 4px;
}

.typing-dots span {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: var(--text-muted);
    animation: typing 1s infinite;
}

.typing-dots span:nth-child(2) {
    animation-delay: 0.2s;
}

.typing-dots span:nth-child(3) {
    animation-delay: 0.4s;
}

@keyframes typing {
    0%, 100% {
        transform: translateY(0);
        opacity: 0.5;
    }
    50% {
        transform: translateY(-5px);
        opacity: 1;
    }
}
</style>
`); 