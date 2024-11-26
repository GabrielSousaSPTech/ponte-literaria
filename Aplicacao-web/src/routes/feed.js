var express = require('express')
var router = express.Router();
var feedController = require('../controllers/feedController')
router.get('/feedSeguindo/:idUsuario', function(req, res){
    feedController.obterFeedSeguindo(req, res);
})

router.get('/feedCategoria/:idCategoria', function(req, res){
    feedController.obterFeedCategoria(req, res);
})

module.exports = router