const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');
const navLinks = document.querySelectorAll('nav a');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    follower.style.left = e.clientX + 'px';
    follower.style.top = e.clientY + 'px';

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
