

function verificarCampos(listaCampos = []) {
    for(var posicaoCampo = 0; posicaoCampo <listaCampos.length; posicaoCampo++){
        if(listaCampos[posicaoCampo] == ''){
            return false;
        }
        return true;
    }
}

function entrar (){
    const login = input_login.value;
    const senha = input_senha.value;
    
    if(verificarCampos([login, senha])){
        fetch("/usuario/login", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify ({
                loginServer : login,
                senhaServer : senha
            })
        }).then(function (resposta) {
            if(resposta.ok) {
                
                resposta.json().then(json =>{
                    
                    sessionStorage.ID_USUARIO = json.id;
                    sessionStorage.NOME_USUARIO = json.nome;
                    sessionStorage.USERNAME_USUARIO = json.username;
                    sessionStorage.EMAIL_USUARIO = json.email;
                    sessionStorage.SENHA_USUARIO = json.senha;
                    sessionStorage.FOTO_USUARIO = json.fotoPerfilUsuario;
                    
                });
                setTimeout(function(){
                    window.location = "../feed.html"
                })
            }else {
                
                    modalAviso('erro', 'usuário ou senha inválido(s)')
                    
                
            }
        }).catch(
            function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
    }else {
        modalAviso('erro', 'Preencha todos os Campos')
    }

}