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
module.exports = router;