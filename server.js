
/**
 * Sobe o servidor e configura o express e suas rotas
 */
var http = require('http');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var routes = require('./routes/routes.js');

var appSv = express();
appSv.use(bodyParser.json());
appSv.use(express.static('./assets'));
appSv.set('port', 3000);


//Rota do Index
appSv.get('/', function (req, res) {

});
routes(appSv);

var server = http.createServer(appSv);


server.listen(appSv.get('port'), function(){
    console.log('Server rodando na porta ' + appSv.get('port'));
});



module.exports = appSv;