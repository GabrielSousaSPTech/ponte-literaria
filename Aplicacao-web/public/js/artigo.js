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


function plotarArtigoCompleto(resposta) {

    resposta.forEach(item =>{
        document.getElementById("visualizacaoArtigo").innerHTML += `
        
                    <h3>${item.tituloPostagem}</h3>

            <div class="corpoArtigo">
                <p>${item.conteudoPostagem}</p>
            </div>
            <div class="interacaoPost">
                <div class="engajamento">
                    <div class="boxEngajamento">
                        <img src="./assets/icon/like.png" alt="">
                        <span>${item.qtdCurtida}</span>
                    </div>
                    
                </div>
                <div class="boxEngajamento">
                    <img src="./assets/icon/compartilhar.png" alt="">
                    <span>Compartilhar</span>
                </div>
            </div>
        `
    })
}