var seguidorModel = require("../models/seguidorModel")

function obterSeguidores(req, res){
    var id = req.params.fkUsuarioSeguido;

    seguidorModel.obterSeguidores(id).then(function (resposta) {
        if(resposta.length>0){
            res.status(200).send(resposta);
        } else {
          res.status(403).send(0);
        }
    })
}

function verificarSeSegue(req, res) {
    var fkUsuarioSeguido = req.body.seguidoServer
    var fkUsuarioSeguidor = req.body.seguidorServer

    seguidorModel.verificarSeguidor(fkUsuarioSeguido, fkUsuarioSeguidor).then(function (resposta){
        res.status(201).json(resposta);
    }).catch(function (erro){
        console.log(erro);
        console.log(
            "\nHouve um erro ao verificar se ja segue! Erro: ",
            erro.sqlMessage
        );
        res.status(500).json(erro.sqlMessage);
    })
}

function seguir(req, res) {
    var fkUsuarioSeguido = req.body.seguidoServer
    var fkUsuarioSeguidor = req.body.seguidorServer
    seguidorModel.Seguir(fkUsuarioSeguido, fkUsuarioSeguidor).then((resposta) =>{
        res.status(201).json(resposta)    
    }).catch((function (erro){
        console.log(
            "\nHouve um erro ao seguir! Erro: ",
            erro.sqlMessage
        );
        res.status(500).json(erro.sqlMessage);
    }))
}

module.exports = {
    seguir,
    obterSeguidores,
    verificarSeSegue
}