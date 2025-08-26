// Interactive functionality for the AI-powered website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive features
    initializeHeroGrid();
    initializeSolutionsTabs();
    initializeScrollEffects();
    initializeMouseTracking();
});

// Hero Section - Animated Grid
function initializeHeroGrid() {
    const heroBottom = document.querySelector('.HeroSection_bottom__eKadg');
    if (!heroBottom) return;

    // Create grid cells for the overlay
    const gridOverlay = heroBottom.querySelector('.HeroSection_grid_overlay__AByYu');
    const gridMask = heroBottom.querySelector('.HeroSection_grid_mask__FGSQI .HeroSection_grid__HruV9');
    
    if (gridOverlay && gridMask) {
        // Create 196 cells (14 rows × 14 columns) - left margin + 12 content + right margin
        const totalCells = 196;
        
        // Create overlay cells
        for (let i = 0; i < totalCells; i++) {
            const cell = document.createElement('div');
            cell.className = 'HeroSection_cell__lVF0h';
            
            // Add special styling for first and last columns (margins)
            const col = (i % 14) + 1;
            if (col === 1 || col === 14) {
                cell.style.borderLeft = 'none';
                cell.style.borderRight = 'none';
            }
            
            gridOverlay.appendChild(cell);
        }
        
        // Create mask cells with gradient effect
        for (let i = 0; i < totalCells; i++) {
            const cell = document.createElement('div');
            cell.className = 'HeroSection_cell__lVF0h HeroSection_cell_gradient__9rlZi';
            
            // Add special styling for first and last columns (margins)
            const col = (i % 14) + 1;
            if (col === 1 || col === 14) {
                cell.style.borderLeft = 'none';
                cell.style.borderRight = 'none';
                cell.style.opacity = '0';
            }
            
            gridMask.appendChild(cell);
        }
    }
}

// Mouse tracking for hero grid effect
function initializeMouseTracking() {
    const heroBottom = document.querySelector('.HeroSection_bottom__eKadg');
    const gridMask = document.querySelector('.HeroSection_grid_mask__FGSQI');
    
    if (!heroBottom || !gridMask) return;
    
    let mouseX = 50;
    let mouseY = 50;
    let intensity = 0;
    
    // Track mouse movement
    heroBottom.addEventListener('mousemove', (e) => {
        const rect = heroBottom.getBoundingClientRect();
        mouseX = ((e.clientX - rect.left) / rect.width) * 100;
        mouseY = ((e.clientY - rect.top) / rect.height) * 100;
        intensity = 1;
        
        updateGridMask();
    });
    
    // Mouse enter/leave effects
    heroBottom.addEventListener('mouseenter', () => {
        intensity = 1;
        updateGridMask();
    });
    
    heroBottom.addEventListener('mouseleave', () => {
        intensity = 0;
        updateGridMask();
    });
    
    function updateGridMask() {
        gridMask.style.setProperty('--mouse-x', mouseX + '%');
        gridMask.style.setProperty('--mouse-y', mouseY + '%');
        gridMask.style.setProperty('--intensity', intensity);
    }
}

// Solutions Section - Interactive Tabs
function initializeSolutionsTabs() {
    const tabButtons = document.querySelectorAll('[data-solution]');
    const videoContainer = document.querySelector('.SolutionsSection_video__Fs2o6');
    
    if (!tabButtons.length) return;
    
    // Tab content data
    const tabContent = {
        sales: {
            title: 'Sales Analytics Dashboard',
            content: '[Sales Demo Interface - CRM Integration, Pipeline Analytics, Revenue Forecasting]'
        },
        marketing: {
            title: 'Marketing Campaign Manager',
            content: '[Marketing Demo Interface - Campaign Analytics, ROI Tracking, Customer Segmentation]'
        },
        operations: {
            title: 'Operations Management System',
            content: '[Operations Demo Interface - Workflow Automation, Resource Planning, Performance Metrics]'
        },
        finance: {
            title: 'Financial Planning Tools',
            content: '[Finance Demo Interface - Budget Planning, Expense Tracking, Financial Reporting]'
        },
        hr: {
            title: 'Human Resources Platform',
            content: '[HR Demo Interface - Employee Management, Performance Reviews, Recruitment Tools]'
        }
    };
    
    // Add click handlers to tabs
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const solution = button.getAttribute('data-solution');
            
            // Update active states
            tabButtons.forEach(btn => btn.classList.remove('SolutionsSection_active__QnJ9n'));
            button.classList.add('SolutionsSection_active__QnJ9n');
            
            // Update content
            if (videoContainer && tabContent[solution]) {
                videoContainer.innerHTML = `
                    <div style="
                        background: #f8f9fa; 
                        border: 1px solid #e1e5e9; 
                        border-radius: 8px; 
                        height: 100%; 
                        display: flex; 
                        flex-direction: column;
                        align-items: center; 
                        justify-content: center; 
                        color: #666;
                        padding: 40px;
                        text-align: center;
                    ">
                        <h3 style="margin-bottom: 20px; color: #333; font-size: 24px;">${tabContent[solution].title}</h3>
                        <p style="margin: 0;">${tabContent[solution].content}</p>
                    </div>
                `;
            }
        });
    });
}

