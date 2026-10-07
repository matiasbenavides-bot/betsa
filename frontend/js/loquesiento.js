
const frases = [
    "mi ardillita hermosa"
    "Tu sonrisa es hermosa mi betsa",
    "Me encanta cuando eres pegajosa conmigo",
    "Cuando estoy contigo olvido el dolor",
    "Me haces feliz incluso en días difíciles",
    "Sin importar las dificultades que tu estes a mi lado me hace sentir mejor motivandome a seguir adelante",
    "A pesar de sufrir todos los dias por mi condicion me haces feliz y quiero seguir adelante por ti",
    "Tus bellos ojos me cautivan a ser un mejor hombre para ti",
    "Desde que te conoci puedo disfrutar de la vida teniendote a mi lado",
    "sigues aqui? mejor mandame un mensaje dandome muchos besitoos"
    "Me encanta tocarte y acariciarte, me hace sentir muy bien",
    "Adoro que disfrutes de mi, siempre me esfuerzo mucho para ti",
    "Te amo tanto que cada dia combato contra mis ganas de acabar con todo con el dolor que me conlleva a vivir cada dia, aun asi me haces disfrutar la vida con tan solo tu presencia",
    "Eres muy especial para mi, tanto que doy todo de mi solo para ti",
    "Esa carita bella que tu tienes me encanta",
    "Es muy lindo de tu parte que poco a poco me empieces a amar mas profundamente desde que me conociste",
    "Calmas el dolor de mi alma...",
    "Tiendes a darme felicidad inclusive si tu estas triste",
    "Eres atenta conmigo",
    "Es muy lindo que seas considerada conmigo",
    "Me encanta que te preocupes por mi",
    "Siempre me voy a preocupar y dar toda la atencion posible al amor de mi vida",
    "Si sigues leyendo mis frases quiero que sepas que te amo mucho mi amorcito",
    "A veces me sorprende que me ames tanto, es muy lindo de tu parte",
    "Muchas gracias por darme tu tiempo",
    "Muchas gracias por querer tener un futuro conmigo mi amorcito",
    "Todas las cosas que tu dices y haces por mi yo las valoro muchisimo, cada detalle lo tratare con mucho amor",
    "Mi corazoncito de melon",
    "Mi momento favorito de la primera vez que fuimos al fantasilandia fue cuando estuvimos solos en el pasto riendonos del tordo calvo",
    "Sabes muy bien que mi corazon te pertenece solo a ti...",
    "wow, sigues leyendo los textos mi amor jajaja",
    "Esta pagina la hice con todo el amor que te tengo",
    "Ahora mismo la estoy haciendo en llamada mientras tu estas durmiendo jajajaj",
    "Descansa mi amorcito <3",
    "incluso si estoy cansado seguire esforzandome para darte lo mejor de mi",
    "Fue tan lindo ver tus lindos ojitos llorosos por ir al colegio para acompanarte",
    "no te rias, mi teclado no tiene enie o sea la n con serpiente arriba",
    "me esforzare por asistir todos los dias que pueda para acompaniarte",
    "NO TENGO ENE CON SERPIENTE ARRIBA",
    "Si llegaste hasta aqui estas por el final",
    "Hare un truco de magia...",
    "Ahora se van a repetir todos los textos pq si"
    
];

let indice = 0;

function cambiarFrase() {
    document.getElementById("frase").innerText = frases[indice];

    indice++;

    if (indice >= frases.length) {
        indice = 0;
    }
}

// cambiar cada 4 segundos
setInterval(cambiarFrase, 5000);

// mostrar la primera inmediatamente
cambiarFrase();
function mostrarSorpresa() {
    const elemento = document.getElementById("sorpresa");

    elemento.style.display = "block";
}
