function getUsuario (idUsuario) {
    console.log(idUsuario + " ID CHAMADO")
    fetch(`/usuario/${idUsuario}`, {cache: 'no-store'}).then(function (resposta){
        if(resposta.ok) {
            resposta.json().then(function (res){
                document.getElementById("nomeUsuario").innerText = `${res.nome}`
                document.getElementById("username").innerText = `${res.username}`
          
                if(sessionStorage.ID_USUARIO == idUsuario && res.fotoPerfilUsuario !=null){
                    sessionStorage.FOTO_USUARIO = res.fotoPerfilUsuario
                   
                }else{
                    document.getElementById('fotoPreview').src = `./assets/imgs/usuario/${res.fotoPerfilUsuario == null ?'usuarioTeste.jpg': res.fotoPerfilUsuario}`
                }
            })
    }else {
            
            document.getElementById("sessaoPerfil").innerHTML =`<p style="text-align:center;">Esse perfil não está disponível</p>`
            
        }
    })
}

function editarUsuario (idUsuario){
    fetch(``)
}