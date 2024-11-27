
function cadastrar () {
    const nome = input_nome.value;
    const username = input_username.value;
    const email = input_email.value;
    const senha =input_senha.value;
    const confirmaSenha = input_confirmacao_senha.value;
    const formData = new FormData();

	formData.append('nomeServer', nome)
	formData.append('usernameServer', username)
	formData.append('emailServer', email)
	formData.append('senhaServer', senha)
	formData.append('input_foto', input_foto.files[0])
    
    if(!campoPreenchido([nome, username, email, senha, confirmaSenha])){
        modalAviso('erro', 'Preencha todos os Campos')
        return
    }

    // if(!usernameDisponivel(username)){
    //     console.log(!usernameDisponivel(username))
    //     modalAviso('erro', 'Nome de usuário já está em uso')
    //     return
    // }
    
    // if(!emailDisponivel(email)){
    //     modalAviso('erro', 'Este E-mail já está em uso')
    //     return

    // }
    if(senha == confirmaSenha){
        fetch("/usuario/cadastrar", {
            method: "POST",
            body: formData
        }).then(function(resposta) {
            
            if(resposta.ok){
                modalAviso('sucesso', 'Cadastro Realizado com sucesso!')
                limparFormulario();
                setTimeout (() =>{
                    window.location = "login.html";
                }, "2000");
            }
            
        })
    }else {
        modalAviso('erro', 'As senhas não são iguais')
    } 
}

function limparFormulario() {
    input_nome.value = "";
    input_username.value = "";
    input_email.value = "";
    input_senha.value = "";
}

