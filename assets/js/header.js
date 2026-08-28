window.DEBUG_HEADER_THEME = true;

const headerHtml = `
<a class="logo_a_container" href="/">
    <div class="logo_container">
        <div class="logo_header"></div>
        <span class="logo_name">SCALA PERÚ</span>
    </div>
</a>

<nav class="nav">
    <ul class="nav_ul">
        <li class="nav_li">
            <a href="#/inicio" class="nav_link">
                INICIO
            </a>
        </li>

        <li class="nav_li">
            <a href="#/nosotros" class="nav_link">
                NOSOTROS
            </a>
        </li>

        <li class="nav_li">
            <a href="#/proyectos" class="nav_link">
                PROYECTOS
            </a>
        </li>

        <li class="nav_li">
            <a href="#/clientes" class="nav_link">
                CLIENTES
            </a>
        </li>

        <li class="nav_li">
            <a href="#/contacto" class="nav_link">
                CONTACTO
            </a>
        </li>
    </ul>
</nav>
`;


function updateScrollState() {

    const header = document.querySelector(".header");

    if (!header) return;

    header.classList.toggle("scroll", window.scrollY > 40);

}


function siguienteSeccion(el) {

    let hermano = el.nextElementSibling;

    while (hermano && hermano.tagName !== "SECTION") {
        hermano = hermano.nextElementSibling;
    }

    return hermano;

}


function getSectionTheme(header, deltaScroll) {

    const delta = deltaScroll || 0;

    const ruta = (window.location.hash || "").replace("#/", "").split("?")[0];
    const rutasConocidas = ["", "inicio", "clientes", "nosotros", "proyectos", "servicios", "contacto", "validar"];

    if (ruta === "contacto" || ruta === "validar" || !rutasConocidas.includes(ruta)) {
        return "dark";
    }

    const nosotros = document.querySelector("#nosotros");
    const proyectos = document.querySelector("#proyectos");
    const headerHeight = header.getBoundingClientRect().height;

    let theme = "light";


    if (nosotros) {

        const topNosotros = nosotros.getBoundingClientRect().top - delta;

        if (topNosotros <= headerHeight) {
            theme = "dark";
        }

    }


    if (proyectos) {

        const topProyectos = proyectos.getBoundingClientRect().top - delta;

        const siguiente = siguienteSeccion(proyectos);
        const topFinProyectos = siguiente
            ? siguiente.getBoundingClientRect().top - delta
            : proyectos.getBoundingClientRect().bottom - delta;

        const dentroDeProyectos = topProyectos <= headerHeight && topFinProyectos > headerHeight;

        if (dentroDeProyectos) {
            theme = "light";
        }

        // === DEBUG TEMPORAL — quitar cuando quede resuelto ===
        if (window.DEBUG_HEADER_THEME) {
            console.log("=== DEBUG TEMA (getSectionTheme) ===");
            console.log("innerWidth:", window.innerWidth, " delta:", delta);
            console.log("headerHeight:", headerHeight);
            console.log("#proyectos top (viewport):", topProyectos);
            console.log("fin de proyectos top (viewport):", topFinProyectos);
            console.log("siguiente sección real:", siguiente ? (siguiente.tagName + "#" + (siguiente.id || "sin-id")) : "NO ENCONTRADA (usando bottom de #proyectos)");
            console.log("theme resultante:", theme);
            console.log("=====================================");
        }


    }

    return theme;

}


let temaBloqueado = false;

function calcularScrollDestino(id) {
    const elemento = document.getElementById(id);
    if (!elemento) return window.scrollY;

    const headerEl = document.querySelector(".header");

    const headerHeight = headerEl ? headerEl.getBoundingClientRect().height : 0;

    const destino = elemento.getBoundingClientRect().top + window.scrollY - headerHeight;


    return Math.round(destino) + 2;
}

function aplicarTemaInmediato(id, scrollDestinoPrecalculado) {
    const header = document.querySelector(".header");
    if (!header) return;


    const scrollDestino = scrollDestinoPrecalculado !== undefined
        ? scrollDestinoPrecalculado
        : calcularScrollDestino(id);


    const delta = scrollDestino - window.scrollY;
    const theme = getSectionTheme(header, delta);
    header.classList.toggle("dark", theme === "dark");
}

function bloquearTemaHeader() {
    temaBloqueado = true;
}


function desbloquearTemaHeader() {
    temaBloqueado = false;
    updateHeader(); 
}

function updateHeaderTheme() {

    const header = document.querySelector(".header");

    if (!header) return;


    if (temaBloqueado) return;

    const theme = getSectionTheme(header);

    header.classList.toggle("dark", theme === "dark");

}

function updateHeader() {

    updateScrollState();
    updateHeaderTheme();

}

window.addEventListener("scroll", updateHeader);

window.addEventListener("resize", updateHeader);

window.addEventListener("load", updateHeader);

window.addEventListener("hashchange", updateHeader);

document.addEventListener("DOMContentLoaded", updateHeader);


const RUTAS_HOME_HEADER = ["", "inicio", "clientes", "nosotros", "proyectos", "servicios"];

document.addEventListener("click", (e) => {

    const link = e.target.closest(".nav_link");
    if (!link) return;

    const href = link.getAttribute("href");
    if (!href || !href.startsWith("#/")) return;

    const rutaDestino = href.replace("#/", "").split("?")[0];
    const rutaActual = (window.location.hash || "").replace("#/", "").split("?")[0];

    const yaEnHome = RUTAS_HOME_HEADER.includes(rutaActual) || rutaActual === "";
    const destinoEsHome = RUTAS_HOME_HEADER.includes(rutaDestino);

    if (yaEnHome && destinoEsHome) {

        e.preventDefault();

        if (window.location.hash !== href) {
            history.pushState(null, "", href);
        }

        const idDestino = rutaDestino === "" ? "inicio" : rutaDestino;

        if (typeof scrollASeccion === "function") {
            scrollASeccion(idDestino);
        }

        updateHeader();

    }


});