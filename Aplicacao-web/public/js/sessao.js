// sessão
function validarSessao() {
    var email = sessionStorage.EMAIL_USUARIO;
    var nome = sessionStorage.NOME_USUARIO;
    var username = sessionStorage.USERNAME_USUARIO;
    var fotoPerfil = sessionStorage.FOTO_USUARIO
    var locNome = document.getElementById("nomeUsuario");
    var locUsername = document.getElementById("username");
    var locFotoPerfil = document.getElementById("fotoPreview");

    if (email != null && nome != null) {
        locNome.innerHTML = nome;
        
        locUsername.innerHTML = username;
        locFotoPerfil.src = `./assets/imgs/usuario/${fotoPerfil == ''? 'padrao.jpg': fotoPerfil}`
    } else {
        window.location = "../login.html";
    }
}

function limparSessao() {
    sessionStorage.clear();
    window.location = "../login.html";
}

// carregamento (loading)
function aguardar() {
    var divAguardar = document.getElementById("div_aguardar");
    divAguardar.style.display = "flex";
}

function finalizarAguardar(texto) {
    var divAguardar = document.getElementById("div_aguardar");
    divAguardar.style.display = "none";

    var divErrosLogin = document.getElementById("div_erros_login");
    if (texto) {
        divErrosLogin.style.display = "flex";
        divErrosLogin.innerHTML = texto;
    }
}

