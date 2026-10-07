/* tiempo.js — contadores, sin bugs, sin supuestos.
   Responsabilidad unica: calcular y pintar el tiempo juntos.
   No conoce el HTML mas alla de los ids que le indica index.html. */

(function () {
  "use strict";

  const MS = { seg: 1000, min: 60000, hora: 3600000, dia: 86400000 };

  /** Suma meses respetando el fin de mes (31 ene + 1 mes = 28/29 feb).
   *  Date.setMonth por si solo desborda (31 ene +1 -> 3 mar). Esto lo evita. */
  function sumarMeses(fecha, n) {
    const d = new Date(fecha.getTime());
    const diaOriginal = d.getDate();
    d.setDate(1);
    d.setMonth(d.getMonth() + n);
    const ultimoDia = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
    d.setDate(Math.min(diaOriginal, ultimoDia));
    return d;
  }

  function sumarAnios(fecha, n) {
    const d = new Date(fecha.getTime());
    const mes = d.getMonth();
    const dia = d.getDate();
    d.setFullYear(d.getFullYear() + n);
    if (d.getMonth() !== mes) d.setDate(0); // 29 feb -> 28 feb
    return d;
  }

  /** Descompone el tiempo entre dos fechas en anios/meses/dias/horas/min/seg
   *  Algoritmo: avanza meses completos, luego dias completos, luego reloj.
   *  Evita la trampa de promediar meses (un mes no son 30 dias). */
  function descomponer(inicio, ahora) {
    let cursor = new Date(inicio.getTime());

    let anios = 0;
    let siguiente = sumarAnios(cursor, 1);
    while (siguiente <= ahora) { anios++; cursor = siguiente; siguiente = sumarAnios(cursor, 1); }

    let meses = 0;
    siguiente = sumarMeses(cursor, 1);
    while (siguiente <= ahora) { meses++; cursor = siguiente; siguiente = sumarMeses(cursor, 1); }

    let resto = ahora - cursor;

    const dias = Math.floor(resto / MS.dia);
    resto -= dias * MS.dia;
    const horas = Math.floor(resto / MS.hora);
    resto -= horas * MS.hora;
    const minutos = Math.floor(resto / MS.min);
    resto -= minutos * MS.min;
    const segundos = Math.floor(resto / MS.seg);

    const totalDias = Math.floor((ahora - inicio) / MS.dia);
    const totalHoras = Math.floor((ahora - inicio) / MS.hora);

    return { anios, meses, dias, horas, minutos, segundos, totalDias, totalHoras };
  }

  /** Proximo aniversario mensual (dia N del mes que viene).
   *  Devuelve cuantos meses cumplen Y la fecha objetivo. */
  function proximoMensual(inicio, ahora) {
    const finDeMes = new Date(inicio.getFullYear(), inicio.getMonth() + 1, 0).getDate();
    const diaAncla = Math.min(inicio.getDate(), finDeMes);

    let objetivo = sumarMeses(inicio, 1);
    let numero = 1;
    while (objetivo <= ahora) { numero++; objetivo = sumarMeses(inicio, numero); }
    return { fecha: objetivo, numero, diaAncla };
  }

  /** Proximo aniversario anual. numero = cuantos anios cumple esa fecha. */
  function proximoAnual(inicio, ahora) {
    let numero = 1;
    let objetivo = sumarAnios(inicio, 1);
    while (objetivo <= ahora) { numero++; objetivo = sumarAnios(inicio, numero); }
    return { fecha: objetivo, numero };
  }

  function cuentaAtras(objetivo, ahora) {
    let diff = objetivo - ahora;
    if (diff < 0) diff = 0;
    const dias = Math.floor(diff / MS.dia);
    const horas = Math.floor((diff % MS.dia) / MS.hora);
    const minutos = Math.floor((diff % MS.hora) / MS.min);
    const segundos = Math.floor((diff % MS.min) / MS.seg);
    return { dias, horas, minutos, segundos };
  }

  function formatoLargo(f) {
    const meses = ["enero","febrero","marzo","abril","mayo","junio",
                   "julio","agosto","septiembre","octubre","noviembre","diciembre"];
    return `${f.getDate()} de ${meses[f.getMonth()]} de ${f.getFullYear()}`;
  }

  const $ = (id) => document.getElementById(id);
  const pinta = (id, valor) => { const el = $(id); if (el) el.textContent = valor; };

  let ultimoSegundo = -1;

  function refrescar() {
    const inicio = new Date(CONFIG.fechaInicio);
    const ahora = new Date();

    // Solo repinta si cambio el segundo (evita trabajo inutil)
    if (ahora.getSeconds() === ultimoSegundo) return;
    ultimoSegundo = ahora.getSeconds();

    const t = descomponer(inicio, ahora);

    pinta("d-meses", t.anios * 12 + t.meses);
    pinta("d-semanas", Math.floor(t.totalDias / 7));
    pinta("d-dias", t.totalDias);
    pinta("d-horas", t.totalHoras);
    pinta("d-min", Math.floor(t.totalHoras * 60) + t.minutos);
    pinta("d-seg", Math.floor(t.totalHoras * 3600) + t.minutos * 60 + t.segundos);

    const nota = $("notaTiempo");
    if (nota) {
      const partes = [];
      if (t.anios) partes.push(t.anios + (t.anios === 1 ? " año" : " años"));
      if (t.meses) partes.push(t.meses + (t.meses === 1 ? " mes" : " meses"));
      partes.push(t.dias + (t.dias === 1 ? " día" : " días"));
      nota.textContent = `Exactamente ${partes.join(", ")} — y ${t.horas} h ${t.minutos} min ${t.segundos} s.`;
    }

    const m = proximoMensual(inicio, ahora);
    const cm = cuentaAtras(m.fecha, ahora);
    pinta("regresivoMensual", `${cm.dias}d ${cm.horas}h ${cm.minutos}m ${cm.segundos}s`);
    const pieM = $("pieMensual");
    if (pieM) pieM.textContent = `Mes #${m.numero} · ${formatoLargo(m.fecha)}`;

    const a = proximoAnual(inicio, ahora);
    const ca = cuentaAtras(a.fecha, ahora);
    pinta("regresivoAnual", `${ca.dias}d ${ca.horas}h ${ca.minutos}m ${ca.segundos}s`);
    const pieA = $("pieAnual");
    if (pieA) pieA.textContent = `Aniversario #${a.numero} · ${formatoLargo(a.fecha)}`;
  }

  // Arranca de inmediato (aqui estaba el bug: el original esperaba 1s y se veia vacio)
  function iniciar() {
    refrescar();
    setInterval(refrescar, 1000);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", iniciar);
  } else {
    iniciar();
  }
})();
