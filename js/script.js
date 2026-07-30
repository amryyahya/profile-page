document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Mouse Sparkle Trail Effect
    const sparkleContainer = document.getElementById('sparkle-container');
    let lastSparkleTime = 0;

    document.addEventListener('mousemove', (e) => {
        const now = Date.now();
        if (now - lastSparkleTime > 40) { // Throttled mouse trail
            lastSparkleTime = now;
            const sparkle = document.createElement('div');
            sparkle.className = 'star-sparkle';
            sparkle.style.left = `${e.clientX}px`;
            sparkle.style.top = `${e.clientY}px`;
            
            // Random neon colors for sparkles
            const colors = ['#00ffff', '#ff00ff', '#00ff00', '#ffff00'];
            sparkle.style.background = colors[Math.floor(Math.random() * colors.length)];
            
            if (sparkleContainer) {
                sparkleContainer.appendChild(sparkle);
                setTimeout(() => sparkle.remove(), 800);
            }
        }
    });

    // 2. Mobile Menu Toggle
    const mobileToggle = document.getElementById('mobile-toggle');
    const navLinks = document.getElementById('nav-links');
    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // 3. Winamp Media Player Controls Simulation
    const winampPlay = document.getElementById('winamp-play');
    const winampPause = document.getElementById('winamp-pause');
    const winampStop = document.getElementById('winamp-stop');
    const winampStatus = document.getElementById('winamp-status');

    if (winampStatus) {
        if (winampPlay) {
            winampPlay.addEventListener('click', () => {
                winampStatus.textContent = '[PLAYING 03:12]';
                winampStatus.style.color = '#00ff00';
            });
        }
        if (winampPause) {
            winampPause.addEventListener('click', () => {
                winampStatus.textContent = '[PAUSED]';
                winampStatus.style.color = '#ffff00';
            });
        }
        if (winampStop) {
            winampStop.addEventListener('click', () => {
                winampStatus.textContent = '[STOPPED]';
                winampStatus.style.color = '#ff0055';
            });
        }
    }

    // 4. Hit Counter Logic
    const hitCounterEl = document.getElementById('hit-counter');
    if (hitCounterEl) {
        let count = 9482 + (Math.floor(Date.now() / 80000) % 300);
        hitCounterEl.textContent = String(count).padStart(6, '0');
    }

    // 5. Project Filters
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

    // 6. Matrix Terminal Typing Simulation
    const terminalBody = document.getElementById('terminal-body');

    if (terminalBody) {
        terminalBody.innerHTML = '';

        const terminalScript = [
            { type: 'input', text: './init_geocities_cyber.sh --user amryyahya' },
            { type: 'output', text: '*** GEOCITIES CYBER DEVOPS SYSTEM ONLINE ***' },
            { type: 'wait', ms: 500 },
            
            { type: 'input', text: 'cat stats.txt' },
            { type: 'output', text: `&gt; ANSIBLE AUTOMATION: 60% Setup Time Reduction<br>&gt; GITLAB CI SPEED: 3x Deployment Acceleration<br>&gt; DOCKER UPTIME: 99.9% Availability<br>&gt; AI INGESTION LAYER: 215,000+ Docs Processed` },
            { type: 'wait', ms: 800 },
            
            { type: 'input', text: 'ansible-playbook check_status.yml' },
            { type: 'output', text: `PLAY [Verify DevOps Cyber Environment] *****************<br>TASK [Gathering Facts] ok: [dsi-prod-01]<br>TASK [Check Nginx & SSL Pinning] ok: [dsi-prod-01]<br>RECAP: dsi-prod-01 : ok=2 changed=0 failed=0` },
            { type: 'wait', ms: 1000 },
            
            { type: 'input', text: 'echo "READY TO AUTOMATE INFRASTRUCTURE."' },
            { type: 'output', text: '*** READY TO AUTOMATE INFRASTRUCTURE ***' },
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
                            await new Promise(r => setTimeout(r, 40 + Math.random() * 30));
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

    // 7. Formspree Contact Form
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
                    formStatus.style.color = '#00ff00';
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
