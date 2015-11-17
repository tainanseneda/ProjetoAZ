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
        var query = client.query("SELECT * FROM comprador;");
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

    exports.recuperaPorID = function (req, res) {
        results = [];

        pg.connect(connectionString, function(err,client){
            var query = client.query("SELECT * FROM comprador WHERE id ="+req.params.id+";");
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

//TODO inserir
    exports.adicionarComprador = function(req, res){
        var results=[];
        var data = {
            empresa:req.body.empresa,
            leilao:req.body.leilao
        };

        pg.connect(connectionString, function (err,client){
            client.query("INSERT INTO comprador (empresa, leilao) " +
                "VALUES ($1, $2)", [data.empresa,data.leilao]);

            var query = client.query("SELECT * FROM comprador ORDER BY id ASC");


            query.on("row", function (row) {
                results.push(row);
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
//TODO editar

    exports.atualizarComprador = function (req, res) {
        var results=[];
        var data = {
            empresa:req.body.empresa,
            leilao:req.body.leilao
        };

        pg.connect(connectionString, function (err,client){
            client.query("UPDATE comprador SET empresa=($1), leilao=($2) WHERE id=($3)",
                [data.empresa,data.leilao, req.params.id]);
            var query = client.query("SELECT * FROM comprador ORDER BY id ASC");

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
//TODO Excluir por ID
    exports.exluirPorID = function (req, res) {
    console.log(req.params.id);
        pg.connect(connectionString, function (err,client){
            client.query("DELETE FROM comprador WHERE id = "+req.params.id+";");
            var query = client.query("SELECT * FROM comprador ORDER by id ASC");
            query.on("row", function (row) {
                results.push(row);
            });
            query.on("end", function () {
                client.end();
                return res.json(results);
                //res.send('Empresas<br>'+JSON.stringify(result.rows, null, " "));
            });
        });


        console.log('ID: '+req.params.id);
    }