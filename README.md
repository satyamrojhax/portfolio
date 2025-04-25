# Satyam Rojha Portfolio

A cutting-edge, futuristic personal portfolio website for Satyam Rojha, showcasing his skills, projects, and companies with advanced UI/UX animations and AI chatbot integration.

## Features

### Immersive User Experience
- Futuristic cyber-glassmorphic UI design
- Interactive 3D visualizations using Three.js
- Smooth animations with GSAP
- Dynamic typing effects
- Responsive design for all devices
- Dark/light theme toggle

### Content Sections
- Splash screen with loading animation
- Hero section with 3D canvas
- About section with timeline
- Skills visualization with animated progress bars
- Projects gallery with category filtering
- Companies showcase
- Contact form
- Social media links

### AI Assistant Integration
- Google Gemini Pro AI chatbot
- Real-time interaction via API
- Context-aware responses about Satyam's background
- Persistent chat history
- Automated welcome message

## Technical Stack

- **HTML5** - Semantic markup
- **CSS3** - Advanced styling with glassmorphism, animations, and responsive design
- **JavaScript** - Interactivity and animations
- **Three.js** - 3D visualizations and effects
- **GSAP** - Scroll animations and transitions
- **Typed.js** - Typewriter animations
- **Google Gemini API** - AI chatbot functionality

## Setup & Installation

1. Clone the repository:
```bash
git clone https://github.com/satyamrojhax/satyam-portfolio.git
```

2. Navigate to the project directory:
```bash
cd satyam-portfolio
```

3. Open the `index.html` file in your browser or use a local development server.

### AI Chatbot Setup

The chatbot uses Google Gemini API. For security, replace the API key in `js/chatbot.js` with your own key from the Google AI Studio.

```javascript
const GEMINI_API_KEY = 'YOUR_API_KEY_HERE';
```

## Images Required

Before deploying, add the following images to complete the portfolio:

- Project screenshots in `assets/img/`:
  - project-sems.jpg
  - project-ai-calculator.jpg
  - project-health-matrices.jpg
  - project-ai-pdf.jpg
  - project-bg-remover.jpg
  - project-regain.jpg
  - project-brick-breaker.jpg

- Company logos in `assets/img/`:
  - satyamsyc.png
  - axioms.png

- Favicon:
  - favicon.png in `assets/icons/`

## Customization

To customize this portfolio for your own use:

1. Update personal information in `index.html`
2. Modify project details and images
3. Update company information
4. Change AI chatbot context in `js/chatbot.js`
5. Adjust color scheme in CSS variables (in `css/styles.css`)

## Author

**Satyam Rojha** - AI Developer, Software Engineer, Entrepreneur, and Startup Founder

## License

This project is licensed under the MIT License - see the LICENSE file for details. 