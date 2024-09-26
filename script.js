document.addEventListener('DOMContentLoaded', function () {
    const links = document.querySelectorAll('.nav-link');

    links.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            const section = document.querySelector(this.getAttribute('href'));
            section.scrollIntoView({ behavior: 'smooth' });
        });
    });
});

// let currentSlide = 0;
// const slides = document.querySelectorAll('.slide');

// function showSlide(index) {
//     const totalSlides = slides.length;
//     currentSlide = index % totalSlides;
//     const slideWidth = slides[currentSlide].clientWidth;
//     document.querySelector('.slides').style.transform = `translateX(-${slideWidth * currentSlide}px)`;
// }

// function autoSlide() {
//     currentSlide++;
//     showSlide(currentSlide);
// }

// setInterval(autoSlide, 3000);

// showSlide(currentSlide);

window.onload = function() {
    setTimeout(function() {
        document.getElementById('preloader').style.display = 'none'; 
        document.getElementById("site-content").style.display = 'block'; 
    }, 3000); /
};

const canvas = document.getElementById('animationCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];
const mouse = {
    x: null,
    y: null
};

window.addEventListener('mousemove', function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
});


class Particle {
    constructor(x, y, size, color, speedX, speedY) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.speedX = speedX;
        this.speedY = speedY;
    }


    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.size > 0.2) this.size -= 0.02;
        if (this.x > canvas.width || this.x < 0 || this.y > canvas.height || this.y < 0) {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 5 + 1;
        }

        if (mouse.x && mouse.y) {
            const dx = this.x - mouse.x;
            const dy = this.y - mouse.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 100) {
                this.x += dx / 20;
                this.y += dy / 20;
            }
        }

        this.draw();
    }
}

function initParticles() {
    particlesArray = [];
    for (let i = 0; i < 100; i++) {
        const size = Math.random() * 5 + 1;
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const color = '#f3ece3';
        const speedX = (Math.random() - 0.5) * 2;
        const speedY = (Math.random() - 0.5) * 2;
        particlesArray.push(new Particle(x, y, size, color, speedX, speedY));
    }
}


function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); 

    particlesArray.forEach(particle => {
        particle.update();
    });

    requestAnimationFrame(animateParticles); 
}


initParticles();
animateParticles();


window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles(); 
});
