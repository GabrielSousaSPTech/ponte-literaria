function darLike (idPostagem, idUsuario) {
    fetch("/like/curtir", {
        method: "POST",
        headers:{
            "Content-Type" : 'application/json'
        },
        body: JSON.stringify ({
            idPostagemServer : idPostagem,
            idUsuarioServer :idUsuario
        })
    }).then(function (resposta){ 
        if(resposta.ok){
            resposta.json().then(function (res){
                 console.log(res.acao)
                if(res.acao == 'Insert'){
                    document.getElementById(`iconCurtida-${idPostagem}`).src = './assets/icon/likeFeito.png'
                    var qtdCurtida = document.getElementById(`quantidadeCurtidas`)
                    
                    qtdCurtida.innerText = Number(qtdCurtida.innerText)+1
                }else {
                    document.getElementById(`iconCurtida-${idPostagem}`).src = './assets/icon/like.png'
                    var qtdCurtida = document.getElementById(`quantidadeCurtidas`)
                    
                    qtdCurtida.innerText = Number(qtdCurtida.innerText)-1
                }
            })

            fetch(`post/view/${idPostagem}`,{cache: 'no-store'}).then(function(respostaAtualizacaoLike){
                if(respostaAtualizacaoLike.ok) {
                    respostaAtualizacaoLike.json().then(function (res){
                        document.getElementById(`qtdCurtida-${idPostagem}`).innerHTML = res[0].qtdCurtida
                    })
                }
            })
        }
    })
}

function verificarLike(idPostagem, idUsuario) {
    fetch("/like/getLike", {
        method: "POST",
        headers:{
            "Content-Type" : 'application/json'
        },
        body: JSON.stringify ({
            idPostagemServer : idPostagem,
            idUsuarioServer :idUsuario
        })
    }).then(function (resposta){ 
        if(resposta.ok){
            resposta.json().then(function (res) {
                
                if(res.length> 0){
                    document.getElementById(`iconCurtida-${idPostagem}`).src = './assets/icon/likeFeito.png'
                }else {
                    document.getElementById(`iconCurtida-${idPostagem}`).src = './assets/icon/like.png'
                    
                }
            })
    
        }
    })
}

