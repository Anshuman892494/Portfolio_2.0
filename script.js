document.addEventListener('DOMContentLoaded', function () {
    // Hide loading screen
    setTimeout(() => {
        document.getElementById('loading-screen').style.display = 'none';
    }, 2000);

    // Set current date in footer
    const currentDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    document.getElementById('current-date').textContent = currentDate;

    // Visitor counter (simulated)
    let visitorCount = localStorage.getItem('visitorCount') || Math.floor(Math.random() * 50) + 1;
    localStorage.setItem('visitorCount', parseInt(visitorCount) + 1);
    document.getElementById('visitor-count').textContent = visitorCount;

    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    mobileMenuButton.addEventListener('click', function () {
        mobileMenu.classList.toggle('hidden');
        // Toggle menu icon
        const icon = mobileMenuButton.querySelector('i');
        if (icon.classList.contains('fa-bars')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close mobile menu when clicking on a link
    const mobileMenuLinks = mobileMenu.querySelectorAll('a');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', function () {
            mobileMenu.classList.add('hidden');
            // Reset menu icon
            const icon = mobileMenuButton.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            e.preventDefault();
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Close mobile menu if open
                if (!mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                    const icon = mobileMenuButton.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }

                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // -------- Certifications Modal --------
    const viewCertificationsBtn = document.getElementById('view-certifications');
    const certificationModal = document.getElementById('certification-modal');
    const closeCertificationBtn = document.getElementById('close-certification');

    if (viewCertificationsBtn && certificationModal && closeCertificationBtn) {
        viewCertificationsBtn.addEventListener('click', () => {
            certificationModal.classList.remove('hidden');
            document.body.classList.add('overflow-hidden');
        });

        closeCertificationBtn.addEventListener('click', () => {
            certificationModal.classList.add('hidden');
            document.body.classList.remove('overflow-hidden');
        });

        // Close modal on background click
        certificationModal.addEventListener('click', e => {
            if (e.target === certificationModal) {
                certificationModal.classList.add('hidden');
                document.body.classList.remove('overflow-hidden');
            }
        });

        // Close modal on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !certificationModal.classList.contains('hidden')) {
                certificationModal.classList.add('hidden');
                document.body.classList.remove('overflow-hidden');
            }
        });
    }

    // Skills Tabs Functionality
    const skillTabs = document.querySelectorAll('.skill-tab');
    const skillsContainer = document.getElementById('skills-container');

    // Skills data
    const skillsData = {
        frontend: [
            { icon: 'fab fa-html5', name: 'HTML5', description: 'Semantic markup, Accessibility, SEO', level: 90, color: 'text-red-400' },
            { icon: 'fab fa-css3-alt', name: 'CSS3', description: 'Animations, Flexbox, Grid, Responsive', level: 85, color: 'text-red-500' },
            { icon: 'fab fa-js', name: 'JavaScript', description: 'ES6+, DOM manipulation, Async programming', level: 80, color: 'text-yellow-400' },
            { icon: 'fab fa-react', name: 'React', description: 'Hooks, Context API, Component Lifecycle', level: 75, color: 'text-red-400' },
            { icon: 'fas fa-bolt', name: 'Tailwind CSS', description: 'Utility-first, Responsive design', level: 85, color: 'text-teal-400' },
        ],
        backend: [
            { icon: 'fab fa-node-js', name: 'Node.js', description: 'Express, REST APIs, Authentication', level: 70, color: 'text-green-600' },
            { icon: 'fab fa-node-js', name: 'Express.js', description: 'Express, REST APIs, Authentication', level: 65, color: 'text-yellow-600' },
            { icon: 'fab fa-php', name: 'PHP', description: 'Express, REST APIs, Authentication', level: 50, color: 'text-indigo-600' },
            { icon: 'fas fa-database', name: 'MongoDB', description: 'Schema design, queries, aggregation', level: 70, color: 'text-green-400' },
            { icon: 'fas fa-server', name: 'MySQL', description: 'Database design, optimization', level: 60, color: 'text-blue-400' },
        ],
        tools: [
            { icon: 'fab fa-git-alt', name: 'Git', description: 'Version control, branching, merging', level: 80, color: 'text-red-600' },
            { icon: 'fab fa-github', name: 'GitHub', description: 'CI/CD, Project management', level: 85, color: 'text-gray-300' },
            { icon: 'fab fa-figma', name: 'Figma', description: 'UI/UX design, prototyping', level: 50, color: 'text-purple-500' },
            { icon: 'fas fa-terminal', name: 'VS Code', description: 'Extensions, debugging, shortcuts', level: 90, color: 'text-blue-500' },
        ],
        programming: [
            { icon: 'fab fa-java', name: 'Java', description: 'OOP, Data Structures, Algorithms', level: 50, color: 'text-red-500' },
            { icon: 'fas fa-cogs', name: 'C++', description: 'Competitive programming, STL', level: 50, color: 'text-blue-600' },
            { icon: 'fab fa-js-square', name: 'JavaScript', description: 'Advanced concepts, Design patterns', level: 75, color: 'text-yellow-400' },
            { icon: 'fas fa-code', name: 'Kotlin', description: 'Android development, Coroutines', level: 50, color: 'text-purple-400' },
        ]
    };

    // Function to render skills
    const renderSkills = (category) => {
        skillsContainer.innerHTML = '';
        skillsData[category].forEach(skill => {
            const skillCard = document.createElement('div');
            skillCard.className = 'skill-card bg-gray-900/70 border border-gray-800 p-4 md:p-6 rounded-xl transition-all duration-300';
            skillCard.innerHTML = `
                <div class="flex items-start justify-between mb-3 md:mb-4">
                    <div class="${skill.color} text-2xl md:text-3xl">
                        <i class="${skill.icon}"></i>
                    </div>
                    <span class="text-red-400 font-bold text-sm md:text-base">${skill.level}%</span>
                </div>
                <h3 class="text-lg md:text-xl font-semibold text-gray-300 mb-2">${skill.name}</h3>
                <p class="text-gray-400 mb-3 md:mb-4 text-xs md:text-sm">${skill.description}</p>
                <div class="h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div class="h-full bg-gradient-to-r from-red-600 to-red-500 rounded-full" style="width: ${skill.level}%"></div>
                </div>
            `;
            skillsContainer.appendChild(skillCard);
        });
    };

    // Initialize with frontend skills
    renderSkills('frontend');

    // Add click event to skill tabs
    skillTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            skillTabs.forEach(t => t.classList.remove('active', 'bg-gray-800', 'text-gray-300'));
            skillTabs.forEach(t => t.classList.add('text-gray-400'));

            // Add active class to clicked tab
            tab.classList.add('active', 'bg-gray-800', 'text-gray-300');
            tab.classList.remove('text-gray-400');

            // Render skills for selected category
            const category = tab.getAttribute('data-category');
            renderSkills(category);
        });
    });

    // Projects Data and Filtering
    const projectFilters = document.querySelectorAll('.project-filter');
    const projectsGrid = document.getElementById('projects-grid');

    const projectsData = [


        {
            id: 10,
            title: 'ExamPoint',
            description: 'A full-stack MERN-based online examination platform with a secure authentication, timed exams, and optimized backend logic.',
            tags: ['React.js', 'Node.js', 'Express.js', 'Tailwind', 'MongoDB'],
            category: 'fullstack',
            github: 'https://github.com/Anshuman892494/ExamPoint',
            // demo: 'https://exampoint-frontend.onrender.com/',
            demo: 'https://acciexam.in',
            image: 'https://github.com/Anshuman892494/ExamPoint/blob/main/Screenshots/student_login.png?raw=true'
        },
        {
            id: 9,
            title: 'Portfolio',
            description: 'This responsive portfolio website built with modern design principles and animations.',
            tags: ['HTML5', 'CSS3', 'JavaScript', 'Tailwind'],
            category: 'web',
            github: 'https://github.com/Anshuman892494/Portfolio_2',
            demo: 'https://anshuman-ten.vercel.app/',
            image: 'https://github.com/Anshuman892494/Portfolio_2.0/blob/main/Screenshot%202026-02-02%20125606.png?raw=true'
        },
        {
            id: 8,
            title: 'TypeACCI',
            description: 'A React-based typing practice web-app for students to improve speed and accuracy with real-time clean practice modes.',
            tags: ['React.js', 'CSS', 'Typing', 'Vercel'],
            category: 'web',
            github: 'https://github.com/Anshuman892494/TypeACCI',
            demo: 'https://type-acci.vercel.app/',
            image: 'https://github.com/Anshuman892494/TypeACCI/raw/main/Screenshots/Screenshot%202026-02-02%20100741.png?raw=true'
        },
        {
            id: 7,
            title: 'ProID Studio',
            description: 'Android application developed using Kotlin and Jetpack Compose for login and signup functionality.',
            tags: ['Kotlin', 'Jetpack', 'Android'],
            category: 'mobile',
            github: 'https://github.com/Anshuman892494/ProID-Studio-Login-Android',
            demo: null,
            image: 'https://github.com/Anshuman892494/ProID-Studio-Login-Android/blob/main/Poster.png?raw=true'
        },
        {
            id: 6,
            title: 'Smart Traffic Management',
            description: 'Full-stack web application to monitor and visualize urban traffic in real time with interactive maps.',
            tags: ['React.js', 'Node.js', 'CSS', 'Express.js', 'MongoDB'],
            category: 'fullstack',
            github: 'https://github.com/Anshuman892494/Smart-Traffic-Management-System',
            demo: null,
            image: 'https://github.com/Anshuman892494/Smart-Traffic-Management-System/blob/main/Screenshots/Admin_Dash.png?raw=true'
        },
        {
            id: 5,
            title: 'Echoes Of Eternity',
            description: 'A single-page spiritual blog platform focused on devotion, mindfulness, and divine love through Radha–Krishna and Bhagavad Gita teachings.',
            tags: ['HTML5', 'CSS3', 'Tailwind', 'JavaScript', 'Vercel'],
            category: 'web',
            github: null,
            demo: 'https://echoes-of-eternity-two.vercel.app/',
            image: 'https://echoes-of-eternity-two.vercel.app/assets/Echoes_Of_Eternit.jpeg'
        },
        {
            id: 4,
            title: 'Android Calculator',
            description: 'Fully functional calculator application with clean UI developed using Kotlin and Android Studio.',
            tags: ['Kotlin', 'Android'],
            category: 'mobile',
            github: 'https://github.com/Anshuman892494/Android_Calculator_Applicaion',
            demo: null,
            image: 'https://miro.medium.com/v2/resize:fit:1342/1*PA_i1jV3ji9_odcK9JT30Q.png'
        },
        {
            id: 3,
            title: 'ID Card Generator',
            description: 'Create custom ID cards with live preview, QR code, and download functionality.',
            tags: ['HTML5', 'CSS3', 'Tailwind', 'JavaScript', 'Vercel'],
            category: 'web',
            github: 'https://github.com/Anshuman892494/id_card_generator',
            demo: 'https://id-card-generator-ten-roan.vercel.app/',
            image: 'https://github.com/Anshuman892494/id_card_generator/blob/main/ID_Generator.png?raw=true'
        },
        {
            id: 2,
            title: 'AI Hotel Booking Assistant',
            description: 'Web application that helps users search and book hotels using voice commands and card-based UI.',
            tags: ['HTML5', 'CSS', 'Tailwind', 'JavaScript', 'Rapid API'],
            category: 'web',
            github: 'https://github.com/Anshuman892494/ai-hotel-booking-assistant',
            demo: null,
            image: 'https://github.com/Anshuman892494/ai-hotel-booking-assistant/blob/main/Screenshot%202026-02-02%20125123.png?raw=true'
        },
        {
            id: 1,
            title: 'Portfolio Website',
            description: 'This responsive portfolio website built with modern design principles and animations.',
            tags: ['HTML5', 'CSS3', 'JavaScript', 'Tailwind'],
            category: 'web',
            github: 'https://github.com/Anshuman892494/Portfolio',
            demo: 'https://portfolio-two-neon-ptwivbx5is.vercel.app/',
            image: 'https://github.com/Anshuman892494/Portfolio/blob/main/Screenshot%202026-02-02%20123752.png?raw=true'
        }
    ];

    // Function to render projects
    const renderProjects = (filter = 'all') => {
        projectsGrid.innerHTML = '';

        const filteredProjects = filter === 'all'
            ? projectsData
            : projectsData.filter(project => project.category === filter);

        filteredProjects.forEach(project => {
            const projectCard = document.createElement('div');
            projectCard.className = 'project-card bg-gray-900/70 border border-gray-800 rounded-xl overflow-hidden transition-all duration-300';

            // Determine image or icon
            const imageContent = project.image
                ? `<img src="${project.image}" alt="${project.title}" class="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110">`
                : `<div class="h-48 bg-gradient-to-br from-red-900/30 to-red-700/30 flex items-center justify-center">
                     <i class="fas fa-project-diagram text-4xl text-red-400"></i>
                   </div>`;

            projectCard.innerHTML = `
                <div class="relative overflow-hidden group">
                    ${imageContent}
                    <div class="absolute top-3 right-3 md:top-4 md:right-4">
                        <span class="px-2 py-1 bg-black/80 backdrop-blur-sm text-red-400 text-xs font-medium rounded-full border border-red-500/30">
                            ${project.category.charAt(0).toUpperCase() + project.category.slice(1)}
                        </span>
                    </div>
                </div>
                
                <div class="p-4 md:p-6">
                    <h3 class="text-lg md:text-xl font-bold text-gray-300 mb-2 md:mb-3">${project.title}</h3>
                    <p class="text-gray-400 mb-3 md:mb-4 text-xs md:text-sm">${project.description}</p>
                    
                    <div class="flex flex-wrap gap-1 md:gap-2 mb-4 md:mb-5">
                        ${project.tags.map(tag => `
                            <span class="px-2 md:px-3 py-1 bg-gray-800 text-gray-300 text-xs rounded-full border border-gray-700">
                                ${tag}
                            </span>
                        `).join('')}
                    </div>
                    
                    <div class="flex items-center">
                        ${project.github ? `
                            <a href="${project.github}" target="_blank" 
                               class="flex items-center text-red-400 hover:text-red-300 transition text-sm md:text-base mr-4">
                                <i class="fab fa-github mr-2"></i> Code
                            </a>
                        ` : ''}
                        
                        ${project.demo ? `
                            <a href="${project.demo}" target="_blank" 
                               class="flex items-center text-red-300 hover:text-red-200 transition text-sm md:text-base">
                                <i class="fas fa-external-link-alt mr-2"></i> Visit
                            </a>
                        ` : ''}
                    </div>
                </div>
            `;

            projectsGrid.appendChild(projectCard);
        });

        // Add event listeners to detail buttons
        document.querySelectorAll('.project-details').forEach(btn => {
            btn.addEventListener('click', function () {
                const projectId = this.getAttribute('data-project');
                const project = projectsData.find(p => p.id == projectId);
                alert(`Project: ${project.title}\n\n${project.description}\n\nTechnologies: ${project.tags.join(', ')}`);
            });
        });
    };

    // Initialize projects
    renderProjects();

    // Add click event to project filters
    projectFilters.forEach(filter => {
        filter.addEventListener('click', () => {
            // Remove active class from all filters
            projectFilters.forEach(f => f.classList.remove('active', 'bg-red-500/10', 'text-red-400', 'border-red-500/30'));
            projectFilters.forEach(f => f.classList.add('bg-gray-900', 'text-gray-400', 'border-gray-800'));

            // Add active class to clicked filter
            filter.classList.add('active', 'bg-red-500/10', 'text-red-400', 'border-red-500/30');
            filter.classList.remove('bg-gray-900', 'text-gray-400', 'border-gray-800');

            // Render filtered projects
            const category = filter.getAttribute('data-filter');
            renderProjects(category);
        });
    });

    // Back to top button
    const backToTopButton = document.getElementById('back-to-top');

    window.addEventListener('scroll', function () {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible', 'opacity-100');
            backToTopButton.classList.remove('invisible', 'opacity-0');
        } else {
            backToTopButton.classList.remove('visible', 'opacity-100');
            backToTopButton.classList.add('invisible', 'opacity-0');
        }
    });

    backToTopButton.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Animate elements when they come into view
    const animateOnScroll = function () {
        const elements = document.querySelectorAll('.skill-card, .project-card, .info-card');

        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (elementPosition < windowHeight - 100) {
                element.classList.add('animate__animated', 'animate__fadeInUp');
            }
        });
    };

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on page load

    // Contact Form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async e => {
            e.preventDefault();
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.textContent;
            btn.disabled = true;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Sending...';

            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: new FormData(contactForm),
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    // Show success message
                    const successMsg = document.createElement('div');
                    successMsg.className = 'mt-4 p-4 bg-green-900/30 text-green-400 rounded-lg border border-green-500/30';
                    successMsg.innerHTML = '<i class="fas fa-check-circle mr-2"></i> Thank you! Your message has been sent successfully.';
                    contactForm.parentNode.insertBefore(successMsg, contactForm.nextSibling);

                    // Remove message after 5 seconds
                    setTimeout(() => {
                        successMsg.remove();
                    }, 5000);

                    contactForm.reset();
                } else {
                    throw new Error('Network error');
                }
            } catch (err) {
                // Show error message
                const errorMsg = document.createElement('div');
                errorMsg.className = 'mt-4 p-4 bg-red-900/30 text-red-400 rounded-lg border border-red-500/30';
                errorMsg.innerHTML = '<i class="fas fa-exclamation-circle mr-2"></i> Oops! Something went wrong. Please try again later.';
                contactForm.parentNode.insertBefore(errorMsg, contactForm.nextSibling);

                // Remove message after 5 seconds
                setTimeout(() => {
                    errorMsg.remove();
                }, 5000);
            } finally {
                btn.disabled = false;
                btn.textContent = originalText;
                btn.innerHTML = '<i class="fas fa-paper-plane mr-2"></i> Send Message';
            }
        });
    }

    // Download CV button
    const downloadCvBtn = document.getElementById('download-cv');
    if (downloadCvBtn) {
        downloadCvBtn.addEventListener('click', function (e) {
            e.preventDefault();
            // In a real implementation, this would link to an actual CV file
            alert('CV download would start here. In a real implementation, this would link to your CV file.');
            // window.location.href = 'path-to-your-cv.pdf';
        });
    }

    // Add keyboard navigation
    document.addEventListener('keydown', function (e) {
        // Spacebar scrolls down (when not in input/textarea)
        if (e.key === ' ' && !e.target.matches('input, textarea, button, a')) {
            e.preventDefault();
            window.scrollBy({
                top: window.innerHeight * 0.8,
                behavior: 'smooth'
            });
        }
    });

    // Initialize tooltips for tech icons
    const techIcons = document.querySelectorAll('.tech-icon');
    techIcons.forEach(icon => {
        const title = icon.getAttribute('title');
        if (title) {
            icon.addEventListener('mouseenter', function (e) {
                // Create tooltip
                const tooltip = document.createElement('div');
                tooltip.className = 'fixed z-50 bg-black/90 text-gray-300 px-3 py-2 rounded-lg text-sm shadow-lg border border-gray-700';
                tooltip.textContent = title;
                tooltip.style.top = (e.clientY - 40) + 'px';
                tooltip.style.left = (e.clientX - 20) + 'px';
                tooltip.id = 'tech-tooltip';

                document.body.appendChild(tooltip);
            });

            icon.addEventListener('mouseleave', function () {
                const tooltip = document.getElementById('tech-tooltip');
                if (tooltip) {
                    tooltip.remove();
                }
            });

            icon.addEventListener('mousemove', function (e) {
                const tooltip = document.getElementById('tech-tooltip');
                if (tooltip) {
                    tooltip.style.top = (e.clientY - 40) + 'px';
                    tooltip.style.left = (e.clientX - 20) + 'px';
                }
            });
        }
    });
});