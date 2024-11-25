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
        document.getElementById("visualizacaoArtigo").innerHTML += `
        
                    <h3>${item.tituloPostagem} - <span>${item.categoria}</span></h3>

            <div class="corpoArtigo">
                <p>${item.conteudoPostagem}</p>
            </div>
            <div class="interacaoPost">
                <div class="engajamento">
                    <div class="boxEngajamento" onclick="darLike(${item.idPostagem}, ${sessionStorage.ID_USUARIO})">
            <img id="iconCurtida-${item.idPostagem}" src="./assets/icon/like.png" alt="">
            <span id="qtdCurtida-${item.idPostagem}">${item.qtdCurtida}</span>
        </div>
                    
                </div>
                <div class="boxEngajamento">
                    <img src="./assets/icon/compartilhar.png" alt="">
                    <span>Compartilhar</span>
                </div>
            </div>
        `

        verificarLike(item.idPostagem, sessionStorage.ID_USUARIO); 
    })
}