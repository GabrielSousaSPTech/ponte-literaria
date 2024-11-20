function createModal() {
    document.querySelector('.espacoModal').innerHTML = `
        <div class="modal-overlay" style="display: flex;">
            <div class="modal">
                <h2>Modal Simples</h2>
                <p>Este é um modal em CSS puro!</p>
                <button class="modal-close" onclick="closeModal()">Fechar</button>
            </div>
        </div>
    `
}

function modalDelete(idDelete, idGerador, tipoDelete) {
    document.querySelector('.espacoModal').innerHTML = `
        <div class="modal-overlay" style="display: flex;">
            <div class="modalDelete">
            <div class="headerModal">
                <button class="modal-close" onclick="closeModal()">
                    <img src="./assets/icon/close.png" alt="">
                </button>
            </div>
            <div class = "corpoModal">
                <h2>Excluir publicação</h2>
                <p>tem certeza que deseja excluir essa publicação?</p>
                <div class = "groupButton">
                    <button class="btnDelete" onclick="closeModal()">Cancelar</button>

                    <button class="btnDelete" onclick="${tipoDelete == 'Comentario' ? `deletarComentario(${idDelete}, ${idGerador})` : `deletarPost(${idDelete}, ${idGerador})`}, closeModal()">Excluir</button>
                </div>
            </div> 
            </div
        </div>
    `

}

function closeModal() {
    document.querySelector('.modal-overlay').style.display = 'none';
}

function visualizarComentario(resposta) {
    resposta.forEach(item => {
        document.querySelector('.espacoModal').innerHTML = `
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
          <img src="./assets/imgs/usuarioTeste.jpg" alt="" class="fotoUsuarioResposta">
          <span>${item.nome}</span>
          <span>-</span>
          <span>${item.dataHoraPostagem}</span>
        </div>
        <div class = "containerDropDown" id="aparecerDropDownModal-${item.idPostagem}">
            <img style="display:'flex';" src = "./assets/icon/more.png" onclick="event.stopPropagation(), dropDown(${item.idPostagem}, 'Modal')">
            <div class="dropDownPost" id="dropDownModal-${item.idPostagem}">
                <a href = "./criacao-artigo.html?acao=edit&id=${item.idPostagem}">Editar</a>
                <span onclick=" event.stopPropagation(), modalDelete(${item.idPostagem}, ${item.idUsuario}, 'Postagem')">Excluir</span>
            </div>
        </div>
      </div>

      <div class="corpoPost">

        <h3>${item.tituloPostagem}</h3>

        <p>${item.conteudoPostagem}</p>
      </div>
      <div class="interacaoPost">
        <div class="engajamento">
          <div class="boxEngajamento"
            onclick="event.stopPropagation(); darLike(${item.idPostagem}, ${sessionStorage.ID_USUARIO})">
            <img id="iconCurtidaModal-${item.idPostagem}" src="./assets/icon/like.png" alt="">
            <span id="qtdCurtidaModal-${item.idPostagem}">${item.qtdCurtida}</span>
          </div>
          <div class="boxEngajamento" onclick="event.stopPropagation(); realizarComentario(${item.idPostagem})">
            <img src="./assets/icon/comentario.png" alt="">
            <span id="qtdComentario-${item.idPostagem}">${item.qtdComentario}</span>
          </div>
        </div>
        <div class="boxEngajamento" onclick="event.stopPropagation()">
          <img src="./assets/icon/compartilhar.png" alt="">
          <span>Compartilhar</span>
        </div>
      </div>
      <form action="" class="boxComentario">
        <textarea name="comentario" id="textarea_comentario" placeholder="Digite um Comentario..." rows="8"
          cols="5"></textarea>
        <button type="button" onclick="criarComentario(${item.idPostagem}, ${sessionStorage.ID_USUARIO}), closeModal()">
          <img src="./assets/icon/enviarMsg.png" alt="">
        </button>
      </form>
    </div>
  </div>
`

  verificarLike(item.idPostagem, sessionStorage.ID_USUARIO);
  item.idUsuario != sessionStorage.ID_USUARIO? document.getElementById(`aparecerDropDownModal-${item.idPostagem}`).style.display = 'none': ''
    });
}

function dropDown(idPostagem, elemento) {
      const dropdown = document.getElementById(`dropDown${elemento}-${idPostagem}`)
    

    if (dropdown.style.display == 'flex') {
        dropdown.style.display = 'none'
    } else {
        dropdown.style.display = 'flex'
    }
}

function dropDownComentario(idComentario) {
    const dropdown = document.getElementById(`dropDownComentario-${idComentario}`)

    if (dropdown.style.display == 'flex') {
        dropdown.style.display = 'none'
    } else {
        dropdown.style.display = 'flex'
    }
}