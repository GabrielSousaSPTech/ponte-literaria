var dashboardModel = require('../models/dashboardModel')

function obterDadosKpi (req, res){
    var idUsuario = req.params.idUsuario

    dashboardModel.obterDadosKpi(idUsuario).then(function (resposta){
            if(resposta.length>0){
                res.json({
                    Seguidores: resposta[0].qtdSeguidores,
                    Publicacao : resposta[0].qtdPostagem,
                    Curtida : resposta[0].qtdCurtida,
                    Comentario : resposta[0].qtdComentario
                });
            }else {
                res.status(403).send('Usúario ainda não tem dados')
            }
    })
}

function obterPublicacaoMaisCurtida(req, res){
    var idUsuario = req.params.idUsuario

    dashboardModel.obterPublicacaoMaisCurtida(idUsuario).then(function (resposta){
        res.status(201).json(resposta)
    }).catch(
        function (erro) {
            console.log(erro);
            console.log(
                "\nHouve um erro ao ranquear os posts mais curtidos! Erro: ",
                erro.sqlMessage
            );
            res.status(500).json(erro.sqlMessage);
        });
}

function obterSeguidoresMes(req, res){
    var idUsuario = req.params.idUsuario
  

   

        dashboardModel.obterSeguidoresMes(idUsuario).then(function (resposta){
            res.status(201).json(resposta)
        }).catch(
            function (erro) {
                console.log(erro);
            console.log(
                "\nHouve um erro ao obter os seguidores! Erro: ",
                erro.sqlMessage
            );
            res.status(500).json(erro.sqlMessage);
        })
}


function obterSeguidoresDia(req, res){
    var idUsuario = req.params.idUsuario
    var mes = req.params.mes

dashboardModel.obterSeguidoresDia(idUsuario, mes).then(function (resposta){
    res.status(201).json(resposta)
}).catch(
    function (erro) {
        console.log(erro);
    console.log(
        "\nHouve um erro ao obter os seguidores do dia! Erro: ",
        erro.sqlMessage
    );
    res.status(500).json(erro.sqlMessage);
});
}

function obterCategoriasMaisPostadas(req, res){
    var idUsuario = req.params.idUsuario

    dashboardModel.obterCategoriasQueMaisPosta(idUsuario).then(function(resposta){
        res.status(201).json(resposta)
    }).catch(
        function (erro) {
            console.log(erro);
        console.log(
            "\nHouve um erro ao obter as categorias mais postadas! Erro: ",
            erro.sqlMessage
        );
        res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
    obterDadosKpi,
    obterPublicacaoMaisCurtida,
    obterSeguidoresMes,
    obterSeguidoresDia,
    obterCategoriasMaisPostadas
}

