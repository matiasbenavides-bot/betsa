document.addEventListener("DOMContentLoaded", () => {

    // -----------------------------
    // 📌 ELEMENTOS
    // -----------------------------
    const contador = document.getElementById("contadorClicks");
    const card = document.getElementById("cardFinal");
    const pantalla = document.getElementById("pantallaInicial");
    const canvas = document.getElementById("confetti");

    if (!contador || !card || !pantalla || !canvas) {
        console.error("❌ Faltan elementos en el HTML");
        return;
    }

    const ctx = canvas.getContext("2d");

    // -----------------------------
    // 📏 CANVAS
    // -----------------------------
    function ajustarCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    window.addEventListener("resize", ajustarCanvas);
    ajustarCanvas();

    // -----------------------------
    // 🎨 FONDOS DINÁMICOS
    // -----------------------------
    const fondos = [
        "#ffc6c6",
        "#ffd6d6",
        "#ffe3e3",
        "#fff0f0",
        "#ffd1dc",
        "#ffcad4",
        "#ffc7c7",
        "#ffc6c6",
        "#ffd6d6",
        "#9d7cff",
        "#fff0f0",
        "#ffd1dc",
        "#ffcad4",
        "#a2ff93",
        "#ffc7c7",
        "#ffd1dc",
        "#ffcad4",
        "#ffc7c7",
        "#ff4e4e",
        "#ffffff"
    ];

    let clicks = 0;

    function cambiarFondo() {
        const progreso = clicks / 20;
        const index = Math.floor(progreso * (fondos.length - 1));
        document.body.style.background = fondos[index];
    }

    // -----------------------------
    // 🧠 LÓGICA DE CLICKS
    // -----------------------------
    function contarClicks() {
        clicks++;

        cambiarFondo();

        let mensaje = `Intentos: ${clicks} / 20`;

        if (clicks === 5) mensaje += " WAAA";
        if (clicks === 10) mensaje += " NO SIGAS BETSAAA";
        if (clicks === 15) mensaje += " ya casi...";
        if (clicks === 19) mensaje += " NO LO PRESIONES OTRA VEZ";

        contador.innerText = mensaje;

        if (clicks >= 20) {
            desbloquear();
        }
    }

    // -----------------------------
    // 🎉 CONFETTI (SOLO FINAL)
    // -----------------------------
    let confettis = [];
    let animando = false;

    function crearConfetti() {
        return {
            x: Math.random() * canvas.width,
            y: -10,
            size: Math.random() * 8 + 4,
            speed: Math.random() * 3 + 2,
            swing: Math.random() * 2,
            color: `hsl(${Math.random() * 360}, 100%, 70%)`
        };
    }
function lanzarConfetti() {
    for (let i = 0; i < 200; i++) {
        confettis.push(crearConfetti());
    }

    // iniciar SIEMPRE (sin bandera)
    animarConfetti();
}
function animarConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    confettis.forEach(c => {
        c.y += c.speed;
        c.x += Math.sin(c.y * 0.05) * c.swing;

        ctx.fillStyle = c.color;
        ctx.fillRect(c.x, c.y, c.size, c.size);

        // 🔥 CLAVE: reciclar en vez de eliminar
        if (c.y > canvas.height) {
            c.y = -10;
            c.x = Math.random() * canvas.width;
        }
    });

    requestAnimationFrame(animarConfetti);
}

    // -----------------------------
    // 💥 DESBLOQUEO FINAL
    // -----------------------------
    function desbloquear() {

        pantalla.classList.add("oculto");

        setTimeout(() => {
            pantalla.style.display = "none";

            card.style.display = "block";

            setTimeout(() => {
                card.classList.add("activa");
            }, 50);

        }, 500);

        lanzarConfetti(); // 💥 solo aquí aparece
    }

    // -----------------------------
    // 🌍 GLOBAL
    // -----------------------------
    window.contarClicks = contarClicks;

});