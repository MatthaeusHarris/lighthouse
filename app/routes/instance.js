module.exports = function(express, instances) {
	var router = express.Router();

	router.route('/instances')
		.post(function(req, res) {
			instances.register(
				req.body.species,
				req.body.hostname,
				req.body.port,
				req.body.version,
				req.connection.remoteAddress
			);
			res.json({result: 'ok'});
		})

		.get(function(req, res) {
			res.json(instances.listall());
		});

	router.route('/instances/:species')
		.get(function(req, res) {
			res.json(instances.list(req.params.species));
		});

	return router;
};