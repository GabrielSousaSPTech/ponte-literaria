var categoriaModel = require('../models/categoriaModel')

function obterCategoriaArtigo(req, res){
    categoriaModel.getCategoria().then(function (resposta){
        if(resposta.length > 0){
            res.status(201).send(resposta)
        }else{
            res.status(403).send('Não há categorias')
        }
    })
}

module.exports = {
    obterCategoriaArtigo
}