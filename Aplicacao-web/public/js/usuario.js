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

 function editarUsuario (){

    const nome = document.getElementById('input_nomeEdit');
    const username = document.getElementById('input_usernameEdit');
    const email = document.getElementById('input_emailEdit');
    const senhaChecagem = document.getElementById('input_checagem_senha')
    const groupButton = document.getElementById('groupButtonEditar');
    
    if(senhaChecagem.value == sessionStorage.SENHA_USUARIO){
        
        console.log(nome.value, username.value, email.value)
        fetch(`/usuario/editUsuario`, {
            method: "POST",
            headers: {
                "Content-Type" : 'application/json'
            },
            body: JSON.stringify ({
                idUsuarioServer : sessionStorage.ID_USUARIO,
                nomeServer : nome.value,
                usernameServer : username.value,
                emailServer : email.value
            })
        }).then(function (resposta){
            if(resposta.ok){
                groupButton.style.display = 'none'
                nome.setAttribute("disabled", true)
                username.setAttribute("disabled", true)
                email.setAttribute("disabled", true)
                closeModal()
            }
        })
    }else {
        erro.innerHTML = `<p> Senha incorreta</p>`
    }
}

function editarSenhaUsuario(){
    const senhaAtual = document.getElementById('input_senha_atual');
    const novaSenha = document.getElementById('input_nova_senha');
    const confirmarSenha = document.getElementById('input_confirmacao_senha');
    

    if(senhaAtual.value != sessionStorage.SENHA_USUARIO){
        mensagem_usuario.innerHTML = 'Senha incorreta'
        return
    }
    if(senhaAtual.value == novaSenha.value){
        mensagem_usuario.innerHTML = 'A nova senha á a mesma'
        return
    }if(novaSenha.value != confirmarSenha.value){
        mensagem_usuario.innerHTML = 'As senhas não coincidem'
        return
    }

    fetch('/usuario/editSenha', {
        method: 'POST',
        headers:{ 
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
            idUsuarioServer : sessionStorage.ID_USUARIO,
            senhaServer : novaSenha.value
        })
    }).then(function (resposta){
        if(resposta.ok){
            sessionStorage.SENHA_USUARIO = novaSenha.value
            closeModalChecagem()
            window.location.reload()
        }
    })
}