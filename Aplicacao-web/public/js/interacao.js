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
                    document.getElementById(`iconCurtidaModal-${idPostagem}`).src = './assets/icon/likeFeito.png'
                    var qtdCurtida = document.getElementById(`quantidadeCurtidas`)
                    
                    qtdCurtida.innerText = Number(qtdCurtida.innerText)+1
                }else {
                    document.getElementById(`iconCurtida-${idPostagem}`).src = './assets/icon/like.png'
                    document.getElementById(`iconCurtidaModal-${idPostagem}`).src = './assets/icon/like.png'
                    var qtdCurtida = document.getElementById(`quantidadeCurtidas`)
                    
                    qtdCurtida.innerText = Number(qtdCurtida.innerText)-1
                }
            })

            fetch(`post/view/${idPostagem}`,{cache: 'no-store'}).then(function(respostaAtualizacaoLike){
                if(respostaAtualizacaoLike.ok) {
                    respostaAtualizacaoLike.json().then(function (res){
                        document.getElementById(`qtdCurtida-${idPostagem}`).innerHTML = res[0].qtdCurtida
                        document.getElementById(`qtdCurtidaModal-${idPostagem}`).innerHTML = res[0].qtdCurtida
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
                    document.getElementById(`iconCurtidaModal-${idPostagem}`).src = './assets/icon/likeFeito.png'
                }else {
                    document.getElementById(`iconCurtida-${idPostagem}`).src = './assets/icon/like.png'
                    document.getElementById(`iconCurtidaModal-${idPostagem}`).src = './assets/icon/like.png'
                    
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
                if(document.getElementById('containerComentario')){
                    plotarComentarioGeral(res)
                }
            })
        }
    })
}
var comentarioOrigi = ''
function plotarComentarioGeral(res){
    res.forEach(item => {
        console.log(item)
        document.getElementById('containerComentario').innerHTML += `
        <div class="postagem" >
                    <div class="cabecalhoPostagem">
                        <div class="dadosCabecalhoPostagem">
                            <img src="./assets/imgs/usuario/${item.fotoUsuario == null?'usuarioTeste.jpg': item.fotoUsuario}" alt="" onclick="event.stopPropagation()" class="fotoUsuarioComentario">
                            <span onclick="event.stopPropagation(), abrirPerfil(${item.idUsuario})">${item.Usuario}</span>
                            <span>-</span>
                            <span>${formatarData(item.dataHoraComentario)}</span>
                        </div>
                        <div  class = "containerDropDown" id="aparecerDropDownComentario-${item.idComentario}">
                            <img src = "./assets/icon/more.png" onclick="event.stopPropagation(), dropDownComentario(${item.idComentario})">
                            <div class="dropDownPost" id="dropDownComentario-${item.idComentario}">
                                <a onclick="editarComentario(${item.idComentario}, 'editar', '', '${item.comentario}')">Editar</a>
                                <span onclick=" event.stopPropagation(), modalDelete(${item.idComentario}, ${item.idPostagem}, 'Comentario')">Excluir</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="corpoPost">
                        
                        <textarea disabled class="textAreaComentario" id ="conteudoComentario-${item.idComentario}">${item.comentario}</textarea>
                    </div>
                    
                    <div class="interacaoPost">
                        
                        <div class="engajamento">
                            ${item.comentarioEditado == 1? '<p>Editado</p>': ''}
                        </div>
                        <div class="groupButton" id="containerEditar-${item.idComentario}" style="display:none">
                        <button onclick = "editarComentario(${item.idComentario}, 'cancel', '' , '${item.comentario}')">Cancelar</button>
                        <button onclick = "editarComentario(${item.idComentario}, 'editar', 'executar', '${item.comentario}')">Editar</button>
                        </div>
                    </div>
                </div>
        `
        item.idUsuario != sessionStorage.ID_USUARIO? document.getElementById(`aparecerDropDownComentario-${item.idComentario}`).style.display = 'none': console.log(item.idUsuario, sessionStorage.ID_USUARIO)
        
    });
}

function editarComentario(idComentario, acao, instrucaoSql, comentarioOriginal){

    comentarioOrigi = comentarioOriginal

    console.log(comentarioOrigi)
    var conteudo = document.getElementById(`conteudoComentario-${idComentario}`)
    if(acao == 'editar'){

        conteudo.removeAttribute("disabled")
        document.getElementById(`containerEditar-${idComentario}`).style.display = 'flex'

        if(comentarioOrigi != conteudo.value && instrucaoSql == 'executar'){
            fetch("/comentario/editar", {
                method : "POST",
                headers : {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify( {
                    idComentarioServer : idComentario,
                    comentarioServer : conteudo.value

                })
            }).then(function (resposta){
                if(resposta.ok){
                    console.log("Comentario editado com sucesso!")
                    conteudo.setAttribute("disabled", true)
                    document.getElementById(`containerEditar-${idComentario}`).style.display = 'none'
                }
            })
        }

        
    }else {
        conteudo.value = comentarioOrigi
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
            modalAviso('sucesso', 'Comentario publicado com sucesso!')
            if(document.getElementById('containerComentario')){
                document.getElementById('containerComentario').innerHTML = ''
            }
            obterComentarioGeral(idPostagem)
            var qtdComentario = document.getElementById(`qtdComentario-${idPostagem}`)
                    console.log(qtdComentario.value)
                    qtdComentario.innerText = Number(qtdComentario.innerText)+1

        } else {
            modalAviso('Erro', 'Houve um erro ao comentar.')
        }
    })
}

function deletarComentario(idComentario, idPostagem){
    fetch(`/comentario/deletar/${idComentario}`, {cache: 'no-store'}).then(function(resposta){
        if(resposta.ok){
            modalAviso('sucesso', 'Comentário excluído com sucesso!')
            document.getElementById("containerComentario").innerHTML = ''
            obterComentarioGeral(idPostagem)
        }else {
            modalAviso('erro', 'houve um erro ao excluir o seu comentário')
        }
        
    })
}

function contarComentarioPost(idPostagem){
    fetch(`/comentario/count/${idPostagem}`, {cache: 'no-store'}).then(function (resposta){
        if(resposta.ok){
            resposta.json().then(function (res) {
                
                if(res.length> 0){
                    document.getElementById(`qtdComentario-${idPostagem}`).innerText = res[0].qtdComentario
                }
            })
        }
    })
}

