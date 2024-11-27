var express = require("express");
var router = express.Router();
const upload = require('../config/configUpload');
var usuarioController = require("../controllers/usuarioController");

router.post ("/cadastrar", upload.single('input_foto'), function (req, res){
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

router.post('/editUsuario', function (req, res){
    usuarioController.editarUsuario(req, res)
})
router.post('/editSenha', function (req, res){
    usuarioController.editarSenhaUsuario(req, res)
})

router.post('/verificacaoUsername', function(req,res){
    usuarioController.verificarUsername(req, res)
});
router.post('/verificacaoEmail', function(req,res){
    usuarioController.verificarEmail(req, res)
});

module.exports = router;