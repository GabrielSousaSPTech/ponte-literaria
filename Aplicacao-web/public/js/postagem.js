function obterPostagemPerfil (idUsuario) {
    fetch(`/post/${idUsuario}`, {cache: 'no-store'}).then(function (resposta) {
        if(resposta.ok) {
            console.log(resposta)
            resposta.json().then(function (res){
                res.reverse();
                plotarPostagemPerfil(res)
            })
    }else {
            
            document.getElementById("postagemPerfil").innerHTML =`<p style="text-align:center;">Esse perfil ainda não realizou uma postagem</p>`
            
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
            
            document.getElementById("postagemPerfil").innerHTML+= `
            <div class="postagem" onclick="abrirPostagem(${item.idPostagem})" onload="verificarLike(${item.idPostagem}, ${sessionStorage.ID_USUARIO}))">
        <div class="cabecalhoPostagem">
        <div class="dadosCabecalhoPostagem">
        <img src="./assets/imgs/usuarioTeste.jpg" alt="" onclick="event.stopPropagation()">
        <span onclick="event.stopPropagation()">${item.nome}</span>
        <span>-</span>
        <span>${item.dataHoraPostagem}</span>
        </div>
        
        </div>
        
        <div class="corpoPost">
        
        <h3>${item.tituloPostagem}</h3>
        
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
        <span></span>
        </div>
        </div>
        <div class="boxEngajamento" onclick="event.stopPropagation()">
        <img src="./assets/icon/compartilhar.png" alt="">
        <span>Compartilhar</span>
        </div>
        </div> 
        </div>
        `     
        verificarLike(item.idPostagem, sessionStorage.ID_USUARIO);  
    })
}

function contagemPublicacao(resposta) {
    resposta.forEach(item =>{
        document.getElementById("quantidadePublicacoes").innerHTML =`${item.contagemPublicacao} publicações`
        document.getElementById("quantidadeCurtidas").innerHTML =`${item.qtdCurtida} Curtidas`
    })
}



function abrirPostagem (idPostagem){
    window.location = `./view-artigo.html?id=${idPostagem}`
}
