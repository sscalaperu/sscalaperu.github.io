const $body = document.getElementById('body');


const header = document.getElementById("header");
const footer = document.getElementById("footer");
header.innerHTML = headerHtml;
footer.innerHTML = footerHtml;



function getHomeHtml() {
    const secciones = [
        typeof inicioHtml !== "undefined" ? inicioHtml : "",
        typeof nosotrosHtml !== "undefined" ? nosotrosHtml : "",
        typeof serviciosHtml !== "undefined" ? serviciosHtml : "",
        typeof proyectosHtml !== "undefined" ? proyectosHtml : "",
        typeof certificacionesHtml !== "undefined" ? certificacionesHtml : "",
        typeof clientesHtml !== "undefined" ? clientesHtml : "",
        typeof alianzaHtml !== "undefined" ? alianzaHtml : ""
    ];

    return secciones.join("");
}

const main = document.getElementById("main");


const RUTAS_HOME = ["", "inicio", "clientes", "nosotros", "proyectos", "servicios"];


let homeMontado = false;

async function router() {
    const hash = window.location.hash || "#/";
    const [rutaCompleta, query] = hash.replace("#/", "").split("?");
    const ruta = rutaCompleta;

    const params = new URLSearchParams(query);
    const id = params.get("id");


    const rutasConocidas = ["", "inicio", "clientes", "nosotros", "proyectos", "servicios", "contacto", "validar"];
    const esRutaConocida = rutasConocidas.includes(ruta);
    header.classList.toggle("dark", ruta === "contacto" || ruta === "validar" || !esRutaConocida);

    if (RUTAS_HOME.includes(ruta)) {

        if (!homeMontado) {
            main.innerHTML = getHomeHtml();
            homeMontado = true;

            initHeroSlider();
            initCounters();
            renderValores();
            renderCert();
            renderProy();
            initProyectos();
            actAnio();
        }

        $body.classList.remove("movC");
        scrollASeccion(ruta === "" ? "inicio" : ruta);

    } else if (ruta === "contacto") {

        homeMontado = false;
        main.innerHTML = conctactoForm;
        $body.classList.add("movC")

        cargarCaptchaWeb3Forms();

        scrollAlInicioSeccion("contacto");

    } else if (ruta === "validar") {

        homeMontado = false;
        main.innerHTML = certVal;
        $body.classList.add("movC")

        // VALIDACIÓN AUTOMÁTICA
        if (id) {
            try {
              await window.validarCertificado(id);;
            } catch (error) {
                console.error("Error al ejecutar la validación:", error);
            }
        }
    } else {
        homeMontado = false;
        main.innerHTML = error404;
        $body.classList.add("movC")
    }
}


window.addEventListener("hashchange", router);
window.addEventListener("load", router);


let idAnimacionActiva = 0;

function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function scrollSuaveA(destinoY, duracionMs, alTerminar) {
    const miId = ++idAnimacionActiva;

    const inicioY = window.scrollY;
    const distancia = destinoY - inicioY;


    const htmlEl = document.documentElement;
    const scrollBehaviorPrevio = htmlEl.style.scrollBehavior;
    htmlEl.style.scrollBehavior = "auto";

    const restaurarYTerminar = () => {
        htmlEl.style.scrollBehavior = scrollBehaviorPrevio;
        if (miId === idAnimacionActiva && typeof alTerminar === "function") {
            alTerminar();
        }
    };

    if (Math.abs(distancia) < 1) {
        restaurarYTerminar();
        return;
    }

    const inicioTiempo = performance.now();

    function paso(ahora) {
        if (miId !== idAnimacionActiva) return; 

        const transcurrido = ahora - inicioTiempo;
        const progreso = Math.min(transcurrido / duracionMs, 1);
        const y = inicioY + distancia * easeInOutCubic(progreso);

        window.scrollTo(0, y);

        if (progreso < 1) {
            requestAnimationFrame(paso);
        } else {
            restaurarYTerminar();
        }
    }

    requestAnimationFrame(paso);
}


