const jwt = require("jsonwebtoken");
const config = require("../../config/database.js");
const db = require('../../db');

var user_sql_constants = require("../../config/user_sql_constants.js");

module.exports.postMessage = (req, res) => {
    const fields = ['message_id', 'to_id','from_id', 'message_body', 'timestamp', 'match_id'];
    const user = {};
    const missingFields = fields.some(field => {
      if (req.body[field] === undefined) {
       res
          .status(500)
          .json({ error: "Missing credentials", success: false });
          return true;
      }
      user[field] = req.body[field];
      return false;
    });

    if (missingFields) {
      return;
    }
    
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
  }
  
  //get latest message by match id 
  module.exports.getLatestMessageById = (req, res) => {
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
  }