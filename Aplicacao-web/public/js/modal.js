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
function closeModalChecagem() {
    document.querySelector('.modal-overlay-senha').style.display = 'none';
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
          <img src="./assets/imgs/usuario/${item.fotoUsuario == null?'usuarioTeste.jpg': item.fotoUsuario}" alt="" onclick="event.stopPropagation()" class="fotoUsuarioResposta">
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

function modalMudarFoto(){
  document.querySelector('.espacoModal').innerHTML = `
        <div class="modal-overlay" style="display: flex;">
            <div class="modalDelete">
            <div class="headerModal">
                <button class="modal-close" onclick="closeModal()">
                    <img src="./assets/icon/close.png" alt="">
                </button>
            </div>
            <div class = "corpoModal">
                <h2>Editar foto de perfil</h2>
                <p>tem certeza que deseja editar sua foto de perfil?</p>
                <div class = "groupButton">
                    <button class="btnDelete" onclick="closeModal()">Cancelar</button>

                    <label for = "input_foto" class="btnDelete">Carregar Foto</label>
                </div>
            </div> 
            </div
        </div>
    `

}

function modalEditarPerfil(idUsuario){

  fetch(`/usuario/${idUsuario}`, {cache: 'no-store'}).then(function (resposta){
    if(resposta.ok) {
        resposta.json().then(function (res){
          console.log(res)
          document.querySelector('.espacoModal').innerHTML = `
          <div class="modal-overlay" style="display: flex;">
            <div class="modal">
            <div class="corpoModal" id="corpoModal">
            <div class="headerModal">
            <button class="modal-close" onclick="closeModal()">
            <img src="./assets/icon/close.png" alt="">
            </button>
            </div>
            <div class = "containerModalEditarPerfil">
                  <div style="position: relative;">
                    <img src="./assets/imgs/usuario/${res.fotoPerfilUsuario == null?'usuarioTeste.jpg': res.fotoPerfilUsuario}" alt="" onclick="event.stopPropagation()" id="fotoPreview" class="imgPerfil">
                    <div id="botaoEditarFoto" class="containerIconCamera">
                      <img  class="" src="./assets/icon/camera.png" alt="" onclick="modalMudarFoto(sessionStorage.ID_USUARIO)">
                      <input id="input_foto" type="file" src="" alt="" style="display: none;">
                    </div>
                  </div>

                  <div class="containerDadosUsuario">
                    <div class ="boxEditDadoUsuario">
                      <input type ="text" disabled value='${res.nome}' id="input_nomeEdit" class="inputEditarPerfil"/>
                      <img src = "./assets/icon/edit.png" class = "iconEdit" onclick="habilitarEdicao('editar')">
                </div>
                    <div class ="boxEditDadoUsuario">
                      <input type ="text" disabled value='${res.username}' id="input_usernameEdit" class="inputEditarPerfil"/>
                      
                </div>
                    <div class ="boxEditDadoUsuario">
                      <input type ="text" disabled value='${res.email}' id="input_emailEdit" class="inputEditarPerfil"/>
                      
                </div>
                    <div class ="boxEditDadoUsuario">
                      <span>mudar Senha</span>
                      <img src = "./assets/icon/edit.png" class = "iconEdit" onclick="modalChecagemUsuario()">
                </div>

                  <div id="groupButtonEditar">
                  <span> Digite sua senha para confirmar a edição</span>
                  <input type="text" id="input_checagem_senha">
             <div id="erro"></div>
                  <button onclick="habilitarEdicao('cancel')">Cancelar</button>
                  <button onclick = "editarUsuario()">Editar</button>

                </div>
              </div>
  
      
            </div>
          </div>
  `
        })
}else {
        
        document.getElementById("corpoModal").innerHTML =`<p style="text-align:center;">Esse perfil não está disponível</p>`
        
    }
})
        

}

async function habilitarEdicao(acao){
 const nome = document.getElementById('input_nomeEdit');
 const username = document.getElementById('input_usernameEdit');
 const email = document.getElementById('input_emailEdit');
 const groupButton = document.getElementById('groupButtonEditar');

 if(acao == 'editar'){
   groupButton.style.display = 'flex'
   nome.removeAttribute("disabled")
   username.removeAttribute("disabled")
   email.removeAttribute("disabled")

  }else {
    
    groupButton.style.display = 'none'
    nome.setAttribute("disabled", true)
    username.setAttribute("disabled", true)
    email.setAttribute("disabled", true)

  }
}

function modalChecagemUsuario(){
  document.querySelector('.espacoModal').innerHTML = `
       <div class="modal-overlay-senha" style="display: flex;">
          <div class="modalDelete">
            <div class="headerModal">
                <button class="modal-close" onclick="closeModalChecagem()">
                    <img src="./assets/icon/close.png" alt="">
                </button>
            </div>
            <div class = "corpoModal containerModalEditarSenha" >
              <span>Digite sua senha atual</span>
              <input id="input_senha_atual" type="password" placeholder="******" />
              <span>Digite sua nova Senha</span>
              <input id="input_nova_senha" type="password" placeholder="******" />
              <span>Confirme sua nova Senha</span>
              <input id="input_confirmacao_senha" type="password" placeholder="******" />
              <div id="mensagem_usuario"></div>
              <div class = "groupButton">
                  <button class="btnDelete" onclick="closeModalChecagem()">Cancelar</button>
                  <button class="btnDelete" onclick="editarSenhaUsuario()">Concluído</button>
              </div>
            </div>
          </div>
        </div>
    `

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