const error404 = `
<section id="error404" class="error404">
    <div class="error404_malla" aria-hidden="true"></div>

    <div class="error404_content">
        <img src="assets/imagenes/error.png" alt="" class="error404_robot" aria-hidden="true">

        <span class="error404_code">404</span>
        <h2 class="error404_titulo">Página no encontrada</h2>
        <p class="error404_subtitulo">
           ¡Ups! Revisamos los planos, pero esta página no aparece por ningún lado. Nuestro robot sigue investigando. Mientras tanto, puedes volver al inicio.
        </p>

        <a href="#/inicio" class="error404_btn">
            Volver al inicio
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M5 12h14"/>
                <path d="M13 6l6 6-6 6"/>
            </svg>
        </a>
    </div>
</section>
`;