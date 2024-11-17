function seguirUsuario (fkUsuarioSeguido, fkUsuarioSeguidor){
    
    fetch ("/seguidor/follow", {
        method: "POST",
        headers:{
            "Content-Type" : 'application/json'
        },
        body: JSON.stringify ({
            seguidoServer : fkUsuarioSeguido,
            seguidorServer : fkUsuarioSeguidor
        })
    }).then(function (resposta) {
        if(resposta.ok){
            resposta.json().then(function (res){
                console.log(res.acao)
               if(res.acao == 'Insert'){
                   document.getElementById(`getSeguir`).className ='botaoSeguindo'
                   document.getElementById(`getSeguir`).innerText = "Seguindo"
                   var seguidorAtual = document.getElementById("quantidadeSeguidores")
                   seguidorAtual.innerText = Number(seguidorAtual.innerText)+1
                   console.log(seguidorAtual + " Numero de seguidores")

                }else {
                    var seguidorAtual = document.getElementById("quantidadeSeguidores")
                   seguidorAtual.innerText = Number(seguidorAtual.innerText)-1
                    document.getElementById(`getSeguir`).className = 'botaoSeguir'
                    document.getElementById(`getSeguir`).innerText = "Seguir"
               }
           })
        }
    })
}

function verificarSeguidor(fkUsuarioSeguido, fkUsuarioSeguidor){
    fetch ("/seguidor/getSeguidor", {
        method: "POST",
        headers:{
            "Content-Type" : 'application/json'
        },
        body: JSON.stringify ({
            seguidoServer : fkUsuarioSeguido,
            seguidorServer : fkUsuarioSeguidor
        })
    }).then(function (resposta) {
        if(resposta.ok){
            resposta.json().then(function (res){
                
               if(res.length>0){
                   document.getElementById(`getSeguir`).className ='botaoSeguindo'
                   document.getElementById(`getSeguir`).innerText = "Seguindo"
                }else {
                    document.getElementById(`getSeguir`).className = 'botaoSeguir'
                    document.getElementById(`getSeguir`).innerText = "Seguir"
               }
           })
        }
    })
}

function obterSeguidores(fkUsuarioSeguido){
    fetch(`/seguidor/getSeguidor/${fkUsuarioSeguido}`, {cache: 'no-store'}).then(function(resposta){
        if(resposta.ok){
            resposta.json().then(function (res){
                contagemSeguidores(res)
            })
        }
    })
}

function contagemSeguidores(resposta){
    
    document.getElementById("quantidadeSeguidores").innerHTML += Number(resposta[0].Seguidor)
    document.getElementById("quantidadeSeguindo").innerHTML += Number(resposta[0].Seguindo)
}