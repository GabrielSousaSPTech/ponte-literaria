function campoPreenchido(campoAverificar = []){
    for(var posicao = 0; posicao < campoAverificar.length; posicao++){
        if(campoAverificar[posicao] == ''){
            return false
        }
    }
    return true
}

function usernameDisponivel(username){
    const formData = new FormData();
    formData.append('username', username)
    fetch("/usuario/verificacaoUsername", {
        method: "POST",
        headers:{
            "Content-Type" : 'application/json'
        },
        body: JSON.stringify ({
            username :username
        })
    }).then(function(resposta){
            resposta.json().then(function(res){
                if(res.length > 0){
                    console.log('EM USO '+ res.length)
                    return false
                }else{
                    console.log('DISPONIVEL '+ res.length)
                    return true
                }
            })
    })
}

function emailDisponivel(email){
    const formData = new FormData();
    formData.append('email', email)
    fetch("/usuario/verificacaoEmail", {
        method: "POST",
        body: JSON.stringify ({
            email :email
        })
    }).then(function(resposta){
        if(resposta.ok){
            resposta.json().then(function(res){
                if(res.length > 0){
                    console.log('EM USO '+ res.length)
                    return false
                }
                console.log('DISPONIVEL '+ res.length)
                return true
            })
        }
    })
}

