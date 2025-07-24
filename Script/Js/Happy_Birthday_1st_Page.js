const canvas = document.getElementById('balloons-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let balloons = [];
const colors = ['#ff6b6b', '#f94d6e', '#feca57', '#48dbfb', '#ff9f43', '#6ab04c'];

class Balloon {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.dx = (Math.random() - 0.5) * 2;
        this.dy = -Math.random() * 3 - 1; // Move upwards
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    update() {
        this.y += this.dy;
        this.x += this.dx;
        
        if (this.y + this.radius < 0) {
            // Reset balloon
            this.y = canvas.height + this.radius;
            this.x = Math.random() * canvas.width;
        }
        this.draw();
    }
}

function init() {
    balloons = [];
    for (let i = 0; i < 30; i++) {
        const radius = Math.random() * 20 + 15;
        const x = Math.random() * (canvas.width - radius * 2) + radius;
        const y = canvas.height + radius + Math.random() * 100;
        const color = colors[Math.floor(Math.random() * colors.length)];
        balloons.push(new Balloon(x, y, radius, color));
    }
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    balloons.forEach(balloon => {
        balloon.update();
    });
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});

document.body.addEventListener('click', () => {
  document.querySelector('.left-curtain').classList.add('open-left');
  document.querySelector('.right-curtain').classList.add('open-right');

  const music = document.getElementById('bg-music');
  if (music) music.play().catch(e => console.warn("Không phát được nhạc:", e));
});

init();
animate();
console.log("JS file loaded!");