var feedModel = require('../models/feedModel');

function obterFeedSeguindo(req, res){
   var idUsuario =  req.params.idUsuario

   feedModel.obterFeedSeguindo(idUsuario).then(function(resposta){
        if(resposta.length >0){
            res.status(201).json(resposta);
        }else {
            res.status(403).send("Você ainda não segue ninguém :(");
        }
   })
}

function obterFeedCategoria(req, res){
    var idCategoria = req.params.idCategoria
    console.log(idCategoria)
    feedModel.obterFeedCategoria(idCategoria).then(function(resposta){
        if(resposta.length >0){
            res.status(201).json(resposta);
        }else {
            res.status(403).send("Está categoria ainda não tem postagems :(");
        }
    })
}

module.exports = {
    obterFeedSeguindo,
    obterFeedCategoria
}