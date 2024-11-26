var searchModel = require('../models/searchModel');

function search(req, res){
    var pesquisa = req.body.pesquisaServer

    searchModel.getSearch(pesquisa).then(function (resultado){
        if (resultado.length > 0) {
            res.status(200).json(resultado);
          } else {
            res.status(403).send("Não há resultados!");
          }
    })
}

function searchCategoria(req, res){
  var pesquisa = req.body.pesquisaServer
   searchModel.searchCategoria(pesquisa).then(function (resposta){
       if(resposta.length > 0 ){
           res.status(201).send(resposta)
       }else{
           res.status(403).send('Não há categorias')
       }
   })
}

module.exports = {
    search,
    searchCategoria
}