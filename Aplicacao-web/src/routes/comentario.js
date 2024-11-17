var express = require("express");
var router = express.Router();
var comentarioController = require('../controllers/comentarioController');

router.get("/:idPostagem", function (req, res){
    comentarioController.obterComentarioGeral(req, res);
})

router.post("/criar", function (req, res){
    comentarioController.criarComentario(req, res);
})
router.get('/deletar/:idComentario', function (req, res){
    comentarioController.deletarComentario(req, res)
})
module.exports = router