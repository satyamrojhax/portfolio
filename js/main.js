// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Splash Screen
    setTimeout(() => {
        const splashScreen = document.querySelector('.splash-screen');
        splashScreen.style.opacity = '0';
        setTimeout(() => {
            splashScreen.style.display = 'none';
            // Initialize animations after splash screen is gone
            initAnimations();
        }, 500);
    }, 3000); // 3 seconds delay

    // Navigation Menu Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Theme Toggle
    const themeToggle = document.querySelector('.theme-toggle');
    const sunIcon = document.querySelector('.fa-sun');
    const moonIcon = document.querySelector('.fa-moon');
    const body = document.body;

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('light-mode');
        sunIcon.classList.toggle('active');
        moonIcon.classList.toggle('active');
        
        // Save preference to localStorage
        if (body.classList.contains('light-mode')) {
            localStorage.setItem('theme', 'light');
        } else {
            localStorage.setItem('theme', 'dark');
        }
    });

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        body.classList.add('light-mode');
        sunIcon.classList.add('active');
        moonIcon.classList.remove('active');
    }

    // Typed.js for typing animation
    if (document.querySelector('.typing-text')) {
        new Typed('.typing-text', {
            strings: ['AI', 'Machine Learning', 'Web Development', 'Mobile Apps', 'Innovation'],
            typeSpeed: 70,
            backSpeed: 40,
            backDelay: 1500,
            loop: true
        });
    }

    // Rotating text in about section
    if (document.querySelector('.rotating-text')) {
        new Typed('.rotating-text', {
            strings: ['a Student', 'an Entrepreneur', 'an AI Developer', 'a Startup Founder', 'a Problem Solver'],
            typeSpeed: 70,
            backSpeed: 40,
            backDelay: 1500,
            loop: true
        });
    }

    // Initialize skill progress bars
    const skillItems = document.querySelectorAll('.skill-item');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillItem = entry.target;
                const skillLevel = skillItem.getAttribute('data-level');
                const progressBar = skillItem.querySelector('.skill-progress');
                
                progressBar.style.width = `${skillLevel}%`;
                
                // Unobserve after animation
                skillObserver.unobserve(skillItem);
            }
        });
    }, observerOptions);
    
    skillItems.forEach(item => {
        skillObserver.observe(item);
    });

    // Project filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');
            
            const filterValue = btn.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                if (filterValue === 'all') {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    if (card.getAttribute('data-category').includes(filterValue)) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 100);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                }
            });
        });
    });

    // Initialize GSAP ScrollTrigger for scroll animations
    function initAnimations() {
        gsap.registerPlugin(ScrollTrigger);
        
        // Fade-in animations for sections
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            gsap.fromTo(
                section, 
                { opacity: 0, y: 50 }, 
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 80%',
                        toggleActions: 'play none none none'
                    }
                }
            );
        });

        // Staggered animations for skill items
        gsap.from('.skill-item', {
            opacity: 0,
            y: 30,
            stagger: 0.1,
            duration: 0.8,
            scrollTrigger: {
                trigger: '.skills-section',
                start: 'top 70%'
            }
        });

        // Animation for project cards
        gsap.from('.project-card', {
            opacity: 0,
            y: 50,
            stagger: 0.2,
            duration: 0.8,
            scrollTrigger: {
                trigger: '.projects-section',
                start: 'top 70%'
            }
        });

        // Animation for company cards
        gsap.from('.company-card', {
            opacity: 0,
            x: -50,
            stagger: 0.3,
            duration: 1,
            scrollTrigger: {
                trigger: '.companies-section',
                start: 'top 80%'
            }
        });

        // Animation for contact cards
        gsap.from('.contact-card', {
            opacity: 0,
            x: -50,
            stagger: 0.2,
            duration: 0.8,
            scrollTrigger: {
                trigger: '.contact-section',
                start: 'top 80%'
            }
        });

        // Animation for contact form
        gsap.from('.contact-form', {
            opacity: 0,
            x: 50,
            duration: 1,
            scrollTrigger: {
                trigger: '.contact-form',
                start: 'top 80%'
            }
        });

        // Animation for social icons
        gsap.from('.social-icon', {
            opacity: 0,
            x: -30,
            stagger: 0.2,
            duration: 0.5,
            delay: 1
        });
    }

    // Initialize 3D elements with Three.js
    initThreeJS();

    // Initialize chatbot popup
    const chatbotToggle = document.querySelector('.chatbot-toggle');
    const chatbotWindow = document.querySelector('.chatbot-window');
    const chatbotClose = document.querySelector('.chatbot-close');

    chatbotToggle.addEventListener('click', () => {
        chatbotWindow.classList.toggle('active');
    });

    chatbotClose.addEventListener('click', () => {
        chatbotWindow.classList.remove('active');
    });
});

