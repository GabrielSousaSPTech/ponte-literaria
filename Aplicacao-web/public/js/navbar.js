const imagemUsuario = document.getElementById('fotoUsuarioLogado')
const nomeUsuario = document.getElementById('nomeUsarioLogado')
const username = document.getElementById('usernameUsarioLogado')

imagemUsuario.src = `./assets/imgs/usuario/${sessionStorage.FOTO_USUARIO !=undefined ? sessionStorage.FOTO_USUARIO: 'usuarioTeste.png'}`
nomeUsuario.innerText = sessionStorage.NOME_USUARIO
username.innerText = sessionStorage.USERNAME_USUARIO