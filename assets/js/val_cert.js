const certVal = `
<section id="valCert" class="valCert">
    <h2 class="subt">Validar certificado</h2>
    <div class="valCert_malla" aria-hidden="true"></div>

    <div class="valCert_head">
        <h3 class="valCert_titulo">Valida la autenticidad de tu certificado</h3>
        <p class="valCert_subtitulo">
            Ingresa el código de tu certificado y confirma si fue emitido oficialmente por SCALA PERÚ.
        </p>
    </div>

    <div class="valCert_inp">
        <input id="codigo" class="valCert_inp_ph" placeholder="Ej. CERT-XXXXXXXX-XXXXXXXXXXXX">
        <button id="btnValidarCert" class="valCert_btn" type="button">Validar</button>
    </div>

    <div id="resultado" class="valCert_resultado"></div>
</section>
`;

// 1. Cliente de Supabase 
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';
const supabaseUrl = 'https://fdhvhdctuhckmdbzjcvf.supabase.co';
const supabaseKey = 'sb_publishable_kDZZJZsxwwt4NDrjC2Rteg__maOgqQ7';
const supabase = createClient(supabaseUrl, supabaseKey);

// 2. Formateo de fecha

function formatearFecha(fechaISO) {
  if (!fechaISO) return '';
  const fecha = new Date(`${fechaISO}T00:00:00`);
  if (isNaN(fecha.getTime())) return fechaISO;
  return fecha.toLocaleDateString('es-PE', { day: 'numeric', month: 'long', year: 'numeric' });
}

// 3. Plantillas de tarjetas (result cards)
function tarjetaCargando() {
  return `
    <div class="valCert_card valCert_card--cargando">
      <div class="valCert_spinner" aria-hidden="true"></div>
      <p>Verificando certificado de forma segura...</p>
    </div>
  `;
}

