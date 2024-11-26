const containerRespostaPesquisa = document.getElementById(`containerResultadopesquisa`)
const containerRespostaCategoria = document.getElementById('containerRespostaCategoria')


function searchCategoria(){
    const input = document.getElementById('input_categoria')
    const pesquisa = input.value
    containerRespostaCategoria.addEventListener('mousedown', (event) => {
        event.preventDefault();
    });

    input.addEventListener('blur', ()=>{
        containerRespostaCategoria.style.display = 'none'
    })
    if(pesquisa.length>0){
       
        fetch("/search/searchCategoria", {
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                pesquisaServer :pesquisa
            })
        }).then(function (resposta){
            if(resposta.ok){  
                resposta.json().then(function (res){
                    if(res.length>0){
                        plotarResultadoPesquisaCategoria(res)
                    }else{
                        
                    }  
                })
            }else{
                containerRespostaPesquisa.innerHTML = '<p>Sem resultados :(</p>'
            }
    })
}
}

function plotarResultadoPesquisaCategoria(pesquisa){
    containerRespostaCategoria.innerHTML = ''
    containerRespostaCategoria.style.display = 'flex'
    containerRespostaCategoria.style.position = 'absolute'
     
    
    pesquisa.forEach(item => {
        console.log(item.titu)
        containerRespostaCategoria.innerHTML += `
        
        <div class="cabecalhoPostagem" onclick="event.stopPropagation(); obterFeedCategoria(${item.idCategoriaArtigo})">
                    <span>${item.tituloCategoria}</span>
                </div>
            
        `
    });
}


function search (){
    const input = document.getElementById('input_pesquisa');
    const pesquisa = input.value
    
    containerRespostaPesquisa.addEventListener('mousedown', (event) => {
        event.preventDefault();
    });

    input.addEventListener('blur', ()=>{
        containerRespostaPesquisa.style.display = 'none'
    })
    
    if(pesquisa.length>0){
        
        fetch("/search/", {
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                pesquisaServer :pesquisa
            })
        }).then(function (resposta){
            if(resposta.ok){
                
                
                resposta.json().then(function (res){
                    if(res.length>0){
                    
                    plotarResultadoPesquisa(res)
                }else{
                    
                }
                
            })
            
        }else{
            containerRespostaPesquisa.innerHTML = '<p>Sem resultados :(</p>'
        }
    })
}else{
    containerRespostaPesquisa.innerHTML = '<p>Ache pessoas com os seus gostos</p>'
    
}
}

function plotarResultadoPesquisa(pesquisa){
    containerRespostaPesquisa.innerHTML = ''
    containerRespostaPesquisa.style.display = 'flex'
    containerRespostaPesquisa.style.position = 'absolute'
     
    
    pesquisa.forEach(item => {
        console.log(item.nome)
        containerRespostaPesquisa.innerHTML += `
        <div class="cabecalhoPostagem" onclick="event.stopPropagation(); abrirPerfil(${item.idUsuario})">
                    <div class="dadosCabecalhoPostagem">
                        <img src="./assets/imgs/usuario/${item.fotoUsuario == null?'usuarioTeste.jpg': item.fotoUsuario}" alt="" onclick="event.stopPropagation()">
                        <span id="nomeUsuarioPesquisa-${item.idUsuario}" class = "campoNome" onclick="event.stopPropagation(); abrirPerfil(${item.idUsuario})">${item.nome}</span>
                        <span> - </span>
                        <span id="usernameUsuarioPesquisa-${item.idUsuario}" class = "campoUsername" onclick="event.stopPropagation(); abrirPerfil(${item.idUsuario})">${item.username}</span>

                    </div>
                </div>
            
        `
    });
}