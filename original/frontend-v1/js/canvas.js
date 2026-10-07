const canvas = document.getElementById('petalos');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// --- Clase Corazón ---
class Corazon {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * -canvas.height;

    // 🔹 MÁS PEQUEÑOS
    this.size = Math.random() * 4 + 3;

    this.speedY = Math.random() * 2 + 1;
    this.speedX = Math.random() * 1 - 0.5;

    this.angle = Math.random() * Math.PI * 2;
    this.rotationSpeed = Math.random() * 0.02 - 0.01;

    this.oscillation = Math.random() * 0.5;

    const colores = [
      "rgba(255, 67, 126, 0.8)",
      "rgba(255, 79, 123, 0.7)",
      "rgba(255, 100, 150, 0.6)"
    ];
    this.color = colores[Math.floor(Math.random() * colores.length)];
  }

  update() {
    this.y += this.speedY;

    // Movimiento tipo viento
    this.x += Math.sin(this.y * 0.01) * this.oscillation + this.speedX;

    this.angle += this.rotationSpeed;

    if (this.y > canvas.height) {
      this.reset();
      this.y = -10;
    }
  }

  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);

    ctx.fillStyle = this.color;

    const s = this.size;

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(-s, -s, -s * 2, s / 2, 0, s * 2);
    ctx.bezierCurveTo(s * 2, s / 2, s, -s, 0, 0);
    ctx.fill();

    ctx.restore();
  }
}

// 🔹 MENOS CORAZONES
const corazones = [];
for (let i = 0; i < 25; i++) {
  corazones.push(new Corazon());
}

// Animación
function animar() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  corazones.forEach(c => {
    c.update();
    c.draw();
  });

  requestAnimationFrame(animar);
}

animar();