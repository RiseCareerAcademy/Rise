const config = require("../../config/database.js");
const db = require('../../db');

var user_sql_constants = require("../../config/user_sql_constants.js");

//create new match 
module.exports.postMatches = (req, res) => {
  
    const fields = ['mentor_id', 'mentee_id'];
    const user = {};
    const missingCredentials = fields.some(field => {
      if (req.body[field] === undefined) {
       res
          .status(500)
          .json({ error: "Missing credentials", success: false });
          return true;
      }
      user[field] = req.body[field];
      return false;
    });

    if (missingCredentials) {
      return;
    }
    sql = `INSERT INTO Matches VALUES (?, ?,?)`
  
    console.log(sql);
    match_id = user.mentor_id+""+user.mentee_id
    db.all(sql, [match_id,user.mentor_id,user.mentee_id], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json({ success: true, rows: rows });
  });
  }


//get all matches 
  module.exports.getAllMatches = (req, res) => {
    sql = `SELECT * FROM Matches;`;    
  
  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json({ success: true, rows: rows });
  });
}

//get match by match id
module.exports.getMatchById = (req, res) => {
    matchId = req.params.id;
    sql = `SELECT * FROM Matches where match_id = ?;` ;  
    
    db.all(sql, [matchId], (err, rows) => {
      if (err) {
        throw err;
      }
      res.json({ success: true, rows: rows });
    });
    
  }

  //get match by user id
module.exports.getMatchByUserId = (req, res) => {
  userId = req.params.id;
  sql = `SELECT * FROM Matches WHERE ${userIDType(userId)} = ?;`;    
  
  db.all(sql, [userId], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json({ success: true, rows: rows });
  });
  
}

function userIDType(id){
  while(id>10)
      id/=10
  if(Math.floor(id)==1) return "mentor_id"
  return "mentee_id"
}
