let contador = 5;

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

            let lista = document.getElementById('listaImagenes');
            lista.innerHTML = '';

            $.each(data, function (index, img) {

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