// Scroll effects and animations
function initializeScrollEffects() {
    // Intersection Observer for fade-in animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '50px'
    });
    
    // Observe sections for scroll animations
    const sections = document.querySelectorAll([
        '.CalloutSection_container__evjvR',
        '.FeaturesSection_container__hnrOc',
        '.SolutionsSection_solutions__WCuKH',
        '.SecuritySection_container__DQLVK',
        '.QuoteSection_container__NQYFp'
    ].join(', '));
    
    sections.forEach(section => {
        // Initial state
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        
        observer.observe(section);
    });
}

// Feature card hover effects
function initializeFeatureCards() {
    const featureCards = document.querySelectorAll('.FeaturesSection_card__oJdL0');
    
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
            card.style.transition = 'transform 0.3s ease';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
}

// Security feature icons animation
function initializeSecurityFeatures() {
    const securityFeatures = document.querySelectorAll('.SecuritySection_feature__LLcyC');
    
    securityFeatures.forEach((feature, index) => {
        feature.addEventListener('mouseenter', () => {
            const icon = feature.querySelector('.SecuritySection_icon__XDnXu');
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
                icon.style.transition = 'transform 0.3s ease';
            }
        });
        
        feature.addEventListener('mouseleave', () => {
            const icon = feature.querySelector('.SecuritySection_icon__XDnXu');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
        
        // Stagger animation on load
        setTimeout(() => {
            feature.style.opacity = '1';
            feature.style.transform = 'translateY(0)';
        }, index * 100);
        
        // Initial state
        feature.style.opacity = '0';
        feature.style.transform = 'translateY(20px)';
        feature.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
}

// Button hover effects
function initializeButtonEffects() {
    const buttons = document.querySelectorAll('.primary-button, .secondary-button, .SecuritySection_button__qc7ef');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-2px)';
            button.style.transition = 'transform 0.2s ease';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0)';
        });
    });
}

// Parallax effect for hero section
function initializeParallax() {
    const hero = document.querySelector('.HeroSection_hero__MpuRV');
    const heroContent = document.querySelector('.HeroSection_content__Z3NWj');
    
    if (!hero || !heroContent) return;
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallax = scrolled * 0.5;
        
        if (scrolled < window.innerHeight) {
            heroContent.style.transform = `translateY(${parallax}px)`;
        }
    });
}

// Smooth scrolling for anchor links
function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Loading animation
function initializeLoadingAnimation() {
    // Add loading class to body
    document.body.classList.add('loading');
    
    // Remove loading class after page loads
    window.addEventListener('load', () => {
        setTimeout(() => {
            document.body.classList.remove('loading');
            document.body.classList.add('loaded');
            
            // Initialize additional effects after load
            initializeFeatureCards();
            initializeSecurityFeatures();
            initializeButtonEffects();
            initializeParallax();
            initializeSmoothScrolling();
        }, 300);
    });
}

// Initialize loading animation immediately
initializeLoadingAnimation();

// Utility function for debouncing
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func(...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
    };
}

// Responsive handling
function handleResize() {
    // Update grid on resize
    initializeHeroGrid();
    
    // Update mouse tracking
    initializeMouseTracking();
}

// Add resize listener with debouncing
window.addEventListener('resize', debounce(handleResize, 250));

// Add some CSS for loading states
const style = document.createElement('style');
style.textContent = `
    body.loading * {
        transition: none !important;
        animation-play-state: paused !important;
    }
    
    body.loaded {
        transition: all 0.3s ease;
    }
    
    .HeroSection_cell_gradient__9rlZi {
        transition: opacity 1s cubic-bezier(0.165, 0.84, 0.44, 1) 0s;
    }
    
    .HeroSection_cell_gradient__9rlZi:hover {
        opacity: 1 !important;
        transition: opacity 0.1s ease-in-out 0s;
    }
    
    .HeroSection_grid_mask__FGSQI:has(.HeroSection_cell_gradient__9rlZi:hover) .HeroSection_cell_gradient__9rlZi {
        opacity: 0.25;
    }
    
    /* Custom scrollbar */
    ::-webkit-scrollbar {
        width: 8px;
    }
    
    ::-webkit-scrollbar-track {
        background: var(--color-surface-gray);
    }
    
    ::-webkit-scrollbar-thumb {
        background: var(--color-border-grid);
        border-radius: 4px;
    }
    
    ::-webkit-scrollbar-thumb:hover {
        background: var(--color-blue);
    }
`;

document.head.appendChild(style);