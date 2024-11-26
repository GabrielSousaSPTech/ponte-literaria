
function criarPostagem (idUsuario){

    const titulo = tituloCriacaoArtigo.value
    const conteudo = criacaoArtigo.value
    const categoria = select_genero.value
    fetch('/post/create', {
        method: "POST",
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify ({
            idUsuarioServer : idUsuario,
            tituloPublicacaoServer : titulo,
            conteudoPublicacaoServer : conteudo,
            categoriaArtigoServer : categoria
        })
    }).then(function (resposta){
        if(resposta.ok){
            window.location = `./perfil.html?id=${idUsuario}`
            
        }else{
            modalAviso('erro', 'Erro ao publicar artigo.<br> Tente novamente mais tarde')
        }
    })

    tituloCriacaoArtigo.value = ''
    criacaoArtigo.value = ''
}

function editarPostagem (idUsuario, idPostagem){
    const titulo = tituloCriacaoArtigo.value
    const conteudo = criacaoArtigo.value

    fetch('/post/edit', {
        method: "POST",
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify ({
            idUsuarioServer : idUsuario,
            idPostagemServer : idPostagem,
            tituloPublicacaoServer : titulo,
            conteudoPublicacaoServer : conteudo
        })
    }).then(function (resposta){
        if(resposta.ok){
            window.location = `./perfil.html?id=${idUsuario}`
            
        }else {
            modalAviso('erro', 'Erro ao editar artigo!')
        }
    })

    tituloCriacaoArtigo.value = ''
    criacaoArtigo.value = '' 
}


function deletarPost(idPostagem, idUsuario){
    fetch(`/post/delete`,{
        method: "POST",
        headers:{
            "Content-Type": 'application/json'
        },
        body: JSON.stringify({
            idPostagemServer : idPostagem
        })
    }).then(function (resposta){
        if(resposta.ok){
            modalAviso('sucesso', 'Artigo excluído com sucesso!')
            document.getElementById("postagemPerfil").innerHTML = ''
            obterPostagemPerfil(idUsuario)
        }

        
    })
}

function deletarPostPeloArtigo(idPostagem){
    fetch(`/post/delete`,{
        method: "POST",
        headers:{
            "Content-Type": 'application/json'
        },
        body: JSON.stringify({
            idPostagemServer : idPostagem
        })
    }).then(function (resposta){
        if(resposta.ok){
            window.history.back();
        }

        
    })
}





function obterPostagemPerfil (idUsuario) {
    fetch(`/post/${idUsuario}`, {cache: 'no-store'}).then(function (resposta) {
        if(resposta.ok) {
            console.log(resposta)
            resposta.json().then(function (res){
                res.reverse();
                plotarPostagemPerfil(res)
                // document.getElementById("nomeUsuario").innerText = `${res[0].nomeUsuario}`
                // document.getElementById("username").innerText = `${res[0].usernameUsuario}`
            })
    }else {
            if(sessionStorage.ID_USUARIO == idUsuario){
                document.getElementById("postagemPerfil").innerHTML =`<p class="mensagemPerfilVazio">Vamos lá! Publique o seu primeiro artigo para pessoas conhecerem suas opiniões e histórias.<br>Eu sugiro a você que conte de uma saga de livros muito marcante na sua vida. Assim como eu fiz!</p>`

            }else{
                document.getElementById("postagemPerfil").innerHTML =`<p class="mensagemPerfilVazio">Esse perfil ainda não realizou uma postagem</p>`
            }
            
        }
    })
    
    fetch(`post/count/${idUsuario}`, {cache: 'no-store'}).then(function (resposta){
        if(resposta.ok) {
            resposta.json().then(function (res){
                contagemPublicacao(res)
            })
        } else {
            document.getElementById("quantidadePublicacoes").style.display= 'none'
        }
    })
}





function realizarComentario(idPostagem) {
    fetch(`post/view/${idPostagem}`,{cache: 'no-store'}).then(function(resposta){
        if(resposta.ok) {
            resposta.json().then(function (res){
                visualizarComentario(res)
            })
        }
    })
}

function plotarPostagemPerfil (resposta) {
    

        resposta.forEach(async item =>{
            console.log(item)
            document.getElementById("postagemPerfil").innerHTML += `
            <div class="postagem" onclick="abrirPostagem(${item.idPostagem})" onload="verificarLike(${item.idPostagem}, ${sessionStorage.ID_USUARIO}))">
        <div class="cabecalhoPostagem">
        <div class="dadosCabecalhoPostagem">
        <img src="./assets/imgs/usuario/${item.fotoUsuario == null?'usuarioTeste.jpg': item.fotoUsuario}" alt="" onclick="event.stopPropagation()">
        <span onclick="event.stopPropagation()">${item.nomeUsuario}</span>
        <span>-</span>
        <span>${formatarData(item.dataHoraPostagem)}</span>
        </div>
        <div class = "containerDropDown" id="aparecerDropDown-${item.idPostagem}">
        <img src = "./assets/icon/more.png" onclick="event.stopPropagation(), dropDown(${item.idPostagem},'Post')">
            <div class="dropDownPost" id="dropDownPost-${item.idPostagem}">
                <a href = "./criacao-artigo.html?acao=edit&id=${item.idPostagem}">Editar</a>
                <span onclick=" event.stopPropagation(), modalDelete(${item.idPostagem}, ${item.idUsuario}, 'Postagem')">Excluir</span>
            </div>
        </div>
        </div>

        <div class="corpoPost">
            
            <div class = "tituloPostagem">
            <h3 class = 'tituloArtigo'>${item.tituloPostagem} - <span id="categoriaPostagem">${item.categoria}</span></h3>
            
            </div>
            <p>${item.conteudoPostagem}</p>
        </div>
        
        <div class="interacaoPost">
        <div class="engajamento">
        <div class="boxEngajamento" onclick="event.stopPropagation(); darLike(${item.idPostagem}, ${sessionStorage.ID_USUARIO})">
            <img id="iconCurtida-${item.idPostagem}" src="./assets/icon/like.png" alt="">
            <span id="qtdCurtida-${item.idPostagem}">${item.qtdCurtida}</span>
        </div>
        <div class="boxEngajamento" onclick="event.stopPropagation(); realizarComentario(${item.idPostagem})">
        <img src="./assets/icon/comentario.png" alt="">
        <span id="qtdComentario-${item.idPostagem}">0</span>
        </div>
        </div>
        </div> 
        </div>
        `     

        item.idUsuario != sessionStorage.ID_USUARIO? document.getElementById(`aparecerDropDown-${item.idPostagem}`).style.display = 'none': console.log(item.idUsuario, sessionStorage.ID_USUARIO)
        contarComentarioPost(item.idPostagem)
        verificarLike(item.idPostagem, sessionStorage.ID_USUARIO);  
    })
}



function contagemPublicacao(resposta) {
    resposta.forEach(item =>{
        document.getElementById("quantidadePublicacoes").innerHTML =item.contagemPublicacao
        document.getElementById("quantidadeCurtidas").innerHTML =item.qtdCurtida
    })
}



function abrirPostagem (idPostagem){
    window.location = `./view-artigo.html?id=${idPostagem}`
}
