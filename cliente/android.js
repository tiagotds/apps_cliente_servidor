var http = require("http");

var opcoes = {
	hostname: "localhost",
	port: 8081,
	path: "/",
	headers: {
		"Accept": "application/json"
	}
}

var buffer_corpo_response = [];

/* get do módulo http != get do express */
/* método get pode receber tanto URL (string) quanto um JSON */
//http.get("http://localhost:8081", function(res){
http.get(opcoes, function(res){

	res.on("data", function(chunck){
		buffer_corpo_response.push(chunck);
	});

	res.on("end", function(){
		var corpo = Buffer.concat(buffer_corpo_response).toString();
		console.log(corpo);
	});

	res.on("error", function(){

	});
});