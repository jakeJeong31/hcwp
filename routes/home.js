// routes/home.js

var express = require('express');
var router = express.Router();

// Home
router.get('/', function(req, res){
  res.render('home/welcome');
});
router.get('/about', function(req, res){
  res.render('home/about');
});
router.get('/terraform', function(req, res){
  res.render('home/terraform');
});
router.get('/consul', function(req, res){
  res.render('home/consul');
});
router.get('/vault', function(req, res){
  res.render('home/vault');
});
router.get('/nomad', function(req, res){
  res.render('home/nomad');
});

module.exports = router;
