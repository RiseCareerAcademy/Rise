const newman = require('newman'); // require newman in your project

// call newman.run to pass `options` object and wait for callback
newman.run({
    collection: require('./AddingMentee.postman_collection.json'),
    reporters: 'cli'
}, function (err) {
	if (err) { throw err; }
	// call newman.run to pass `options` object and wait for callback
	newman.run({
		collection: require('./AddingMentors.postman_collection.json'),
		reporters: 'cli'
	}, function (err) {
		if (err) { throw err; }
		console.log('collection run complete!');
	});
});
