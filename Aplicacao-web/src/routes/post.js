var express = require("express");
var router = express.Router();

var postController = require("../controllers/postController")

router.get ("/:idUsuario", function (req, res) {
    postController.getPost(req, res);
})

router.get("/count/:idUsuario", function (req, res){
    postController.countPost(req, res);
})

router.get("/view/:idPostagem", function (req, res){
    postController.viewPost(req, res);
})

router.post("/create", function (req, res){
    postController.criarPost(req, res);
})

router.post("/edit", function (req, res){
    postController.editarPost(req, res);
})

router.post('/delete', function (req, res){
    postController.deletarPost(req, res);
})
module.exports = router;