var express = require("express")
var router = express.Router()

var seguidorController = require("../controllers/seguidorController")

router.post ("/follow" ,function(req, res){
    seguidorController.seguir(req, res);
});

router.get("/getSeguidor/:fkUsuarioSeguido", function(req, res){
    seguidorController.obterSeguidores(req, res);
});

router.post("/getSeguidor", function(req, res){
    seguidorController.verificarSeSegue(req, res);
})

module.exports = router