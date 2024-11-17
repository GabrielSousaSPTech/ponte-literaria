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

module.exports = {
    search
}