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
        var query = client.query("SELECT * FROM lote;");
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
            var query = client.query("SELECT * FROM lote WHERE id ="+req.params.id+";");
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
    exports.adicionarLote = function(req, res){
        var results=[];
        var data = {
            numerolote:req.body.numerolote,
            descricao:req.body.descricao,
            quantidade:req.body.quantidade,
            valorinicial:req.body.valorinicial,
            unidade:req.body.unidade,
            leilao:req.body.leilao
        };

        pg.connect(connectionString, function (err,client){
            client.query("INSERT INTO lote (numerolote,descricao,quantidade,valorinicial,unidade,leilao) " +
                "VALUES ($1, $2, $3, $4, $5, $6)", [data.numerolote,data.descricao,data.quantidade,data.valorinicial,data.unidade,data.leilao]);
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

    exports.atualizarLote = function (req, res) {
        var results=[];
        var data = {
            numerolote:req.body.numerolote,
            descricao:req.body.descricao,
            quantidade:req.body.quantidade,
            valorinicial:req.body.valorinicial,
            unidade:req.body.unidade,
            leilao:req.body.leilao
        };

        pg.connect(connectionString, function (err,client){
            client.query("UPDATE lote SET numerolote=($1), descricao=($2), quantidade=($3), valorinicial=($4), " +
                "unidade=($5), leilao=($6), updateAt=($7) WHERE id=($8)",
                [data.numerolote,data.descricao,data.quantidade,data.valorinicial,data.unidade,data.leilao, "now()",req.params.id]);
            var query = client.query("SELECT * FROM lote ORDER BY id ASC");

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
            client.query("DELETE FROM lote WHERE id = "+req.params.id+";");
            var query = client.query("SELECT * FROM lote ORDER by id ASC");
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
