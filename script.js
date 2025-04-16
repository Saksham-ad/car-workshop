
import allServices from './services/index.js';
import { auth } from './firebase-config.js';
import { onAuthStateChanged } from 'firebase/auth';

// Load services from localStorage or use default services
let services = JSON.parse(localStorage.getItem('services')) || allServices;

// Check authentication state
onAuthStateChanged(auth, (user) => {
    const loginBtn = document.querySelector('.login-btn');
    if (user) {
        loginBtn.textContent = user.email;
        loginBtn.href = '#';
        loginBtn.onclick = () => {
            auth.signOut();
            window.location.reload();
        };
    } else {
        loginBtn.textContent = 'Login';
        loginBtn.href = 'login.html';
    }
});

// Display services
function displayServices() {
    const servicesList = document.getElementById('servicesList');
    const categories = ['tires', 'maintenance', 'repairs', 'diagnostic'];
    
    servicesList.innerHTML = categories.map(category => `
        <div class="category-section">
            <h3 class="category-title">${category.charAt(0).toUpperCase() + category.slice(1)}</h3>
            <div class="category-services">
                ${services.filter(service => service.category === category)
                    .map(service => `
                        <div class="service-card">
                            ${service.image ? `<img src="${service.image}" alt="${service.name}" class="service-image">` : ''}
                            <h3>${service.name}</h3>
                            <p>${service.description}</p>
                            <p class="price">${service.price}</p>
                        </div>
                    `).join('') || '<p>No services in this category</p>'}
            </div>
        </div>
    `).join('');
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    displayServices();
    
    // Handle contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });
    }
});
