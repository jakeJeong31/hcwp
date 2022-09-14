// routes/home.js

var express = require('express');
var router = express.Router();
var exec = require("child_process").exec;
var bodyParser = require('body-parser');
// global varible
var myModule = require("../gdata.json");

// Home
router.get('/', function(req, res){
  res.render('home/index');
});
router.get('/dashboard', function(req, res){
  res.render('home/dashboard');
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
  res.render('home/vault',{gData:myModule});
});
router.get('/nomad', function(req, res){
  res.render('home/nomad');
});
// POST 방식을 통한 self domain ajaxCall (for bash command)
router.post('/ajax_call_api', function(req, res){
  console.log(req.body);  // param
  var api_flag = req.body.api_flag;
  var vault_ip_addr = req.body.vault_ip_addr;
  var vault_clientToken = req.body.client_token;
  var os_type = req.body.os_type;
  var api_exec = "";
  
  if(api_flag=="cslSrvcSttsInfo"){ // consul
    api_addr = 'curl -s http://'+myModule.CONSUL_INFO[0].ip_address+'/v1/health/node/'+myModule.CONSUL_INFO[0].node_name;
  } else if (api_flag=="cslSrvcSttsInfo_2nd"){
    api_addr = 'curl -s http://'+myModule.CONSUL_INFO[0].ip_address+'/v1/health/state/passing';
  } else if (api_flag=="cslSrvcNmInfo"){
    api_addr = 'curl -s http://'+myModule.CONSUL_INFO[0].ip_address+'/v1/catalog/node/'+myModule.CONSUL_INFO[0].node_name;
  } else if (api_flag=='nmdAgtSvrPtchInfo') { // nomad
    api_addr = 'curl -s http://'+myModule.NOMAD_INFO[0].ip_address+'/v1/node/'+myModule.NOMAD_INFO[0].node_name;
  } else if (api_flag=='nmdJobNmInfo') {
    api_addr = 'curl -s http://'+myModule.NOMAD_INFO[0].ip_address+'/v1/job/example';
  } else if (api_flag=='trrfrmRun') {
    api_addr = 'curl -s --header "Authorization: Bearer $TEAM_TOKEN" https://app.terraform.io/api/v2/runs/run-UQJ55vGbhnhdyzXg';
  } else if (api_flag=='trrfrmWorkspace') {
    api_addr = 'curl -s --header "Authorization: Bearer '+myModule.TERRAFORM_INFO[0].team_token+'" https://app.terraform.io/api/v2/organizations/Insideinfo/workspaces';
  } else if (api_flag=='vltAccInfo') {
    if(os_type=="WIN"){
      /* Window */
      api_addr = 'curl --request POST --data \"{""password"": ""'+myModule.VAULT_INFO[0].usps_password+'""}\" http://'+vault_ip_addr+":"+myModule.VAULT_INFO[0].port+'/v1/auth/userpass/login/test';
    } else {
      /* Linux */
      api_addr = 'curl --request POST --data \'{\"password\": \"'+myModule.VAULT_INFO[0].usps_password+'\"}\' http://'+vault_ip_addr+":"+myModule.VAULT_INFO[0].port+'/v1/auth/userpass/login/test';
    }
  } else if (api_flag=='vltDbCredInfo') {
    api_addr = 'curl --header "X-Vault-Token:'+vault_clientToken+'" http://'+vault_ip_addr+":"+myModule.VAULT_INFO[0].port+'/v1/database/creds/workshop-app';
  } else if (api_flag=='vltOtpCredInfo') {
    if(os_type=="WIN"){
      /* Window */
      api_addr = 'curl --header "X-Vault-Token:'+vault_clientToken+'" --request POST --data \"{""ip"": ""'+vault_ip_addr+'""}\"  http://'+vault_ip_addr+":"+myModule.VAULT_INFO[0].port+'/v1/ssh/creds/otp_key_role';
    } else {
      /* Linux */
      api_addr = 'curl --header "X-Vault-Token:'+vault_clientToken+'" --request POST --data \'{\"ip\": \"'+vault_ip_addr+'\"}\'  http://'+vault_ip_addr+":"+myModule.VAULT_INFO[0].port+'/v1/ssh/creds/otp_key_role';
    }
  } else {
    console.log("api_flag is null");
  }

  api_exec = exec(api_addr, function (error, stdout, stderr){
    //console.log('stdout: '+stdout+', stderr: '+stderr);
    if(error != null){
      //console.log('exec error: '+error);
      res.json({errors:error})
    } else {
      var rData = JSON.parse(stdout);
      res.json({rData:rData});
    }
    
  });

});

module.exports = router;
