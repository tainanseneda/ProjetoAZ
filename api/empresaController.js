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
        var query = client.query("SELECT * FROM empresa order by id;");
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
        console.log(req.params.id);
        var query = client.query("SELECT * FROM empresa WHERE id ="+req.params.id+";");
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
exports.adicionarEmpresa = function(req, res){
    var results=[];
    var data = {
            razaosocial: req.body.razaosocial,
            cnpj: req.body.cnpj,
            logradouro: req.body.logradouro,
            municipio: req.body.municipio,
            numero: req.body.numero,
            complemento: req.body.complemento,
            bairro: req.body.bairro,
            cep: req.body.cep,
            telefone: req.body.telefone,
            email: req.body.email,
            site:req.body.site,
            usuario: req.body.usuario,
            senha: req.body.senha
};

    pg.connect(connectionString, function (err,client){
        client.query("INSERT INTO empresa (razaosocial, cnpj, logradouro, municipio, numero, complemento, bairro, cep, telefone, email, site, usuario, senha) " +
            "VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)", [data.razaosocial,data.cnpj,data.logradouro,data.municipio,data.numero,data.complemento,data.bairro,data.cep,data.telefone,data.email,data.site,data.usuario,data.senha] );
        //console.log(query.toString());

        var query = client.query("SELECT * FROM empresa WHERE razaoSocial = ($1)", [data.razaosocial]);


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

exports.atualizarEmpresa = function (req, res) {
    var results=[];
    var data = {
        razaosocial: req.body.razaosocial,
        cnpj: req.body.cnpj,
        logradouro: req.body.logradouro,
        municipio: req.body.municipio,
        numero: req.body.numero,
        complemento: req.body.complemento,
        bairro: req.body.bairro,
        cep: req.body.cep,
        telefone: req.body.telefone,
        email: req.body.email,
        site:req.body.site,
        usuario: req.body.usuario,
        senha: req.body.senha
    };

    pg.connect(connectionString, function (err,client){
        client.query("UPDATE empresa SET razaoSocial=($1), cnpj=($2), logradouro=($3), municipio=($4), " +
            "numero=($5), complemento=($6), bairro=($7), cep=($8), telefone=($9), email=($10), site=($11), usuario=($12), senha=($13), updateAt=($14) WHERE id=($15)",
            [data.razaosocial,data.cnpj,data.logradouro,data.municipio,data.numero,data.complemento,data.bairro,data.cep,data.telefone,data.email,data.site,data.usuario,data.senha, "now()",req.params.id]);
        var query = client.query("SELECT * FROM empresa WHERE id = ($1)", [req.params.id]);

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
        client.query("DELETE FROM comprador where empresa = "+req.params.id+";");
        client.query("DELETE FROM empresa WHERE id = "+req.params.id+";");
        var query = client.query("SELECT * FROM empresa ORDER by id ASC");
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
