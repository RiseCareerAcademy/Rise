
const sqlite3 = require('sqlite3');

module.exports = new sqlite3.Database('./db/rise.db', (err) => {
	if (err) {
	  console.error(err.message);
	}
	console.log('Connected to the database.');
});