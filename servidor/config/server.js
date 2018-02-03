/* importar o módulo do framework express */
var express = require('express');

/* importar o módulo do consign */
var consign = require('consign');

/* importar o módulo do body-parser */
var bodyParser = require('body-parser');

/* importar o módulo do express-validator */
var expressValidator = require('express-validator');

/* iniciar o objeto do express */
var app = express();

/* setar as variáveis 'view engine' e 'views' do express */
app.set('view engine', 'ejs');
app.set('views', './app/view');

/* configurar o middleware express.static */
app.use(express.static('./app/public'));

/* configurar o middleware body-parser */
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

/* configurar o middleware express-validator */
app.use(expressValidator());

/* efetua o autoload das rotas, dos models e dos controllers para o objeto app */
consign()
	.include('app/routes')
	.then('app/models')
	.then('app/controllers')

	.into(app);

/* middleware para configurar páginas de status */
/* deve executar todos os fluxos antes, inclusive as rotas, para garantir o erro */
app.use(function(req, res, next){

	res.status(404).render("error/404");
	next();
});

/* middleware para configurar a mensagem de erro do servidor */
app.use(function(err, req, res, next){

	res.status(500).render("error/500");
	next();
});

/* exportar o objeto app */
module.exports = app;