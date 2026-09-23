/* =====================================================
   FIX: la página siempre carga mostrando el header + #inicio,
   con el scroll comenzando desde arriba.
   ===================================================== */
if ('scrollRestoration' in window.history) {
    window.history.scrollRestoration = 'manual';
}
window.addEventListener('load', () => window.scrollTo(0, 0));

const inicioHtml = `
<!-- ================= HERO ================= -->
<section id="inicio" class="inicio">

    <div class="hero_slider" id="heroSlider">

        <div class="slider_track" id="sliderTrack">
        </div>

        <div class="hero_overlay"></div>
        <div class="hero_grid"></div>

    </div>

    <div class="slider_progress" id="sliderProgress">
        <div class="slider_progress_fill" id="sliderProgressFill"></div>
    </div>

    <div class="slider_dots" id="sliderDots"></div>

    <div class="container">

        <div class="inicio_content">

            <h1 class="text_inicio">
                <span class="line1">Ingeniería y Supervisión Técnica</span>
                <span>para Infraestructuras de Alto Nivel</span>
            </h1>

            <p class="inicio_desc">
                Supervisamos proyectos de infraestructura con altos estándares técnicos, garantizando transparencia, eficiencia y resultados confiables en cada etapa del proyecto.
            </p>

            <div class="inicio_actions">
                <a href="#/servicios" class="btn btn_primary">
                    Nuestros Servicios
                    <svg class="arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </a>

                <a href="#/contacto" class="btn btn_secondary">
                    Contáctanos
                </a>
            </div>

            <div class="inicio_meta">

                <div class="inicio_meta_item">
                    <span class="inicio_meta_num" data-count-to="7" data-prefix="+">+0</span>
                    <span class="inicio_meta_label">Proyectos supervisados</span>
                </div>

                <div class="inicio_meta_item">
                    <span class="inicio_meta_num" data-count-to="7">0</span>
                    <span class="inicio_meta_label">Años de experiencia</span>
                </div>

                <div class="inicio_meta_item">
                    <span class="inicio_meta_num" data-count-to="100" data-suffix="%">0%</span>
                    <span class="inicio_meta_label">Cumplimiento normativo</span>
                </div>

            </div>

        </div>

    </div>

</section>
`;

/* =====================================================
   SLIDER — IMÁGENES
   ===================================================== */
const imagenes = [
    "./assets/imagenes/inicio/scala.webp",
    "./assets/imagenes/inicio/historia.webp",
    "./assets/imagenes/inicio/mision.webp",
    "./assets/imagenes/inicio/inicio.webp",
];

