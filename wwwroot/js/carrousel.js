let contadorActual = 1;

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
        
            var modal = bootstrap.Modal.getInstance(document.getElementById('modalSubirFoto'));
            modal.hide();
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

function siguienteImagen() {
    contadorActual++; 
    solicitarImagen(contadorActual);
}

function anteriorImagen() {
    if (contadorActual > 1) {
        contadorActual--; 
        solicitarImagen(contadorActual);
    }
}

function solicitarImagen(idBuscar) {
    let formData = new FormData();
    formData.append("id", idBuscar);

    $.ajax({
        url: "imagenesAjax.php",
        data: formData,
        processData: false,
        contentType: false,
        type: "POST",
        dataType: 'json',
        cache: false,
        success: function (result) {
            // Evaluamos si el arreglo contiene al menos un registro
            if (result && result.length > 0) {
                // PHP devuelve un arreglo, accedemos al primer índice [0]
                // Asegúrate de que 'ruta_imagen' y 'nombre_archivo' se llamen exactamente así en tu BD
                let imagen = result[0]; 
                
                $('#current-img').attr(
                    "src", imagen.ruta_imagen + "?v=" + imagen.id);
                $('#current-img-title').text(imagen.nombre_archivo);
            } else {
                console.warn("No se encontró la imagen o el archivo no existe en el servidor para el ID: " + idBuscar);
                // Si vas hacia adelante y no hay más, revierte el contador para no seguir sumando vacíos
                contadorActual = idBuscar - 1; 
            }
        },
        error: function (xhr, status, error) {
            console.error(xhr.responseText); // Te ayuda a ver errores de PHP en la consola
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