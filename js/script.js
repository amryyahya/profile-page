document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================================================
    // 1. Mouse Spotlight Cursor Glow Effect
    // ==========================================================================
    const cursorGlow = document.getElementById('cursor-glow');
    
    document.addEventListener('mousemove', (e) => {
        // Position the radial gradient glow centered at the cursor
        cursorGlow.style.left = `${e.clientX}px`;
        cursorGlow.style.top = `${e.clientY}px`;
    });

    // ==========================================================================
    // 2. Mobile Menu Toggle
    // ==========================================================================
    const mobileToggle = document.getElementById('mobile-toggle');
    const navLinks = document.getElementById('nav-links');
    const navItems = navLinks.querySelectorAll('a');

    mobileToggle.addEventListener('click', () => {
        mobileToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when nav link is clicked
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            mobileToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // ==========================================================================
    // 3. ScrollSpy & Sticky Header
    // ==========================================================================
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        // Sticky Header effect
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active Link Scroll Spy
        let currentSectionId = '';
        const scrollPosition = window.scrollY + 120; // offset for navbar height

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < (sectionTop + sectionHeight)) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${currentSectionId}`) {
                item.classList.add('active');
            }
        });
    });

    // ==========================================================================
    // 4. Interactive Projects Filter
    // ==========================================================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const categories = card.getAttribute('data-category').split(' ');
                
                if (filterValue === 'all' || categories.includes(filterValue)) {
                    card.classList.remove('hidden');
                    // Simple entrance animation
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(10px)';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                        card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                    }, 50);
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    // ==========================================================================
    // 5. DevOps Interactive Terminal Mockup typing simulation
    // ==========================================================================
    const terminalBody = document.getElementById('terminal-body');
    terminalBody.innerHTML = ''; // Clear noscript content

    const terminalScript = [
        { type: 'input', text: 'whoami' },
        { type: 'output', text: 'amryyahya' },
        { type: 'wait', ms: 500 },
        { type: 'input', text: 'cat stats.yaml' },
        { type: 'output', text: `---
engineer:
  name: Amry Yahya
  role: DevOps Engineer
  location: Yogyakarta, Indonesia
metrics:
  ansible_automation: "Server setup time reduced by 60%"
  gitlab_cicd_speed: "3x deployment frequency acceleration"
  docker_compose_uptime: "99.9% availability across 20+ instances"
  ai_data_ingest: "Indexed 215,000+ docs (Redis, Memgraph, Qdrant)"` },
        { type: 'wait', ms: 800 },
        { type: 'input', text: 'ansible-playbook check_infra.yml' },
        { type: 'output', text: `PLAY [Check DevOps Environment Health] *****************************************

TASK [Gathering Facts] *********************************************************
ok: [dsi-prod-01]

TASK [Check Nginx & SSL Cert Validity] *****************************************
ok: [dsi-prod-01] => {"changed": false, "ssl_status": "Valid", "expires_in": "82 days"}

TASK [Check Redis & Memgraph Cache Hit Ratios] *********************************
ok: [dsi-prod-01] => {"changed": false, "redis_hit_ratio": "98.4%", "memgraph_status": "Connected"}

TASK [Verify Telegram Alerting Channels] ***************************************
ok: [dsi-prod-01] => {"changed": false, "channel": "UptimeKumaAlerts", "status": "ONLINE"}

PLAY RECAP *********************************************************************
dsi-prod-01                : ok=4    changed=0    unreachable=0    failed=0   ` },
        { type: 'wait', ms: 1000 },
        { type: 'input', text: 'echo "Ready to automate infrastructure."' },
        { type: 'output', text: 'Ready to automate infrastructure.' },
        { type: 'wait', ms: 2000 }
    ];

    async function runTerminalSimulation() {
        while (true) { // Loop simulation indefinitely
            terminalBody.innerHTML = '';
            for (let step of terminalScript) {
                if (step.type === 'input') {
                    // Create input line
                    const line = document.createElement('div');
                    line.className = 'term-line';
                    
                    const prompt = document.createElement('span');
                    prompt.className = 'term-prompt';
                    prompt.textContent = 'guest@amryyahya:~$ ';
                    line.appendChild(prompt);
                    
                    const cmdText = document.createElement('span');
                    line.appendChild(cmdText);
                    
                    const caret = document.createElement('span');
                    caret.className = 'term-caret';
                    line.appendChild(caret);
                    
                    terminalBody.appendChild(line);
                    terminalBody.scrollTop = terminalBody.scrollHeight;

                    // Type command text character by character
                    for (let i = 0; i < step.text.length; i++) {
                        cmdText.textContent += step.text[i];
                        await new Promise(r => setTimeout(r, 60 + Math.random() * 40));
                    }
                    
                    // Remove caret from line after finishing typing
                    caret.remove();
                    
                } else if (step.type === 'output') {
                    // Create output lines
                    const output = document.createElement('div');
                    output.className = 'term-output';
                    output.innerHTML = step.text.replace(/\n/g, '<br>');
                    
                    terminalBody.appendChild(output);
                    terminalBody.scrollTop = terminalBody.scrollHeight;
                    
                } else if (step.type === 'wait') {
                    await new Promise(r => setTimeout(r, step.ms));
                }
            }
            
            // Wait 5 seconds before restarting the terminal log loop
            await new Promise(r => setTimeout(r, 5000));
        }
    }

    runTerminalSimulation();

    // ==========================================================================
    // 6. Formspree Contact Form Submission Handling
    // ==========================================================================
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            formStatus.className = '';
            formStatus.style.display = 'none';
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;
            submitBtn.textContent = 'Sending Message...';
            submitBtn.disabled = true;

            const data = new FormData(contactForm);
            
            try {
                const response = await fetch(contactForm.action, {
                    method: contactForm.method,
                    body: data,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    formStatus.textContent = "Thank you! Your message has been sent successfully. I will get back to you shortly.";
                    formStatus.className = 'success';
                    contactForm.reset();
                } else {
                    const responseData = await response.json();
                    if (responseData.errors) {
                        formStatus.textContent = responseData.errors.map(error => error.message).join(", ");
                    } else {
                        formStatus.textContent = "Oops! There was a problem submitting your form. Please try again.";
                    }
                    formStatus.className = 'error';
                }
            } catch (error) {
                formStatus.textContent = "Oops! Network error. Please verify your connection and try again.";
                formStatus.className = 'error';
            } finally {
                formStatus.style.display = 'block';
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
            }
        });
    }

    // ==========================================================================
    // 7. Light / Dark Theme Switcher
    // ==========================================================================
    const themeToggleBtn = document.getElementById('theme-toggle');
    
    // Check saved preference or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;

    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    } else if (systemPrefersLight) {
        document.documentElement.setAttribute('data-theme', 'light');
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }
});
