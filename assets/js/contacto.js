const conctactoForm = `
<section id="contacto" class="contacto">
    <h2 class="subt">Contacto</h2>
    <div class="contacto_malla" aria-hidden="true"></div>

    <div class="contacto_head">
        <h3 class="contacto_titulo">Escríbanos y coordinemos los detalles de su proyecto</h3>
        <p class="contacto_subtitulo">
            Complete el formulario y nuestro equipo se pondrá en contacto con usted.
        </p>
    </div>

    <div class="contacto_card">
        <div class="contacto_formCol">
            <form id="formularioContacto" class="formularioContacto" enctype="multipart/form-data" action="https://api.web3forms.com/submit" method="POST">
                <input type="hidden" name="access_key" value="4372314d-dab3-4f52-b0fc-2ed6c3c568d2">

                <div class="contacto_campo">
                    <label class="formularioLabel" for="fullName">
                        <svg class="formularioLabel_icono" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                            <circle cx="12" cy="8" r="3.4"/>
                            <path d="M5.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6"/>
                        </svg>
                        Nombre <span class="textResaltado"></span>
                    </label>
                    <input class="formularioInput" type="text" id="fullName" name="name" placeholder="Nombre y apellido" required>
                </div>

                <div class="contacto_campo">
                    <label class="formularioLabel" for="email">
                        <svg class="formularioLabel_icono" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                            <rect x="3.5" y="5.5" width="17" height="13" rx="2"/>
                            <path d="M4.2 6.5l7.8 6 7.8-6"/>
                        </svg>
                        Correo <span class="textResaltado"></span>
                    </label>
                    <input class="formularioInput" type="email" id="email" name="email" placeholder="administracion@scala-peru.com" required>
                </div>

                <div class="contacto_campo">
                    <label class="formularioLabel" for="phone">
                        <svg class="formularioLabel_icono" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                            <path d="M6.6 4.5h2.7l1.2 3.4-1.7 1.5a10.2 10.2 0 0 0 5.3 5.3l1.5-1.7 3.4 1.2v2.7c0 1-.8 1.8-1.8 1.7-6.4-.5-11.5-5.6-12-12-.1-1 .7-1.8 1.7-1.8z"/>
                        </svg>
                        Teléfono
                    </label>
                    <input class="formularioInput" type="tel" id="phone" name="phone" placeholder="+51 999 999 999">
                </div>

                <div class="contacto_campo">
                    <label class="formularioLabel" for="affair">
                        <svg class="formularioLabel_icono" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                            <path d="M11.3 4.5h4.2l4 4v4.2L11.3 21 4.5 14.2z"/>
                            <circle cx="14.3" cy="9" r=".4" fill="currentColor" stroke="none"/>
                        </svg>
                        Asunto <span class="textResaltado"></span>
                    </label>
                    <input class="formularioInput" type="text" id="affair" name="affair" placeholder="Asunto..." required>
                </div>

                <div class="contacto_campo contacto_campo--full">
                    <label class="formularioLabel" for="message">
                        <svg class="formularioLabel_icono" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                            <path d="M4.5 6.5h15v9h-8l-4 3v-3h-3z"/>
                        </svg>
                        Mensaje <span class="textResaltado"></span>
                    </label>
                    <textarea class="formularioInput" id="message" name="message" rows="4" placeholder="Mensaje..." required></textarea>
                </div>

                <div class="contacto_campo--full contacto_accion">
                    <button type="submit" class="formularioBoton">
                        <span>Enviar consulta</span>
                        <svg class="formularioBoton_flecha" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                            <path d="M5 12h14"/>
                            <path d="M13 6l6 6-6 6"/>
                        </svg>
                    </button>
                    <p id="mensajeError" class="mensajeError"></p>
                </div>

                <input type="hidden" name="_captcha" value="false">
                <input type="hidden" name="_template" value="table">
                <input type="hidden" name="_next" value="/">
            </form>
        </div>

        <div class="contacto_asistenteCol">
            <div class="contacto_robot">
                <img class="contacto_robotImg" src="assets/imagenes/robot.png" alt="Asistente virtual corporativo SCALA PERÚ">
            </div>

            <div class="contacto_redes">
                <span class="contacto_redesTitulo">Síguenos en nuestras redes sociales</span>
                <div class="contacto_redesLista">
                    <a class="contacto_redLink contacto_redLink--linkedin" href="https://pe.linkedin.com/company/scala-per%C3%BA-ingenieros" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
                            <rect x="3.5" y="3.5" width="17" height="17" rx="2.5"/>
                            <path d="M7.7 10.2v6.1"/>
                            <circle cx="7.7" cy="7.3" r=".35" fill="currentColor" stroke="none"/>
                            <path d="M11.3 16.3v-3.6c0-1.5 1.1-2.5 2.4-2.5 1.3 0 2.1.9 2.1 2.5v3.6"/>
                            <path d="M11.3 10.2v6.1"/>
                        </svg>
                    </a>
                    <a class="contacto_redLink contacto_redLink--facebook" href="https://www.facebook.com/sscalaperu" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M14.5 21v-7.2h2.4l.4-2.8h-2.8v-1.8c0-.8.22-1.35 1.38-1.35H17.4V5.4c-.25-.03-1.1-.1-2.1-.1-2.08 0-3.5 1.27-3.5 3.6v2.1H9.4v2.8h2.4V21"/>
                        </svg>
                    </a>
                    <a class="contacto_redLink contacto_redLink--instagram" href="https://www.instagram.com/sscalaperu" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                        <svg viewBox="0 0 24 24" fill="none" stroke="url(#igGradiente)" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
                            <defs>
                                <linearGradient id="igGradiente" x1="0" y1="24" x2="24" y2="0">
                                    <stop offset="0%" stop-color="#FEDA77"/>
                                    <stop offset="30%" stop-color="#F58529"/>
                                    <stop offset="60%" stop-color="#DD2A7B"/>
                                    <stop offset="100%" stop-color="#8134AF"/>
                                </linearGradient>
                            </defs>
                            <rect x="3.5" y="3.5" width="17" height="17" rx="4.5"/>
                            <circle cx="12" cy="12" r="3.6"/>
                            <circle cx="16.8" cy="7.2" r=".4" fill="url(#igGradiente)" stroke="none"/>
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    </div>

    <p class="contacto_validarSimple">
        ¿Tienes un certificado emitido por nosotros?
        <a href="#/validar" class="contacto_validarLink">
            <span>Valídalo aquí</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M5 12h14"/>
                <path d="M13 6l6 6-6 6"/>
            </svg>
        </a>
    </p>
</section>`;