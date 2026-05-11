let contador = 13;

function subirImagen() {


    var formData = new FormData();
    formData.append('foto', document.getElementById('inputFoto').files[0]);
    formData.append('nombre', document.getElementById('nombreImagen').value);

    $.ajax({
        url: 'subir.php',
        data: formData,
        processData: false,
        contentType: false,
        type: "POST",
        cache: false,

        success: function (result) {
            var modalElement = document.getElementById('modalSubirFoto');
            var modal = bootstrap.Modal.getInstance(modalElement);
            if (modal) modal.hide();
            cargarGaleria();
        }
    });
}


function cargarGaleria() {

    $.ajax({
        url: 'obtener_imagenes.php',
        type: 'GET',
        dataType: 'json',
        cache: false,

        success: function (data) {

            let carrusel = document.getElementById('carruselDinamico');
            let indicadores = document.getElementById('indicadoresDinamicos');
            let lista = document.getElementById('listaImagenes');

            carrusel.innerHTML = '';
            indicadores.innerHTML = '';
            lista.innerHTML = '';

            $.each(data, function (index, img) {

                let active = index === 0 ? 'active' : '';

                // Carrusel
                $('#carruselDinamico').append(`
                    <div class="carousel-item ${active}">
                        <img src="${img.ruta_imagen}?v=${img.id}" class="d-block w-100">
                        <div class="carousel-caption">
                            <h5>${img.nombre_archivo}</h5>
                        </div>
                    </div>
                `);

                // Indicadores
                $('#indicadoresDinamicos').append(`
                    <button type="button"
                        data-bs-target="#carouselExampleCaptions"
                        data-bs-slide-to="${index}"
                        class="${active}">
                    </button>
                `);

                // Lista (CRUD)
                $('#listaImagenes').append(`
                    <div class="col-md-4">
                        <div class="card">
                            <img src="${img.ruta_imagen}" class="card-img-top">
                            <div class="card-body">
                                <h6>${img.nombre_archivo}</h6>
                                <button class="btn btn-danger"
                                    onclick="eliminarImagen(${img.id})">
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    </div>
                `);

            });

        },

        error: function (error) {
            console.error("Error al cargar galería:", error);
        }
    });
}

function siguienteImagen() {

 let formData = new FormData();
	formData.append("id", contador);

	$.ajax({
		url: "obtener_imagenes.php",
		data: formData,
		processData: false,
		contentType: false,
		type: "POST",
		cache: false,
		success: function (result) {

            alert (result);
			$('#carruselDinamico').html(result);
		},
		error: function (xhr, status) {
			$('#main').html("<div class='alert alert-danger'>Error de conexión: " + status + "</div>");
		}
	});

}

function anteriorImagen() {

  let formData = new FormData();
	formData.append("id", contador);

	$.ajax({
		url: "imagenesAjax.php",
		data: formData,
		processData: false,
		contentType: false,
		type: "POST",
		cache: false,
		success: function (result) {

            alert (result);

			$('#carruselDinamico').html(result);
		},
		error: function (xhr, status) {
			$('#main').html("<div class='alert alert-danger'>Error de conexión: " + status + "</div>");
		}
	});
}

function eliminarImagen(id) {
    if (confirm('¿Seguro que quieres borrar esta imagen?')) {
        fetch('eliminar.php?id=' + id)
            .then(function (res) { return res.json(); })
            .then(function () { cargarGaleria(); })
            .catch(function (error) {
                console.error('Error al eliminar:', error);
            });
    }
}

$(document).ready(function () {
    cargarGaleria();
});