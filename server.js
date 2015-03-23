var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser')

app.use(express.static(__dirname));
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded({ extended: true })); 

app.get('/api/list', function (req, res) {
	res.header("Content-Type", "application/json");
	list = require('./data.json');
  res.send({ data: list });
});

app.post('/api/add', function (req, res) {
	data = require('./data.json');
	data.push({ name: req.body.name, qty: req.body.qty, unit: req.body.unit, checked: false });
	fs.writeFile( "data.json", JSON.stringify( data ), "utf8", function() {
		res.send({success: true});
	} );
});

app.patch('/api/check/:index', function (req, res) {
	data = require('./data.json');
	var index = req.params.index;
	data[index].checked = !data[index].checked;
	fs.writeFile( "data.json", JSON.stringify( data ), "utf8", function() {
		res.send({success: true});
	} );
});

app.delete('/api/remove/:index', function (req, res) {
	data = require('./data.json');
	data.splice(req.query.index, 1);
	fs.writeFile( "data.json", JSON.stringify( data ), "utf8", function() {
		res.send({success: true});
	} );
});

app.get('*', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

var server = app.listen(1337);

