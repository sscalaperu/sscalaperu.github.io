const enviarFormulario = async (e) => {
    e.preventDefault();
    const form = e.target;
    const fileInput = form.querySelector('input[type="file"]');
    const btnSubmit = form.querySelector('button[type="submit"]');


    if (fileInput && fileInput.files.length > 0) {
        const file = fileInput.files[0];

        const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];

        const maxSize = 5 * 1024 * 1024; 

        if (!allowedTypes.includes(file.type)) {
            Swal.fire({
                title: "Formato no válido",
                text: "Solo puedes subir archivos PDF, JPG o PNG.",
                icon: "warning",
                background: "#2d2c2e",
                confirmButtonColor: "#295afa"
            });
            return;
        }

        if (file.size > maxSize) {
            Swal.fire({
                title: "Archivo muy pesado",
                text: "El archivo no debe exceder los 5MB.",
                icon: "warning",
                background: "#2d2c2e"
            });
            return;
        }
    }


    const formData = new FormData(form);

    try {
        btnSubmit.disabled = true;
        btnSubmit.textContent = "Enviando...";


        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        });

        const result = await response.json();

        if (result.success) {
            Swal.fire({
                title: "¡Correo enviado!",
                text: "El mensaje fue enviado con éxito",
                icon: "success",
                background: "#2d2c2e",
                confirmButtonColor: "#295afa"
            });
            form.reset();
        } else {
            throw new Error(result.message || "Error en el envío");
        }
    } catch (error) {
        console.error(error);
        Swal.fire({
            title: "Error",
            text: "No se pudo enviar el mensaje, intenta más tarde.",
            icon: "error",
            background: "#2d2c2e"
        });
    } finally {
        btnSubmit.disabled = false;
        btnSubmit.textContent = "Enviar";
    }
};


document.addEventListener("submit", (e) => {
    if (e.target.id === "formularioContacto") {
        enviarFormulario(e);
    }
});