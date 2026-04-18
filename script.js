// --- Three.js Background Implementation ---
const canvas = document.getElementById('bg-canvas');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// Create techy particles
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 2000;
const posArray = new Float32Array(particlesCount * 3);

for(let i = 0; i < particlesCount * 3; i++) {
    // Spread particles across a wide 3D area
    posArray[i] = (Math.random() - 0.5) * 25; 
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

const material = new THREE.PointsMaterial({
    size: 0.02,
    color: 0x38bdf8, // Cyan tech color
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending
});

const particlesMesh = new THREE.Points(particlesGeometry, material);
scene.add(particlesMesh);

camera.position.z = 5;

// Animation Loop
let mouseX = 0;
let mouseY = 0;
let targetX = 0;
let targetY = 0;

const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;

document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX - windowHalfX);
    mouseY = (event.clientY - windowHalfY);
});

function animate() {
    requestAnimationFrame(animate);

    targetX = mouseX * 0.001;
    targetY = mouseY * 0.001;

    // Slowly rotate the entire particle system
    particlesMesh.rotation.y += 0.001;
    particlesMesh.rotation.x += 0.0005;

    // Add slight parallax effect based on mouse movement
    particlesMesh.rotation.y += 0.05 * (targetX - particlesMesh.rotation.y);
    particlesMesh.rotation.x += 0.05 * (targetY - particlesMesh.rotation.x);

    // Make particles slowly move towards the camera
    const positions = particlesMesh.geometry.attributes.position.array;
    for(let i = 2; i < particlesCount * 3; i += 3) {
        positions[i] += 0.005;
        if(positions[i] > 5) {
            positions[i] = -15; // reset to back
        }
    }
    particlesMesh.geometry.attributes.position.needsUpdate = true;

    renderer.render(scene, camera);
}

animate();

// Handle Resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
// ------------------------------------------

// Mock Data for Properties
const properties = [
    {
        id: 1,
        title: 'Modern Glass Villa',
        location: 'Beverly Hills, CA',
        price: '$4,500/mo',
        beds: 4,
        baths: 3,
        sqft: 3200,
        image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 2,
        title: 'Luxury Penthouse',
        location: 'Manhattan, NY',
        price: '$6,200/mo',
        beds: 3,
        baths: 2,
        sqft: 2100,
        image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 3,
        title: 'Cozy Beachfront Condo',
        location: 'Miami Beach, FL',
        price: '$3,800/mo',
        beds: 2,
        baths: 2,
        sqft: 1500,
        image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 4,
        title: 'Minimalist Studio Apartment',
        location: 'Austin, TX',
        price: '$1,800/mo',
        beds: 1,
        baths: 1,
        sqft: 850,
        image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 5,
        title: 'Rustic Forest Cabin',
        location: 'Aspen, CO',
        price: '$5,100/mo',
        beds: 5,
        baths: 4,
        sqft: 4000,
        image: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 6,
        title: 'Downtown Loft',
        location: 'Seattle, WA',
        price: '$2,900/mo',
        beds: 2,
        baths: 1,
        sqft: 1200,
        image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80'
    }
];

// Elements
const propertyGrid = document.getElementById('propertyGrid');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');

// Render Function
function renderProperties(data) {
    propertyGrid.innerHTML = ''; // Clear existing
    
    if (data.length === 0) {
        propertyGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted);">No properties found matching your search.</p>';
        return;
    }

    data.forEach(prop => {
        const card = document.createElement('div');
        card.className = 'property-card';
        card.innerHTML = `
            <div class="card-image" style="background-image: url('${prop.image}')">
                <div class="price-tag">${prop.price}</div>
            </div>
            <div class="card-content">
                <h3 class="card-title">${prop.title}</h3>
                <p class="card-location">📍 ${prop.location}</p>
                <div class="card-features">
                    <span>🛏️ ${prop.beds} Beds</span>
                    <span>🛁 ${prop.baths} Baths</span>
                    <span>📐 ${prop.sqft} sqft</span>
                </div>
            </div>
        `;
        
        // Add subtle animation delay for cascade effect
        card.style.animation = 'fadeInUp 0.5s ease backwards';
        card.style.animationDelay = \`\${prop.id * 0.1}s\`;
        
        propertyGrid.appendChild(card);
    });
}

// Add animation keyframes dynamically
const styleSheet = document.createElement("style");
styleSheet.innerText = \`
    @keyframes fadeInUp {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
\`;
document.head.appendChild(styleSheet);

// Initial Render and Animations
document.addEventListener('DOMContentLoaded', () => {
    renderProperties(properties);

    // Typing Effect for Hero
    const heroHeading = document.querySelector('.hero h1');
    if(heroHeading) {
        heroHeading.innerHTML = '<span class="typing"></span><span class="cursor" style="animation: blink 1s infinite;">|</span>';
        const typingSpan = heroHeading.querySelector('.typing');
        const textToType = "Find Your Next Perfect Home_";
        let i = 0;
        
        function typeWriter() {
            if (i < textToType.length) {
                typingSpan.innerHTML += textToType.charAt(i);
                i++;
                setTimeout(typeWriter, 60);
            } else {
                setTimeout(() => {
                    heroHeading.innerHTML = 'Find Your Next <br><span class="highlight">Perfect Home</span>';
                }, 500);
            }
        }
        setTimeout(typeWriter, 500);
    }

    // Scroll Animations for Feature Cards
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.feature-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(40px)';
        card.style.transition = `all 0.6s ease-out ${index * 0.1}s`;
        observer.observe(card);
    });
});

// Search Functionality
function handleSearch() {
    const query = searchInput.value.toLowerCase();
    const filtered = properties.filter(prop => 
        prop.title.toLowerCase().includes(query) || 
        prop.location.toLowerCase().includes(query)
    );
    renderProperties(filtered);
    
    // Scroll to properties
    document.getElementById('properties').scrollIntoView({ behavior: 'smooth' });
}

searchBtn.addEventListener('click', handleSearch);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSearch();
});

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        nav.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        nav.style.background = 'rgba(255, 255, 255, 0.95)';
    } else {
        nav.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.05)';
        nav.style.background = 'rgba(255, 255, 255, 0.8)';
});

// Booking Modal Logic
const navBookBtn = document.querySelector('.nav-book');
const bookingModal = document.getElementById('bookingModal');
const closeBtn = document.querySelector('.close-btn');
const bookingForm = document.getElementById('bookingForm');

navBookBtn.addEventListener('click', (e) => {
    e.preventDefault();
    bookingModal.classList.add('show');
});

closeBtn.addEventListener('click', () => {
    bookingModal.classList.remove('show');
});

window.addEventListener('click', (e) => {
    if (e.target === bookingModal) {
        bookingModal.classList.remove('show');
    }
});

bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Simulate booking action
    const submitBtn = bookingForm.querySelector('.btn-submit');
    const originalText = submitBtn.innerText;
    
    submitBtn.innerText = 'Processing...';
    submitBtn.style.background = 'rgba(0, 243, 255, 0.2)';
    
    setTimeout(() => {
        submitBtn.innerText = 'Slot Booked!';
        submitBtn.style.background = 'rgba(204, 255, 0, 0.4)';
        submitBtn.style.color = '#ccff00';
        submitBtn.style.borderColor = '#ccff00';
        
        setTimeout(() => {
            bookingModal.classList.remove('show');
            bookingForm.reset();
            // Reset button styles
            submitBtn.innerText = originalText;
            submitBtn.style = '';
        }, 2000);
    }, 1500);
});
