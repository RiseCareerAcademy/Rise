const jwt = require("jsonwebtoken");
const config = require("../../config/database.js");
const db = require('../../db');
var date = new Date();

var user_sql_constants = require("../../config/user_sql_constants.js");
var hp = require("../../config/helper.js");

//create all tables
module.exports.createTables = (req, res) => {
  
  sql1 = user_sql_constants.create_mentor_table_sql();
  sql2 = user_sql_constants.create_mentee_table_sql();
  sql3 = user_sql_constants.create_password_table_sql();
  sql4 = user_sql_constants.create_matches_table_sql();
  sql5 = user_sql_constants.create_messages_table_sql();
  sql6 = user_sql_constants.create_skills_table_sql();

  db.all(sql1, [], (err, rows) => {
    if (err) {
      throw err;
    }
  });
  db.all(sql2, [], (err, rows) => {
    if (err) {
      throw err;
    }
  });
  db.all(sql3, [], (err, rows) => {
    if (err) {
      throw err;
    }
  });
  db.all(sql4, [], (err, rows) => {
    if (err) {
      throw err;
    }
  });
  db.all(sql5, [], (err, rows) => {
    if (err) {
      throw err;
    }
  });
  db.all(sql6, [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json({ success: true, rows: rows });
  });
}
//drop table 
module.exports.deletetable = (req, res) => {
  
  sql1 = `DROP TABLE IF EXISTS Mentors;`;
  sql2 = `DROP TABLE IF EXISTS Mentees;`;
  sql3 = `DROP TABLE IF EXISTS Passwords;`;
  sql4 = `DROP TABLE IF EXISTS Matches;`;
  sql5 = `DROP TABLE IF EXISTS Messages;`;
  sql6 = `DROP TABLE IF EXISTS Skills;`;

  db.all(sql1, [], (err, rows) => {
    if (err) {
      throw err;
    }
  });
  db.all(sql2, [], (err, rows) => {
    if (err) {
      throw err;
    }
  });
  db.all(sql3, [], (err, rows) => {
    if (err) {
      throw err;
    }
  });
  db.all(sql4, [], (err, rows) => {
    if (err) {
      throw err;
    }
  });
  db.all(sql5, [], (err, rows) => {
    if (err) {
      throw err;
    }
  });
  db.all(sql6, [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json({ success: true, rows: rows });
  });
}

//create new mentor
module.exports.postMentor = (req, res) => {
  const fields = ['first_name', 'last_name', 'email_address' ,'biography','zipcode',
  'date_of_birth','occupation','skills','profile_pic_URL','hobbies'];
  const user = {};
  
  fields.forEach(field => {
    if (req.body[field] === undefined) {
     res
        .status(500)
        .json({ error: "Missing credentials", success: false });
    }
    user[field] = req.body[field];
  });
  sql = `INSERT INTO Mentors VALUES ('10000000000000'+'${date.getTime()}', '${user.first_name}', '${user.last_name}', '${user.email_address}', 
  '${user.biography}', '${user.zipcode}', '${user.date_of_birth}', '${user.occupation}', '${user.skills}', '${user.profile_pic_URL}', '${user.hobbies}') `
  console.log(sql);
  db.all(sql, [], (err, rows) => {
  if (err) {
    throw err;
  }
  res.json({ success: true, rows: rows });
});
}
//create new mentee
module.exports.postMentee = (req, res) => {
  const fields = ['first_name', 'last_name', 'email_address' ,'biography','zipcode',
  'date_of_birth','skills','profile_pic_URL','hobbies'];
  const user = {};
  fields.forEach(field => {
    if (req.body[field] === undefined) {
     res
        .status(500)
        .json({ error: "Missing credentials", success: false });
    }
    user[field] = req.body[field];
  });
  sql = `INSERT INTO Mentees VALUES ('20000000000000'+'${date.getTime()}','${user.first_name}', '${user.last_name}', '${user.email_address}', 
  '${user.biography}', '${user.zipcode}', '${user.date_of_birth}', '${user.skills}', '${user.profile_pic_URL}', '${user.hobbies}') `
  console.log(sql);
  db.all(sql, [], (err, rows) => {
  if (err) {
    throw err;
  }
  res.json({ success: true, rows: rows });
});
}

//create new password
module.exports.postPassword = (req, res) => {
  const fields = ['email_address' ,'password'];
  const user = {};
  const missingFields = fields.some(field => {
    if (req.body[field] === undefined) {
     res
        .status(500)
        .json({ error: "Missing credentials", success: false });
        return true;
    }
    user[field] = req.body[field];
  });

  if (missingFields) {
    return;
  }
  var salt = hp.genRandomString(16)
  var passwordData = hp.minh(user.password, salt)
  sql = `INSERT INTO Passwords VALUES ('${user.email_address}','${passwordData.passwordHash}', '${passwordData.salt}') `
  console.log(sql);
  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json({ success: true, rows: rows });
  });
  
}

//post a new skill
module.exports.postSkill = (req, res) => {
  const fields = ['skill','users'];
  const skill = {};
  const missingFields = fields.some(field => {
    if (req.body[field] === undefined) {
     res
        .status(500)
        .json({ error: "Missing credentials", success: false });
        return true;
    }
    skill[field] = req.body[field];
    return false;
  });
  sql = `INSERT INTO Skills VALUES ('${skill.skill}', '${skill.users}') `
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
  sql = `SELECT * FROM Mentors;`; 
    db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json({ success: true, rows: rows });
  }); 
 
}
//get all mentees
module.exports.getAllMentees = (req, res) => {
  sql = `SELECT * FROM Mentees;`;   
  
  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json({ success: true, rows: rows });
  });
}
//get all mentees
module.exports.getAllPasswords = (req, res) => {
  sql = `SELECT * FROM Passwords;`;   

db.all(sql, [], (err, rows) => {
  if (err) {
    throw err;
  }
  res.json({ success: true, rows: rows });
});
}

