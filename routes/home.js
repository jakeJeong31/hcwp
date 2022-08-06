// routes/home.js

var express = require('express');
var router = express.Router();
var exec = require("child_process").exec;
var bodyParser = require('body-parser');

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
  exec('curl http://192.168.50.248:8500/v1/health/service/consul',(err,stdout,stderr) => console.log(stdout));
  res.render('home/consul');
});
router.get('/vault', function(req, res){
  res.render('home/vault');
});
router.get('/nomad', function(req, res){
  res.render('home/nomad');
});
// POST 방식을 통한 self domain ajaxCall (for bash command)
router.post('/ajax_call_api', function(req, res){
  console.log(req.body);  // param
  var rData = exec('curl http://192.168.50.235:4646/v1/jobs');
  res.json(rData);
});

module.exports = router;
