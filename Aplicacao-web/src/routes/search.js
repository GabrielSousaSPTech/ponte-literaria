var express = require("express");
var router = express.Router();

var searchController = require("../controllers/searchController");



router.post("/", function (req, res){
    searchController.search(req, res);
})

module.exports = router;