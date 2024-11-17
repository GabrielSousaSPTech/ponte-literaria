function voltarPagina() {
    window.history.back();
  }

  function abrirPerfil (idUsuario){
    window.location = `./perfil.html?id=${idUsuario}`
}