function getUsuario (idUsuario) {
    console.log(idUsuario + " ID CHAMADO")
    fetch(`/usuario/${idUsuario}`, {cache: 'no-store'}).then(function (resposta){
        if(resposta.ok) {
            resposta.json().then(function (res){
                document.getElementById("nomeUsuario").innerText = `${res.nome}`
                document.getElementById("username").innerText = `${res.username}`
            })
    }else {
            
            document.getElementById("sessaoPerfil").innerHTML =`<p style="text-align:center;">Esse perfil não está disponível</p>`
            
        }
    })
}