function scrollASeccion(id) {
    if (!id || id === "") return;

    const scrollDestino = typeof calcularScrollDestino === "function"
        ? calcularScrollDestino(id)
        : null;

    if (typeof aplicarTemaInmediato === "function") {
        if (scrollDestino !== null) {
            aplicarTemaInmediato(id, scrollDestino);
        } else {
            aplicarTemaInmediato(id);
        }
    }

    if (typeof bloquearTemaHeader === "function") bloquearTemaHeader();

    setTimeout(() => {

        const elemento = document.getElementById(id);
        if (!elemento) {
            if (typeof desbloquearTemaHeader === "function") desbloquearTemaHeader();
            return;
        }


        const posicionDestino = scrollDestino !== null
            ? scrollDestino
            : (() => {
                const headerEl = document.querySelector(".header");
                const headerHeight = headerEl ? headerEl.getBoundingClientRect().height : 0;
                return elemento.getBoundingClientRect().top + window.scrollY - headerHeight;
            })();

        scrollSuaveA(posicionDestino, 550, () => {
            if (typeof desbloquearTemaHeader === "function") desbloquearTemaHeader();
        });

    }, 50);
}


function scrollAlInicioSeccion(idSeccion) {

    setTimeout(() => {
        const elemento = document.getElementById(idSeccion);

        const headerEl = document.querySelector(".header");
        const headerHeight = headerEl ? headerEl.getBoundingClientRect().height : 0;

        const destino = elemento
            ? Math.max(elemento.getBoundingClientRect().top + window.scrollY - headerHeight, 0)
            : 0;

        if (Math.abs(window.scrollY - destino) < 2) {

            window.scrollTo(0, destino);
            return;
        }

        scrollSuaveA(destino, 550);
    }, 50);
}

window.addEventListener('scroll', ()=>{
	$body.classList.toggle('scroll', window.scrollY > 20)
})

function renderValores() {
  const valInc = document.getElementById("val_inc");

  if (!valInc) return; 

  valInc.innerHTML = ""; 

  listaVal.forEach(val => {
    const svg = `
      <div class="val_card">
        <svg class="nos_icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path fill="currentColor" d="${val.path}"></path>
        </svg>
        <span>${val.nombre}</span>
      </div>
    `;

    valInc.insertAdjacentHTML("beforeend", svg);
  });
}
function renderCert() {

const contenedor = document.getElementById("certificaciones");

if (!contenedor) return; 

listaCert.forEach(cert => {
    const svg = `
        <a href="${cert.enlace}" target="_blank">
        <svg class="cert_icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <path fill="currentColor" d="${cert.path}"></path>
        </svg>
        </a>
    `;
    contenedor.insertAdjacentHTML("beforeend", svg);
  });
}


function renderProy(){
    const clientTrack = document.getElementById("clien_cont");

    if (!clientTrack) return; 

    clientTrack.innerHTML = ""; 

    imgClientes.forEach(img => {
      clientTrack.innerHTML += `<img src="./assets/imagenes/clientes/${img}" class="clien_img">`;
    });

    clientTrack.innerHTML += clientTrack.innerHTML; 

    initClientesLoop(clientTrack);
}


function initClientesLoop(track) {
    const wrapper = track.parentElement;
    if (!wrapper) return;

    const SPEED_PX_S = 55; 

    let offset = 0;
    let paused = false;
    let lastTime = null;
    let halfWidth = track.scrollWidth / 2;


    track.querySelectorAll("img").forEach(img => {
      if (!img.complete) {
        img.addEventListener("load", () => {
          halfWidth = track.scrollWidth / 2;
        });
      }
    });

    wrapper.addEventListener("mouseenter", () => { paused = true; });
    wrapper.addEventListener("mouseleave", () => { paused = false; });

    function step(timestamp) {
      if (lastTime === null) lastTime = timestamp;
      const deltaSeconds = (timestamp - lastTime) / 1000;
      lastTime = timestamp;

      if (!paused && halfWidth > 0) {
        offset = (offset + SPEED_PX_S * deltaSeconds) % halfWidth;
      }

      track.style.transform = `translate3d(${-offset}px, 0, 0)`;
      requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
}

// Cargar (o recargar) el widget de captcha de Web3Forms
// Se necesita reinyectar el script cada vez que el formulario de contacto
// se vuelve a montar en el DOM, porque el script solo detecta los
// elementos .h-captcha que existen en el momento en que se ejecuta.
function cargarCaptchaWeb3Forms() {
    const anterior = document.getElementById('web3forms-captcha-script');
    if (anterior) anterior.remove();

    const script = document.createElement('script');
    script.id = 'web3forms-captcha-script';
    script.src = 'https://web3forms.com/client/script.js';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
}

// Actualizar Año
function actAnio(){
  const $anhoActual = document.getElementById('anhoActual');

  if (!$anhoActual) return; // seguridad

  $anhoActual.innerHTML = new Date().getFullYear();
}