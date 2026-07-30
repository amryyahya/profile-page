document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Cursor Glow
    const cursorGlow = document.getElementById('cursor-glow');
    if (cursorGlow) {
        document.addEventListener('mousemove', (e) => {
            cursorGlow.style.left = `${e.clientX}px`;
            cursorGlow.style.top = `${e.clientY}px`;
        });
    }

    // 2. Mobile Menu Toggle
    const mobileToggle = document.getElementById('mobile-toggle');
    const navLinks = document.getElementById('nav-links');
    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // 3. Digital Visitor Counter Increment Simulation
    const visitorCountEl = document.getElementById('visitor-count');
    if (visitorCountEl) {
        let baseCount = 4829;
        // Increment count based on current timestamp
        let currentCount = baseCount + (Math.floor(Date.now() / 100000) % 500);
        visitorCountEl.textContent = String(currentCount).padStart(6, '0');
    }

    // 4. Project Filters
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
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    // 5. Matrix Terminal Typing Simulation
    const terminalBody = document.getElementById('terminal-body');

    if (terminalBody) {
        terminalBody.innerHTML = ''; // Clear fallback

        const terminalScript = [
            { type: 'input', text: './init_matrix.sh --user amryyahya' },
            { type: 'output', text: '[SYSTEM OK] Initializing Cyber DevOps Core...' },
            { type: 'wait', ms: 500 },
            
            { type: 'input', text: 'cat stats.log' },
            { type: 'output', text: `> ANSIBLE_AUTOMATION: 60% Setup Time Reduction<br>&gt; GITLAB_CICD_SPEED: 3x Deployment Speedup<br>&gt; DOCKER_CONTAINER_UPTIME: 99.9% Availability<br>&gt; AI_DATA_LAYER: 215,000+ Ingested Documents` },
            { type: 'wait', ms: 800 },
            
            { type: 'input', text: 'ansible-playbook check_infra.yml' },
            { type: 'output', text: `PLAY [Verify DevOps Cyber Environment] *****************<br>TASK [Gathering Facts] ok: [dsi-prod-01]<br>TASK [Check Nginx & SSL Pinning] ok: [dsi-prod-01]<br>TASK [Check Uptime Kuma] ok: [dsi-prod-01]<br>RECAP: dsi-prod-01 : ok=3 changed=0 failed=0` },
            { type: 'wait', ms: 1000 },
            
            { type: 'input', text: 'echo "SYSTEM ONLINE AND READY."' },
            { type: 'output', text: '*** SYSTEM ONLINE AND READY ***' },
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
                        prompt.textContent = 'amry@cyber-matrix:~$ ';
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
                            await new Promise(r => setTimeout(r, 45 + Math.random() * 30));
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

    // 6. Formspree Contact Form
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm && formStatus) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            formStatus.className = '';
            formStatus.style.display = 'none';
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;
            submitBtn.textContent = '[ TRANSMITTING... ]';
            submitBtn.disabled = true;

            const data = new FormData(contactForm);
            
            try {
                const response = await fetch(contactForm.action, {
                    method: contactForm.method,
                    body: data,
                    headers: { 'Accept': 'application/json' }
                });
                
                if (response.ok) {
                    formStatus.textContent = "Transmission Received! Thank you. I will respond shortly.";
                    formStatus.style.color = '#00ff66';
                    contactForm.reset();
                } else {
                    formStatus.textContent = "Error sending transmission. Please try again.";
                    formStatus.style.color = '#ff0055';
                }
            } catch (error) {
                formStatus.textContent = "Connection error. Please try again.";
                formStatus.style.color = '#ff0055';
            } finally {
                formStatus.style.display = 'block';
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
            }
        });
    }
});
