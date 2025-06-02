// Portfolio JavaScript - Logique interactive et gestion des projets

class Portfolio {
    constructor() {
        this.projects = [];
        this.init();
    }

    async init() {
        this.setupEventListeners();
        this.setupScrollEffects();
        await this.loadProjects();
        this.animateOnScroll();
    }

    setupEventListeners() {
        // Menu mobile toggle
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        const nav = document.querySelector('nav');

        if (mobileToggle) {
            mobileToggle.addEventListener('click', () => {
                nav.classList.toggle('active');
            });
        }

        // Fermer le menu mobile au clic sur un lien
        const navLinks = document.querySelectorAll('nav a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
            });
        });

        // Smooth scroll pour les liens d'ancrage
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    const headerHeight = document.querySelector('header').offsetHeight;
                    const targetPosition = target.offsetTop - headerHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Gestion du resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                nav.classList.remove('active');
            }
        });

        // Gestion des filtres de projets
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('filter-btn')) {
                const filter = e.target.dataset.filter;
                this.filterProjects(filter);

                // Mise à jour de l'état actif des boutons
                document.querySelectorAll('.filter-btn').forEach(btn => {
                    btn.classList.remove('active');
                });
                e.target.classList.add('active');
            }
        });
    }

    setupScrollEffects() {
        // Header effet de scroll
        const header = document.querySelector('header');
        let lastScrollY = window.scrollY;

        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > 100) {
                header.style.transform = currentScrollY > lastScrollY ? 'translateY(-100%)' : 'translateY(0)';
                header.style.boxShadow = 'var(--shadow-medium)';
            } else {
                header.style.transform = 'translateY(0)';
                header.style.boxShadow = 'none';
            }

            lastScrollY = currentScrollY;
        });

        // Navigation active selon la section
        this.updateActiveNavigation();
        window.addEventListener('scroll', () => this.updateActiveNavigation());
    }

    updateActiveNavigation() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('nav a[href^="#"]');
        const currentScrollY = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (currentScrollY >= sectionTop && currentScrollY < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    async loadProjects() {
        try {
            const response = await fetch('/api/projects');
            if (!response.ok) {
                throw new Error('Erreur lors du chargement des projets');
            }

            this.projects = await response.json();
            this.renderProjects();
        } catch (error) {
            console.error('Erreur:', error);
            this.showProjectsError();
        }
    }

    renderProjects() {
        const projectsContainer = document.querySelector('.projects-grid');
        if (!projectsContainer) return;

        // Trier les projets (featured en premier)
        const sortedProjects = this.projects.sort((a, b) => {
            if (a.featured && !b.featured) return -1;
            if (!a.featured && b.featured) return 1;
            return 0;
        });

        projectsContainer.innerHTML = sortedProjects.map(project => this.createProjectCard(project)).join('');

        // Ajouter l'animation d'apparition
        this.animateProjectCards();
    } createProjectCard(project) {
        const technologies = project.technologies.map(tech =>
            `<span class="tech-tag">${tech}</span>`
        ).join('');

        const links = [];
        if (project.demo) {
            links.push(`<a href="${project.demo}" target="_blank" rel="noopener" class="project-link">
                🌐 Demo
            </a>`);
        }
        if (project.link) {
            links.push(`<a href="${project.link}" target="_blank" rel="noopener" class="project-link">
                📂 Code
            </a>`);
        }

        const statusColor = {
            'Terminé': '#10b981',
            'En développement': '#f59e0b',
            'Planifié': '#6b7280'
        };

        const statusBadge = project.status ?
            `<span class="status-badge" style="background: ${statusColor[project.status] || '#6b7280'};">
                ${project.status}
            </span>` : '';

        const yearBadge = project.year ?
            `<span class="year-badge">${project.year}</span>` : '';

        const featuredBadge = project.featured ?
            `<span class="featured-badge">⭐ Projet phare</span>` : '';

        return `
            <div class="project-card" data-featured="${project.featured}">
                <div class="project-image">
                    ${project.image ?
                `<img src="${project.image}" alt="${project.title}" style="width: 100%; height: 100%; object-fit: cover;">` :
                `<div style="display: flex; align-items: center; justify-content: center; height: 100%; background: var(--gradient); color: white; font-weight: 600;">
                            ${project.title}
                        </div>`
            }
                    <div class="project-badges">
                        ${featuredBadge}
                        ${statusBadge}
                        ${yearBadge}
                    </div>
                </div>
                <div class="project-content">
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-description">${project.description}</p>
                    <div class="project-technologies">
                        ${technologies}
                    </div>
                    <div class="project-links">
                        ${links.join('')}
                    </div>
                </div>
            </div>
        `;
    }

    showProjectsError() {
        const projectsContainer = document.querySelector('.projects-grid');
        if (!projectsContainer) return;

        projectsContainer.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 2rem; color: var(--text-secondary);">
                <p>❌ Impossible de charger les projets</p>
                <button onclick="portfolio.loadProjects()" style="margin-top: 1rem; padding: 0.5rem 1rem; background: var(--primary-color); color: white; border: none; border-radius: 8px; cursor: pointer;">
                    Réessayer
                </button>
            </div>
        `;
    }

    animateProjectCards() {
        const cards = document.querySelectorAll('.project-card');
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.animation = `fadeInUp 0.6s ease-out ${index * 0.1}s forwards`;
        });
    }

    animateOnScroll() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
                }
            });
        }, observerOptions);

        // Observer les éléments à animer
        const elementsToAnimate = document.querySelectorAll('.section-title, .section-subtitle, .about-content, .contact-content');
        elementsToAnimate.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            observer.observe(el);
        });
    }

    // Méthodes utilitaires
    showLoading(container) {
        container.innerHTML = `
            <div class="loading">
                <div class="loading-spinner"></div>
            </div>
        `;
    }

    formatDate(dateString) {
        return new Date(dateString).toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    // Méthode pour ajouter un nouveau projet (pour usage futur)
    async addProject(projectData) {
        try {
            const response = await fetch('/api/projects', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(projectData)
            });

            if (response.ok) {
                await this.loadProjects();
                this.showNotification('Projet ajouté avec succès!', 'success');
            } else {
                throw new Error('Erreur lors de l\'ajout du projet');
            }
        } catch (error) {
            console.error('Erreur:', error);
            this.showNotification('Erreur lors de l\'ajout du projet', 'error');
        }
    }

    filterProjects(filter) {
        const projectCards = document.querySelectorAll('.project-card');

        projectCards.forEach(card => {
            card.style.display = 'none';
            card.style.opacity = '0';

            let shouldShow = false;

            switch (filter) {
                case 'all':
                    shouldShow = true;
                    break;
                case 'featured':
                    shouldShow = card.dataset.featured === 'true';
                    break;
                case 'web':
                    shouldShow = card.querySelector('.project-title').textContent.includes('Website') ||
                        card.querySelector('.project-title').textContent.includes('App') ||
                        card.querySelector('.project-title').textContent.includes('Dashboard');
                    break;
                case 'app':
                    shouldShow = card.querySelector('.project-title').textContent.includes('App');
                    break;
                case 'api':
                    shouldShow = card.querySelector('.project-title').textContent.includes('API');
                    break;
            }

            if (shouldShow) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                }, 50);
            }
        });
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 2rem;
            background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
            color: white;
            border-radius: 8px;
            box-shadow: var(--shadow-large);
            z-index: 10000;
            animation: slideInRight 0.3s ease-out;
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-out forwards';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// Initialisation du portfolio
let portfolio;

document.addEventListener('DOMContentLoaded', () => {
    portfolio = new Portfolio();
});

// Gestion des erreurs globales
window.addEventListener('error', (event) => {
    console.error('Erreur globale:', event.error);
});

// Animation CSS pour les notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
