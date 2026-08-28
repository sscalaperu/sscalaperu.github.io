const proyectosHtml = `
  <section id="proyectos" class="proy">
    <div class="proy_head">
      <span class="proy_eyebrow">Nuestro trabajo</span>
      <h2 class="proy_titulo">Proyectos Culminados</h2>
    </div>

    <div class="proy_carrusel" id="proyCarrusel">
      <div class="proy_track" id="proyTrack"></div>

      <button class="proy_flecha proy_flechaAnt" id="proyFlechaAnt" aria-label="Proyecto anterior">
        <i class="fa-solid fa-chevron-left"></i>
      </button>
      <button class="proy_flecha proy_flechaSig" id="proyFlechaSig" aria-label="Proyecto siguiente">
        <i class="fa-solid fa-chevron-right"></i>
      </button>
    </div>
  </section>

  <div class="lightbox" id="proyLightbox">
    <div class="lightbox_fondo" id="proyLightboxFondo"></div>

    <div class="lightbox_caja" id="proyLightboxCaja">
      <button class="lightbox_cerrar" id="lightboxCerrar" aria-label="Cerrar">
        <i class="fa-solid fa-xmark"></i>
      </button>

      <div class="lightbox_imgWrap">
        <img class="lightbox_img" id="lightboxImg" src="" alt="">
      </div>

      <div class="lightbox_info">
        <span class="lightbox_tipo" id="lightboxTipo"></span>
        <h3 class="lightbox_titulo" id="lightboxTitulo"></h3>
        <div class="lightbox_meta">
          <span id="lightboxUbicacion"><i class="fa-solid fa-location-dot"></i> </span>
          <span id="lightboxAnio"><i class="fa-regular fa-calendar"></i> </span>
        </div>
        <p class="lightbox_cliente" id="lightboxCliente"></p>
        <p class="lightbox_desc" id="lightboxDescripcion"></p>
        <p class="lightbox_detalle" id="lightboxDetalle"></p>
      </div>

      <div class="lightbox_nav">
        <button class="lightbox_navBtn" id="lightboxAnterior" aria-label="Proyecto anterior">
          <i class="fa-solid fa-arrow-left"></i>
        </button>
        <button class="lightbox_navBtn" id="lightboxSiguiente" aria-label="Proyecto siguiente">
          <i class="fa-solid fa-arrow-right"></i>
        </button>
      </div>
    </div>
  </div>
`;

/* ---------------------------------------------------------
   1. ESTADO
   --------------------------------------------------------- */
const proyEstado = {
  actual: 0,
  total: 0,
  autoplayId: null,
  autoplayMs: 4000,      
  reinicioMs: 3800,      
  reinicioTimeoutId: null,
  lightboxAbierto: false
};

const RUTA_IMG_PROY = "./assets/imagenes/proyectos/";

/* ---------------------------------------------------------
   2. UTILIDAD — evita inyectar HTML sin escapar desde los datos
   --------------------------------------------------------- */