//get all skills
module.exports.getAllSkills = (req, res) => {
  sql = `SELECT * FROM Skills;`;   

db.all(sql, [], (err, rows) => {
  if (err) {
    throw err;
  }
  res.json({ success: true, rows: rows });
});
}

//get user by ID
module.exports.getUserById = (req, res) => {
  
  userID = req.params.id
  sql = `SELECT * FROM '${userType(userID)}'where user_id = ?;` ;  
  db.all(sql, [userID], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json({ success: true, rows: rows });
  });
  
}

module.exports.getEmailById = (req, res) => {
  userID = req.params.id
  sql = `SELECT email_address FROM '${userType(userID)}'where user_id = ?;` ;     
  db.all(sql, [userID], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json({ success: true, rows: rows });
  });
  
}

module.exports.updateEmailById = (req, res) => {
  
  userID = req.params.id
  newEmail = req.body.email_address

  sql = `UPDATE '${userType(userID)}' SET email_address = ? WHERE user_id = ?`;    //starts with 1
  
  db.all(sql, [newEmail,userID], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json({ success: true, rows: rows });
  });
  
}

module.exports.getHobbiesById = (req, res) => {
  
  userID = req.params.id
  sql = `SELECT hobbies FROM '${userType(userID)}' where user_id = ?;`;    //starts with 1
  
  db.all(sql, [userID], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json({ success: true, rows: rows });
  });
  
}

module.exports.updateHobbiesById = (req, res) => {
  userID = req.params.id
  hobbies = req.body.hobbies
  sql = `UPDATE '${userType(userID)}' SET hobbies = ? WHERE user_id = ?`;    //starts with 1
  
  db.all(sql, [hobbies, userID], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json({ success: true, rows: rows });
  });
  
}

module.exports.getSkillbyId = (req, res) => {
  
  userID = req.params.id
  sql = `SELECT skills FROM '${userType(userID)}' where user_id = ?;`;   
  
  db.all(sql, [userID], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json({ success: true, rows: rows });
  });
  
}

module.exports.getUsersbySkill = (req, res) => {
  
  skill = req.params.skill
  sql = `SELECT users FROM Skills WHERE skill = ?`;    
  
  db.all(sql, [skill], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json({ success: true, rows: rows });
  });
  
}


module.exports.getProfilePic = (req, res) => {
  userID = req.params.id;
  sql = `SELECT profile_pic_URL FROM '${userType(userID)}' where user_id = ?;`;   
  
  db.all(sql, [userID], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json({ success: true, rows: rows });
  });
  
}

module.exports.updateProfilePic = (req, res) => {
  userID = req.params.id;
  profile_pic = req.body.profile_pic_URL;
  sql = `UPDATE '${userType(userID)}' SET profile_pic_URL = ? WHERE user_id = ?`;    //starts with 1
  
  db.all(sql, [profile_pic,userID], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json({ success: true, rows: rows });
  });
  
}

module.exports.getProfession = (req, res) => {
  userID = req.params.id;
  sql = `SELECT occupation FROM '${userType(userID)}' where user_id = ?;`;   
  
  db.all(sql, [userID], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json({ success: true, rows: rows });
  });
  
}

module.exports.updateProfession = (req, res) => {
  userID = req.params.id;
  prof = req.params.profession;
  sql = `UPDATE '${userType(userID)}' SET occupation = ? WHERE user_id = ?`;    //starts with 1
  
  db.all(sql, [prof,userID], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json({ success: true, rows: rows });
  });
  
}

module.exports.getBio = (req, res) => {
  userID = req.params.id;
  sql = user_sql_constants.get_bio(userID);
  
  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json({ success: true, rows: rows });
  });
  
}

module.exports.updateBio = (req, res) => {
  userID = req.params.id;
  bio = req.params.bio;
  sql = user_sql_constants.update_bio(userID,bio);
  
  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json({ success: true, rows: rows });
  });
  
}

module.exports.deleteBio = (req, res) => {
  
  userID = req.params.id
  sql = user_sql_constants.delete_bio(userID);
  
  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json({ success: true, rows: rows });
  });
  
}

module.exports.updateZipcode = (req, res) => {
  userID = req.params.id;
  zip = req.params.zipcode;
  sql = user_sql_constants.update_zip(userID,zip);
  
  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json({ success: true, rows: rows });
  });
  
}

module.exports.login = (req, res) => {
  const fields = ['email_address' ,'password'];
  const user = {};
  const missingFields = fields.some(field => {
    if (req.body[field] === undefined) {
     res
        .status(500)
        .json({ error: "Missing credentials", success: false });
        return true;
    }
    user[field] = req.body[field];
  });

  if (missingFields) {
    return;
  }
  sql1 = `SELECT salt FROM Passwords WHERE email_address= '${user.email_address}';`
  a = db.all(sql1, [], (err, rows) => {
    if (err) {
      throw err;
    }
    if (rows.length==0){
      res
      .status(400)
      .json({ error: "Email doesn't exist", success: false });
    }
    salt = rows[0]['salt']
    console.log(user.email_address)
    sql2 = `SELECT * FROM Passwords WHERE email_address='${user.email_address}' AND password='${hp.minh(user.password, salt)['passwordHash']}';`;  
    db.all(sql2, [], (err, rows) => {
      if (err) {
        throw err;
      }
      res.json({ success: true, rows: rows.length });
    });
  });
}

function userType(id){
  while(id>10)
      id/=10
  if(Math.floor(id)==1) return "Mentors"
  return "Mentees"
}