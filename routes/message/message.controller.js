const jwt = require("jsonwebtoken");
const config = require("../../config/database.js");
const db = require('../../db');

var user_sql_constants = require("../../config/user_sql_constants.js");

module.exports.postMessage = (req, res) => {
<<<<<<< HEAD
    const fields = ['message_id', 'to_id','from_id', 'message', 'timestamp', 'match_id'];
=======
    const fields = ['message_id', 'to_id','from_id', 'message_body', 'timestamp', 'match_id'];
>>>>>>> 305b3a3b8298c9b4e6492f18701116328a591b89
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
  }

  module.exports.getMessages = (req, res) => {
    sql = 'SELECT * FROM Messages;'
    db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json({ success: true, rows: rows });
  });
<<<<<<< HEAD
=======
  }
  
  //get latest message by match id 
  module.exports.getLatestMessagebyId = (req, res) => {
    matchId = req.params.matchid;
    sql = user_sql_constants.get_message_by_matchid(matchId);

    db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json({ success: true, rows: rows });
  });
  }

   //get message chain  by match id 
   module.exports.getMessageChain = (req, res) => {
    matchId = req.params.matchid;
    sql = user_sql_constants.get_all_message_by_matchid(matchId);

    db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json({ success: true, rows: rows });
  });
>>>>>>> 305b3a3b8298c9b4e6492f18701116328a591b89
  }