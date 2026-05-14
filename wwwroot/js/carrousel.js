let contador = 0;

$(document).ready(function () {
    // 1. Cargamos el mini-gestor (CRUD)
    cargarGaleria();
});


// Modificamos un poco la función de subir para que el cambio sea instantáneo
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
        success: function (result) {
            // 1. Cerramos el modal
            var modal = bootstrap.Modal.getInstance(document.getElementById('modalSubirFoto'));
            modal.hide();

            // 2. Refrescamos el gestor
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

            let lista = document.getElementById('listaImagenes');
            lista.innerHTML = '';

            $.each(data, function (index, img) {

                // Añadir imagen al carrusel
                    carruselInner.append(`
                        <div class="carousel-item ${activeClass}">
                            <img src="${img.ruta_imagen}" class="d-block w-100" alt="${img.nombre_archivo}" style="max-height: 500px; object-fit: contain; background: #000;">
                            <div class="carousel-caption d-none d-md-block">
                                <h5>${img.nombre_archivo}</h5>
                            </div>
                        </div>
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

    });
}

function siguienteImagen(contador) {

    contador++;

    let formData = new FormData();
    formData.append("id", contador);

    $.ajax({
        url: "imagenesAjax.php",
        data: formData,
        processData: false,
        contentType: false,
        type: "POST",
        dataType: 'json',
        cache: false,

        success: function (result) {

            if (result.length > 0) {
                // Cambiamos el src y el título sin reconstruir el HTML
                $('#current-img').attr("src", result[0].ruta_imagen + "?v=" + result[0].id);
                $('#current-img-title').text(result[0].nombre_archivo);
            } else {
                console.warn("No se encontró la imagen con ID: " + idActual);
                // Opcional: si no existe, podrías mostrar una imagen de "No disponible"
            }

            alert(result);
            $('#current-img').attr("src", result[0].ruta_imagen);
        },
        error: function (xhr, status) {
            $('#main').html("<div class='alert alert-danger'>Error de conexión: " + status + "</div>");
        }
    });

}

function anteriorImagen(contador) {

    if (contador > 1) contador--;
    let formData = new FormData();
    formData.append("id", contador);

    $.ajax({
        url: "imagenesAjax.php",
        data: formData,
        processData: false,
        contentType: false,
        type: "POST",
        dataType: 'json',
        cache: false,
        success: function (result) {

            if (result.length > 0) {
                // Cambiamos el src y el título sin reconstruir el HTML
                $('#current-img').attr("src", result[0].ruta_imagen + "?v=" + result[0].id);
                $('#current-img-title').text(result[0].nombre_archivo);
            } else {
                console.warn("No se encontró la imagen con ID: " + idActual);
                // Opcional: si no existe, podrías mostrar una imagen de "No disponible"
            }

            alert(result);
            $('#current-img').attr("src", result[0].ruta_imagen);
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