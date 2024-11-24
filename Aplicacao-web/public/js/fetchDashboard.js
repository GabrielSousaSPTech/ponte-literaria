

function obterDadosKpi(idUsuario){
    fetch(`/dashboard/kpi/${idUsuario}`, {cache: 'no-store'}).then(function (resposta){
        if(resposta.ok) {
            resposta.json().then(function (json){
                qtdSeguidor.innerText = json.Seguidores,
                qtdPublicacao.innerText = json.Publicacao,
                qtdCurtida.innerText = json.Curtida,
                qtdComentario.innerText = json.Comentario
            })
        }else {
            corpoDash.innerHTML = '<p>Você ainda não teve interações :(</p>'
        }
    })
}

function obterDadosCategoriasMaisPostadas(idUsuario){
    fetch(`/dashboard/categoria/${idUsuario}`, {cache: 'no-store'}).then(function (resposta){
        if(resposta.ok){
            resposta.json().then(function (resposta){
                plotarGraficoCategoriaMaisPostada(idUsuario, resposta)
            })
        }
    })
}

function obterRankingPostagem(idUsuario){
    rankingPostMaisCurtido.innerHTML = ``
    fetch(`/dashboard/rank/${idUsuario}`, {cache: 'no-store'}).then( function (resposta){
        if(resposta.ok){
            resposta.json().then(function (json){
                json.forEach(item => {
                    rankingPostMaisCurtido.innerHTML += `
                        <li>
                            <span>${item.tituloPostagem} - </span><span>${item.qtdCurtida}</span><span> curtidas</span>
                        </li>
                    
                    `
                });
            })
        }
    })
}

function obterDadoGraficoSeguidoresMes(idUsuario){
    fetch(`/dashboard/seguidoresMes/${idUsuario}`, {cache: 'no-store'}).then(function(resposta){
        if(resposta.ok){
            resposta.json().then(function (resposta){                
                plotarGraficoSeguidoresMes(idUsuario, resposta);
            })
        }
    })
}
function obterDadoGraficoSeguidoresDia(idUsuario){
    var mes = select_mes.value;
    if(mes == 'mesAtual'){
        mes = Number(new Date().getMonth() + 1)
    }
    fetch(`/dashboard/seguidoresDia/${idUsuario}/${mes}`, {cache: 'no-store'}).then(function(resposta){
        if(resposta.ok){
            resposta.json().then(function (resposta){
                
                plotarGraficoSeguidoresDia(idUsuario, mes, resposta);
                
            })
        }
    })
}

function plotarGraficoCategoriaMaisPostada(idUsuario, resposta){
    var graficoCategoria = document.getElementById('graficoCategoriaMaisPostada')

    var legendaCategoria = []

    dataCategoria = {
        labels : legendaCategoria,
        
        datasets: [{
            label: 'Categoria',
            data:[],
            borderWidth: 1,
            backgroundColor: [
                '#FF6A00', 
                '#00BFFF',
                '#32CD32', 
                '#FFD700', 
                '#8A2BE2', 
                '#FF4500', 
                '#2E8B57', 
            ]
        }]
    }

    resposta.forEach(function (item){
        legendaCategoria.push(item.tituloCategoria)
        dataCategoria.datasets[0].data.push(item.quantidade)
    })

    const config = {
        type : 'pie',
        data: dataCategoria,
        
        options :{
            plugins :{
                title: {
                    display: true,
                    text: `Categorias que você mais escreve sobre`
                }
            }
        }
        
    }


    var myChart = new Chart(graficoCategoria, config)
    return console.log(myChart)
    setTimeout(()=>{   
            // atualizarGraficoSeguidoresMes(idUsuario, dataSeguidor, myChart )
    },
    2000
    )
}

function plotarGraficoSeguidoresMes(idUsuario, resposta){
    
    var graficoSeguidor = document.getElementById('graficoSeguidorMes');
    graficoSeguidor.style.display = 'block'
    document.getElementById('graficoSeguidorDia').style.display = 'none'
      
 
    var legendaSeguidor = []

    dataSeguidor = {
        labels : legendaSeguidor,
        datasets : [{
            label: 'Seguidores',
            data : [],
            borderWidth: 1,
            borderColor: '#FF6A00',
            backgroundColor:'#FF6A00'
        }]
    }

    resposta.forEach(function (item){
        legendaSeguidor.push(item.parametro)
        dataSeguidor.datasets[0].data.push(item.qtdSeguidor)
    })


    const config = {
        type: 'bar',
        data: dataSeguidor,
        options :{
            plugins :{
                title: {
                    display: true,
                    text: `Seguidores Ganhos no Mês`
                }
            },
            scales : {
                x : {
                    title: {
                        display: true,
                        text : 'Mês'
                    }
                },
                y :{
                    title: {
                        display: true,
                        text : 'Quantidade'
                    } 
                }
            }
        }
    }
    var myChart = new Chart(graficoSeguidor, config)
    setTimeout(()=>{

        if(document.getElementById('graficoSeguidorMes').style.display != 'none'){
            
            atualizarGraficoSeguidoresMes(idUsuario, dataSeguidor, myChart )
        }
    },
    2000
    )
}

