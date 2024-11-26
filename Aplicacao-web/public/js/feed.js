function obterFeedSeguindo(idUsuario){
    fetch(`/feed/feedSeguindo/${idUsuario}`, {cache: 'no-store'}).then(function (resposta){
        if(resposta.ok){
            resposta.json().then(function(res){
                plotarFeedSeguindo(res)  
            })
        }else {
            document.getElementById("postagemFeed").innerHTML = ''
            document.getElementById("postagemFeed").innerHTML =`<p class="mensagemPerfilVazio">Vamos lá! Conheça pessoas novas. E acompanhe os sonhos e histórias dela!</p>`
        }
    })
}

function obterFeedCategoria(idCategoria){
    const input = document.getElementById('input_categoria')
    const containerRespostaCategoria = document.getElementById('containerRespostaCategoria')
    containerRespostaCategoria.style.display = 'none'
    fetch(`/feed/feedCategoria/${idCategoria}`, {cache: 'no-store'}).then(function (resposta){
        if(resposta.ok){
            resposta.json().then(function(res){
                input.value = res[0].categoria
                console.log(res)
                plotarFeedCategoria(res)  
            })
        }else {
            document.getElementById("postagemFeed").innerHTML = ''
            document.getElementById("postagemFeed").innerHTML =`<p class="mensagemPerfilVazio">Desbrave temas e categorias de livros do seu interesse!</p>`
        }
    })
}

function plotarFeedCategoria(res){
    document.getElementById("postagemFeed").innerHTML = ''
    res.forEach(function(item) {
        
        document.getElementById("postagemFeed").innerHTML += `
        <div class="postagem" onclick="abrirPostagem(${item.idPostagem})">
    <div class="cabecalhoPostagem">
    <div class="dadosCabecalhoPostagem">
    <img src="./assets/imgs/usuario/${item.fotoUsuario == null?'usuarioTeste.jpg': item.fotoUsuario}" alt="" onclick="event.stopPropagation(), abrirPerfil(${item.idUsuario})">
    <span onclick="event.stopPropagation(), abrirPerfil(${item.idUsuario})">${item.nomeUsuario}</span>
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
    });
}



function plotarFeedSeguindo(res){
    document.getElementById("postagemFeed").innerHTML = ''
    res.forEach(function(item) {
        
        document.getElementById("postagemFeed").innerHTML += `
        <div class="postagem" onclick="abrirPostagem(${item.idPostagem})">
    <div class="cabecalhoPostagem">
    <div class="dadosCabecalhoPostagem">
    <img src="./assets/imgs/usuario/${item.fotoUsuario == null?'usuarioTeste.jpg': item.fotoUsuario}" alt="" onclick="event.stopPropagation(), abrirPerfil(${item.idUsuario})">
    <span onclick="event.stopPropagation(), abrirPerfil(${item.idUsuario})">${item.nomeUsuario}</span>
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
    });
}