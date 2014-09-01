var moment 	= require('moment');

var instances = {};

module.exports = function(maxTimeout) {
	return {
		register: function(species, hostname, port, version, address) {
			instances[species] = instances[species] || {};
			instances[species][version] = instances[species][version] || {};
			instances[species][version][hostname] = {
				hostname: hostname,
				port: port,
				version: version,
				timestamp: moment(),
				address: address
			};
			setTimeout(function() {
				var difference;
				if (instances[species] && instances[species][version] && instances[species][version][hostname]) {
					difference = moment() - instances[species][version][hostname]['timestamp'];
					if (difference > maxTimeout * 1000) {
						instances[species][version][hostname] = undefined;
						console.log('Removing ' + hostname + ' from ' + species + ' pool due to timeout');
					}
				}
			}, (maxTimeout + 1) * 1000)
		}, 
		find: function(species, hostname) {
			if (instances[species]) {
				return instances[species][hostname]
			} else {
				return undefined;
			}
		},
		list: function(species) {
			return instances[species];
		},
		listall: function() {
			return instances;
		}
	}
}