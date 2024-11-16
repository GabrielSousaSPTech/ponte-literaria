function cadastrar () {
    const nome = input_nome.value;
    const username = input_username.value;
    const email = input_email.value;
    const senha =input_senha.value;
    const confirmaSenha = input_confirmacao_senha.value;
    
    if(senha == confirmaSenha){

        fetch("/usuario/cadastrar", {
            method: "POST",
            headers: {
                "Content-Type" : 'application/json'
            },
            body: JSON.stringify ({
                nomeServer : nome,
                usernameServer : username,
                emailServer : email,
                senhaServer : senha
            })
        }).then(function(resposta) {
            
            if(resposta.ok){
                div_erros_login.innerHTML = `Cadastro Realizado com Sucesso!`
                limparFormulario();
                setTimeout (() =>{
                    window.location = "login.html";
                }, "2000");
            }
            
        })
    }else {
        div_erros_login.innerHTML = `As senhas não são iguais`
    } 
}

function limparFormulario() {
    input_nome.value = "";
    input_username.value = "";
    input_email.value = "";
    input_senha.value = "";
}

function entrar(){

}