/* tema.js — Control del modo dia/noche.
   Responsabilidad unica: leer, aplicar y guardar el tema.
   El HTML ya aplica el tema antes de pintar (script inline en <head>);
   este archivo solo se encarga del boton y de mantener todo sincronizado. */

(function () {
  "use strict";

  const CLAVE = "betsa-tema";
  const raiz = document.documentElement;
  const mediaNoche = window.matchMedia("(prefers-color-scheme: dark)");

  function temaActual() {
    return raiz.dataset.tema === "noche" ? "noche" : "dia";
  }

  function aplicar(tema) {
    raiz.dataset.tema = tema;

    // El color de la barra del navegador en movil acompaña al tema
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", tema === "noche" ? "#0d0810" : "#fdf3f0");

    // El boton anuncia el estado (accesibilidad)
    const boton = document.getElementById("toggleTema");
    if (boton) {
      boton.setAttribute("aria-pressed", tema === "noche" ? "true" : "false");
      boton.setAttribute(
        "aria-label",
        tema === "noche" ? "Cambiar a modo día" : "Cambiar a modo noche"
      );
    }

    // Avisar a las particulas (solo corren de dia)
    window.dispatchEvent(new CustomEvent("betsa:tema", { detail: tema }));
  }

  function guardar(tema) {
    try { localStorage.setItem(CLAVE, tema); } catch (e) { /* modo privado: no pasa nada */ }
  }

  function alternar() {
    const nuevo = temaActual() === "noche" ? "dia" : "noche";
    aplicar(nuevo);
    guardar(nuevo);
  }

  function iniciar() {
    const boton = document.getElementById("toggleTema");
    if (boton) boton.addEventListener("click", alternar);

    // Atajo de teclado: la tecla "d" alterna (util en escritorio)
    document.addEventListener("keydown", (e) => {
      if (e.key !== "d" && e.key !== "D") return;
      const t = e.target;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) return;
      alternar();
    });

    // Si el usuario nunca eligio manualmente, seguimos al sistema en vivo
    const escuchar = (e) => {
      let hayPreferencia = false;
      try { hayPreferencia = !!localStorage.getItem(CLAVE); } catch (err) { hayPreferencia = false; }
      if (hayPreferencia) return;
      aplicar(e.matches ? "noche" : "dia");
    };

    if (mediaNoche.addEventListener) mediaNoche.addEventListener("change", escuchar);
    else if (mediaNoche.addListener) mediaNoche.addListener(escuchar);

    aplicar(temaActual());
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", iniciar);
  } else {
    iniciar();
  }
})();
