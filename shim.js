var porqpine = require('porqpine');

function ensureNamespacedCallback(ClassObj, funcName, namespace) {

	var originalFunc = ClassObj[funcName];
	ClassObj[funcName] = function(/* ... */) {

		// if it doesn't end in a callback, do nothing
		if (typeof arguments[arguments.length - 1] !== 'function') {
			return originalFunc.apply(this, arguments);
		}

		// if it does end in a callback, wrap it
		var args = [];
		for (var i=0; i<arguments.length; ++i) {
			args.push(arguments[i]);
		}
		args[args.length - 1] = namespace.bind(args[args.length - 1]);
		return originalFunc.apply(this, args);

	};

}

module.exports = function(ns) {

	var mongo = porqpine.getMongoInstance();
	ensureNamespacedCallback(mongo.MongoClient, 'connect', ns);
	ensureNamespacedCallback(mongo.Cursor.prototype, 'toArray', ns);
	ensureNamespacedCallback(mongo.Collection.prototype, 'findOne', ns);

};