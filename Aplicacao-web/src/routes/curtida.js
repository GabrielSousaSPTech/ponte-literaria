var express = require("express");
var router = express.Router();
var curtidaController = require("../controllers/curtidaController");

router.get("/:idPostagem", function (req, res){
    curtidaController.obterCurtidaPost(req,res)
});

router.post("/curtir", function (req, res){
    curtidaController.darLike(req,res)
})

router.post("/getLike", function (req, res){
    curtidaController.verificarLike(req, res)
})
module.exports = router