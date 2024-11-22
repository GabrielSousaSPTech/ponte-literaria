var express = require("express");
var router = express.Router();
const upload = require('../config/configUpload');
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

router.post('/editImage', upload.single('input_foto'), function(req, res){
    usuarioController.editarFotoPerfil(req, res);
})

module.exports = router;