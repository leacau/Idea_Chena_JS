const switchers = document.querySelectorAll(".switcher");

switchers.forEach((item) => {
    item.addEventListener("click", function() {
        switchers.forEach((item) =>
            item.parentElement.classList.remove("is-active")
        );
        this.parentElement.classList.add("is-active");
    });
});
//meter usuario admin del json a localstorage para que funcione la logica de la pagina de administrador
fetch("../bbdd.json")
    .then((response) => response.json())
    .then((data) => {
        let USUARIOS = JSON.parse(localStorage.getItem("UsuariosLS"));
        if (USUARIOS == null) {
            localStorage.setItem("UsuariosLS", JSON.stringify(data.usuarios));
        } else {
            USUARIOS.push(
                new Usuario(data.usuarios.user, data.usuarios.pass, data.usuarios.mail)
            );
        }
    });
//definicion de class usuarios y de array USUARIOS
class Usuario {
    constructor(user, pass, mail) {
        this.user = user;
        this.pass = pass;
        this.mail = mail;
    }
}
const USUARIOS = [];

document.getElementById("formRegistro").addEventListener("submit", (e) => {
    e.preventDefault();
    let USUARIOS = JSON.parse(localStorage.getItem("UsuariosLS"));
    let user = document.getElementById("signupUser").value;
    let mail = document.getElementById("signupEmail").value;
    let pass = document.getElementById("signupPassword").value;
    if (USUARIOS == null) {
        if (
            document.getElementById("signupPassword").value !=
            document.getElementById("signupPasswordConfirm").value
        ) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Las contraseñas no coinciden",
            });
        } else {
            USUARIOS.push(new Usuario(user, pass, mail));
            localStorage.setItem("UsuariosLS", JSON.stringify(USUARIOS));
            Swal.fire("Genial!", "Te registraste con éxito!", "success");
            document.getElementById("formRegistro").reset();
        }
    } else {
        let elemento1 = USUARIOS.find((elemento) => elemento.user === user);
        let elemento2 = USUARIOS.find((elemento) => elemento.mail === mail);
        if (elemento1 != null) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "El nombre de usuario ya está en uso. Elija uno distinto",
            });
        } else if (elemento2 != null) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "El mail ya se encuentra registrado!",
            });
        } else if (
            document.getElementById("signupPassword").value !=
            document.getElementById("signupPasswordConfirm").value
        ) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Las contraseñas no coinciden",
            });
        } else {
            USUARIOS.push(new Usuario(user, pass, mail));
            localStorage.setItem("UsuariosLS", JSON.stringify(USUARIOS));
            Swal.fire("Genia!", "Te registraste con éxito!", "success");
            document.getElementById("formRegistro").reset();
        }
    }
});

document.getElementById("formLogueo").addEventListener("submit", (e) => {
    e.preventDefault();
    let USUARIOS = JSON.parse(localStorage.getItem("UsuariosLS"));
    if (USUARIOS == null) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Aún no hay usuarios registrados",
        });
    } else {
        if (
            sessionStorage.usuarioLogueado != "" &&
            sessionStorage.usuarioLogueado != undefined
        ) {
            Swal.fire({
                icon: "info",
                title: "Oops...",
                text: "Ya hay un usuario logueado",
            });
            console.log(sessionStorage.usuarioLogueado);
        } else {
            let user2 = document.getElementById("loginUser").value;
            let pass2 = document.getElementById("loginPassword").value;
            let elemento = USUARIOS.find((elemento) => elemento.user === user2);
            if (elemento == null) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Nombre de usuario inexistente!",
                });
            } else if (elemento.pass != pass2) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Contraseña incorrecta!",
                });
            } else {
                Swal.fire("Genia!", "Ingresaste con éxito!", "success");
                sessionStorage.setItem("usuarioLogueado", `${user2}`);
                document.getElementById("formLogueo").reset();
            }
        }
    }
});