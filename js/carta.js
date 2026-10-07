/* carta.js — pinta la carta desde CONFIG.carta.
   Lee CONFIG, no decide nada. */

(function () {
  "use strict";

  function iniciar() {
    const cont = document.getElementById("cartaTexto");
    if (!cont || !CONFIG || !CONFIG.carta) return;

    cont.innerHTML = "";

    const parrafos = CONFIG.carta.parrafos || [];
    parrafos.forEach((texto) => {
      const p = document.createElement("p");
      p.textContent = texto;   // textContent: seguro ante HTML en el contenido
      cont.appendChild(p);
    });

    const firma = document.getElementById("cartaFirma");
    if (firma) firma.textContent = CONFIG.carta.firma || "";

    const fecha = document.getElementById("cartaFecha");
    if (fecha) {
      if (CONFIG.carta.fecha) {
        fecha.textContent = CONFIG.carta.fecha;
      } else {
        const meses = ["enero","febrero","marzo","abril","mayo","junio",
                       "julio","agosto","septiembre","octubre","noviembre","diciembre"];
        const hoy = new Date();
        fecha.textContent = `${hoy.getDate()} de ${meses[hoy.getMonth()]} de ${hoy.getFullYear()}`;
      }
    }

    // Kicker del hero, tambien desde config
    const kicker = document.querySelector(".kicker");
    if (kicker && CONFIG.kicker) kicker.textContent = CONFIG.kicker;

    const h1 = document.querySelector(".hero h1");
    if (h1 && CONFIG.nombre) {
      h1.innerHTML = "";
      h1.appendChild(document.createTextNode((CONFIG.titulo || "Para mi") + " "));
      const em = document.createElement("em");
      em.textContent = CONFIG.nombre;
      h1.appendChild(em);
    }

    const sub = document.querySelector(".hero .sub");
    if (sub && CONFIG.subtitulo) sub.textContent = CONFIG.subtitulo;
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", iniciar);
  } else {
    iniciar();
  }
})();
