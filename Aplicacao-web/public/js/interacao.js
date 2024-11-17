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

function obterComentarioGeral(idPostagem){
    fetch(`/comentario/${idPostagem}`, {cache: 'no-store'}).then(function (resposta){
        if(resposta.ok) {
            resposta.json().then(function (res){
                res.reverse()
                plotarComentarioGeral(res)
            })
        }
    })
}

function plotarComentarioGeral(res){
    res.forEach(item => {
        document.getElementById('containerComentario').innerHTML += `
        
        <div class="postagem" >
                    <div class="cabecalhoPostagem">
                        <div class="dadosCabecalhoPostagem">
                            <img src="./assets/imgs/usuarioTeste.jpg" alt="">
                            <span onclick="event.stopPropagation(), abrirPerfil(${item.idUsuario})">${item.Usuario}</span>
                            <span>-</span>
                            <span>Há 12h</span>
                        </div>
                        <div  class = "containerDropDown" id="aparecerDropDown-${item.idComentario}">
                            <img src = "./assets/icon/more.png" onclick="event.stopPropagation(), dropDownComentario(${item.idComentario})">
                            <div class="dropDownPost" id="dropDownComentario-${item.idComentario}">
                                <a onclick="editarComentario(${item.idComentario}, 'editar')">Editar</a>
                                <span onclick=" event.stopPropagation(), modalDelete(${item.idComentario}, ${item.idPostagem}, 'Comentario')">Excluir</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="corpoPost">
                        
                        <textarea disabled id ="conteudoComentario">
                        ${item.comentario}
                        </textarea>
                    </div>
                    
                    <div class="interacaoPost">
                        <div class="engajamento">
                            <div class="boxEngajamento">
                                <img src="./assets/icon/like.png" alt="">
                                <span>01</span>
                            </div>
                        </div>
                        <div class="groupButton" id="containerEditar-${item.idComentario}" style="display:none">
                        <button onclick = "editarComentario(${item.idComentario}, 'cancel')">Cancelar</button>
                        <button>Editar</button>
                        </div>
                    </div>
                </div>
        `
    });
}

function editarComentario(idComentario, acao){

    var conteudo = document.getElementById('conteudoComentario')
    if(acao == 'editar'){

        conteudo.removeAttribute("disabled")
        document.getElementById(`containerEditar-${idComentario}`).style.display = 'flex'
        
    }else {
        conteudo.setAttribute("disabled", true)
        document.getElementById(`containerEditar-${idComentario}`).style.display = 'none'

    }

    





}

function criarComentario (idPostagem, idUsuario) {
    const comentario = textarea_comentario.value
    fetch("/comentario/criar", {
        method: "POST",
        headers: {
            "Content-Type" : 'application/json'
        },
        body: JSON.stringify({
            idPostagemServer : idPostagem,
            idUsuarioServer : idUsuario,
            comentarioServer : comentario
        })
    }).then(function (resposta){
        if(resposta.ok){
            textarea_comentario.value = ''
            document.getElementById('containerComentario').innerHTML = ''
            obterComentarioGeral(idPostagem)

        } else {
            console.log('Erro ao comentar')
        }
    })
}

function deletarComentario(idComentario, idPostagem){
    fetch(`/comentario/deletar/${idComentario}`, {cache: 'no-store'}).then(function(resposta){
        if(resposta.ok){
            document.getElementById("containerComentario").innerHTML = ''
            obterComentarioGeral(idPostagem)
        }else {
            console.log('Erro ao deletar o usuário')
        }
        
    })
}

