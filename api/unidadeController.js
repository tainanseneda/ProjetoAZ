/**
 * Created by seneda on 13/11/15.
 */
var pg = require('pg');
var database = require('../config/database');

var connectionString = database.connectionString;
var results = [];

exports.recuperaTodos = function (req, res) {
    results = [];

    pg.connect(connectionString, function(err,client){
        var query = client.query("SELECT * FROM unidade order by id;");
        query.on("row", function (row) {
            results.push(row);
        });
        query.on("end", function (result) {
            client.end();
            //console.log(results);
            return res.json(results);
            //res.send('Empresas<br>'+JSON.stringify(result.rows, null, " "));
        });
    });
},

    exports.recuperaPorID = function (req, res) {
        results = [];

        pg.connect(connectionString, function(err,client){
            console.log(req.params.id);
            var query = client.query("SELECT * FROM unidade WHERE id ="+req.params.id+";");
            query.on("row", function (row) {
                results.push(row);
            });
            query.on("end", function (result) {
                client.end();
                return res.json(results);
                //res.send('Empresas<br>'+JSON.stringify(result.rows, null, " "));
            });
        });


    },

    exports.adicionarUnidade = function(req, res){
        var results=[];
        var data = {
            nome:req.body.nome
        };

        pg.connect(connectionString, function (err,client){
            client.query("INSERT INTO unidade (nome) " +
                "VALUES ($1)", [data.nome]);
            //console.log(query.toString());

            var query = client.query("SELECT * FROM unidade WHERE nome = ($1)", [data.nome]);


            query.on("row", function (row) {
                results.push(row);
                //alert(results);
            });
            query.on("end", function () {
                client.end();
                return res.json(results);
                //res.send('Empresas<br>'+JSON.stringify(result.rows, null, " "));
            });
            // console.log('ID: '+req.params.id);
            if (err){
                console.log(err);
            }
        });

    },

    exports.atualizarUnidade = function (req, res) {
        var results=[];
        var data = {
           nome:req.body.nome
        };

        pg.connect(connectionString, function (err,client){
            client.query("UPDATE unidade SET nome=($1), updateAt=($2) WHERE id=($3)",
                [data.nome, "now()",req.params.id]);
            var query = client.query("SELECT * FROM unidade WHERE nome = ($1)", [data.nome]);

            query.on("row", function (row) {
                results.push(row);
            });
            query.on("end", function () {
                client.end();
                return res.json(results);
                // res.send('Empresas<br>'+JSON.stringify(result.rows, null, " "));
            });
        });
    },
    exports.exluirPorID = function (req, res) {

        pg.connect(connectionString, function (err, client) {
            client.query("DELETE FROM unidade WHERE id = " + req.params.id + ";");
            var query = client.query("SELECT * FROM unidade ORDER by id ASC");
            query.on("row", function (row) {
                results.push(row);
            });
            query.on("end", function () {
                client.end();
                return res.json(results);
                //res.send('Empresas<br>'+JSON.stringify(result.rows, null, " "));
            });
        });
    }
