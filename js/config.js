/* ==========================================================================
   config.js — TODO LO QUE PUEDES CAMBIAR SIN TOCAR LA LOGICA
   --------------------------------------------------------------------------
   Edita solo este archivo. Los demas solo lo leen.
   ========================================================================== */

const CONFIG = {

  // ---- FECHAS ------------------------------------------------------------
  // Formato: "AAAA-MM-DDTHH:MM:SS"  (hora local de tu PC)
  fechaInicio: "2026-01-20T00:00:00",

  // Texto que aparece arriba del titulo
  kicker: "Desde el 20 de enero de 2026",

  // ---- NOMBRES -----------------------------------------------------------
  nombre: "Betsita bella",
  titulo: "Para mi",
  subtitulo: "Esta página es solo para ti. Para que leas y recuerdes nuestras cosas lindas.",

  // ---- CARTA -------------------------------------------------------------
  // Texto del autor. No reescribir.
  carta: {
    parrafos: [
      "Hola mi ardillita bella hermosa preciosa. Tal vez estés aquí para recordar, tal vez porque estás triste. Y si es así, déjame contarte que te amo muchísimo, que siempre me esforzaré para estar a tu lado, que no dudes al pedirme ni un besito.",
      "Te amo Betsa, eres muy especial para mí y nuestros recuerdos perdurarán para siempre.",
      "Si tienes miedo de olvidar, aquí estarán nuestros recuerdos, todo el amor que sentí junto a ti y nuevas experiencias que vivimos juntos.",
      "Te amo mucho, Betsa."
    ],
    firma: "Con todo mi amor",
    fecha: "" // si lo dejas vacío, se pone la fecha de hoy automáticamente
  },

  // ---- FRASES ------------------------------------------------------------
  // Se muestran de a una, en orden, y vuelven a empezar.
  // Cambiar acá: no toques js/frases.js
  intervaloFraseMs: 5000,
  frases: [
    "Mi ardillita hermosa",
    "Tu sonrisa es hermosa mi betsa",
    "Me encanta cuando eres pegajosa conmigo",
    "Cuando estoy contigo olvido el dolor",
    "Me haces feliz incluso en días difíciles",
    "Sin importar las dificultades que tú estés a mi lado me hace sentir mejor motivándome a seguir adelante",
    "A pesar de sufrir todos los días por mi condición me haces feliz y quiero seguir adelante por ti",
    "Tus bellos ojos me cautivan a ser un mejor hombre para ti",
    "Desde que te conocí puedo disfrutar de la vida teniéndote a mi lado",
    "Sigues aquí? Mejor mándame un mensaje dándome muchos besitos",
    "Me encanta tocarte y acariciarte, me hace sentir muy bien",
    "Adoro que disfrutes de mí, siempre me esfuerzo mucho para ti",
    "Te amo tanto que cada día combato contra mis ganas de acabar con todo con el dolor que me conlleva a vivir cada día, aun así me haces disfrutar la vida con tan solo tu presencia",
    "Eres muy especial para mí, tanto que doy todo de mí solo para ti",
    "Esa carita bella que tú tienes me encanta",
    "Es muy lindo de tu parte que poco a poco me empieces a amar más profundamente desde que me conociste",
    "Calmas el dolor de mi alma...",
    "Tiendes a darme felicidad inclusive si tú estás triste",
    "Eres atenta conmigo",
    "Es muy lindo que seas considerada conmigo",
    "Me encanta que te preocupes por mí",
    "Siempre me voy a preocupar y dar toda la atención posible al amor de mi vida",
    "Si sigues leyendo mis frases quiero que sepas que te amo mucho mi amorcito",
    "A veces me sorprende que me ames tanto, es muy lindo de tu parte",
    "Muchas gracias por darme tu tiempo",
    "Muchas gracias por querer tener un futuro conmigo mi amorcito",
    "Todas las cosas que tú dices y haces por mí yo las valoro muchísimo, cada detalle lo trataré con mucho amor",
    "Mi corazoncito de melón",
    "Mi momento favorito de la primera vez que fuimos a Fantasilandia fue cuando estuvimos solos en el pasto riéndonos del tordo calvo",
    "Sabes muy bien que mi corazón te pertenece solo a ti...",
    "Wow, sigues leyendo los textos mi amor jajaja",
    "Esta página la hice con todo el amor que te tengo",
    "Ahora mismo la estoy haciendo en llamada mientras tú estás durmiendo jajajaj",
    "Descansa mi amorcito <3",
    "Incluso si estoy cansado seguiré esforzándome para darte lo mejor de mí",
    "Fue tan lindo ver tus lindos ojitos llorosos por ir al colegio para acompañarte",
    "No te rías, mi teclado no tiene eñe",
    "Me esforzaré por asistir todos los días que pueda para acompañarte",
    "Si llegaste hasta aquí estás por el final",
    "Haré un truco de magia...",
    "Y ahora se van a repetir todos los textos, porque sí"
  ],

  // ---- FONDO -------------------------------------------------------------
  particulas: {
    activo: true,
    cantidad: 22
  },

  // ---- CONEXIONES FUTURAS (todavia no usadas) ----------------------------
  // Cuando tengas el material, se activan sin reescribir nada.
  fotos: [],      // ej: [{ src:"img/uno.jpg", pie:"Nuestro primer viaje" }]
  musica: null    // ej: { src:"audio/cancion.mp3", titulo:"Nuestra canción" }
};
