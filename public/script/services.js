const homeBtn = document.getElementById('home');
const servicesBtn = document.getElementById('services');
const aboutBtn = document.getElementById('about');
const contactBtn = document.getElementById('contact');
const donateBtn = document.getElementById('donate');

const currentPath = window.location.pathname;

console.log("Current Path:", currentPath);

if (currentPath === '/services') {
    servicesBtn.classList.add('active');
}