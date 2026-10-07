/* secreto.js — la pantalla "NO PRESIONES ESTO".
   Responsabilidad unica: contar clics, progresar el fondo y desbloquear la carta.

   Correcciones respecto al original:
   - el bucle de confetti ya NO se puede duplicar (bandera 'animando' usada de verdad)
   - el listener esta en addEventListener, no en un onclick inline
   - el fondo progresa suave sin saltos ni colores sueltos (violeta/verde/rojo fuera)
   - el canvas respeta el devicePixelRatio (no se ve borroso en celular) */

(function () {
  "use strict";

  const META = 20;

  // Degradado de rosa palido a rojo intenso, en el mismo lenguaje del sitio
  const FONDOS = [
    "#fff6f7", "#ffeef1", "#ffe6ea", "#ffdde3", "#ffd4dc",
    "#ffcbd5", "#ffc2ce", "#ffb9c7", "#ffb0c0", "#ffa7b9",
    "#ff9eb2", "#ff95ab", "#ff8ca4", "#ff839d", "#ff7a96",
    "#ff718f", "#ff6888", "#ff5f81", "#ff567a", "#ff4d73"
  ];

  const MENSAJES = {
    5: " WAAA",
    10: " NO SIGAS BETSAAA",
    15: " ya casi...",
    19: " NO LO PRESIONES OTRA VEZ"
  };

  function iniciar() {
    const contador = document.getElementById("contadorClicks");
    const card = document.getElementById("cardFinal");
    const pantalla = document.getElementById("pantallaInicial");
    const canvas = document.getElementById("confetti");
    const boton = document.getElementById("btnPresionar");
    const barra = document.getElementById("barraProgreso");

    if (!contador || !card || !pantalla || !canvas || !boton) {
      console.error("[betsa] Faltan elementos en el HTML de NO.html");
      return;
    }

    const ctx = canvas.getContext("2d");
    let ancho = 0, alto = 0, dpr = 1;

    function ajustarCanvas() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      ancho = window.innerWidth;
      alto = window.innerHeight;
      canvas.width = ancho * dpr;
      canvas.height = alto * dpr;
      canvas.style.width = ancho + "px";
      canvas.style.height = alto + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    ajustarCanvas();
    window.addEventListener("resize", ajustarCanvas);

    let clicks = 0;
    let bloqueado = false;

    function pintarFondo() {
      const progreso = Math.min(clicks / META, 1);
      const indice = Math.min(Math.floor(progreso * FONDOS.length), FONDOS.length - 1);
      document.body.style.background = FONDOS[indice];
    }

    function contarClicks() {
      if (bloqueado) return;

      clicks++;
      pintarFondo();

      let mensaje = `Intentos: ${clicks} / ${META}`;
      if (MENSAJES[clicks]) mensaje += MENSAJES[clicks];
      contador.innerText = mensaje;

      if (barra) barra.style.width = `${Math.min((clicks / META) * 100, 100)}%`;

      if (clicks >= META) {
        bloqueado = true;
        boton.disabled = true;
        desbloquear();
      }
    }

    // -----------------------------
    // CONFETTI
    // -----------------------------
    let confettis = [];
    let animando = false;   // <- ahora SI se usa: evita bucles paralelos
    let rafId = null;

    function crearConfetti() {
      return {
        x: Math.random() * ancho,
        y: -10 - Math.random() * alto * 0.5,
        ancho: Math.random() * 8 + 4,
        alto: Math.random() * 4 + 3,
        velY: Math.random() * 2.6 + 1.4,
        velX: Math.random() * 1.6 - 0.8,
        giro: Math.random() * 0.12 - 0.06,
        angulo: Math.random() * Math.PI,
        color: `hsl(${Math.random() * 360}, 92%, 68%)`
      };
    }

    function animarConfetti() {
      if (!animando) return;                    // candado: un solo bucle vivo
      ctx.clearRect(0, 0, ancho, alto);

      for (let i = 0; i < confettis.length; i++) {
        const c = confettis[i];
        c.y += c.velY;
        c.x += c.velX + Math.sin(c.y * 0.02) * 0.7;
        c.angulo += c.giro;

        ctx.save();
        ctx.translate(c.x, c.y);
        ctx.rotate(c.angulo);
        ctx.fillStyle = c.color;
        ctx.fillRect(-c.ancho / 2, -c.alto / 2, c.ancho, c.alto);
        ctx.restore();

        if (c.y > alto + 20) {
          c.y = -20;
          c.x = Math.random() * ancho;
        }
      }

      rafId = window.requestAnimationFrame(animarConfetti);
    }

    function lanzarConfetti() {
      for (let i = 0; i < 180; i++) confettis.push(crearConfetti());
      if (animando) return;    // ya hay un bucle corriendo: no lanzamos otro
      animando = true;
      animarConfetti();
    }

    // -----------------------------
    // DESBLOQUEO FINAL
    // -----------------------------
    function desbloquear() {
      pantalla.classList.add("oculto");
      lanzarConfetti();

      window.setTimeout(() => {
        pantalla.style.display = "none";
        card.style.display = "block";
        window.setTimeout(() => card.classList.add("activa"), 50);
      }, 500);
    }

    // Pausa el confetti si la pestana no se ve
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        if (rafId) window.cancelAnimationFrame(rafId);
        rafId = null;
      } else if (animando && !rafId) {
        animarConfetti();
      }
    });

    // Listener real (el original dependia de un onclick inline en el HTML)
    boton.addEventListener("click", contarClicks);

    // Evita que el "d" del cambio de tema cuente como clic accidental
    boton.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") e.preventDefault();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", iniciar);
  } else {
    iniciar();
  }
})();
