/* ===================================================
   AUM VASHI — PORTFOLIO SCRIPTS
   Typing animation · Theme toggle · Scroll reveals · 
   Skill bar animation · Hamburger menu
   =================================================== */

(function () {
    'use strict';

    // ---------- TYPING ANIMATION ----------
    const typedEl = document.getElementById('typedText');
    const phrases = [
        'CS Undergraduate',
        'Aspiring Software Engineer',
        'Full-Stack Developer',
        'Eager Learner',
        'Problem Solver'
    ];
    let phraseIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    const TYPE_SPEED = 80;
    const DELETE_SPEED = 40;
    const PAUSE = 2000;

    function typeEffect() {
        const current = phrases[phraseIdx];
        if (isDeleting) {
            charIdx--;
            typedEl.textContent = current.substring(0, charIdx);
            if (charIdx === 0) {
                isDeleting = false;
                phraseIdx = (phraseIdx + 1) % phrases.length;
                setTimeout(typeEffect, 400);
                return;
            }
            setTimeout(typeEffect, DELETE_SPEED);
        } else {
            charIdx++;
            typedEl.textContent = current.substring(0, charIdx);
            if (charIdx === current.length) {
                isDeleting = true;
                setTimeout(typeEffect, PAUSE);
                return;
            }
            setTimeout(typeEffect, TYPE_SPEED);
        }
    }

    if (typedEl) {
        setTimeout(typeEffect, 600);
    }

    // ---------- THEME TOGGLE ----------
    const themeToggle = document.getElementById('themeToggle');
    const htmlEl = document.documentElement;

    function setTheme(theme) {
        htmlEl.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }

    // Load saved theme or default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const current = htmlEl.getAttribute('data-theme');
            setTheme(current === 'dark' ? 'light' : 'dark');
        });
    }

    // ---------- HAMBURGER MENU ----------
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('open');
            document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
        });

        // Close menu on link click
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('open');
                document.body.style.overflow = '';
            });
        });
    }

    // ---------- SCROLL REVEAL ----------
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    revealObserver.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.15,
            rootMargin: '0px 0px -40px 0px'
        }
    );

    revealElements.forEach(el => revealObserver.observe(el));

    // ---------- SKILL BAR ANIMATION ----------
    const skillBarItems = document.querySelectorAll('.skill-bar-item');

    const skillObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const skill = entry.target.getAttribute('data-skill');
                    const fill = entry.target.querySelector('.skill-bar-fill');
                    if (fill && skill) {
                        setTimeout(() => {
                            fill.style.width = skill + '%';
                        }, 200);
                    }
                    skillObserver.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.3
        }
    );

    skillBarItems.forEach(el => skillObserver.observe(el));

    // ---------- NAVBAR SCROLL SHADOW ----------
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        if (scrollY > 10) {
            navbar.style.boxShadow = '0 1px 12px rgba(0,0,0,0.08)';
        } else {
            navbar.style.boxShadow = 'none';
        }
        lastScroll = scrollY;
    }, { passive: true });

    // ---------- SMOOTH SCROLL (nav links) ----------
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetEl = document.querySelector(targetId);
            if (targetEl) {
                e.preventDefault();
                targetEl.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // ---------- ACTIVE NAV LINK HIGHLIGHT ----------
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-links a');

    const sectionObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    navItems.forEach(link => {
                        link.style.color = '';
                        if (link.getAttribute('href') === '#' + id) {
                            link.style.color = 'var(--text-primary)';
                            link.style.fontWeight = '600';
                        } else {
                            link.style.fontWeight = '';
                        }
                    });
                }
            });
        },
        {
            threshold: 0.3,
            rootMargin: '-80px 0px -50% 0px'
        }
    );

    sections.forEach(sec => sectionObserver.observe(sec));

})();
