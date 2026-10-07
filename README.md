# Para Betsa

Una página web hecha a mano. Tiene **modo día y modo noche**.

---

## Cómo verla en tu computador

No necesitas instalar nada. Abre una terminal en esta carpeta y escribe:

```
python3 -m http.server 8130
```

Luego abre en el navegador: **http://localhost:8130**

(No sirve hacer doble clic en `index.html`: el navegador bloquea los archivos
locales y algunas cosas no cargarían bien.)

---

## Cómo cambiar el contenido

**Todo el texto vive en un solo archivo: `js/config.js`.**

Ábrelo con cualquier editor de texto y cambia lo que quieras:

| Qué quieres cambiar | Dónde está en `js/config.js` |
|---|---|
| La fecha en que empezaron | `fechaInicio` |
| El nombre de ella | `nombre` |
| El texto de arriba ("Desde el...") | `kicker` |
| El subtítulo de la portada | `subtitulo` |
| La carta | `carta.parrafos` |
| La firma de la carta | `carta.firma` |
| Las frases que rotan | `frases` |
| Cada cuánto cambia la frase | `intervaloFraseMs` |
| La cantidad de corazones | `particulas.cantidad` |

Ejemplo:

```js
fechaInicio: "2026-01-20T00:00:00",
nombre: "Betsita bella",
```

**Importante:** la fecha va en formato `"AAAA-MM-DDTHH:MM:SS"` y con la hora local.

---

## Qué falta (para cuando tengas el material)

Al final de `js/config.js` hay dos lugares preparados y vacíos:

```js
fotos: [],      // ej: [{ src:"img/uno.jpg", pie:"Nuestro primer viaje" }]
musica: null    // ej: { src:"audio/cancion.mp3", titulo:"Nuestra canción" }
```

Cuando tengas fotos o música, se activan ahí. **No hay que reescribir nada más.**

---

## Cómo está organizado

```
index.html          La página principal
NO.html             La pantalla del secreto (los 20 clics)
js/config.js        TODO el contenido editable  <-- empieza por aquí
js/tema.js          El botón de día / noche
js/tiempo.js        Los contadores de tiempo
js/frases.js        El rotador de frases
js/carta.js         Pinta la carta
js/secreto.js       La lógica de los 20 clics y el confetti
js/particulas.js    Los corazones que flotan (solo de día)
```

---

## Cosas que se pueden ajustar

- **El botón de día/noche** está arriba a la derecha.
- **También funciona la tecla "d"** en el computador para alternar.
- Si ella nunca toca el botón, la página **sigue el tema de su teléfono**
  (si lo tiene en oscuro, parte oscura).
- Si cambia el tema, **se recuerda** la próxima vez que entre.

---

## Detalles técnicos

- Sin frameworks. HTML, CSS y JavaScript a secas.
- Los temas son **variables CSS**: el modo noche solo cambia colores, no estructura.
- Los corazones flotan **solo de día**; de noche se ve un cielo estrellado.
- Las animaciones se pausan cuando la pestaña no se ve (ahorra batería).
- Respeta `prefers-reduced-motion` para quien prefiere menos movimiento.

---

## Publicar en Vercel

El archivo `vercel.json` ya está configurado. Al conectar el repositorio,
Vercel lo despliega solo:

1. Entra a https://vercel.com con tu cuenta de GitHub.
2. "Add New..." → "Project" → elige el repositorio `betsa`.
3. Framework Preset: **Other** (no es un proyecto con build).
4. Deploy.

Listo. Cada vez que subas cambios al repositorio, Vercel los publica solo.