// Initialize Three.js 3D elements
function initThreeJS() {
    // Hero 3D Canvas
    if (document.getElementById('hero-canvas')) {
        const heroCanvas = document.getElementById('hero-canvas');
        const heroScene = new THREE.Scene();
        const heroCamera = new THREE.PerspectiveCamera(75, heroCanvas.clientWidth / heroCanvas.clientHeight, 0.1, 1000);
        const heroRenderer = new THREE.WebGLRenderer({
            canvas: heroCanvas,
            alpha: true,
            antialias: true
        });
        
        heroRenderer.setSize(heroCanvas.clientWidth, heroCanvas.clientHeight);
        heroRenderer.setPixelRatio(window.devicePixelRatio);
        
        // Create a glowing sphere
        const sphereGeometry = new THREE.SphereGeometry(3, 64, 64);
        const sphereMaterial = new THREE.MeshBasicMaterial({
            color: 0x00eeff,
            wireframe: true
        });
        const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
        heroScene.add(sphere);
        
        // Add particles
        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 2000;
        const posArray = new Float32Array(particlesCount * 3);
        
        for (let i = 0; i < particlesCount * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * 50;
        }
        
        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        
        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.05,
            color: 0x7000ff
        });
        
        const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
        heroScene.add(particlesMesh);
        
        heroCamera.position.z = 15;
        
        // Animation loop
        const heroAnimate = () => {
            requestAnimationFrame(heroAnimate);
            
            sphere.rotation.x += 0.002;
            sphere.rotation.y += 0.003;
            
            particlesMesh.rotation.x += 0.0005;
            particlesMesh.rotation.y += 0.0005;
            
            heroRenderer.render(heroScene, heroCamera);
        };
        
        heroAnimate();
        
        // Handle window resize
        window.addEventListener('resize', () => {
            heroCamera.aspect = heroCanvas.clientWidth / heroCanvas.clientHeight;
            heroCamera.updateProjectionMatrix();
            heroRenderer.setSize(heroCanvas.clientWidth, heroCanvas.clientHeight);
        });
    }
    
    // About 3D Canvas
    if (document.getElementById('about-canvas')) {
        const aboutCanvas = document.getElementById('about-canvas');
        const aboutScene = new THREE.Scene();
        const aboutCamera = new THREE.PerspectiveCamera(75, aboutCanvas.clientWidth / aboutCanvas.clientHeight, 0.1, 1000);
        const aboutRenderer = new THREE.WebGLRenderer({
            canvas: aboutCanvas,
            alpha: true,
            antialias: true
        });
        
        aboutRenderer.setSize(aboutCanvas.clientWidth, aboutCanvas.clientHeight);
        aboutRenderer.setPixelRatio(window.devicePixelRatio);
        
        // Create a torus knot
        const torusGeometry = new THREE.TorusKnotGeometry(3, 0.8, 100, 16);
        const torusMaterial = new THREE.MeshBasicMaterial({
            color: 0xff00aa,
            wireframe: true
        });
        const torusKnot = new THREE.Mesh(torusGeometry, torusMaterial);
        aboutScene.add(torusKnot);
        
        aboutCamera.position.z = 10;
        
        // Animation loop
        const aboutAnimate = () => {
            requestAnimationFrame(aboutAnimate);
            
            torusKnot.rotation.x += 0.01;
            torusKnot.rotation.y += 0.01;
            
            aboutRenderer.render(aboutScene, aboutCamera);
        };
        
        aboutAnimate();
        
        // Handle window resize
        window.addEventListener('resize', () => {
            aboutCamera.aspect = aboutCanvas.clientWidth / aboutCanvas.clientHeight;
            aboutCamera.updateProjectionMatrix();
            aboutRenderer.setSize(aboutCanvas.clientWidth, aboutCanvas.clientHeight);
        });
    }
    
    // Skills 3D Canvas
    if (document.getElementById('skills-canvas')) {
        const skillsCanvas = document.getElementById('skills-canvas');
        const skillsScene = new THREE.Scene();
        const skillsCamera = new THREE.PerspectiveCamera(75, skillsCanvas.clientWidth / skillsCanvas.clientHeight, 0.1, 1000);
        const skillsRenderer = new THREE.WebGLRenderer({
            canvas: skillsCanvas,
            alpha: true,
            antialias: true
        });
        
        skillsRenderer.setSize(skillsCanvas.clientWidth, skillsCanvas.clientHeight);
        skillsRenderer.setPixelRatio(window.devicePixelRatio);
        
        // Create a dodecahedron
        const dodecahedronGeometry = new THREE.DodecahedronGeometry(3, 0);
        const dodecahedronMaterial = new THREE.MeshBasicMaterial({
            color: 0x00eeff,
            wireframe: true
        });
        const dodecahedron = new THREE.Mesh(dodecahedronGeometry, dodecahedronMaterial);
        skillsScene.add(dodecahedron);
        
        // Add floating cubes
        const cubes = new THREE.Group();
        skillsScene.add(cubes);
        
        for (let i = 0; i < 20; i++) {
            const size = Math.random() * 0.5 + 0.1;
            const cubeGeometry = new THREE.BoxGeometry(size, size, size);
            const cubeMaterial = new THREE.MeshBasicMaterial({
                color: 0x7000ff,
                wireframe: true
            });
            const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
            
            cube.position.x = (Math.random() - 0.5) * 10;
            cube.position.y = (Math.random() - 0.5) * 10;
            cube.position.z = (Math.random() - 0.5) * 10;
            
            cube.rotation.x = Math.random() * Math.PI;
            cube.rotation.y = Math.random() * Math.PI;
            
            // Store original position
            cube.userData.originalPosition = {
                x: cube.position.x,
                y: cube.position.y,
                z: cube.position.z
            };
            
            // Store random speed
            cube.userData.speed = {
                x: (Math.random() - 0.5) * 0.01,
                y: (Math.random() - 0.5) * 0.01,
                z: (Math.random() - 0.5) * 0.01
            };
            
            cubes.add(cube);
        }
        
        skillsCamera.position.z = 10;
        
        // Animation loop
        const skillsAnimate = () => {
            requestAnimationFrame(skillsAnimate);
            
            dodecahedron.rotation.x += 0.005;
            dodecahedron.rotation.y += 0.005;
            
            // Animate each cube with floating movement
            cubes.children.forEach(cube => {
                cube.rotation.x += 0.01;
                cube.rotation.y += 0.01;
                
                // Float around original position
                cube.position.x = cube.userData.originalPosition.x + Math.sin(Date.now() * cube.userData.speed.x) * 1;
                cube.position.y = cube.userData.originalPosition.y + Math.sin(Date.now() * cube.userData.speed.y) * 1;
                cube.position.z = cube.userData.originalPosition.z + Math.sin(Date.now() * cube.userData.speed.z) * 1;
            });
            
            skillsRenderer.render(skillsScene, skillsCamera);
        };
        
        skillsAnimate();
        
        // Handle window resize
        window.addEventListener('resize', () => {
            skillsCamera.aspect = skillsCanvas.clientWidth / skillsCanvas.clientHeight;
            skillsCamera.updateProjectionMatrix();
            skillsRenderer.setSize(skillsCanvas.clientWidth, skillsCanvas.clientHeight);
        });
    }
}

// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70, // Account for fixed header
                behavior: 'smooth'
            });
        }
    });
}); 