// 2.2 Escape de HTML 
function escaparHtml(valor) {
  return String(valor ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function tarjetaValido(codigo, nombre, dni, cargo, fechaEmision, proyecto, etiquetaProyecto = 'Proyecto') {
  
  codigo = escaparHtml(codigo);
  nombre = escaparHtml(nombre);
  dni = escaparHtml(dni);
  cargo = escaparHtml(cargo);
  fechaEmision = escaparHtml(fechaEmision);
  proyecto = escaparHtml(proyecto);
  return `
    <div class="valCert_grid">
      <div class="valCert_grid_col valCert_grid_col--datos">
        <div class="valCert_card valCert_card--ok">
          <div class="valCert_icono valCert_icono--ok" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="9.25"/>
              <path d="M8 12.3l2.6 2.6L16.3 9"/>
            </svg>
          </div>
          <span class="valCert_estado valCert_estado--ok">Certificado válido</span>
          <p class="valCert_msg">
            Este certificado ha sido emitido oficialmente por <b>SCALA PERÚ</b> y se encuentra
            registrado en nuestro sistema de validación.
          </p>
          <div class="valCert_datos">
            <div class="valCert_dato">
              <span class="valCert_datoLabel">Código</span>
              <span class="valCert_datoValor">${codigo}</span>
            </div>
            <div class="valCert_dato">
              <span class="valCert_datoLabel">Nombre</span>
              <span class="valCert_datoValor">${nombre}</span>
            </div>
            <div class="valCert_dato">
              <span class="valCert_datoLabel">DNI</span>
              <span class="valCert_datoValor">${dni}</span>
            </div>
            <div class="valCert_dato">
              <span class="valCert_datoLabel">Cargo</span>
              <span class="valCert_datoValor valCert_datoValor--cargo">${cargo}</span>
            </div>
            <div class="valCert_dato">
              <span class="valCert_datoLabel">${etiquetaProyecto}</span>
              <span class="valCert_datoValor">${proyecto}</span>
            </div>
            <div class="valCert_dato">
              <span class="valCert_datoLabel">Fecha de emisión</span>
              <span class="valCert_datoValor">${fechaEmision}</span>
            </div>
            <div class="valCert_dato">
              <span class="valCert_datoLabel">Estado</span>
              <span class="valCert_datoValor valCert_datoValor--ok">Válido</span>
            </div>
          </div>
        </div>
      </div>

      <div class="valCert_grid_col valCert_grid_col--extra">
        <div class="valCert_card valCert_card--privacidad">
          <img src="assets/imagenes/robot-val.png" alt="" class="valCert_robot" aria-hidden="true">
          <div class="valCert_privTexto">
            <div class="valCert_privTitulo">
              <div class="valCert_icono valCert_icono--privacidad" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="5" y="10.5" width="14" height="9.5" rx="2"/>
                  <path d="M8 10.5V7.8a4 4 0 0 1 8 0v2.7"/>
                </svg>
              </div>
              <h4>Protección de datos</h4>
            </div>
            <p>
              Por motivos de privacidad y seguridad, esta plataforma únicamente muestra los datos
              básicos necesarios para confirmar la autenticidad del certificado. El resto de la
              información del titular (consorcio, empresa, contrato, firma, etc.) no se expone
              públicamente.
            </p>
          </div>
        </div>

        <div class="valCert_card valCert_card--cta">
          <h4>¿Necesitas una copia de este certificado?</h4>
          <p>
            Si eres el titular del certificado o necesitas una copia oficial, puedes solicitarla
            directamente a nuestro equipo. Una vez verificada la información correspondiente,
            nos comunicaremos contigo para atender tu solicitud.
          </p>
          <a href="#/contacto" class="valCert_btn valCert_btn--primario">
            Solicitar certificado
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M5 12h14"/>
              <path d="M13 6l6 6-6 6"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
  `;
}

function tarjetaNoEncontrado() {
  return `
    <div class="valCert_card valCert_card--error">
      <img src="assets/imagenes/robot-val-null.png" alt="" class="valCert_robot" aria-hidden="true">
      <span class="valCert_estado valCert_estado--error">Certificado no encontrado</span>
      <p class="valCert_msg">
        No existe ningún certificado registrado con el código ingresado. Verifique que el
        código sea correcto o comuníquese con nuestro equipo si considera que se trata de
        un error.
      </p>
      <a href="#/contacto" class="valCert_btn valCert_btn--secundario">Contactar a nuestro equipo</a>
    </div>
  `;
}

function tarjetaLimiteIntentos() {
  return `
    <div class="valCert_card valCert_card--error">
      <span class="valCert_estado valCert_estado--error">Demasiados intentos</span>
      <p class="valCert_msg">
        Se realizaron muchas validaciones seguidas desde tu conexión. Espera un momento
        y vuelve a intentarlo.
      </p>
    </div>
  `;
}

function tarjetaFormatoInvalido() {
  return `
    <div class="valCert_card valCert_card--error">
      <img src="assets/imagenes/robot-val-null.png" alt="" class="valCert_robot" aria-hidden="true">
      <span class="valCert_estado valCert_estado--error">Código con formato incorrecto</span>
      <p class="valCert_msg">
        El código ingresado no tiene el formato de un certificado emitido por SCALA PERÚ. Revisa que lo hayas copiado completo y sin espacios.
      </p>
      <a href="#/contacto" class="valCert_btn valCert_btn--secundario">Contactar a nuestro equipo</a>
    </div>
  `;
}

const CODIGO_CERT_REGEX = /^CERT-[A-F0-9]{8}-[A-F0-9]{12}$/;

function validarFormatoCodigo(codigo) {
  return CODIGO_CERT_REGEX.test(codigo);
}

async function validarCertificado(codigoIngresado) {
  const resultado = document.getElementById('resultado');
  if (!resultado) return;


  const codigo = String(codigoIngresado || '').trim().toUpperCase();

  if (!validarFormatoCodigo(codigo)) {
    resultado.innerHTML = tarjetaFormatoInvalido();
    return;
  }

  resultado.innerHTML = tarjetaCargando();

  try {
    // 1) Certificado de proyecto
    let { data, error } = await supabase
      .rpc('validar_certificado', { p_codigo: codigo })
      .maybeSingle();

    if (error?.message?.includes('RATE_LIMIT')) {
      resultado.innerHTML = tarjetaLimiteIntentos();
      return;
    }

    let etiquetaProyecto = 'Proyecto';
    let campoProyecto = data?.proyecto;

    // 2) Si no está en proyecto, se intenta institucional
    if (error || !data) {
      const inst = await supabase
        .rpc('validar_certificado_institucional', { p_codigo: codigo })
        .maybeSingle();

      if (inst.error?.message?.includes('RATE_LIMIT')) {
        resultado.innerHTML = tarjetaLimiteIntentos();
        return;
      }

      data = inst.data;
      error = inst.error;
      etiquetaProyecto = 'Empresa';
      campoProyecto = data?.empresa;
    }

    if (error || !data) {
      resultado.innerHTML = tarjetaNoEncontrado();
      return;
    }

    // data.nombre y data.dni ya llegan enmascarados desde la función de Postgres 
    resultado.innerHTML = tarjetaValido(
      data.codigo,
      data.nombre,
      data.dni,
      data.cargo,
      formatearFecha(data.fecha_emision),
      campoProyecto,
      etiquetaProyecto
    );

  } catch (err) {
    // Nunca se exponen errores técnicos ni mensajes de Supabase al usuario
    console.error('Error de conexión:', err);
    resultado.innerHTML = tarjetaNoEncontrado();
  }
}

// 5. Validación manual 
function validarManual() {
  const codigo = document.getElementById('codigo').value.trim();
  if (codigo) {
    window.location.hash = `#/validar?id=${encodeURIComponent(codigo)}`;
  }
}

// 6. Delegación de eventos 
document.addEventListener('click', (event) => {
  if (event.target.closest('#btnValidarCert')) {
    validarManual();
  }
});

document.addEventListener('keydown', (event) => {
  if (event.target.id === 'codigo' && event.key === 'Enter') {
    event.preventDefault();
    validarManual();
  }
});

window.validarCertificado = validarCertificado;
window.validarManual = validarManual;
window.certVal = certVal;