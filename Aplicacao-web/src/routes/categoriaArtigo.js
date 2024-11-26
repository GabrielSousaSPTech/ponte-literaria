var express = require("express");
var router = express.Router();

var categoriaController = require('../controllers/categoriaController')

router.get('/getCategoria', function(req, res){
    categoriaController.obterCategoriaArtigo(req, res);
})

router.get('/searchCategoria', function(req, res){
    categoriaController.obterCategoriaArtigo(req, res);
})


module.exports = router