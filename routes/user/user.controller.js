const jwt = require("jsonwebtoken");
const config = require("../../config/database.js");
const db = require('../../db');

var user_sql_constants = require("../../config/user_sql_constants.js");

//create all tables
module.exports.createTables = (req, res) => {
  
  sql1 = user_sql_constants.create_mentor_table_sql();
  sql2 = user_sql_constants.create_mentee_table_sql();
  sql3 = user_sql_constants.create_password_table_sql();
  sql4 = user_sql_constants.create_matches_table_sql();
  sql5 = user_sql_constants.create_messages_table_sql();


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
    res.json({ success: true, rows: rows });
  });
}
//drop table 
module.exports.deletetable = (req, res) => {
  
  sql1 = `DROP TABLE IF EXISTS Mentors;`;
  sql2 = `DROP TABLE IF EXISTS Mentees;`;
  sql3 = `DROP TABLE IF EXISTS Matches;`;
  sql4 = `DROP TABLE IF EXISTS Messages;`;

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
    res.json({ success: true, rows: rows });
  });
}

//create new mentor
module.exports.postMentors = (req, res) => {
  const fields = ['user_id', 'first_name', 'last_name', 'email_address' ,'biography','zipcode',
  'date_of_birth','occupation','skills','profile_pic_URL','hobbies'];
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
  'date_of_birth','area_of_study','skills','profile_pic_URL','hobbies'];
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
  sql = user_sql_constants.post_mentee_sql(user)
  console.log(sql);
  db.all(sql, [], (err, rows) => {
  if (err) {
    throw err;
  }
  res.json({ success: true, rows: rows });
});
}

//create new password
module.exports.postPasswords = (req, res) => {
  const fields = ['user_id', 'email_address' ,'password'];
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
  sql = user_sql_constants.post_password_sql(user)
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
<<<<<<< HEAD
    sql = user_sql_constants.get_all_mentors();
    //console.log(res)
=======
  sql = user_sql_constants.get_all_mentors();
  
>>>>>>> 0a5963141419585528bd04f469d47f3d884fff83
  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json({ success: true, rows: rows });
  });
  console.log(res.json)
}
//get all mentees
  module.exports.getAllMentees = (req, res) => {
    sql = user_sql_constants.get_all_mentees();
  
  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json({ success: true, rows: rows });
  });
}
//get all mentees
module.exports.getAllPasswords = (req, res) => {
  sql = user_sql_constants.get_all_passwords();

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
  sql = user_sql_constants.get_user_id(userID);
  
  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json({ success: true, rows: rows });
  });
  
}

//todo: get email by id, and check if its the same as one passed in param 
module.exports.checkEmail = (req, res) => {
  userID = req.params.id;
  email = req.params.email;

  sql = user_sql_constants.confirm_email(userID,email);
  
  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json({ success: true, rows: rows });
  });
  
}

module.exports.getEmailById = (req, res) => {
  
  userID = req.params.id
  sql = user_sql_constants.get_email_by_id(userID);
  
  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json({ success: true, rows: rows });
  });
  
}

module.exports.updateEmailById = (req, res) => {
  
  userID = req.params.id
  newEmail = req.params.email
  sql = user_sql_constants.update_email_by_id(userID,newEmail);
  
  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json({ success: true, rows: rows });
  });
  
}

module.exports.getHobbiesById = (req, res) => {
  
  userID = req.params.id
  sql = user_sql_constants.get_hobbies_by_id(userID);
  
  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json({ success: true, rows: rows });
  });
  
}

module.exports.updateHobbiesById = (req, res) => {
  userID = req.params.id
  hobbies = req.params.hobby
  sql = user_sql_constants.update_hobbies_by_id(userID,hobbies);
  
  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json({ success: true, rows: rows });
  });
  
}

module.exports.deleteHobbiesById = (req, res) => {
  
  userID = req.params.id
  sql = user_sql_constants.update_hobbies_by_id(userID,'');
  
  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json({ success: true, rows: rows });
  });
  
}


module.exports.getSkillbyId = (req, res) => {
  
  userID = req.params.id
  sql = user_sql_constants.get_skill_by_id(userID);
  
  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json({ success: true, rows: rows });
  });
  
}

module.exports.addSkill = (req, res) => {
  userID = req.params.id
  new_skill = req.params.skill
  sql = user_sql_constants.add_skill(userID,new_skill);
  
  
  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json({ success: true, rows: rows });
  });
  
}



module.exports.getProfilePic = (req, res) => {
  userID = req.params.id;
  sql = user_sql_constants.get_profile_pic(userID);
  
  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json({ success: true, rows: rows });
  });
  
}

module.exports.updateProfilePic = (req, res) => {
  userID = req.params.id;
  profile_pic = req.params.profilepic;
  sql = user_sql_constants.update_profile_pic(userID,profile_pic);
  
  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json({ success: true, rows: rows });
  });
  
}

module.exports.getProfession = (req, res) => {
  userID = req.params.id;
  sql = user_sql_constants.get_profession(userID);
  
  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json({ success: true, rows: rows });
  });
  
}

module.exports.updateProfession = (req, res) => {
  userID = req.params.id;
  prof = req.params.profession;
  sql = user_sql_constants.update_profession(userID,prof);
  
  db.all(sql, [], (err, rows) => {
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
  email = req.body.email_address;
  password = req.body.password;
  sql = user_sql_constants.login(email,password);
  
  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json({ success: true, rows: rows });
  });
  
}
