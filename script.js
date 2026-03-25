function createGrid() {
    const width = Math.max(window.innerWidth, window.screen.width, 3000);
    const height = Math.max(window.innerHeight, window.screen.height, 3000);
    const gap = 200;

    const gridEl = document.createElement('div');
    gridEl.className = 'grid-lines';
    document.body.prepend(gridEl);

    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    for (let offset = 0; offset < width; offset += gap) {
        [centerX - offset, centerX + offset].forEach(x => {
            if (offset !== 0 || x === centerX) {
                const line = document.createElement('div');
                line.className = 'grid-line grid-line--vertical';
                line.style.left = x + 'px';
                line.style.transformOrigin = Math.random() > 0.5 ? 'top' : 'bottom';
                line.style.animationDelay = (Math.random() * 0.8) + 's';
                gridEl.appendChild(line);
            }
        });
    }

    for (let offset = 0; offset < height; offset += gap) {
        [centerY - offset, centerY + offset].forEach(y => {
            if (offset !== 0 || y === centerY) {
                const line = document.createElement('div');
                line.className = 'grid-line grid-line--horizontal';
                line.style.top = y + 'px';
                line.style.transformOrigin = Math.random() > 0.5 ? 'left' : 'right';
                line.style.animationDelay = (Math.random() * 0.8) + 's';
                gridEl.appendChild(line);
            }
        });
    }
}

createGrid();

document.querySelectorAll('.card').forEach(card => {
    card.style.setProperty('--float-duration', (3 + Math.random() * 3) + 's');
    card.style.setProperty('--float-delay', (Math.random() * 3) + 's');
});

const workGrid = document.querySelector('.work-grid');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            workGrid.classList.add('visible');
        } else {
            workGrid.classList.remove('visible');
        }
    });
}, { threshold: 0.1 });
observer.observe(workGrid);

const workLabel = document.querySelector('.work-label');
const workLabelObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            workLabel.classList.add('visible');
        } else {
            workLabel.classList.remove('visible');
        }
    });
}, { threshold: 0.2 });
workLabelObserver.observe(workLabel);

const aboutImg = document.querySelector('.about-img');
const aboutLabel = document.querySelector('.about-label');
const aboutText = document.querySelector('.about-text');
const aboutObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            aboutImg.classList.add('visible');
            aboutLabel.classList.add('visible');
            aboutText.classList.add('visible');
        } else {
            aboutImg.classList.remove('visible');
            aboutLabel.classList.remove('visible');
            aboutText.classList.remove('visible');
        }
    });
}, { threshold: 0.4 });
aboutObserver.observe(aboutImg);

const contactLabel = document.querySelector('.contact-label');
const contactObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            contactLabel.classList.add('visible');
        } else {
            contactLabel.classList.remove('visible');
        }
    });
}, { threshold: 0.4 });
contactObserver.observe(contactLabel);

const contactLinks = document.querySelector('.contact-links');
const contactLinksObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            contactLinks.classList.add('visible');
        } else {
            contactLinks.classList.remove('visible');
        }
    });
}, { threshold: 0.2 });
contactLinksObserver.observe(contactLinks);

const word1 = document.querySelector('#hero-word1');
word1.innerHTML = word1.innerHTML.replace(/\S/g, char => `<span>${char}</span>`);

document.querySelectorAll('#hero-word1 span').forEach((span, i) => {
    span.style.animationDelay = `${i * 0.05}s`;
});

const heroWords = ['Developer', 'Designer'];
let heroWordIndex = 0;
const wc = document.querySelector('.wc');

function cycleHeroWord() {
    wc.classList.add('line-visible');
    word1.classList.add('exiting');

    setTimeout(() => {
        heroWordIndex = (heroWordIndex + 1) % heroWords.length;
        word1.textContent = heroWords[heroWordIndex];
        word1.classList.remove('exiting');
        word1.classList.add('entering');

        setTimeout(() => {
            word1.classList.remove('entering');
            setTimeout(() => wc.classList.remove('line-visible'), 200);
        }, 500);
    }, 500);
}

setTimeout(() => setInterval(cycleHeroWord, 5000), 2000);

const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');
const hero = document.querySelector('.hero-text');
const navLinks = document.querySelectorAll('nav a');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    follower.style.left = e.clientX + 'px';
    follower.style.top = e.clientY + 'px';

    const rect = hero.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const dx = e.clientX - centerX;
    const dy = e.clientY - centerY;

    hero.style.transform = `translate(${dx * 0.01}px, ${dy * 0.01}px)`;

    navLinks.forEach(link => {
        const linkRect = link.getBoundingClientRect();
        const linkCenterX = linkRect.left + linkRect.width / 2;
        const linkCenterY = linkRect.top + linkRect.height / 2;

        const dx = e.clientX - linkCenterX;
        const dy = e.clientY - linkCenterY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 80) {
            link.style.transform = `translate(${dx * 0.05}px, ${dy * 0.05}px)`;
        } else {
            link.style.transform = `translate(0, 0)`;
        }
    });
});
