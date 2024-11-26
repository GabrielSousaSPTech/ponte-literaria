const imagemUsuario = document.getElementById('fotoUsuarioLogado')

const username = document.getElementById('usernameUsuarioLogado')

imagemUsuario.src = `./assets/imgs/usuario/${sessionStorage.FOTO_USUARIO !=undefined ? sessionStorage.FOTO_USUARIO: 'usuarioTeste.png'}`

username.innerText = sessionStorage.USERNAME_USUARIO