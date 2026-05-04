document.addEventListener('DOMContentLoaded', () => {

    // ============================================
    // SCROLL REVEAL (Intersection Observer)
    // ============================================
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .stagger-children');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // ============================================
    // HEADER SCROLL EFFECT
    // ============================================
    const header = document.querySelector('header');
    if (header) {
        let lastScroll = 0;
        window.addEventListener('scroll', () => {
            const currentScroll = window.scrollY;
            if (currentScroll > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            lastScroll = currentScroll;
        }, { passive: true });
    }

    // ============================================
    // SMOOTH ANCHOR SCROLL
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                const headerHeight = document.querySelector('header')?.offsetHeight || 70;
                const top = target.getBoundingClientRect().top + window.scrollY - headerHeight - 20;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    // ============================================
    // SIDEBAR HEIGHT ADJUSTMENT (for pages with sidebar + footer)
    // ============================================
    const sidebar = document.querySelector('.sidebar');
    const footer = document.querySelector('.footer');
    if (sidebar && footer) {
        function adjustSidebarHeight() {
            const footerTop = footer.getBoundingClientRect().top;
            const viewportHeight = window.innerHeight;
            const sidebarTop = sidebar.getBoundingClientRect().top;
            if (footerTop < viewportHeight) {
                sidebar.style.height = `${footerTop - sidebarTop}px`;
            } else {
                sidebar.style.height = `calc(100vh - var(--header-height, 70px))`;
            }
        }
        window.addEventListener('resize', adjustSidebarHeight, { passive: true });
        window.addEventListener('scroll', adjustSidebarHeight, { passive: true });
        adjustSidebarHeight();
    }

    // ============================================
    // SIDEBAR ACTIVE STATE
    // ============================================
    const sidebarItems = document.querySelectorAll('.sidebar li');
    sidebarItems.forEach(item => {
        item.addEventListener('click', () => {
            sidebarItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
        });
    });

    // ============================================
    // TILT EFFECT ON CARDS (subtle)
    // ============================================
    document.querySelectorAll('.feature-item, .tutorial-card, .card-container, .tutor-card, .ide-item').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) scale(1)';
        });
    });

    // ============================================
    // COUNTER ANIMATION (for dashboard stats)
    // ============================================
    const counters = document.querySelectorAll('.stat-card h2');
    if (counters.length) {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = parseInt(entry.target.textContent);
                    let current = 0;
                    const step = Math.max(1, Math.floor(target / 40));
                    const timer = setInterval(() => {
                        current += step;
                        if (current >= target) {
                            current = target;
                            clearInterval(timer);
                        }
                        entry.target.textContent = current;
                    }, 30);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(c => counterObserver.observe(c));
    }

    // ============================================
    // TYPED EFFECT FOR HERO (optional - only on index)
    // ============================================
    const heroSubtitle = document.querySelector('.hero-typed');
    if (heroSubtitle) {
        const text = heroSubtitle.dataset.text || heroSubtitle.textContent;
        heroSubtitle.textContent = '';
        heroSubtitle.style.borderRight = '2px solid rgba(255,255,255,0.7)';
        let i = 0;
        function typeChar() {
            if (i < text.length) {
                heroSubtitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeChar, 35);
            } else {
                setTimeout(() => {
                    heroSubtitle.style.borderRight = 'none';
                }, 1000);
            }
        }
        setTimeout(typeChar, 800);
    }
});
