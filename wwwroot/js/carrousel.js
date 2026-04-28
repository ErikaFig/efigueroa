document.addEventListener('DOMContentLoaded', function() {
    cargarGaleria();

    var formSubir = document.getElementById('formSubirImagen');
    if (formSubir) {
        formSubir.addEventListener('submit', function(e) {
            e.preventDefault();

            var formData = new FormData();
            formData.append('foto', document.getElementById('inputFoto').files[0]);
            formData.append('nombre', document.getElementById('nombreImagen').value);
            formData.append('descripcion', document.getElementById('descImagen').value);

            fetch('subir.php', {
                method: 'POST',
                body: formData
            })
            .then(function(res) { return res.json(); })
            .then(function(data) {
                if (data.status === 'success') {
                    cargarGaleria();
                    var modalElement = document.getElementById('modalSubirFoto');
                    var modal = bootstrap.Modal.getInstance(modalElement);
                    if (modal) modal.hide();
                    formSubir.reset();
                } else {
                    alert('Error: ' + data.message);
                }
            })
            .catch(function(error) {
                console.error('Error:', error);
            });
        });
    }
});

function cargarGaleria() {
    fetch('optener_imagenes.php')
    .then(function(res) { return res.json(); })
    .then(function(data) {
        var inner = document.querySelector('.carousel-inner');
        var lista = document.getElementById('listaImagenes');

        if (inner) inner.innerHTML = '';
        if (lista) lista.innerHTML = '';

        for (var i = 0; i < data.length; i++) {
            var img = data[i];
            var activeClass = i === 0 ? 'active' : '';

            if (inner) {
                inner.innerHTML += '<div class="carousel-item ' + activeClass + '">' +
                    '<img src="' + img.ruta_imagen + '" class="d-block w-100" style="height:500px; object-fit:cover;">' +
                    '<div class="carousel-caption d-none d-md-block">' +
                    '<h5>' + img.nombre_archivo + '</h5>' +
                    '</div></div>';
            }

            if (lista) {
                lista.innerHTML += '<div class="col-4">' +
                    '<div class="card">' +
                    '<img src="' + img.ruta_imagen + '" class="card-img-top">' +
                    '<div class="card-body">' +
                    '<button onclick="eliminarImagen(' + img.id + ')" class="btn btn-danger btn-sm">Eliminar</button>' +
                    '</div></div></div>';
            }
        }
    })
    .catch(function(error) {
        console.error('Error al cargar galería:', error);
    });
}

function eliminarImagen(id) {
    if (confirm('¿Seguro que quieres borrar esta imagen?')) {
        fetch('eliminar_imagen.php?id=' + id)
        .then(function(res) { return res.json(); })
        .then(function() { cargarGaleria(); })
        .catch(function(error) {
            console.error('Error al eliminar:', error);
        });
    }
}