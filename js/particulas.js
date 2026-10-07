/* particulas.js — corazones flotando.
   Sustituye canvas.js. Diferencia clave con el original:
   - los corazones arrancan DISTRIBUIDOS (el original arrancaba con pantalla vacia)
   - se pausa cuando la pestana no esta visible (ahorra bateria, importa en celular)
   - respeta prefers-reduced-motion */

(function () {
  "use strict";

  function iniciar() {
    if (!CONFIG || !CONFIG.particulas || CONFIG.particulas.activo === false) return;

    const reducir = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducir) return;

    const canvas = document.getElementById("petalos");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let ancho = 0, alto = 0, dpr = 1;

    /** Los corazones pertenecen al modo dia. De noche corre el cielo estrellado
     *  (CSS). Asi cada tema tiene su propia identidad y no compiten. */
    function temaEsDia() {
      return document.documentElement.dataset.tema !== "noche";
    }

    function ajustar() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      ancho = window.innerWidth;
      alto = window.innerHeight;
      canvas.width = ancho * dpr;
      canvas.height = alto * dpr;
      canvas.style.width = ancho + "px";
      canvas.style.height = alto + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    const COLORES = [
      "rgba(224, 68, 110, 0.55)",
      "rgba(255, 179, 199, 0.7)",
      "rgba(140, 29, 63, 0.32)"
    ];

    class Corazon {
      constructor() { this.reiniciar(true); }

      reiniciar(distribuirY) {
        this.x = Math.random() * ancho;
        // distribuirY = true -> reparte por toda la pantalla al arrancar
        this.y = distribuirY ? Math.random() * alto : -12;
        this.tam = Math.random() * 5 + 4;
        this.velY = Math.random() * 0.5 + 0.25;
        this.velX = Math.random() * 0.5 - 0.25;
        this.angulo = Math.random() * Math.PI * 2;
        this.giro = (Math.random() * 0.02 - 0.01);
        this.oscilacion = Math.random() * 0.4 + 0.1;
        this.color = COLORES[Math.floor(Math.random() * COLORES.length)];
      }

      actualizar() {
        this.y += this.velY;
        this.x += Math.sin(this.y * 0.01) * this.oscilacion + this.velX;
        this.angulo += this.giro;
        if (this.y > alto + 12) this.reiniciar(false);
        if (this.x < -30) this.x = ancho + 20;
        if (this.x > ancho + 30) this.x = -20;
      }

      dibujar() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angulo);
        ctx.fillStyle = this.color;
        const s = this.tam;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(-s, -s, -s * 2, s / 2, 0, s * 2);
        ctx.bezierCurveTo(s * 2, s / 2, s, -s, 0, 0);
        ctx.fill();
        ctx.restore();
      }
    }

    ajustar();

    const cantidad = (CONFIG.particulas.cantidad) || 22;
    const corazones = [];
    for (let i = 0; i < cantidad; i++) corazones.push(new Corazon());

    let corriendo = false;
    let rafId = null;

    function bucle() {
      if (!corriendo) return;
      ctx.clearRect(0, 0, ancho, alto);
      // De noche el canvas queda limpio: se ve el cielo estrellado de fondo
      if (temaEsDia()) {
        for (let i = 0; i < corazones.length; i++) {
          corazones[i].actualizar();
          corazones[i].dibujar();
        }
      }
      rafId = window.requestAnimationFrame(bucle);
    }

    function arrancar() { if (!corriendo) { corriendo = true; bucle(); } }
    function parar() { corriendo = false; if (rafId) window.cancelAnimationFrame(rafId); }

    // Pausa cuando la pestana no se ve: ahorra bateria en el celular
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) parar(); else arrancar();
    });

    // Reacciona al cambio de tema: limpia el canvas al pasar a noche
    window.addEventListener("betsa:tema", () => {
      if (!temaEsDia()) ctx.clearRect(0, 0, ancho, alto);
    });

    window.addEventListener("resize", ajustar);

    arrancar();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", iniciar);
  } else {
    iniciar();
  }
})();
