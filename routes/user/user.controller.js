const User = require("./user.model.js"); /*DO WE NEED THIS?*/
const jwt = require("jsonwebtoken");
const config = require("../../config/database.js");
const db = require('../../db');

var user_sql_constants = require("../../config/user_sql_constants.js");

//create new mentor
module.exports.postMentors = (req, res) => {
  const fields = ['user_id', 'first_name', 'last_name', 'email_address' ,'biography','zipcode',
  'date_of_birth','occupation','skills','blocked_users','rating','profile_pic_URL','match_key','hobbies'];
  const user = {};
  fields.forEach(field => {
    if (req.body[field] === undefined) {
     res
        .status(500)
        .json({ error: "Missing credentials", success: false });
    }
    user[field] = req.body[field];
  });
  sql = user_sql_constants.post_mentor_sql(user);
  console.log(sql);
  db.all(sql, [], (err, rows) => {
  if (err) {
    throw err;
  }
  res.json({ success: true, rows: rows });
});
}
//create new mentee
module.exports.postMentees = (req, res) => {
  const fields = ['user_id', 'first_name', 'last_name', 'email_address' ,'biography','zipcode',
  'date_of_birth','area_of_study','skills','blocked_users','profile_pic_URL','match_key','hobbies'];
  const user = {};
  fields.forEach(field => {
    if (req.body[field] === undefined) {
     res
        .status(500)
        .json({ error: "Missing credentials", success: false });
    }
    user[field] = req.body[field];
  });
  sql = post_mentee_sql(user)
  console.log(sql);
  db.all(sql, [], (err, rows) => {
  if (err) {
    throw err;
  }
  res.json({ success: true, rows: rows });
});
}
//create new match 
module.exports.postMatches = (req, res) => {
  
  const fields = ['match_id', 'mentor_id', 'messages', 'mentee_id'];

  const user = {};
  fields.forEach(field => {
    if (req.body[field] === undefined) {
     res
        .status(500)
        .json({ error: "Missing credentials", success: false });
    }
    user[field] = req.body[field];
  });
  sql = post_matches_sql(user);

  console.log(sql);
  db.all(sql, [], (err, rows) => {
  if (err) {
    throw err;
  }
  res.json({ success: true, rows: rows });
});
}

//get all mentors
module.exports.getAllMentors = (req, res) => {
    sql = get_all_mentors();
  
  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json({ success: true, rows: rows });
  });
}
//get all mentees
  module.exports.getAllMentees = (req, res) => {
    sql = get_all_mentees();
  
  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json({ success: true, rows: rows });
  });
}
//get all matches 
  module.exports.getAllMatches = (req, res) => {
    sql = get_all_matches();
  
  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json({ success: true, rows: rows });
  });
}

