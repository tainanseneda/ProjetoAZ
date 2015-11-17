/**
 * Created by seneda on 14/11/15.
 */

var reqEmpresa = require('../api/empresaController');
var reqLeilao = require('../api/leilaoController');
var reqLote = require('../api/loteController');
var reqComprador = require('../api/compradorController');
var reqUnidade = require('../api/unidadeController');

module.exports = function(app)
{
//Rota da empresa
//recupera todas as empresas
    app.get('/empresa', reqEmpresa.recuperaTodos);
//recupera as empresas de acordo com o ID do get
    app.get('/empresa/:id', reqEmpresa.recuperaPorID);
//insere registros com dados enviados pelo body
    app.post('/empresa', reqEmpresa.adicionarEmpresa);
//atualizar dados
    app.put('/empresa/:id',reqEmpresa.atualizarEmpresa);
//apagar dados por id
    app.delete('/empresa/:id', reqEmpresa.exluirPorID);

    //Rota Leilao
    app.get('/leilao', reqLeilao.recuperaTodos);
    app.get('/leilao/:id', reqLeilao.recuperaPorID);
    app.post('/leilao', reqLeilao.adicionarLeilao);
    app.put('/leilao/:id', reqLeilao.atualizarLeilao);
    app.delete('/leilao/:id', reqLeilao.exluirPorID);


    //Rota Lote
    app.get('/lote', reqLote.recuperaTodos);
    app.get('/lote/:id', reqLote.recuperaPorID);
    app.post('/lote', reqLote.adicionarLote);
    app.put('/lote/:id', reqLote.atualizarLote);
    app.delete('/lote/:id', reqLote.exluirPorID);

    //Rota Comprador
    app.get('/comprador',reqComprador.recuperaTodos);
    app.get('/comprador/:id', reqComprador.recuperaPorID);
    app.post('/comprador', reqComprador.adicionarComprador);
    app.put('/comprador/:id', reqComprador.atualizarComprador);
    app.delete('/comprador/:id', reqComprador.exluirPorID);

    //Rota Unidade
    app.get('/unidade',reqUnidade.recuperaTodos);
    app.get('/unidade/:id', reqUnidade.recuperaPorID);
    app.post('/unidade', reqUnidade.adicionarUnidade);
    app.put('/unidade/:id', reqUnidade.atualizarUnidade);
    app.delete('/unidade/:id', reqUnidade.exluirPorID);

}
