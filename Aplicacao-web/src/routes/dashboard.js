var express = require("express");
var router = express.Router();

var dashboardController = require('../controllers/dashboardController')

router.get("/kpi/:idUsuario", function (req, res){
    dashboardController.obterDadosKpi(req, res)
});

router.get("/rank/:idUsuario", function(req, res){
    dashboardController.obterPublicacaoMaisCurtida(req, res)
});

router.get("/seguidoresMes/:idUsuario", function(req, res){
    dashboardController.obterSeguidoresMes(req, res)
});
router.get("/seguidoresDia/:idUsuario/:mes", function(req, res){
    dashboardController.obterSeguidoresDia(req, res)
});

router.get("/categoria/:idUsuario", function(req, res){
    dashboardController.obterCategoriasMaisPostadas(req, res)
});

module.exports = router