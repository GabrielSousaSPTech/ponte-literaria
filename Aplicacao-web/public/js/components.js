
function navbarPerfil(){

    document.getElementById('div_navbarPerfil').innerHTML =`
    
    <a href="./feed.html">
    <img src="./assets/icon/home.png" style="height: 2.5rem; margin: 2rem;" alt="">
    </a>
    <div class="container">
    <div class="containerInformacoesPerfil">
    
    <span id="quantidadeSeguidores"></span><span> Seguidor</span>
    <span id="quantidadeSeguindo"></span><span> Seguindo</span>
    </div>
    <div class="sessaoInformacaoUsuario">
    <div style="position: relative;">
    <img class="imgPerfil" src="./assets/imgs/usuarioTeste.jpg" alt="" id="fotoPreview">
    <div id="botaoEditarFoto" class="containerIconCamera">
    <img  class="" src="./assets/icon/camera.png" alt="" onclick="modalMudarFoto(sessionStorage.ID_USUARIO)">
    <input id="input_foto" type="file" src="" alt="" style="display: none;">
    </div>
    </div>
    <div class="nickname">
    <div style="display: flex; gap: 5%; justify-content: center; align-items: center;">
    <span id="nomeUsuario">Gabriel da Silva Sousa</span>
    
    </div>
    <span id="username">@gabrielSousa</span>
    </div>
    </div>
    
    <button id="getSeguir" class="botaoSeguir " onclick="seguirUsuario(idUsuario, sessionStorage.ID_USUARIO)">Seguir</button>
    
    
    
    
    <button id="getAnalytics" class="botaoSeguir ">Editar Perfil </button>
    
    
    <div class="containerInformacoesPerfil">
    <span id="quantidadeCurtidas"></span><span> Curtida</span>
    
    <span id="quantidadePublicacoes"></span><span> Publicação</span>
    
    
    </div>
    
    </div>
    `   
}

function sidebar(){

    document.getElementById('div_sidebar').innerHTML = `
    <img class="logotipo" src="./assets/imgs/logotipo-pl.png" alt="">
    <ul class="corpoSidebar">
      <a href="./feed.html">
      <div class="topico-pagina">
      <img src="./assets/icon/home.png" alt="">
      <span>
      Página Inicial</span>
      </span>
      </a>
      </div>

      <a href="./index.html">
      <div class="topico-pagina">
      <img src="./assets/icon/projeto.png" alt="">
      <span>
      Projeto</span>
      </span>
      </div>
      </a>
      <div class="topico-pagina" onclick="abrirPerfil(sessionStorage.ID_USUARIO)">
      <img src="./assets/icon/usuario.png" alt="">
      <span >Perfil</span>
      </div>
      </span>
      
      <a href="./dashboard.html">
      <div class="topico-pagina">
      <img src="./assets/icon/analytics.png" alt="">
      <span>
      Analytics
      </span>
      </div>
      </a>
      
      
      <a onclick="limparSessao()">
      <div class="topico-pagina">
      <img src="./assets/icon/logout.png" alt="">
      <span>Sair</span>
      </div>
      </a>
   </ul>
    `
    }

