var express = require("express");
var router = express.Router();

var searchController = require("../controllers/searchController");



router.post("/", function (req, res){
    searchController.search(req, res);
})
router.post("/searchCategoria", function (req, res){
    searchController.searchCategoria(req, res);
})

module.exports = router;