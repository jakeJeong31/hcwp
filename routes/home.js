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
  var api_flag = req.body.api_flag;
  var rData = "";
  if(api_flag=="cslSrvcSttsInfo"){
    api_addr = "curl http://192.168.50.248:8500/v1/catalog/node/SbisLinux-Consul2/health-checks";
  } else if(api_flag=="cslSrvcNmInfo"){
    api_addr = "curl http://192.168.50.248:8500/v1/catalog/node/SbisLinux-Consul2";
  } else if(api_flag=="nmdVerChkBtn"){
    api_addr = "curl http://192.168.50.235:4646/v1/jobs";
  } else if (api_flag=='nmdAgtSvrPtchInfo') {
    api_addr = "curl http://192.168.50.235:4646/v1/node/4db6c2d8-4849-ea9f-abb1-571ea1b86050";
  } else if (api_flag=='nmdAgtClntPtchInfo') {
    api_addr = "curl http://192.168.50.235:4646/v1/node/b3d7055c-0ddc-3b77-1c63-6909c217f2d2";
  } else {
    console.log("api_flag is null");
  }

  rData = exec(api_addr, function (error, stdout, stderr){
    console.log('stdout: '+stdout);
    console.log('stderr: '+stderr);
    if(error != null){
      console.log('exec error: '+error);
    }
    res.json(stdout);
  });

});

module.exports = router;
