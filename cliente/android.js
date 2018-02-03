var http = require("http");

var opcoes = {
	hostname: "localhost",
	port: 8081,
	path: "/",
	method: "get",
	headers: {
		"Accept": "application/json",
		//"Content-type": "application/x-www-form-urlencoded" // Content-type padrão: form html
		"Content-type": "application/json"
	}
}

//Content-Type
/*
var html = "nome=José"; //x-www-form-urlencoded
var json = {nome: "José"};
*/
var buffer_corpo_response = [];

/* get do módulo http != get do express */
/* método get pode receber tanto URL (string) quanto um JSON */
//http.get("http://localhost:8081", function(res){
//http.get(opcoes, function(res){

/*método request*/
var req = http.request(opcoes, function(res){	

	res.on("data", function(chunck){
		buffer_corpo_response.push(chunck);
	});

	res.on("end", function(){
		var corpo = Buffer.concat(buffer_corpo_response).toString();
		console.log(corpo);
		console.log(res.statusCode);
	});

	res.on("error", function(){

	});
});

//req.write(html);
//req.write(JSON.stringify(json));

req.end();