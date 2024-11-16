function createModal() {
    document.querySelector('.espacoModal').innerHTML =`
        <div class="modal-overlay" style="display: flex;">
            <div class="modal">
                <h2>Modal Simples</h2>
                <p>Este é um modal em CSS puro!</p>
                <button class="modal-close" onclick="closeModal()">Fechar</button>
            </div>
        </div>
    `
}

function closeModal() {
    document.querySelector('.modal-overlay').style.display = 'none';
}

function visualizarComentario (resposta) {
    resposta.forEach(item => {
        
        document.querySelector('.espacoModal').innerHTML =`
        <div class="modal-overlay" style="display: flex;">
        <div class="modal">
        <div class="headerModal">
        <button class="modal-close" onclick="closeModal()">
        <img src="./assets/icon/close.png" alt="">
        </button>
        </div>
        
        <div class="postagem">
        <div class="cabecalhoPostagem">
        <div class="dadosCabecalhoPostagem">
        <img src="./assets/imgs/usuarioTeste.jpg" alt="" class = "fotoUsuarioResposta">
        <span>${item.nome}</span>
        <span>-</span>
        <span>${item.dataHoraPostagem}</span>
        </div>
        <button>Seguir</button>
        </div>
        
        <div class="corpoPost">
        
        <h3>${item.tituloPostagem}</h3>
        
        <p>${item.conteudoPostagem}</p>
                      </div>
                      <div class="interacaoPost">
                      <div class="engajamento">
                      <div class="boxEngajamento">
                      <img src="./assets/icon/like.png" alt="">
                      <span>01</span>
                      </div>
                      <div class="boxEngajamento" onclick="event.stopPropagation()">
                      <img src="./assets/icon/comentario.png" alt="">
                      <span>01</span>
                      </div>
                      </div>
                      <div class="boxEngajamento">
                      <img src="./assets/icon/compartilhar.png" alt="">
                              <span>Compartilhar</span>
                          </div>
                          </div>
                          <form action="" class="boxComentario">
                          
                          <textarea name="comentario" id="comentario" placeholder="Digite um Comentario..." rows="8" cols="5" onclick="event.stopPropagation()"></textarea>
                          <button type="button" onclick="enviarComentario()">
                          <img src="./assets/icon/enviarMsg.png" alt="">
                          </button>
                          </form>
                          </div>
                          </div>
                          `
    });
}