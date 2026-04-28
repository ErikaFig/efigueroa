$(document).ready(function () {
	/* 
	* Obtener referencia de los elementos por la clase llamada nav-link y agregar el
	* evento onclick 
	*/
	$('.nav-link').on('click', function () {

		/*
		* A todos los elementos que tienen la clase nav-link
		* quitarle la clase llamada active
		*/

		$('.nav-link').removeClass('active');
		// Finalmente al elemento que le dan clic agregarle la clase active
		$(this).addClass('active');

	});
});

function registroUsuarios() {
	let name = $("#nombre");
	let email = $("#email");
	let password = $("#pwd");

	// Validación básica antes de enviar
	if (!nombre.val() || !email.val() || !password.val()) {
		alert("Por favor completa todos los campos");
		return;
	}

	// Recopilar datos de un formulario para enviarlos a un servidor.
	let formData = new FormData();

	formData.append("nombre", name.val());
	formData.append("email", email.val());
	formData.append("pwd", password.val());
	$.ajax({
		url: "usuarios.php",
		data: formData,
		processData: false,
		contentType: false,
		type: "POST",
		cache: false,
		success: function (result) {
			$('#main').html(result);
			// Opcional: limpiar formulario después de registro exitoso
			if (result.includes("almacenado correctamente")) {
				$("#nombre, #email, #pwd").val('');
			}
		},
		error: function (xhr, status) {
			$('#main').html("<div class='alert alert-danger'>Error de conexión: " + status + "</div>");
		}
	});

}

function login() {

	let email = $("#email");
	let password = $("#pwd");

	if (!email.val() || !password.val()) {
		alert("Por favor ingresa email y contraseña");
		return;
	}



	// Recopilar datos de un formulario para enviarlos a un servidor.
	let formData = new FormData();
	formData.append("email", email.val());
	formData.append("pwd", password.val());

	$.ajax({
		url: "login.php",
		data: formData,
		processData: false,
		contentType: false,
		type: "POST",
		cache: false,
		success: function (result) {

			$('#main').html(result);
			//alert("El registro de ha completado correctamente!");
			// Si el login es exitoso, normalmente login.php redirige a dashboard.php
			// Pero como usas AJAX, la redirección no funciona. Mejor:
			if (result.includes("dashboard") || result === "") {
				window.location.href = "dashboard.php";
			}
		},
		error: function (xhr, status) {
			$('#main').html("<div class='alert alert-danger'>Error de conexión: " + status + "</div>");
		}
	});

}

