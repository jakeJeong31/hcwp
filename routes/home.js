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
  var api_exec = "";

  if(api_flag=="cslSrvcSttsInfo"){ // consul
    api_addr = "curl -s http://3.35.89.134:8500/v1/health/node/ip-172-31-46-237.ap-northeast-2.compute.internal";
  } else if (api_flag=="cslSrvcSttsInfo_2nd"){
    api_addr = "curl -s http://3.35.89.134:8500/v1/health/state/passing";
  } else if (api_flag=="cslSrvcNmInfo"){
    api_addr = "curl -s http://3.35.89.134:8500/v1/catalog/node/ip-172-31-46-237.ap-northeast-2.compute.internal";
  } else if (api_flag=='nmdAgtSvrPtchInfo') { // nomad
    api_addr = "curl -s http://192.168.50.235:4646/v1/node/4db6c2d8-4849-ea9f-abb1-571ea1b86050";
  } else if (api_flag=='nmdJobNmInfo') {
    api_addr = "curl -s http://192.168.50.235:4646/v1/job/example";
  } else if (api_flag=='trrfrmRun') {
    api_addr = "curl -s 'Authorization: Bearer $TEAM_TOKEN' https://app.terraform.io/api/v2/runs/run-UQJ55vGbhnhdyzXg";
  } else if (api_flag=='trrfrmWorkspace') {
    api_addr = "curl -s 'Authorization: Bearer $TEAM_TOKEN' https://app.terraform.io/api/v2/organizations/Insideinfo/workspaces";
  } else {
    console.log("api_flag is null");
  }

  api_exec = exec(api_addr, function (error, stdout, stderr){
    console.log('stdout: '+stdout);
    console.log('stderr: '+stderr);
    if(error != null){
      console.log('exec error: '+error);
    }
    var rData = JSON.parse(stdout);
    res.json({rData:rData});
  });

});

module.exports = router;