function initHeroSlider() {

    const SLIDE_DURATION = 4000; // ms

    const slider = document.getElementById("heroSlider");
    if (!slider) {
        console.warn(
            '[hero_slider] No se encontró el elemento #heroSlider en el DOM. ' +
            "El slider no puede iniciar."
        );
        return;
    }

    const track = document.getElementById("sliderTrack");
    if (!track) {
        console.warn(
            '[hero_slider] Se encontró #heroSlider pero no #sliderTrack.'
        );
        return;
    }

    const progressFill = document.getElementById("sliderProgressFill");
    const dotsContainer = document.getElementById("sliderDots");

    if (!Array.isArray(imagenes) || imagenes.length === 0) {
        console.warn("[hero_slider] El arreglo 'imagenes' está vacío.");
        return;
    }

    let currentIndex = 0;
    let timerId = null;
    let progressStart = 0;
    let remaining = SLIDE_DURATION;
    let isPaused = false;

    function buildSlides() {
        track.innerHTML = "";
        imagenes.forEach((src, i) => {
            const slide = document.createElement("figure");
            slide.className = "slide";
            slide.dataset.index = String(i);

            const img = document.createElement("img");
            img.alt = "Proyecto de supervisión de obra " + (i + 1);
            img.loading = i === 0 ? "eager" : "lazy";

            img.addEventListener("error", function onImageError() {
                console.warn('[hero_slider] No se pudo cargar la imagen: "' + src + '".');
                slide.remove();
                if (dotsContainer) {
                    const brokenDot = dotsContainer.querySelector('.slider_dot[data-index="' + i + '"]');
                    if (brokenDot) brokenDot.remove();
                }
                handleBrokenSlide();
            });

            img.src = encodeURI(src);

            slide.appendChild(img);
            track.appendChild(slide);
        });
    }

    function getSlides() {
        return Array.from(track.querySelectorAll(".slide"));
    }

    function buildDots() {
        if (!dotsContainer) return;
        dotsContainer.innerHTML = "";
        imagenes.forEach((_, i) => {
            const dot = document.createElement("button");
            dot.type = "button";
            dot.className = "slider_dot";
            dot.dataset.index = String(i);
            dot.setAttribute("aria-label", "Ir a la imagen " + (i + 1) + " de " + imagenes.length);
            dot.addEventListener("click", () => goToSlide(i));
            dotsContainer.appendChild(dot);
        });
    }

    function updateDots(index) {
        if (!dotsContainer) return;
        const dots = Array.from(dotsContainer.children);
        dots.forEach((dot, i) => {
            dot.classList.toggle("is-active", i === index);
        });
        dotsContainer.style.display = dots.length > 1 ? "" : "none";
    }

    function handleBrokenSlide() {
        const slides = getSlides();
        if (slides.length === 0) {
            clearTimeout(timerId);
            if (progressFill) {
                progressFill.style.transition = "none";
                progressFill.style.width = "0%";
            }
            return;
        }
        if (currentIndex >= slides.length) currentIndex = 0;
        showSlide(currentIndex);
        if (slides.length === 1) clearTimeout(timerId);
    }

    function showSlide(index) {
        getSlides().forEach((slide, i) => {
            slide.classList.toggle("is-active", i === index);
        });
        updateDots(index);
    }

    function goToSlide(index) {
        const total = getSlides().length;
        if (total === 0) return;
        currentIndex = (index + total) % total;
        showSlide(currentIndex);
        restartTimer();
    }

    function nextSlide() { goToSlide(currentIndex + 1); }

    function animateProgress(duration) {
        if (!progressFill) return;
        progressFill.classList.remove("is-animating");
        progressFill.style.transition = "none";
        progressFill.style.width = "0%";
        progressFill.offsetWidth;
        progressFill.classList.add("is-animating");
        progressFill.style.transition = "width " + duration + "ms linear";
        progressFill.style.width = "100%";
    }

    function startTimer(duration) {
        clearTimeout(timerId);
        if (getSlides().length <= 1) return;

        progressStart = Date.now();
        remaining = duration;
        animateProgress(duration);
        timerId = setTimeout(nextSlide, duration);
    }

    function restartTimer() { startTimer(SLIDE_DURATION); }

    function pauseTimer() {
        if (isPaused) return;
        isPaused = true;
        clearTimeout(timerId);

        const elapsed = Date.now() - progressStart;
        remaining = Math.max(SLIDE_DURATION - elapsed, 0);

        if (progressFill) {
            const computedWidth = getComputedStyle(progressFill).width;
            progressFill.style.transition = "none";
            progressFill.style.width = computedWidth;
        }
    }

    function resumeTimer() {
        if (!isPaused) return;
        isPaused = false;
        startTimer(remaining || SLIDE_DURATION);
    }

    slider.addEventListener("mouseenter", pauseTimer);
    slider.addEventListener("mouseleave", resumeTimer);
    slider.addEventListener("focusin", pauseTimer);
    slider.addEventListener("focusout", resumeTimer);

    document.addEventListener("visibilitychange", () => {
        if (document.hidden) pauseTimer();
        else resumeTimer();
    });

    if (imagenes.length === 0) return;

    buildSlides();
    buildDots();
    showSlide(0);

    if (imagenes.length > 1) {
        requestAnimationFrame(() => {
            requestAnimationFrame(() => startTimer(SLIDE_DURATION));
        });
    }
}

/* =====================================================
   CIFRAS — ANIMACIÓN DE CONTEO
   ===================================================== */
