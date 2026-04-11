const fechaInicio = new Date("2026-01-20T00:00:00");
function calcularTiempoExacto(inicio, ahora) {
    let años = 0;
    let meses = 0;

    let temp = new Date(inicio);

    // Calcular años
    while (true) {
        let siguiente = new Date(temp);
        siguiente.setFullYear(siguiente.getFullYear() + 1);

        if (siguiente <= ahora) {
            años++;
            temp = siguiente;
        } else break;
    }

    // Calcular meses
    while (true) {
        let siguiente = new Date(temp);
        siguiente.setMonth(siguiente.getMonth() + 1);

        if (siguiente <= ahora) {
            meses++;
            temp = siguiente;
        } else break;
    }

    // Diferencia restante en ms
    let diferencia = ahora - temp;

    const totalSegundos = Math.floor(diferencia / 1000);

    const semanas = Math.floor(totalSegundos / (60 * 60 * 24 * 7));
    const dias = Math.floor((totalSegundos % (60 * 60 * 24 * 7)) / (60 * 60 * 24));
    const horas = Math.floor((totalSegundos % (60 * 60 * 24)) / (60 * 60));
    const minutos = Math.floor((totalSegundos % (60 * 60)) / 60);
    const segundos = totalSegundos % 60;

    return {
        años,
        meses,
        semanas,
        dias,
        horas,
        minutos,
        segundos
    };
}

function actualizarContador() {
    const ahora = new Date();
    const t = calcularTiempoExacto(fechaInicio, ahora);

    document.getElementById("contador").innerText =
        `Llevamos ${t.años} años, ${t.meses} meses, ${t.semanas} semanas, ${t.dias} días, ${t.horas}h ${t.minutos}m ${t.segundos}s ❤️`;
}

actualizarContador();
setInterval(actualizarContador, 1000);


function obtenerProximoMensualNumero(inicio) {
    const ahora = new Date();
    let temp = new Date(inicio);
    let meses = 0;

    while (temp <= ahora) {
        temp.setMonth(temp.getMonth() + 1);
        meses++;
    }

    return { fecha: temp, numero: meses };
}

function obtenerProximoAnualNumero(inicio) {
    const ahora = new Date();
    let temp = new Date(inicio);
    let años = 0;

    while (temp <= ahora) {
        temp.setFullYear(temp.getFullYear() + 1);
        años++;
    }

    return { fecha: temp, numero: años };
}

function calcularRegresivo(fechaObjetivo) {
    const ahora = new Date();
    let diff = fechaObjetivo - ahora;

    if (diff < 0) diff = 0;

    const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutos = Math.floor((diff / (1000 * 60)) % 60);
    const segundos = Math.floor((diff / 1000) % 60);

    return { dias, horas, minutos, segundos };
}

function actualizarRegresivos() {
    const mensual = obtenerProximoMensualNumero(fechaInicio);
    const anual = obtenerProximoAnualNumero(fechaInicio);

    const tMensual = calcularRegresivo(mensual.fecha);
    const tAnual = calcularRegresivo(anual.fecha);

    document.getElementById("regresivoMensual").innerText =
        `Faltan ${tMensual.dias} días, ${tMensual.horas}h ${tMensual.minutos}m ${tMensual.segundos}s para nuestro mes #${mensual.numero} 💕`;

    document.getElementById("regresivoAnual").innerText =
        `Faltan ${tAnual.dias} días, ${tAnual.horas}h ${tAnual.minutos}m ${tAnual.segundos}s para nuestro aniversario #${anual.numero} 🎉`;
}

setInterval(actualizarRegresivos, 1000);

