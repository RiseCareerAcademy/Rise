const Weather = require("./weather.model.js");

//Basic CRUD

// READ
// "get" - will grab all for display
module.exports.get = (req, res) => {
  Weather.find({})
    .then(result => {
      return res.json(result);
    })
    .catch(err => {
      console.error(err);
      return res.status(500).send(err);
    });
}

// CREATE
// "add" - will create a new post
module.exports.add = (req, res) => {

  let weather = new Weather({
    weather: req.body.weather,
    giphy: req.body.giphy,
    city: req.body.city
  });

  weather
    .save()
    .then(result => {
      return res.json(result);
    })
    .catch(err => {
      console.error(err);
      return res.status(500).send(err);
    });
}


// CREATE
// "delete" - will create a new post
module.exports.deleteAll = (req, res) => {
	Weather.remove({})
	.then(result => {
		return res.json(result);
	})
	.catch(err => {
		console.error(err);
		return res.status(500).send(err);
	})
  }
  