function initCounters() {

    const nums = document.querySelectorAll(".inicio_meta_num[data-count-to]");
    if (!nums.length) return;

    const prefersReducedMotion =
        window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const DURATION = 2500; // ms

    function easeOutCubic(t) {
        return 1 - Math.pow(1 - t, 3);
    }

    function animateCount(el) {
        const target = parseInt(String(el.dataset.countTo).replace(/[^\d-]/g, ""), 10) || 0;
        const prefix = el.dataset.prefix || "";
        const suffix = el.dataset.suffix || "";

        if (prefersReducedMotion || target <= 0) {
            el.textContent = prefix + target + suffix;
            return;
        }

        let startTime = null;

        function tick(timestamp) {
            if (startTime === null) startTime = timestamp;

            const elapsed = timestamp - startTime;
            const progress = Math.min(elapsed / DURATION, 1);
            const eased = easeOutCubic(progress);
            const current = Math.floor(eased * target);

            el.textContent = prefix + current + suffix;

            if (progress < 1) {
                requestAnimationFrame(tick);
            } else {
                el.textContent = prefix + target + suffix;
            }
        }

        requestAnimationFrame(tick);
    }

    function isInViewportNow(el) {
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight || document.documentElement.clientHeight;
        return rect.top < vh * 0.9 && rect.bottom > 0;
    }

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;

                const el = entry.target;
                if (el.dataset.counted === "1") {
                    observer.unobserve(el);
                    return;
                }
                el.dataset.counted = "1";

                observer.unobserve(el);
                animateCount(el);
            });
        },
        { threshold: 0.3 }
    );

    nums.forEach((el) => {
        if (isInViewportNow(el)) {
            el.dataset.counted = "1";
            animateCount(el);
        } else {
            observer.observe(el);
        }
    });
}

/* =====================================================
   AUTO-FIT DEL HERO (complementa el FIX 2 del CSS, no lo
   reemplaza)
   ===================================================== */
function ajustarEscalaHero() {

    const hero = document.querySelector(".inicio");
    const container = hero ? hero.querySelector(".container") : null;
    const content = hero ? hero.querySelector(".inicio_content") : null;

    if (!hero || !container || !content) return;

    content.style.transform = "scale(1)";

    const estilos = getComputedStyle(container);
    const padTop = parseFloat(estilos.paddingTop) || 0;
    const padBottom = parseFloat(estilos.paddingBottom) || 0;
    const padLeft = parseFloat(estilos.paddingLeft) || 0;
    const padRight = parseFloat(estilos.paddingRight) || 0;

    const altoDisponible = container.clientHeight - padTop - padBottom;
    const anchoDisponible = container.clientWidth - padLeft - padRight;

    const altoNecesario = content.scrollHeight;
    const anchoNecesario = content.scrollWidth;

    if (altoNecesario === 0 || anchoNecesario === 0) return;


    const ESCALA_MAX = 1.3;
    const ESCALA_MIN = 0.55;

    let escala = Math.min(
        altoDisponible / altoNecesario,
        anchoDisponible / anchoNecesario,
        ESCALA_MAX
    );

    escala = Math.max(escala, ESCALA_MIN);

    content.style.transform = `scale(${escala})`;

}

function initHeroAutoFit() {

    ajustarEscalaHero();


    if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(ajustarEscalaHero);
    }

    let resizeTimeoutId = null;
    window.addEventListener("resize", () => {
        clearTimeout(resizeTimeoutId);
        resizeTimeoutId = setTimeout(ajustarEscalaHero, 120);
    });

    window.addEventListener("orientationchange", () => {
        setTimeout(ajustarEscalaHero, 200);
    });

}

/* =====================================================
   ARRANQUE
   ===================================================== */
function mountInicio() {
    if (window.__heroSliderMounted) return;
    window.__heroSliderMounted = true;

    const main = document.getElementById("main");
    if (!main) return;

    if (!document.getElementById("inicio")) {
        main.insertAdjacentHTML("afterbegin", inicioHtml);
    }

    const metaBlock = document.getElementById("inicio")
        ? document.querySelector("#inicio .inicio_meta")
        : null;
    if (metaBlock) {
        setTimeout(() => {
            metaBlock.classList.add("will-rise");
        }, 50);
    }

    initHeroSlider();
    initCounters();
    initHeroAutoFit();
}

