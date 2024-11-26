function obterPostagem (idPostagem) {
    fetch(`post/view/${idPostagem}`, {cache: 'no-store'}).then(function (resposta) {
        if(resposta.ok) {
            console.log(resposta)
            resposta.json().then(function (res){
                res.reverse();
                plotarArtigoCompleto(res)
            })
    }else {
            document.getElementById("visualizacaoArtigo").innerHTML =`<p style="text-align:center; margin: auto;">Erro ao mostrar artigo</p>`
        }
    })
    
}

function obterCategoriaArtigo(){
    fetch('categoria/getCategoria', {cache: 'no-store'}).then(function (resposta){
        if(resposta.ok){
            resposta.json().then(function(res){

                res.forEach(function (item){
                    select_genero.innerHTML += `
                    <option value = '${item.idCategoriaArtigo}'>${item.tituloCategoria}</option> 
                    `
                })
            })
        }
    })
}


function plotarArtigoCompleto(resposta) {

    resposta.forEach(item =>{
        console.log(item)
        document.getElementById("visualizacaoArtigo").innerHTML += `
                
                    
                    <div class="cabecalhoPostagem">
                        <div class="dadosCabecalhoPostagem">
                            <img src="./assets/imgs/usuario/${item.fotoUsuario == null?'usuarioTeste.jpg': item.fotoUsuario}" alt="" onclick="event.stopPropagation(), abrirPerfil(${item.idUsuario})">
                            <span onclick="event.stopPropagation(), abrirPerfil(${item.idUsuario})">${item.nome}</span>
                            <span>-</span>
                            <span>${formatarData(item.dataHoraPostagem)}</span>
                        </div>
                        <div class = "containerDropDown" id="aparecerDropDown-${item.idPostagem}">
                            <img src = "./assets/icon/more.png" onclick="event.stopPropagation(), dropDown(${item.idPostagem},'Post')">
                            <div class="dropDownPost" id="dropDownPost-${item.idPostagem}">
                                <a href = "./criacao-artigo.html?acao=edit&id=${item.idPostagem}">Editar</a>
                                <span onclick=" event.stopPropagation(), modalDelete(${item.idPostagem}, ${item.idUsuario}, 'artigo')">Excluir</span>
                            </div>
                        </div>
                    </div>
            <div class="corpoArtigo">
            <h3 class = "tituloArtigo">${item.tituloPostagem} - <span class = "categoriaArtigo">${item.categoria}</span></h3>
                <p>${item.conteudoPostagem}</p>
            </div>
            <div class="interacaoPost">
                <div class="engajamento">
                    <div class="boxEngajamento" onclick="darLike(${item.idPostagem}, ${sessionStorage.ID_USUARIO})">
            <img id="iconCurtida-${item.idPostagem}" src="./assets/icon/like.png" alt="">
            <span id="qtdCurtida-${item.idPostagem}">${item.qtdCurtida}</span>
        </div>
                    
                </div>
               
            </div>
        `

        verificarLike(item.idPostagem, sessionStorage.ID_USUARIO); 
    })
}