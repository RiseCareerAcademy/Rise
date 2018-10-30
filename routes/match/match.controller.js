const config = require("../../config/database.js");
const db = require('../../db');

var user_sql_constants = require("../../config/user_sql_constants.js");

//create new match 
module.exports.postMatches = (req, res) => {
  
    const fields = ['match_id', 'mentor_id', 'mentee_id'];
    console.log('nigga this is match')
    const user = {};
    fields.forEach(field => {
      if (req.body[field] === undefined) {
       res
          .status(500)
          .json({ error: "Missing credentials", success: false });
      }
      user[field] = req.body[field];
    });
    sql = user_sql_constants.post_matches_sql(user);
  
    console.log(sql);
    db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json({ success: true, rows: rows });
  });
  }


//get all matches 
  module.exports.getAllMatches = (req, res) => {
    sql = user_sql_constants.get_all_matches();
  
  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json({ success: true, rows: rows });
  });
}

//get match by match id
module.exports.getMatchbyId = (req, res) => {
    matchId = req.params.id;
    sql = user_sql_constants.get_match_by_id(matchId);
    
    db.all(sql, [], (err, rows) => {
      if (err) {
        throw err;
      }
      res.json({ success: true, rows: rows });
    });
    
  }

  //get match by user id
module.exports.getMatchbyUserId = (req, res) => {
  userId = req.params.id;
  sql = user_sql_constants.get_match_by_UserId(userId);
  
  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json({ success: true, rows: rows });
  });
  
}
