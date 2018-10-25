const User = require("./user.model.js");
const jwt = require("jsonwebtoken");
const config = require("../../config/database.js");
const db = require('../../db');


module.exports.postMentors = (req, res) => {
  
  const fields = ['user_id', 'first_name', 'last_name', 'email_address' ,'biography','zipcode',
  'date_of_birth','occupation','skills','blocked_users','rating','profile_pic_URL','messages','hobbies'];

  const user = {};
  fields.forEach(field => {
    if (req.body[field] === undefined) {
     res
        .status(500)
        .json({ error: "Missing credentials", success: false });
    }
    user[field] = req.body[field];
  });
  sql = `INSERT INTO Mentors VALUES ('${user.user_id}', '${user.first_name}', '${user.last_name}', '${user.email_address}', 
    '${user.biography}', '${user.zipcode}', '${user.date_of_birth}', '${user.occupation}', '${user.skills}', 
    '${user.blocked_users}', '${user.rating}', '${user.profile_pic_URL}', '${user.messages}', '${user.hobbies}') `
  
  console.log(sql);
  db.all(sql, [], (err, rows) => {
  if (err) {
    throw err;
  }
  res.json({ success: true, rows: rows });
});
}
module.exports.postMentees = (req, res) => {
  
  const fields = ['user_id', 'first_name', 'last_name', 'email_address' ,'biography','zipcode',
  'date_of_birth','area_of_study','skills','blocked_users','profile_pic_URL','messages','hobbies'];

  const user = {};
  fields.forEach(field => {
    if (req.body[field] === undefined) {
     res
        .status(500)
        .json({ error: "Missing credentials", success: false });
    }
    user[field] = req.body[field];
  });
  sql = `INSERT INTO Mentors VALUES ('${user.user_id}', '${user.first_name}', '${user.last_name}', '${user.email_address}', 
    '${user.biography}', '${user.zipcode}', '${user.date_of_birth}', '${user.area_of_study}', '${user.skills}', 
    '${user.blocked_users}', '${user.profile_pic_URL}', '${user.messages}', '${user.hobbies}') `
  
  console.log(sql);
  db.all(sql, [], (err, rows) => {
  if (err) {
    throw err;
  }
  res.json({ success: true, rows: rows });
});
}
module.exports.postMatches = (req, res) => {
  
  const fields = ['match_id', 'mentor_id', 'mentee_id'];

  const user = {};
  fields.forEach(field => {
    if (req.body[field] === undefined) {
     res
        .status(500)
        .json({ error: "Missing credentials", success: false });
    }
    user[field] = req.body[field];
  });
  sql = `INSERT INTO Mentors VALUES ('${user.match_id}', '${user.mentor_id}', '${user.mentee_id}')`
  
  console.log(sql);
  db.all(sql, [], (err, rows) => {
  if (err) {
    throw err;
  }
  res.json({ success: true, rows: rows });
});
}

module.exports.getMentors = (req, res) => {
    sql = `SELECT * FROM Mentors;`;
  
  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json({ success: true, rows: rows });
  });
}
  module.exports.getMentees = (req, res) => {
    sql = `SELECT * FROM Mentees;`;
  
  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json({ success: true, rows: rows });
  });
}
  module.exports.getMatches = (req, res) => {
    sql = `SELECT * FROM Matches;`;
  
  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json({ success: true, rows: rows });
  });
}

