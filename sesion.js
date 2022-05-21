function limpiarSessionStorage() {
    if (sessionStorage.usuarioLogueado == undefined) {
        Swal.fire({
            icon: "info",
            title: "No hay una sesión iniciada",
            showConfirmButton: true,
            timer: 1500,
        });
    } else {
        sessionStorage.clear();
        Swal.fire({
            icon: "success",
            title: "Cerraste sesión correctamente",
            showConfirmButton: true,
            timer: 1500,
        });
        setTimeout(() => {
            location.reload();
        }, 1520);
    }
}