function escaparHtml(valor) {
  if (valor === undefined || valor === null) return "";
  return String(valor)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/* ---------------------------------------------------------
   3. GENERACIÓN DE TARJETAS
   --------------------------------------------------------- */
function tarjetaProyectoHtml(proy, i) {
  const titulo = escaparHtml(proy.titulo);
  const descripcionBreve = escaparHtml(proy.descripcion || proy.tipo || "");

  return `
    <article class="proy_tarjeta" data-index="${i}">
      <div class="proy_tarjetaImgWrap">
        <img
          class="proy_tarjetaImg"
          src="${RUTA_IMG_PROY}${escaparHtml(proy.img)}"
          alt="${titulo}"
          loading="${i === 0 ? "eager" : "lazy"}"
          draggable="false"
        >
      </div>
      <div class="proy_tarjetaBody">
        <h3 class="proy_tarjetaTitulo">${titulo}</h3>
        ${descripcionBreve ? `<p class="proy_tarjetaDesc">${descripcionBreve}</p>` : ""}
        <button class="proy_verMas" data-index="${i}" aria-label="Ver más sobre ${titulo}">
          Ver más <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
        </button>
      </div>
    </article>
  `;
}

function renderProyectosCarrusel() {
  const track = document.getElementById("proyTrack");
  if (!track || typeof listaProy1 === "undefined") return;

  proyEstado.total = listaProy1.length;
  proyEstado.actual = 0;

  track.innerHTML = listaProy1.map((proy, i) => tarjetaProyectoHtml(proy, i)).join("");
}

/* ---------------------------------------------------------
   4. POSICIONAMIENTO — tarjeta activa centrada, vecinas asomando
      a los lados con escala/opacidad/profundidad decrecientes.
   --------------------------------------------------------- */
function calcularOffset(indice, actual, total) {
  let diff = indice - actual;
  if (diff > total / 2) diff -= total;
  if (diff < -total / 2) diff += total;
  return diff;
}

function actualizarCarrusel() {
  const tarjetas = document.querySelectorAll(".proy_tarjeta");

  tarjetas.forEach(tarjeta => {
    const i = Number(tarjeta.dataset.index);
    const diff = calcularOffset(i, proyEstado.actual, proyEstado.total);
    const abs = Math.abs(diff);

    tarjeta.classList.toggle("proy_tarjeta--activa", diff === 0);


    if (abs > 3) {
      tarjeta.style.opacity = "0";
      tarjeta.style.pointerEvents = "none";
      tarjeta.style.transform = `translate(-50%, -50%) translateX(${diff > 0 ? 640 : -640}px) scale(0.5)`;
      tarjeta.style.zIndex = "0";
      return;
    }

    const escala = diff === 0 ? 1 : Math.max(0.6, 1 - abs * 0.13);
    const traslado = diff * 226;

    const brillo = diff === 0 ? 1 : Math.max(0.72, 1 - abs * 0.1);

    const desvanecido = diff === 0 ? 0 : Math.min(0.5, abs * 0.16);
    const zIndex = 50 - abs;

    tarjeta.style.opacity = "1";
    tarjeta.style.pointerEvents = "auto";
    tarjeta.style.zIndex = String(zIndex);
    tarjeta.style.filter = diff === 0 ? "none" : `brightness(${brillo})`;
    tarjeta.style.setProperty("--proy-fade-alpha", String(desvanecido));
    tarjeta.style.transform =
      `translate(-50%, -50%) translateX(${traslado}px) scale(${escala})`;
  });
}

function irAProyecto(indice) {
  if (proyEstado.total === 0) return;
  proyEstado.actual = ((indice % proyEstado.total) + proyEstado.total) % proyEstado.total;
  actualizarCarrusel();
}

function proyectoSiguiente() { irAProyecto(proyEstado.actual + 1); }
function proyectoAnterior() { irAProyecto(proyEstado.actual - 1); }

function proyectoSiguienteManual() {
  proyectoSiguiente();
  reiniciarAutoplayConRetraso();
}

function proyectoAnteriorManual() {
  proyectoAnterior();
  reiniciarAutoplayConRetraso();
}

function irAProyectoManual(indice) {
  irAProyecto(indice);
  reiniciarAutoplayConRetraso();
}

/* ---------------------------------------------------------
   5. AUTOPLAY 
   --------------------------------------------------------- */
function iniciarAutoplay() {
  detenerAutoplay();
  proyEstado.autoplayId = setInterval(() => {
    if (!proyEstado.lightboxAbierto) proyectoSiguiente();
  }, proyEstado.autoplayMs);
}

function detenerAutoplay() {
  if (proyEstado.autoplayId) clearInterval(proyEstado.autoplayId);
  proyEstado.autoplayId = null;

  if (proyEstado.reinicioTimeoutId) clearTimeout(proyEstado.reinicioTimeoutId);
  proyEstado.reinicioTimeoutId = null;
}

function reiniciarAutoplayConRetraso() {
  detenerAutoplay();
  proyEstado.reinicioTimeoutId = setTimeout(() => {
    iniciarAutoplay();
  }, proyEstado.reinicioMs);
}

/* ---------------------------------------------------------
   6. LIGHTBOX
   --------------------------------------------------------- */
function actualizarContenidoLightbox(indice) {
  const proy = listaProy1[indice];
  if (!proy) return;

  const caja = document.getElementById("proyLightboxCaja");
  caja.classList.add("lightbox_caja--cambiando");

  setTimeout(() => {
    document.getElementById("lightboxImg").src = RUTA_IMG_PROY + proy.img;
    document.getElementById("lightboxImg").alt = proy.titulo || "";
    document.getElementById("lightboxTipo").textContent = proy.tipo || "";
    document.getElementById("lightboxTitulo").textContent = proy.nombre || proy.titulo || "";
    document.getElementById("lightboxUbicacion").innerHTML =
      `<i class="fa-solid fa-location-dot"></i> ${escaparHtml(proy.ubicacion || "")}`;
    document.getElementById("lightboxAnio").innerHTML =
      `<i class="fa-regular fa-calendar"></i> ${escaparHtml(proy.anio || "")}`;
    document.getElementById("lightboxCliente").textContent = proy.cliente ? `Cliente: ${proy.cliente}` : "";
    document.getElementById("lightboxDescripcion").textContent = proy.descripcion || "";
    document.getElementById("lightboxDetalle").textContent = proy.detalle || "";

    caja.classList.remove("lightbox_caja--cambiando");
  }, 160);
}

function abrirLightbox(indice) {
  proyEstado.lightboxAbierto = true;
  proyEstado.actual = indice;
  detenerAutoplay();
  actualizarCarrusel();
  actualizarContenidoLightbox(indice);

  const lightbox = document.getElementById("proyLightbox");
  lightbox.classList.add("lightbox--activo");
  document.body.classList.add("lightbox-abierto");
}

function cerrarLightbox() {
  proyEstado.lightboxAbierto = false;
  const lightbox = document.getElementById("proyLightbox");
  lightbox.classList.remove("lightbox--activo");
  document.body.classList.remove("lightbox-abierto");
  iniciarAutoplay();
}

function lightboxSiguiente() {
  const nuevo = (proyEstado.actual + 1) % proyEstado.total;
  proyEstado.actual = nuevo;
  actualizarCarrusel();
  actualizarContenidoLightbox(nuevo);
}

function lightboxAnterior() {
  const nuevo = ((proyEstado.actual - 1) + proyEstado.total) % proyEstado.total;
  proyEstado.actual = nuevo;
  actualizarCarrusel();
  actualizarContenidoLightbox(nuevo);
}

/* ---------------------------------------------------------
   7. EVENTOS
   --------------------------------------------------------- */
function initEventosProyectos() {
  const carrusel = document.getElementById("proyCarrusel");
  const track = document.getElementById("proyTrack");
  const lightbox = document.getElementById("proyLightbox");
  const fondo = document.getElementById("proyLightboxFondo");

  if (!carrusel || !track || !lightbox) return;

  track.addEventListener("click", (e) => {
    const verMasBtn = e.target.closest(".proy_verMas");
    if (verMasBtn) {
      abrirLightbox(Number(verMasBtn.dataset.index));
      return;
    }
    const tarjeta = e.target.closest(".proy_tarjeta");
    if (tarjeta) irAProyectoManual(Number(tarjeta.dataset.index));
  });

  document.getElementById("proyFlechaAnt").addEventListener("click", proyectoAnteriorManual);
  document.getElementById("proyFlechaSig").addEventListener("click", proyectoSiguienteManual);

  carrusel.addEventListener("mouseenter", detenerAutoplay);
  carrusel.addEventListener("mouseleave", () => {
    if (!proyEstado.lightboxAbierto) iniciarAutoplay();
  });

  document.getElementById("lightboxCerrar").addEventListener("click", cerrarLightbox);
  fondo.addEventListener("click", cerrarLightbox);

  document.getElementById("lightboxSiguiente").addEventListener("click", lightboxSiguiente);
  document.getElementById("lightboxAnterior").addEventListener("click", lightboxAnterior);

  document.addEventListener("keydown", (e) => {
    if (!proyEstado.lightboxAbierto) return;
    if (e.key === "Escape") cerrarLightbox();
    if (e.key === "ArrowRight") lightboxSiguiente();
    if (e.key === "ArrowLeft") lightboxAnterior();
  });


  let resizeTimeoutId = null;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimeoutId);
    resizeTimeoutId = setTimeout(actualizarCarrusel, 150);
  });
}

/* ---------------------------------------------------------
   8. INICIALIZACIÓN 
   --------------------------------------------------------- */
function initProyectos() {
  renderProyectosCarrusel();
  initEventosProyectos();
  actualizarCarrusel();
  iniciarAutoplay();
}