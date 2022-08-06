// index.js

var express = require('express');
/*var mongoose = require('mongoose');*/
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var app = express();
var cors = require('cors'); // 자신이 속하지 않은 도메인에 리소스 요청 허용 (특정 도메인만 허용하려면 option 사용해야함)

// DB setting
/*
mongoose.connect(process.env.MONGO_DB);
var db = mongoose.connection;
db.once('open', function(){
  console.log('DB connected');
});
db.on('error', function(err){
  console.log('DB ERROR : ', err);
});
*/

// Other settings
app.set('view engine', 'ejs');
app.use(express.static(__dirname+'/public'));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.use(cors());

// Routes
app.use('/', require('./routes/home'))

// Port setting
var port = 3000;
app.listen(port, function(){
  console.log('server on! http://localhost:'+port);
});
