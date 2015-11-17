# AZ - Avaliação

Projeto para avaliação e seleção de candidatos a vagas de programador javascript da empresa AZ Informática.
Nesta avaliação, você deve criar uma aplicação completa utilizandos os frameworks:

**Cliente**: Kendoui e Angularjs

**Server**: Node.js, Express e pg (PostgreSQL driver)

## Exercício 1
Crie uma script de criação de banco de dados (DDL) contendo todas as tables, columns e constraints (primary key, foreing key e unique).
Não esqueça de observar que as colunas NOT NULL estão marcados com asterisco no diagrama e o campos únicos, sublinhados.
 
![alt Banco de dados][database]

## Exercício 2
Prepare uma massa de dados inicial para permitir que a aplicação seja testada. Adicione pelo menos 10 registros em cada tabela.


## Exercício 3
Prepare os serviços restfull responsáveis pelas operações CRUD (Create, Read, Update e Delete) de **todas as tabelas**.
Utilize o seguinte padrão:

- GET /nomedatabela: Recupera todos os registros da tabela.
- GET /nomedatabela/:id: Recupera somente o registro que seja igual o :id informado.
- POST /nomedatabela: Insere um novo registro na tabela com os dados enviados no body da mensagem.
- PUT /nomedatabela/:id: Altera o registro que seja igual o :id informado e com os dados recebidos no body da mensagem.
- DELETE /nomedatabela/:id: Remove da tabela o registro com o :id informado.

Exemplos:

- GET /unidade/1
- POST /leiao
- PUT /comprador/2

#### Padrões 
Cada serviço restfull deve ficar dentro de um arquivo js separado dentro da pasta /api e seguir a seguinte nomenclatura:

- unidadeController.js
- leilaoController.js
- loteController.js

O arquivo **server.js** deve inicializar o express, subir o servidor e associar as rotas aos controladores da pasta /api. 


## Exercício 4
Crie a tela principal do sistema que ficará em _assets/index.html_. Esta tela deve ter um menu para navegar de uma página para outra.
O menu deve ter links com as opções: unidades, empresas e leilões. Cada página deve ter um html separado: unidades.html, empresas.html e leiloes.html, respectivamente.
Ao clicar no link, o sistema deve mudar a url para #/nomedatela e o conteúdo interno da section _root_ deve ser trocado pelo html da página selecionada.

- HTML da página inicial:   assets/index.html
- Controlador:              assets/main.js
- URL da página unidades:   http://server/#/unidades
- URL da página leiloes:    http://server/#/leiloes
- URL da página empresas:   http://server/#/empresas


## Exercício 5
Crie uma tela de consulta e edição simples para o cadastro de Unidade. 
Uma grid editável capaz de realizar todas as operações CRUD na tabela de Unidade (Kendo Grid). Siga os padrões:

- URL da página:            http://server/#/unidades
- URL dos serviços restful: http://server/unidades (GET | POST | PUT | DELETE)
- HTML:                     assets/unidade/unidades.html
- Controlador:              assets/unidade/unidades.js

## Exercício 6
Crie uma tela de consulta parametrizada para cadastro de Empresas. 
Uma grid somente leitura (Kendo Grid) contendo os campos: cnpj, razaoSocial, telefone e email.

- URL da página:            http://server/#/empresas
- URL dos serviços restful: http://server/empresas (GET)
- HTML:                     assets/empresa/empresas.html
- Controlador:              assets/empresa/empresas.js


## Exercício 7
Crie uma tela de consulta parametrizada para cadastro de Leilões. 
Uma **listview** somente leitura (Kendo) contendo os campos: razaoSocial do vendedor, inicioPrevisto, total do leilão (soma dos totais individuais de cada lote (quantidade * valorInicial)).

- URL da página:            http://server/#/leiloes
- URL dos serviços restful: http://server/leiloes (GET)
- HTML:                     assets/leilao/leiloes.html
- Controlador:              assets/leilao/leiloes.js


## Exercício 8
Crie a tela de inclusão e alteração do cadastro de empresas.
Observe que esta tela deve validar os campos obrigatórios especificados no modelo de banco de dados. 
Deve validar também as máscaras e os formatos de número, email, url e tamanho máximo do texto. Quanto mais completo melhor.
Não esqueça de criar os links para editar e  excluir uma empresa na tela de consulta feita no exercício 6. 
O link de editar deve chamar a tela de cadastro usando a seguinte url #/leilao/:id

- URL da página INCLUIR:    http://server/#/empresa
- URL da página EDITAR:     http://server/#/empresa/:id
- URL dos serviços restful: http://server/empresa (GET | POST | PUT | DELETE)
- HTML:                     assets/empresa/empresa.html
- Controlador:              assets/empresa/empresa.js


## Teste tudo muito bem e boa sorte.


[database]: config/database.png