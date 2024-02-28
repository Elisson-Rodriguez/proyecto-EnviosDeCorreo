document.addEventListener('DOMContentLoaded', function () {

    const email = {
        email: '',
        asunto: '',
        mensaje: '',
    }

    // Seleccionar los elementos de la interfaz
    const inputEmail = document.querySelector('#email');
    const inputAsunto = document.querySelector('#asunto');
    const inputMensaje = document.querySelector('#mensaje');
    const formulario = document.querySelector('#formulario');
    const btnSubmit = document.querySelector('#formulario button[type="submit"]');
    const btnReset = document.querySelector('#formulario button[type="reset"]');
    const spinner = document.querySelector('#spinner');
    const inputCopia = document.querySelector('#copia');

    // Asignar eventos
    inputEmail.addEventListener('input', validar);
    inputCopia.addEventListener('input', validar);
    inputAsunto.addEventListener('blur', validar);
    inputMensaje.addEventListener('blur', validar);
    formulario.addEventListener('submit', enviarEmail);
    btnReset.addEventListener('click', function (e) {
        e.preventDefault();
        alert("¿Estas seguro de que quieres limpiar todos los campos?");

        resetFormulario();
    });

    function enviarEmail(e) {
        e.preventDefault();
        spinner.classList.add('flex');
        spinner.classList.remove('hidden');

        setTimeout(() => {
            spinner.classList.remove('flex');
            spinner.classList.add('hidden');

            //reiniciar el formulario
            resetFormulario();


            //Crear alerta
            const alertaExito = document.createElement('P');
            alertaExito.classList.add('bg-green-500', 'text-white', 'font-bold',
                'uppercase', 'rounded-lg', 'mt-10', 'text-sm', 'p-2', 'text-center');
            alertaExito.textContent = "Mensaje enviado correctamente";
            formulario.appendChild(alertaExito);

            setTimeout(() => {
                alertaExito.remove();
            }, 3000)
        }, 3000);
    }

    function validar(e) {
        if (e.target.value.trim() == '') {
            mostrarAlerta(`El campo ${e.target.id} es obligatorio`, e.target.parentElement);
            email[e.target.name] = '';
            comprobarEmail();
            return;
        }
        if (e.target.type === 'email' && !validarEmail(e.target.value)) {
            mostrarAlerta(`El email no es valido`, e.target.parentElement);
            comprobarEmail();
            btnSubmit.classList.add('opacity-50');
            btnSubmit.disabled = true;
            return;
        }
        limpiarAlerta(e.target.parentElement);

        //asignar los valores
        email[e.target.name] = e.target.value.trim().toLowerCase();

        //comprobar el objeto de email
        comprobarEmail();
    }

    function mostrarAlerta(msg, referencia) {
        limpiarAlerta(referencia);

        // Generar alerta en HTML
        const error = document.createElement('P');
        error.textContent = msg;
        error.classList.add('bg-red-600', 'text-white', 'p-2', 'text-center');


        // Inyectar el error al formulario
        referencia.appendChild(error);
    }

    function limpiarAlerta(referencia) {
        const alerta = referencia.querySelector('.bg-red-600');
        if (alerta) {
            alerta.remove();
        }
    }

    function validarEmail(email) {
        const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/
        const resultado = regex.test(email);
        return resultado;
    }

    function comprobarEmail() {
        if (Object.values(email).includes('')) {
            btnSubmit.classList.add('opacity-50');
            btnSubmit.disabled = true;
        } else {
            btnSubmit.classList.remove('opacity-50');
            btnSubmit.disabled = false;
        }
    }

    function resetFormulario() {
        //reiniciar objeto
        email.email = '';
        email.asunto = '';
        email.mensaje = '';
        formulario.reset();
        comprobarEmail();
    }

    //RETO

    /*
     * Añade un campo extra llamado CC; para añadir un destinatario extra. | Listo
     * Este campo no es obligatorio, no se valida que tenga información. | Listo
     * Si tiene contenido debe ser un email valido. | Listo
    */

});
