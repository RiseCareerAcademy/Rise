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
  
  sql = `INSERT INTO Mentors VALUES ('10000000000000'+'${date.getTime()}', ? , ?, ?, ?, ?, ?, ?, ?, ?, ?) `
  console.log(sql); 
  
  db.all(sql, [user.first_name,user.last_name,user.email_address,user.biography,user.zipcode,user.date_of_birth,user.occupation,user.skills,user.profile_pic_URL,user.hobbies], (err, rows) => {
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
  sql = `INSERT INTO Mentees VALUES ('20000000000000'+'${date.getTime()}',?,?,?,?,?,?,?,?,?) `
  console.log(sql);
  db.all(sql, [user.first_name,user.last_name,user.email_address,user.biography,user.zipcode,user.date_of_birth,user.skills,user.profile_pic_URL,user.hobbies], (err, rows) => {
  if (err) {
    throw err;
  }
  res.json({ success: true, rows: rows });
});
}
1
//create a new message
module.exports.postMessage = (req, res) => {
  const fields = ['match_id','to_id','from_id', 'message_body'];
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
  console.log(user)
  sql = `INSERT INTO Messages VALUES ('${date.getTime()}',?,?,?,?)`  
  console.log(date.getTime())
  db.all(sql, [user.match_id, user.to_id, user.from_id, user.message_body], (err, rows) => {
    if (err) {
    throw err;
  }
  res.json({ success: true, rows: rows });
});
}

//create new password (SQL INJ.)
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
  sql = `INSERT INTO Passwords VALUES (?,'${passwordData.passwordHash}', '${passwordData.salt}') `
  console.log(sql);
  db.all(sql, [user.email_address], (err, rows) => {
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
  sql = `INSERT INTO Skills VALUES (?, ?) `
  console.log(sql);
  db.all(sql, [skill.skill,skill.users], (err, rows) => {
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
  console.log('get all skills')
  sql = `SELECT * FROM Skills`;   
  console.log(sql)
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
  sql = `SELECT users FROM Skills WHERE skills = ?`;    
  
  db.all(sql, [skill], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json({ success: true, rows: rows });
  });
  
}

module.exports.addSkill = (req, res) => {
  //get input
  userID = req.params.id
  if (req.body.skill === undefined) {
    res
      .status(500)
      .json({ error: "Missing credentials", success: false });
  }
  skill = req.body.skill

 
  sql1 = `SELECT skills FROM ${userType(userID)} WHERE user_id = ?`;   
  db.all(sql1, [userID], (err, rows1) => {
    if (err) {
      throw err;
    }
    if (rows1.length==0){
    res
      .status(400)
      .json({ error: "User not found!", success: false });
    }
    //add skill to user table
    skills = rows1[0]['skills']
    if (skills.split(",").indexOf(skill) == -1) {
      skills = skills + "," + skill
    }
    
    sql2 = `UPDATE '${userType(userID)}' SET skills = ? WHERE user_id = ?`
    db.all(sql2, [skills,userID], (err, rows2) => {
      if (err) {
        throw err;
      }
    });

  });

  
  //add skill to user table
  sql3 = `SELECT users FROM Skills WHERE skills = ?`;   
  db.all(sql3, [skill], (err, rows3) => {
    if (err) {
      throw err;
    }
    if (rows3.length==0){
      sql4 = `INSERT INTO Skills VALUES (?,?)`
      db.all(sql4, [userID,skills], (err, rows4) => {
        if (err) {
          throw err;
        }
        res.json({ success: true, rows: "insert users into new skill" });
      });
    } else {
      users = rows3[0]['users']
      if (users.split(",").indexOf(userID) == -1) {
        users = users + "," + userID
      }
      
      sql5 = `UPDATE Skills SET users = ? WHERE skills = ?` 
      db.all(sql5, [userID,skills], (err, rows5) => {
        if (err) {
          throw err;
        }
        res.json({ success: true, rows: "add user to existed users list" });
      });
    }
    

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
  sql = `SELECT biography FROM '${userType(userID)}' where user_id = ?;`;   
  
  db.all(sql, [userID], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json({ success: true, rows: rows });
  });
  
}

module.exports.updateBio = (req, res) => {
  userID = req.params.id;
  bio = req.body.biography;
  sql = `UPDATE '${userType(userID)}' SET biography = ? WHERE user_id = ?`;   
  
  db.all(sql, [bio,userID], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json({ success: true, rows: rows });
  });
  
}

module.exports.deleteBio = (req, res) => {
  
  userID = req.params.id
  sql = `UPDATE '${userType(userID)}' SET biography = ' ' WHERE user_id = ?`;   
  
  db.all(sql, [userID], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json({ success: true, rows: rows });
  });
  
}

module.exports.updateZipcode = (req, res) => {
  userID = req.params.id;
  zip = req.params.zipcode;
  sql = `UPDATE '${userType(userID)}' SET zipcode = ? WHERE user_id = ?`;   
  
  db.all(sql, [zip,userID], (err, rows) => {
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
  sql1 = `SELECT salt FROM Passwords WHERE email_address= ?;`
  a = db.all(sql1, [user.email_address], (err, rows1) => {
    if (err) {
      throw err;
    }
    if (rows1.length==0){
      res
      .status(400)
      .json({ error: "Email doesn't exist", success: false });
    }
    salt = rows1[0]['salt']
    sql2 = `SELECT * FROM Passwords WHERE email_address=? AND password=?;`;  
    db.all(sql2, [user.email_address,hp.minh(user.password, salt)['passwordHash']], (err, rows2) => {
      if (err) {
        throw err;
      }
      if (rows2.length==0){
        res
        .status(400)
        .json({ error: "Wrong password", success: false });
      }
      console.log(rows2[0].email_address)
      sql3 = `SELECT user_id FROM Mentors WHERE email_address=? UNION SELECT user_id FROM Mentees WHERE email_address=?`
      db.all(sql3, [user.email_address,user.email_address], (err,rows3) =>{
        if (err) {
          throw err;
        }
        console.log(rows3)
        res.json({ success: true, rows: rows3});
      })
    });
  });
}


//MESSAGE API

module.exports.getMessages = (req, res) => {
  sql = `SELECT * FROM Messages;`
  db.all(sql, [], (err, rows) => {
  if (err) {
    throw err;
  }
  console.log(rows)
  res.json({ success: true, rows: rows });
});
}

//get latest message by match id 
module.exports.getLatestMessageById = (req, res) => {
  matchId = req.params.matchid;
  sql = `SELECT * FROM Messages WHERE match_id = ? order by message_id LIMIT 1;`;    
  db.all(sql, [matchId], (err, rows) => {
  if (err) {
    throw err;
  }
  res.json({ success: true, rows: rows });
});
}

 //get message chain  by match id 
 module.exports.getMessageChain = (req, res) => {
  matchId = req.params.matchid;
  sql = `SELECT * FROM Messages WHERE match_id = ? order by message_id;`;    

  db.all(sql, [matchId], (err, rows) => {
  if (err) {
    throw err;
  }
  res.json({ success: true, rows: rows });
});
}

//controller function to determine if mentee or mentor based on id, returns corresponding table name 
function userType(id){
  while(id>10)
      id/=10
  if(Math.floor(id)==1) return "Mentors"
  return "Mentees"
}