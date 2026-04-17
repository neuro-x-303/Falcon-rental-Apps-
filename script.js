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

// Initial Render
document.addEventListener('DOMContentLoaded', () => {
    renderProperties(properties);
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
    }
});
