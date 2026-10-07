/* frases.js — rotador de frases con transicion suave.
   Responsabilidad unica: mostrar las frases del CONFIG, una a la vez.
   Tolerante a fallos: si no hay frases, no rompe. */

(function () {
  "use strict";

  function iniciar() {
    const el = document.getElementById("frase");
    const caja = document.getElementById("puntos");
    if (!el) return;

    const frases = (CONFIG && Array.isArray(CONFIG.frases)) ? CONFIG.frases.filter(Boolean) : [];
    if (!frases.length) { el.textContent = ""; return; }

    // Puntos indicadores (si hay muchos, no los dibujamos: seria ruido)
    if (caja && frases.length <= 30) {
      caja.innerHTML = "";
      frases.forEach((_, i) => {
        const p = document.createElement("i");
        if (i === 0) p.className = "on";
        caja.appendChild(p);
      });
    }

    let indice = 0;
    let ocupado = false;

    function pintarPrimera() {
      el.textContent = frases[0];
    }

    function siguiente() {
      if (ocupado) return;
      ocupado = true;

      el.classList.add("saliendo");

      window.setTimeout(() => {
        indice = (indice + 1) % frases.length;
        el.textContent = frases[indice];
        el.classList.remove("saliendo");

        if (caja) {
          const puntos = caja.children;
          for (let i = 0; i < puntos.length; i++) {
            puntos[i].className = (i === indice) ? "on" : "";
          }
        }

        ocupado = false;
      }, 550);
    }

    pintarPrimera();
    const intervalo = (CONFIG && CONFIG.intervaloFraseMs) || 5000;
    window.setInterval(siguiente, intervalo);

    // Si la pestana queda en segundo plano, los timers se acumulan.
    // Al volver, sincronizamos el indice con el reloj para no saltar frases de golpe.
    document.addEventListener("visibilitychange", () => {
      if (!document.hidden) ocupado = false;
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", iniciar);
  } else {
    iniciar();
  }
})();
