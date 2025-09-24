// ===== PROPERTY DATA =====
let properties = [];

// Load properties from localStorage or use default data
function loadPropertiesData() {
    const savedProperties = localStorage.getItem('websiteProperties');
    if (savedProperties) {
        properties = JSON.parse(savedProperties);
    } else {
        // Default properties if none exist
        properties = [
            {
                id: 1,
                title: "Modern Downtown Apartment",
                location: "Downtown District",
                price: "₹3,75,00,000",
                type: "sale",
                category: "residential",
                image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                features: "3 Beds • 2 Baths • 1,200 sqft"
            },
            {
                id: 2,
                title: "Luxury Villa with Pool",
                location: "Suburban Heights",
                price: "₹7,08,00,000",
                type: "sale",
                category: "residential",
                image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                features: "4 Beds • 3 Baths • 2,500 sqft"
            },
            {
                id: 3,
                title: "Cozy Studio Apartment",
                location: "Noida",
                price: "₹1,00,000/month",
                type: "rent",
                category: "residential",
                image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                features: "1 Bed • 1 Bath • 600 sqft"
            },
            {
                id: 4,
                title: "Office Space in Business District",
                location: "Business District",
                price: "₹2,08,000/month",
                type: "rent",
                category: "commercial",
                image: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                features: "2,000 sqft • Parking • Security"
            },
            {
                id: 5,
                title: "Retail Space on Main Street",
                location: "Main Street",
                price: "₹2,66,000/month",
                type: "rent",
                category: "commercial",
                image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                features: "1,500 sqft • High Traffic • Storage"
            },
            {
                id: 6,
                title: "Family Home with Garden",
                location: "Delhi",
                price: "₹5,41,00,000",
                type: "sale",
                category: "residential",
                image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                features: "3 Beds • 2 Baths • 1,800 sqft"
            },
            {
                id: 7,
                title: "Residential Plot in Green Valley",
                location: "Gurugaon",
                price: "₹1,25,00,000",
                type: "sale",
                category: "plots",
                image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                features: "2,400 sqft • Corner Plot • Road Access"
            },
            {
                id: 8,
                title: "Commercial Plot on Highway",
                location: "Noida",
                price: "₹3,50,00,000",
                type: "sale",
                category: "plots",
                image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                features: "5,000 sqft • Highway Front • High Visibility"
            }
        ];
        // Save default properties to localStorage
        localStorage.setItem('websiteProperties', JSON.stringify(properties));
    }
}


// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    loadPropertiesData(); // Load properties from localStorage
    initMobileNav();
    initPropertyFilter();
    loadProperties();
    initContactForm();
    initSmoothScrolling();
    initScrollEffects();
    initSearchFunctionality();
});

// ===== MOBILE NAVIGATION =====
function initMobileNav() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close when clicking outside
    document.addEventListener('click', function(e) {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// ===== PROPERTY MANAGEMENT =====
function loadProperties(filter = 'all') {
    const propertiesGrid = document.getElementById('propertiesGrid');
    let filteredProperties = properties;

    if (filter !== 'all') {
        if (filter === 'plots') {
            filteredProperties = properties.filter(property => property.category === 'plots');
        } else {
            filteredProperties = properties.filter(property => property.type === filter);
        }
    }

    propertiesGrid.innerHTML = '';

    filteredProperties.forEach(property => {
        const propertyCard = createPropertyCard(property);
        propertiesGrid.appendChild(propertyCard);
    });

    // Add loading animation
    const cards = propertiesGrid.querySelectorAll('.property-card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('loaded');
        }, index * 100);
    });
}

// Create property card HTML
function createPropertyCard(property) {
    const card = document.createElement('div');
    card.className = 'property-card loading';
    
    let badgeClass, badgeText;
    
    if (property.category === 'plots') {
        badgeClass = 'plots';
        badgeText = 'Plot';
    } else if (property.type === 'rent') {
        badgeClass = 'rent';
        badgeText = 'For Rent';
    } else if (property.category === 'commercial') {
        badgeClass = 'commercial';
        badgeText = 'Commercial';
    } else {
        badgeClass = 'sale';
        badgeText = 'For Sale';
    }

    card.innerHTML = `
        <div class="property-image">
            <img src="${property.image}" alt="${property.title}">
            <div class="property-badge ${badgeClass}">${badgeText}</div>
        </div>
        <div class="property-content">
            <h3 class="property-title">${property.title}</h3>
            <p class="property-location">
                <i class="fas fa-map-marker-alt"></i>
                ${property.location}
            </p>
            <p class="property-features">${property.features}</p>
            <p class="property-price">${property.price}</p>
            
        </div>
    `;
    return card;
}

// Filter buttons functionality
function initPropertyFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            const filter = this.getAttribute('data-filter');
            loadProperties(filter);
        });
    });
}

// Show property details (basic alert for now)
function viewProperty(id) {
    const property = properties.find(p => p.id === id);
    if (property) {
        alert(`Viewing details for: ${property.title}\nPrice: ${property.price}\nLocation: ${property.location}`);
    }
}

// ===== CONTACT FORM =====
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            if (validateForm(data)) {
                submitForm(data);
            }
        });
    }
}

// Save contact message to localStorage
function saveContactMessage(messageData) {
    let messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
    const newMessage = {
        id: Date.now(),
        name: messageData.name,
        email: messageData.email,
        phone: messageData.phone,
        service: messageData.service,
        message: messageData.message,
        date: new Date().toLocaleString()
    };
    messages.push(newMessage);
    localStorage.setItem('contactMessages', JSON.stringify(messages));
}

