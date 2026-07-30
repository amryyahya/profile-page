document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================================================
    // 1. Mouse Spotlight Cursor Glow Effect
    // ==========================================================================
    const cursorGlow = document.getElementById('cursor-glow');
    
    if (cursorGlow) {
        document.addEventListener('mousemove', (e) => {
            cursorGlow.style.left = `${e.clientX}px`;
            cursorGlow.style.top = `${e.clientY}px`;
        });
    }

    // ==========================================================================
    // 2. Mobile Menu Toggle
    // ==========================================================================
    const mobileToggle = document.getElementById('mobile-toggle');
    const navLinks = document.getElementById('nav-links');
    const navItems = navLinks ? navLinks.querySelectorAll('a') : [];

    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        navItems.forEach(item => {
            item.addEventListener('click', () => {
                mobileToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // ==========================================================================
    // 3. ScrollSpy & Sticky Header
    // ==========================================================================
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }

        let currentSectionId = '';
        const scrollPosition = window.scrollY + 120;

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
    // 4. Interactive Projects / Stacks Filter
    // ==========================================================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const categories = card.getAttribute('data-category').split(' ');
                
                if (filterValue === 'all' || categories.includes(filterValue)) {
                    card.classList.remove('hidden');
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(10px)';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                        card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                    }, 50);
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    // ==========================================================================
    // 5. AWS CloudShell Interactive CLI typing simulation
    // ==========================================================================
    const terminalBody = document.getElementById('terminal-body');

    if (terminalBody) {
        terminalBody.innerHTML = ''; // Clear noscript fallback

        const terminalScript = [
            { type: 'input', text: 'aws sts get-caller-identity' },
            { type: 'output', text: `<span class="highlight-val">{</span><br>&nbsp;&nbsp;<span class="highlight-val">"UserId":</span> "AMRY-DEVOPS-ENGINEER",<br>&nbsp;&nbsp;<span class="highlight-val">"Account":</span> "987654321012",<br>&nbsp;&nbsp;<span class="highlight-val">"Arn":</span> "arn:aws:iam::root:user/amryyahya",<br>&nbsp;&nbsp;<span class="highlight-val">"Region":</span> "ap-southeast-1 (Yogyakarta, ID)"<br><span class="highlight-val">}</span>` },
            { type: 'wait', ms: 600 },
            
            { type: 'input', text: 'aws cloudwatch get-metric-data --metric-name HealthCheck' },
            { type: 'output', text: `[Metrics Evaluation]:<br>- <span class="success-val">Ansible Automation:</span> 60% Server Provisioning Time Reduction<br>- <span class="success-val">GitLab CI Speed:</span> 3x Acceleration in Build & Deploy Frequency<br>- <span class="success-val">Container Uptime:</span> 99.9% Availability across 20+ Instances<br>- <span class="success-val">Data Ingestion:</span> 215,000+ AI Documents Indexed (Redis, Memgraph, Qdrant)` },
            { type: 'wait', ms: 800 },
            
            { type: 'input', text: 'ansible-playbook -i production check_stack_health.yml' },
            { type: 'output', text: `PLAY [Verify AWS Infrastructure & Container Health] ********************<br><br>TASK [Gathering Facts] *************************************************<br>ok: [dsi-prod-01]<br><br>TASK [Check Nginx & SSL Certificate Pinning] ***************************<br>ok: [dsi-prod-01] => {"ssl_status": "VALID", "mitm_protection": "ENABLED"}<br><br>TASK [Verify Telegram Alerting via Uptime Kuma] ************************<br>ok: [dsi-prod-01] => {"status": "ONLINE", "containers": 20}<br><br>PLAY RECAP *************************************************************<br>dsi-prod-01 : ok=3 changed=0 unreachable=0 failed=0` },
            { type: 'wait', ms: 1000 },
            
            { type: 'input', text: 'echo "AWS Cloud & DevOps Platform Operational."' },
            { type: 'output', text: '<span class="success-val">AWS Cloud & DevOps Platform Operational.</span>' },
            { type: 'wait', ms: 2500 }
        ];

        async function runTerminalSimulation() {
            while (true) {
                terminalBody.innerHTML = '';
                for (let step of terminalScript) {
                    if (step.type === 'input') {
                        const line = document.createElement('div');
                        line.className = 'term-line';
                        
                        const prompt = document.createElement('span');
                        prompt.className = 'term-prompt';
                        prompt.textContent = '[cloudshell-user@aws ~]$ ';
                        line.appendChild(prompt);
                        
                        const cmdText = document.createElement('span');
                        line.appendChild(cmdText);
                        
                        const caret = document.createElement('span');
                        caret.className = 'term-caret';
                        line.appendChild(caret);
                        
                        terminalBody.appendChild(line);
                        terminalBody.scrollTop = terminalBody.scrollHeight;

                        for (let i = 0; i < step.text.length; i++) {
                            cmdText.textContent += step.text[i];
                            await new Promise(r => setTimeout(r, 45 + Math.random() * 35));
                        }
                        
                        caret.remove();
                        
                    } else if (step.type === 'output') {
                        const output = document.createElement('div');
                        output.className = 'term-output';
                        output.innerHTML = step.text;
                        
                        terminalBody.appendChild(output);
                        terminalBody.scrollTop = terminalBody.scrollHeight;
                        
                    } else if (step.type === 'wait') {
                        await new Promise(r => setTimeout(r, step.ms));
                    }
                }
                
                await new Promise(r => setTimeout(r, 4000));
            }
        }

        runTerminalSimulation();
    }

    // ==========================================================================
    // 6. Formspree Contact Form Submission Handling
    // ==========================================================================
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm && formStatus) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            formStatus.className = '';
            formStatus.style.display = 'none';
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnHtml = submitBtn.innerHTML;
            submitBtn.textContent = 'Submitting Support Case...';
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
                    formStatus.textContent = "Support Case Created Successfully! Thank you for reaching out. I will respond to your case shortly.";
                    formStatus.className = 'success';
                    contactForm.reset();
                } else {
                    const responseData = await response.json();
                    if (responseData.errors) {
                        formStatus.textContent = responseData.errors.map(error => error.message).join(", ");
                    } else {
                        formStatus.textContent = "Unable to create support case. Please verify your details and try again.";
                    }
                    formStatus.className = 'error';
                }
            } catch (error) {
                formStatus.textContent = "Network connection error. Please verify your connection and try submitting again.";
                formStatus.className = 'error';
            } finally {
                formStatus.style.display = 'block';
                submitBtn.innerHTML = originalBtnHtml;
                submitBtn.disabled = false;
            }
        });
    }
});