function plotarGraficoSeguidoresDia(idUsuario, mes, resposta){

    var graficoSeguidor = document.getElementById('graficoSeguidorDia');
          graficoSeguidor.style.display = 'block'
    document.getElementById('graficoSeguidorMes').style.display = 'none'
    proximaAtualizacao = null
 
    var legendaSeguidor = []

    dataSeguidor = {
        labels : legendaSeguidor,
        datasets : [{
            label: 'Seguidores',
            data : [],
            borderWidth: 1,
            borderColor: '#FF6A00',
            backgroundColor:'#FF6A00'
        }]
    }

    resposta.forEach(function (item){
        legendaSeguidor.push(item.parametro)
        dataSeguidor.datasets[0].data.push(item.qtdSeguidor)
    })


    const config = {
        type: 'bar',
        data: dataSeguidor,
        options :{
            plugins :{
                title: {
                    display: true,
                    text: `Seguidores ganhos por dia da semana`
                }
            },
            scales : {
                x : {
                    title: {
                        display: true,
                        text : 'Dias da Semana'
                    }
                },
                y :{
                    title: {
                        display: true,
                        text : 'Quantidade'
                    } 
                }
            }
        }
    }
    var myChart = new Chart(graficoSeguidor, config)
    setTimeout(()=>
        atualizarGraficoSeguidoresDia(idUsuario, dataSeguidor, myChart ),
    2000
    )
}
var proximaAtualizacao = null

function atualizarGraficoSeguidoresMes(idUsuario, dataSeguidor, myChart){
    fetch(`/dashboard/seguidoresMes/${idUsuario}`, {cache: 'no-store'}).then(function(resposta){
        if(resposta.ok){
            resposta.json().then(function (resposta){
                resposta.reverse()
                if((resposta[0].qtdSeguidor != dataSeguidor.datasets[0].data[dataSeguidor.labels.length-1] ) && (resposta[0].parametro == dataSeguidor.labels[dataSeguidor.labels.length - 1])){
                    console.log("quantidade de seguidores atualizados")
                   
                    dataSeguidor.datasets[0].data[dataSeguidor.labels.length-1] = resposta[0].qtdSeguidor
                    myChart.update();
                    proximaAtualizacao = setTimeout(()=>{ 
                        atualizarGraficoSeguidoresMes(idUsuario, dataSeguidor, myChart)    
                    }, 2000)
                }
                else if((resposta[0].qtdSeguidor != dataSeguidor.datasets[0].data[dataSeguidor.labels.length-1] ) && (resposta[0].parametro != dataSeguidor.labels[dataSeguidor.labels.length-1])){
                    console.log("Meses atualizados")
                    dataSeguidor.labels.push(resposta[0].parametro)
                    myChart.update();
                    proximaAtualizacao = setTimeout(()=>{ 
                        atualizarGraficoSeguidoresMes(idUsuario, dataSeguidor, myChart)    
                    }, 2000)
                } else{
                    console.log('TUDO ATUALIZADO MÊS')
                }
                proximaAtualizacao = setTimeout(()=>{ 
                    atualizarGraficoSeguidoresMes(idUsuario, dataSeguidor, myChart)    
                }, 2000)
            })
        }
    })
}
var mesSelecionado = new Date().getMonth() + 1;
function atualizarGraficoSeguidoresDia(idUsuario, dataSeguidorDia, myChart){
    var mes = select_mes.value;
    if(mes == 'mesAtual'){
        mes = Number(new Date().getMonth() + 1)
       
    }

    fetch(`/dashboard/seguidoresDia/${idUsuario}/${mes}`, {cache: 'no-store'}).then(function(resposta){
        if(resposta.ok){
            resposta.json().then(function (resposta){
                if(resposta.length>0){
                    resposta.reverse()
                    
                    if(mesSelecionado != mes){
                        mesSelecionado = mes
                        
                        
                        dataSeguidorDia.labels = []
                        dataSeguidorDia.datasets[0].data = []
                        resposta.forEach(function(item){
                            dataSeguidorDia.datasets[0].data.push(item.qtdSeguidor)
                            dataSeguidorDia.labels.push(item.parametro)
                        })
                            myChart.update();
                            proximaAtualizacao = setTimeout(()=> 
                                
                           
                                atualizarGraficoSeguidoresDia(idUsuario, dataSeguidorDia, myChart)
                            
                        , 2000)
                    }else{
                        console.log('TUDO ATUALIZADO DIA DA SEMANA')
                    }
                     
                    proximaAtualizacao = setTimeout(() => {
                        atualizarGraficoSeguidoresDia(idUsuario, dataSeguidorDia, myChart);
                    }, 2000);
                } else {
                    
                    console.log('Não há dados deste mês');
                    dataSeguidorDia.labels = ['Não há dados deste mês'];
                    dataSeguidorDia.datasets[0].data = [];

                    myChart.update();

                    
                    proximaAtualizacao = setTimeout(() => {
                        atualizarGraficoSeguidoresDia(idUsuario, dataSeguidorDia, myChart);
                    }, 2000);
                }
            });
        } else {
            console.error('Erro na resposta da API');
        }
    })
    .catch(function (erro) {
        console.error('Erro na requisição:', erro);
    });
}