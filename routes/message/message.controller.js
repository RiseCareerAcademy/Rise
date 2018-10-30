const jwt = require("jsonwebtoken");
const config = require("../../config/database.js");
const db = require('../../db');

var user_sql_constants = require("../../config/user_sql_constants.js");

module.exports.postMessage = (req, res) => {
<<<<<<< HEAD
    const fields = ['message_id', 'to_id','from_id', 'message', 'timestamp'];
=======
    const fields = ['message_id', 'to_id','from_id', 'message', 'timestamp', 'match_id'];
>>>>>>> master
    const user = {};
    fields.forEach(field => {
      if (req.body[field] === undefined) {
       res
          .status(500)
          .json({ error: "Missing credentials", success: false });
      }
      user[field] = req.body[field];
    });
    sql = user_sql_constants.post_message_sql(user);
    db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json({ success: true, rows: rows });
  });
<<<<<<< HEAD
=======
  }

  module.exports.getMessages = (req, res) => {
    sql = 'SELECT * FROM Messages;'
    db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json({ success: true, rows: rows });
  });
>>>>>>> master
  }