// Validate contact form
function validateForm(data) {
    const errors = [];
    if (!data.name || data.name.trim().length < 2) {
        errors.push('Name must be at least 2 characters long');
    }
    if (!data.email || !isValidEmail(data.email)) {
        errors.push('Please enter a valid email address');
    }
    if (!data.service) {
        errors.push('Please select a service');
    }
    if (!data.message || data.message.trim().length < 10) {
        errors.push('Message must be at least 10 characters long');
    }
    if (errors.length > 0) {
        showError(errors.join('\n'));
        return false;
    }
    return true;
}

// Check valid email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Simulate submit form
function submitForm(data) {
    const submitBtn = document.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    saveContactMessage(data);
    
    setTimeout(() => {
        showSuccess('Thank you! Your message has been sent successfully. We will get back to you soon.');
        document.getElementById('contactForm').reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

// Success message
function showSuccess(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = message;
    successDiv.style.display = 'block';
    const form = document.getElementById('contactForm');
    form.insertBefore(successDiv, form.firstChild);
    setTimeout(() => successDiv.remove(), 5000);
}

// Error message
function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
    const form = document.getElementById('contactForm');
    form.insertBefore(errorDiv, form.firstChild);
    setTimeout(() => errorDiv.remove(), 5000);
}

// ===== SMOOTH SCROLLING =====
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70;
                window.scrollTo({ top: offsetTop, behavior: 'smooth' });
            }
        });
    });
}

// ===== SCROLL EFFECTS =====
function initScrollEffects() {
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
    });

    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('loaded');
            }
        });
    }, observerOptions);

    const animateElements = document.querySelectorAll('.service-card, .about-content, .contact-content');
    animateElements.forEach(el => {
        el.classList.add('loading');
        observer.observe(el);
    });
}

// ===== SEARCH FUNCTIONALITY =====
function initSearchFunctionality() {
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.querySelector('.search-btn');
    // const searchBtn = document.getElementById('searchBtn');
   
    if (searchInput && searchBtn) {
        searchBtn.addEventListener('click', function(e) {
            e.preventDefault();
            performSearch();
        });
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                performSearch();
            }
        });
    }
}
// Display search results (show cards + auto-scroll)
function displaySearchResults(results, query) {
    const propertiesGrid = document.getElementById('propertiesGrid');
    propertiesGrid.innerHTML = ''; // clear old content

    if (results.length === 0) {
        // ❌ No matches
        propertiesGrid.innerHTML = `
            <div id="noResultsMessage" style="grid-column: 1 / -1; text-align: center; padding: 2rem;">
                <h3>No properties found for "${query}"</h3>
                <button onclick="clearSearch()" style="background: #3498db; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; margin-top: 1rem;">
                    Clear Search
                </button>
            </div>
        `;
        // 🔽 Auto-scroll to the no-results message so it's visible
        const noResultsEl = document.getElementById('noResultsMessage');
        if (noResultsEl) {
            noResultsEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    } else {
        // ✅ Show all matching property cards
        results.forEach(property => {
            const propertyCard = createPropertyCard(property); // reuse your card builder
            propertiesGrid.appendChild(propertyCard);
        });

        // ✅ Add loading animation to search results
        const cards = propertiesGrid.querySelectorAll('.property-card');
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('loaded');
            }, index * 100);
        });

        // ✅ Scroll to first result
        const firstCard = propertiesGrid.querySelector('.property-card');
        if (firstCard) {
            firstCard.scrollIntoView({ behavior: "smooth", block: "center" });
        }

        // ✅ Add "Clear Search" button
        const clearButton = document.createElement('div');
        clearButton.style.cssText = 'grid-column: 1 / -1; text-align: center; margin-top: 2rem;';
        clearButton.innerHTML = `
            <button onclick="clearSearch()" style="background: #95a5a6; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer;">
                Clear Search (${results.length} results)
            </button>
        `;
        propertiesGrid.appendChild(clearButton);
    }
}

// Perform search
function performSearch() {
    const searchInput = document.getElementById('searchInput');
    const query = searchInput.value.trim().toLowerCase();
    
    if (query) {
        const filteredProperties = properties.filter(property => 
            property.title.toLowerCase().includes(query) ||
            property.location.toLowerCase().includes(query) ||
            property.features.toLowerCase().includes(query) ||
            property.type.toLowerCase().includes(query) ||
            property.category.toLowerCase().includes(query)
        );
        displaySearchResults(filteredProperties, query);
    } else {
        loadProperties(); // show all
        window.scrollTo({ top: 0, behavior: "smooth" });
    }
}

// Clear search results
function clearSearch() {
    document.getElementById('searchInput').value = '';
    loadProperties(); // reload all properties
    window.scrollTo({ top: 0, behavior: "smooth" });
}


// ===== NEWSLETTER FORM =====
function initNewsletterForm() {
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            if (isValidEmail(email)) {
                const button = this.querySelector('button');
                const originalText = button.textContent;
                button.textContent = 'Subscribed!';
                button.style.background = '#27ae60';
                setTimeout(() => {
                    button.textContent = originalText;
                    button.style.background = '#3498db';
                    this.reset();
                }, 2000);
            } else {
                alert('Please enter a valid email address');
            }
        });
    }
}

// ===== COUNTER ANIMATION =====
function animateCounters() {
    const counters = document.querySelectorAll('.stat h3');
    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        const increment = target / 100;
        let current = 0;
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current) + '+';
                setTimeout(updateCounter, 20);
            } else {
                counter.textContent = target + '+';
            }
        };
        updateCounter();
    });
}

// Initialize counter animation when hero section visible
const heroObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            heroObserver.unobserve(entry.target);
        }
    });
});

const heroSection = document.querySelector('.hero');
if (heroSection) {
    heroObserver.observe(heroSection);
}
