const footerHtml = `
    <div class="footerBottom">
        <span class="footerCopy">
            © <span id="anhoActual"></span> Inversiones Scala Perú S.R.L. Todos los derechos reservados.
        </span>

        <div class="footerRedesSociales">
            <a href="mailto:administracion@scala-peru.com" aria-label="Enviar correo">
                <i class="fa-solid fa-envelope footerIcons" aria-hidden="true"></i>
            </a>
            <a href="https://pe.linkedin.com/company/scala-per%C3%BA-ingenieros" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <i class="fa-brands fa-linkedin footerIcons" aria-hidden="true"></i>
            </a>
            <a href="https://www.facebook.com/sscalaperu" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <i class="fa-brands fa-facebook footerIcons" aria-hidden="true"></i>
            </a>
            <a href="https://www.instagram.com/sscalaperu" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <i class="fa-brands fa-instagram footerIcons" aria-hidden="true"></i>
            </a>
            <!--
            <a href="https://www.youtube.com/@sscalaperu" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                <i class="fa-brands fa-youtube footerIcons" aria-hidden="true"></i>
            </a>
            <a href="https://www.tiktok.com/@sscalaperu" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
                <i class="fa-brands fa-tiktok footerIcons" aria-hidden="true"></i>
            </a>
            <a href="https://wa.link/" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                <i class="fa-brands fa-whatsapp footerIcons" aria-hidden="true"></i>
            </a>
            -->
        </div>

        <span class="footerTexto">
            Creado por <a href="https://www.instagram.com/millylx5/" target="_blank" rel="noopener noreferrer" class="footerUser">@MillyLx</a>
        </span>
    </div>
`;

// Inserta el año actual una vez que el footer esté en el DOM
document.addEventListener('DOMContentLoaded', () => {
    const anhoEl = document.getElementById('anhoActual');
    if (anhoEl) {
        anhoEl.textContent = new Date().getFullYear();
    }
});