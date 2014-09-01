var express		= require('express');
var app			= express();
var bodyParser	= require('body-parser');

var instances 	= require('./app/models/instance_memory')(60);
var instanceRouter = require('./app/routes/instance');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

var router = express.Router();

router.use(function(req, res, next) {
	console.log('request');
	next();
});

router.get('/', function(req, res) {
	res.json({ message: 'api!' });
});


// router.route('/instance')
// 	.post(function(req, res) {
// 		var instance = new Instance();
// 		instance.name = req.body.name;
// 		instance.version = req.body.version;
// 		console.log(JSON.stringify(req.body));
// 		instance.save(function(err) {
// 			if (err)
// 				res.send(err);
// 			res.json({ message: 'instance created' });
// 		});
// 	})

// 	.get(function(req, res) {
// 		Instance.find(function(err, instances) {
// 			if (err)
// 				res.send(err)
// 			res.json(instances);
// 		});
// 	});


app.use('/api', instanceRouter(express, instances));

app.listen(port);
console.log("Listening on port " + port);