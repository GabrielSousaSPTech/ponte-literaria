var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

router.post ("/cadastrar", function (req, res){
    usuarioController.cadastrar(req, res);
})

router.post ("/login", function (req, res){
    usuarioController.checarCredenciais(req, res);
})

router.get ("/:idUsuario", function (req, res) {
    usuarioController.getUsuario(req, res)
})

module.exports = router;