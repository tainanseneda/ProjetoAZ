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
        var query = client.query("select e.razaosocial, lei.descricao, lei.inicioprevisto, l.valorinicial, l.quantidade from leilao lei, empresa e, lote l where vendedor = e.id and lei.id = l.leilao ORDER BY e.id;");
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
            var query = client.query("SELECT * FROM leilao WHERE id ="+req.params.id+";");
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
    exports.adicionarLeilao = function(req, res){
        var results=[];
        var data = {
            codigo:req.body.codigo,
            descricao: req.body.descricao,
            vendedor:req.body.vendedor,
            createdAt:req.body.createdAt
        };

        pg.connect(connectionString, function (err,client){
            client.query("INSERT INTO leilao (codigo, descricao, vendedor, createdAt) VALUES ($1, $2, $3, $4)", [data.codigo ,data.descricao,data.vendedor, data.createdAt]);
            //console.log(query.toString());

            var query = client.query("SELECT * FROM leilao ORDER BY id ASC");


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

    exports.atualizarLeilao = function (req, res) {
        var results=[];
        var data = {
            codigo:req.body.codigo,
            descricao: req.body.descricao,
            vendedor:req.body.vendedor
        };

        pg.connect(connectionString, function (err,client){
            client.query("UPDATE leilao SET codigo=($1), descricao=($2), vendedor=($3), updateAt=($4) WHERE id=($5)",
                [data.codigo,data.descricao,data.vendedor, "now()",req.params.id]);
            var query = client.query("SELECT * FROM leilao ORDER BY id ASC");
            console.log("entrei no leilao");
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

        pg.connect(connectionString, function (err,client){
            client.query("DELETE FROM leilao WHERE id = "+req.params.id+";");
            var query = client.query("SELECT * FROM leilao ORDER by id ASC");
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
