const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require('fs');
const config = require("../../config/database.js");
const db = require('../../db');

const os = require('os');
const ip = require('ip');
const { getRandomArbitrary } = require('../../utils/getRandomArbitrary');


const user_sql_constants = require("../../config/user_sql_constants.js");
const hp = require("../../config/helper.js");

//create all tables
module.exports.createTables = (req, res) => {

  const sql1 = user_sql_constants.create_mentor_table_sql();
  const sql2 = user_sql_constants.create_mentee_table_sql();
  const sql3 = user_sql_constants.create_password_table_sql();
  const sql4 = user_sql_constants.create_matches_table_sql();
  const sql5 = user_sql_constants.create_messages_table_sql();
  const sql6 = user_sql_constants.create_skills_table_sql();
  const sql7 = user_sql_constants.create_professions_table_sql();

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
  });
  db.all(sql7, [], (err, rows) => {
    if (err) {
      throw err;
    }
  });
  res.json({ success: true, rows: "all tables created" });
}
//drop table 
module.exports.deleteTable = (req, res) => {

  const sql1 = `DROP TABLE IF EXISTS Mentors;`;
  const sql2 = `DROP TABLE IF EXISTS Mentees;`;
  const sql3 = `DROP TABLE IF EXISTS Passwords;`;
  const sql4 = `DROP TABLE IF EXISTS Matches;`;
  const sql5 = `DROP TABLE IF EXISTS Messages;`;
  const sql6 = `DROP TABLE IF EXISTS Skills;`;
  const sql7 = `DROP TABLE IF EXISTS Profession;`;

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
  });
  db.all(sql7, [], (err, rows) => {
    if (err) {
      throw err;
    }
  });
  res.json({ success: true, rows: "delete all tables" });
}



//create new mentor
module.exports.postMentor = (req, res) => {
  const fields = ['first_name', 'last_name', 'email_address', 'biography', 'zipcode',
    'date_of_birth', 'profession', 'skills', 'profile_pic_URL', 'hobbies'];
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

  const sql_email = `Select * from Mentors where email_address = ?  `
  db.all(sql_email, [user.email_address], (err, rows_email) => {
    if (err) {
      throw err;
    }
    //post mentor
    if (rows_email.length != 0) {
      res.json({ success: false, rows: "Email is not unique" });
      return false;
    }


    const date = new Date()
    const userID = parseInt(10000000000000 + date.getTime());
    const sql = `INSERT INTO Mentors VALUES (?, ? , ?, ?, ?, ?, ?, ?, ?, ?, ?) `
    db.all(sql, [userID, user.first_name, user.last_name, user.email_address,
      user.biography, user.zipcode, user.date_of_birth, user.profession,
      user.skills, user.profile_pic_URL, user.hobbies], (err, rows) => {
        if (err) {
          throw err;
        }
      });

    //add user ID to skills table 
    const skill = user.skills;
    const sql3 = `SELECT users FROM Skills WHERE skills = ?`;
    db.all(sql3, [skill], (err, rows3) => {
      if (err) {
        throw err;
      }
      if (rows3.length == 0) {
        const sql4 = `INSERT INTO Skills VALUES (?,CAST(? AS int))`
        db.all(sql4, [skill, parseInt(userID)], (err, rows4) => {
          if (err) {
            throw err;
          }
          console.log("insert users into new skill")
        });
      } else {
        const users = addToString(rows3[0]['users'], userID);

        const sql5 = `UPDATE Skills SET users = ? WHERE skills = ?`
        db.all(sql5, [users, skill], (err, rows5) => {
          if (err) {
            throw err;
          }
          console.log("add user to existed users list")
        });
      }
    });

    //add user ID to profession table 
    const profession = user.profession;
    const sql33 = `SELECT users FROM Profession WHERE profession = ?`;
    db.all(sql3, [profession], (err, rows3) => {
      if (err) {
        throw err;
      }
      //this means profession doesnt exist 
      if (rows3.length == 0) {
        const sql4 = `INSERT INTO Profession VALUES (?,CAST(? AS int))`
        db.all(sql4, [profession, userID], (err, rows4) => {
          if (err) {
            throw err;
          }
          console.log("new profession added, user attached");
        });
      }
      //profession exists, append the user to list  
      else {
        const users = addToString(rows3[0]['users'], userID)
        //add the users to the profession 
        const sql5 = `UPDATE Profession SET users = ? WHERE profession = ?`
        db.all(sql5, [users, profession], (err, rows5) => {
          if (err) {
            throw err;
          }
          console.log("Appended a user to an existed users list")
        });
      }
    });

    res.json({ success: true, rows: "" });
  });
}
//create new mentee
module.exports.postMentee = (req, res) => {
  const fields = ['first_name', 'last_name', 'email_address', 'biography', 'zipcode',
    'date_of_birth', 'skills', 'profession', 'profile_pic_URL', 'hobbies'];
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

  const sql_email = `Select * from Mentees where email_address = ?  `
  db.all(sql_email, [user.email_address], (err, rows_email) => {
    if (err) {
      throw err;
    }

    if (rows_email.length != 0) {
      res.json({ success: false, rows: "Email is not unique" });
      return;
    }
    const date = new Date()
    const userID = parseInt(20000000000000 + date.getTime());
    const sql = `INSERT INTO Mentees VALUES (?,?,?,?,?,?,?,?,?,?,?) `
    db.all(sql, [userID, user.first_name, user.last_name, user.email_address, user.biography,
      user.zipcode, user.date_of_birth, user.profession, user.skills, user.profile_pic_URL, user.hobbies], (err, rows) => {
        if (err) {
          throw err;
        }
        res.json({ success: true, rows: rows });
      });
    //add user ID to skills table 
    const skill = user.skills;
    const sql3 = `SELECT users FROM Skills WHERE skills = ?`;
    db.all(sql3, [skill], (err, rows3) => {
      if (err) {
        throw err;
      }
      if (rows3.length == 0) {
        const sql4 = `INSERT INTO Skills VALUES (?,CAST(? AS int))`
        db.all(sql4, [skill, parseInt(userID)], (err, rows4) => {
          if (err) {
            throw err;
          }
          console.log("insert users into new skill")
        });
      } else {
        const users = addToString(rows3[0]['users'], userID);

        const sql5 = `UPDATE Skills SET users = ? WHERE skills = ?`
        db.all(sql5, [users, skill], (err, rows5) => {
          if (err) {
            throw err;
          }
          console.log("add user to existed users list")
        });
      }
    });

    //add user ID to profession table 
    const { profession } = user;
    sql3 = `SELECT users FROM Profession WHERE profession = ?`;
    db.all(sql3, [profession], (err, rows3) => {
      if (err) {
        throw err;
      }
      //this means profession doesnt exist 
      if (rows3.length == 0) {
        const sql4 = `INSERT INTO Profession VALUES (?,CAST(? AS int))`
        db.all(sql4, [profession, userID], (err, rows4) => {
          if (err) {
            throw err;
          }
          console.log("new profession added, user attached");
        });
      }
      //profession exists, append the user to list  
      else {
        const users = addToString(rows3[0]['users'], userID)
        //add the users to the profession 
        const sql5 = `UPDATE Profession SET users = ? WHERE profession = ?`
        db.all(sql5, [users, profession], (err, rows5) => {
          if (err) {
            throw err;
          }
          console.log("Appended a user to an existed users list")
        });
      }
    });

  });


}
//create a new message
module.exports.postMessage = (req, res) => {
  const fields = ['match_id', 'to_id', 'from_id', 'message_body'];
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
  const sql = `INSERT INTO Messages VALUES ('${date.getTime()}',?,?,?,?,?)`
  db.all(sql, [user.match_id, user.to_id, user.from_id, user.message_body, getFormattedDate()], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json({ success: true, rows: rows });
  });
}

//create new password (SQL INJ.)
module.exports.postPassword = (req, res) => {
  const fields = ['email_address', 'password'];
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


  sql_email = `Select * from Mentors where email_address = ?  `
  db.all(sql_email, [user.email_address], (err, rows_email) => {
    if (err) {
      throw err;
    }
    if (rows_email != 0) {
      res.json({ success: false, rows: "Email already exists" });
      return;
    }
  });
  const salt = hp.genRandomString(16)
  const passwordData = hp.saltPassword(user.password, salt)
  sql = `INSERT INTO Passwords VALUES (?,'${passwordData.passwordHash}', '${passwordData.salt}') `
  db.all(sql, [user.email_address], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json({ success: true, rows: rows });
  });

}

//post a new skill
module.exports.postSkill = (req, res) => {
  const fields = ['skill', 'users'];
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
  db.all(sql, [skill.skill, skill.users], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json({ success: true, rows: rows });
  });
}

//post a new profession
module.exports.postProfession = (req, res) => {
  const fields = ['profession', 'users'];
  const profession = {};
  const missingFields = fields.some(field => {
    if (req.body[field] === undefined) {
      res
        .status(500)
        .json({ error: "Missing credentials", success: false });
      return true;
    }
    profession[field] = req.body[field];
    return false;
  });
  sql = `INSERT INTO Profession VALUES (?, ?) `
  db.all(sql, [profession.profession, profession.users], (err, rows) => {
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
  sql = `SELECT * FROM Skills`;
  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json({ success: true, rows: rows });
  });
}

//get all skills
module.exports.getAllProfessions = (req, res) => {
  sql = `SELECT * FROM Profession`;
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
  sql = `SELECT * FROM '${userType(userID)}'where user_id = ?;`;
  db.all(sql, [userID], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json({ success: true, rows: rows });
  });

}

module.exports.getEmailById = (req, res) => {
  userID = req.params.id
  sql = `SELECT email_address FROM '${userType(userID)}'where user_id = ?;`;
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

  db.all(sql, [newEmail, userID], (err, rows) => {
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

module.exports.getUsersbyProfession = (req, res) => {
  profession = req.params.profession
  sql = `SELECT users FROM Profession WHERE profession = ?`;

  db.all(sql, [profession], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json({ success: true, rows: rows });
  });

}

module.exports.getFirstLastById = (req, res) => {
  userId = req.params.id
  sql = `SELECT first_name,last_name FROM '${userType(userId)}' WHERE user_id = ?`;

  db.all(sql, [userId], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json({ success: true, rows: rows });
  });

}

//LARGE SKILLS METHODS 
module.exports.addSkill = (req, res) => {
  //get input
  userID = req.params.id
  if (req.body.skill === undefined) {
    res
      .status(500)
      .json({ error: "Missing credentials", success: false });
  }
  skill = req.body.skill

  //add skill to user table
  sql1 = `SELECT skills FROM ${userType(userID)} WHERE user_id = ?`;
  db.all(sql1, [userID], (err, rows1) => {
    if (err) {
      throw err;
    }
    if (rows1.length == 0) {
      res
        .status(400)
        .json({ error: "User not found!", success: false });
    }

    skills = rows1[0]['skills']
    skills = addToString(skills, skill)

    sql2 = `UPDATE '${userType(userID)}' SET skills = ? WHERE user_id = ?`
    db.all(sql2, [skills, userID], (err, rows2) => {
      if (err) {
        throw err;
      }
    });

  });



  //add user to skills table
  sql3 = `SELECT users FROM Skills WHERE skills = ?`;
  db.all(sql3, [skill], (err, rows3) => {
    if (err) {
      throw err;
    }
    if (rows3.length == 0) {
      sql4 = `INSERT INTO Skills VALUES (?,CAST(? AS int))`
      db.all(sql4, [skill, parseInt(userID)], (err, rows4) => {
        if (err) {
          throw err;
        }
        res.json({ success: true, rows: "insert users into new skill" });
      });
    } else {
      users = rows3[0]['users']
      users = addToString(stringToArray(users), userID);

      sql5 = `UPDATE Skills SET users = ? WHERE skills = ?`
      db.all(sql5, [users, skill], (err, rows5) => {
        if (err) {
          throw err;
        }
        res.json({ success: true, rows: "add user to existed users list" });
      });
    }
  });

}

module.exports.removeSkill = (req, res) => {
  //get input
  userID = req.params.id
  if (req.body.skill === undefined) {
    res
      .status(500)
      .json({ error: "Missing credentials", success: false });
  }
  skill = req.body.skill

  //remove skill to user table
  sql1 = `SELECT skills FROM ${userType(userID)} WHERE user_id = ?`;
  db.all(sql1, [userID], (err, rows1) => {
    if (err) {
      throw err;
    }
    if (rows1.length == 0) {
      res
        .status(400)
        .json({ error: "User not found!", success: false });
    }

    skills = rows1[0]['skills']
    skills = removeFromString(skills, skill)

    sql2 = `UPDATE '${userType(userID)}' SET skills = ? WHERE user_id = ?`
    db.all(sql2, [skills, userID], (err, rows2) => {
      if (err) {
        throw err;
      }
    });

  });


  //remove user to skill table
  sql3 = `SELECT users FROM Skills WHERE skills = ?`;
  db.all(sql3, [skill], (err, rows3) => {
    if (err) {
      throw err;
    }
    if (rows3.length == 0) {
      res.json({ success: true, rows: "Skill not found !" });
    } else {
      users = rows3[0]['users']
      users = removeFromString(users, userID)

      sql5 = `UPDATE Skills SET users = ? WHERE skills = ?`
      db.all(sql5, [users, skill], (err, rows5) => {
        if (err) {
          throw err;
        }
        res.json({ success: true, rows: "remove user successfully" });
      });
    }


  });

}

module.exports.updateSkill = (req, res) => {
  userID = req.params.id;
  sql = `SELECT profile_pic_URL FROM '${userType(userID)}' where user_id = ?;`;

  db.all(sql, [userID], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json({ success: true, rows: rows });
  });

}

module.exports.updateUsersbySkill = (req, res) => {
  skill = req.params.skill;
  user_list = req.body.users;
  sql = user_sql_constants.update_users_by_skill(skill, user_list);

  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json({ success: true, rows: rows });
  });

}



module.exports.getProfilePic = (req, res) => {
  const userID = req.params.id;
  const uploadsPath = path.join(__dirname, '../../uploads')
  if (!fs.existsSync(uploadsPath)) {
    fs.mkdirSync(uploadsPath);
  }
  const filepath = path.join(uploadsPath, `${userID}.jpg`);
  res.sendFile(filepath);
}

module.exports.updateProfilePic = (req, res) => {
  userID = req.params.id;
  profile_pic = req.body.profile_pic_URL;
  sql = `UPDATE '${userType(userID)}' SET profile_pic_URL = ? WHERE user_id = ?`;    //starts with 1

  db.all(sql, [profile_pic, userID], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json({ success: true, rows: rows });
  });

}

module.exports.postProfilePic = (req, res) => {
  res.json(req.file)
}

module.exports.getProfession = (req, res) => {
  userID = req.params.id;
  sql = `SELECT profession FROM '${userType(userID)}' where user_id = ?;`;

  db.all(sql, [userID], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json({ success: true, rows: rows });
  });

}

module.exports.updateProfession = (req, res) => {
  //get input
  userID = req.params.id
  if (req.body.profession === undefined) {
    res
      .status(500)
      .json({ error: "Missing credentials", success: false });
  }
  //THIS IS THE NEW PROFESSION VALUE USED
  profession = req.body.profession

  //get old profession to delete 
  sql = `Select profession from '${userType(userID)}' WHERE user_id = ?`;
  db.all(sql, [userID], (err, rows) => {
    if (err) {
      throw err;
    }
    old_profession = rows[0]['profession']
    //REMOVE A USER FROM A PROFESSION IN A PROFESSION TABLE 
    sql3 = `SELECT users FROM Profession WHERE profession = ?`;
    db.all(sql3, [old_profession], (err, rows3) => {
      if (err) {
        throw err;
      }

      //seing if there was an old profession (there should always be)
      if (rows3.length == 0) {
        res.json({ success: true, rows: "Profession not found !" });
      }
      else {
        users = rows3[0]['users']
        users = removeFromString(users, userID);

        sql5 = `UPDATE Profession SET users = ? WHERE profession = ?`
        db.all(sql5, [users, old_profession], (err, rows5) => {
          if (err) {
            throw err;
          }
          console.log("remove user successfully from old profession");
        });
      }
    });
  });

  //updates profession in a user table (works) 
  sql1 = `UPDATE '${userType(userID)}' SET profession = ? WHERE user_id = ?`;
  db.all(sql1, [profession, userID], (err, rows1) => {
    if (err) {
      throw err;
    }
  });

  //ADD A USER TO A PROFESSSION IN PROFESSION TABLE (DONE)
  sql3 = `SELECT users FROM Profession WHERE profession = ?`;
  db.all(sql3, [profession], (err, rows3) => {
    if (err) {
      throw err;
    }
    //this means profession doesnt exist 
    if (rows3.length == 0) {
      sql4 = `INSERT INTO Profession VALUES (?,CAST(? AS int))`
      db.all(sql4, [profession, userID], (err, rows4) => {
        if (err) {
          throw err;
        }
        console.log("new profession added, user attached");
      });
    }
    //profession exists, append the user to list  
    else {
      users = rows3[0]['users']
      users = addToString(users, userID)
      //add the users to the profession 
      sql5 = `UPDATE Profession SET users = ? WHERE profession = ?`
      db.all(sql5, [users, profession], (err, rows5) => {
        if (err) {
          throw err;
        }
        console.log("Appended a user to an existed users list")
      });
    }
  });

  res.json({ success: true });


};//end of updatedProfession



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

  db.all(sql, [bio, userID], (err, rows) => {
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

  db.all(sql, [zip, userID], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json({ success: true, rows: rows });
  });

}

module.exports.login = (req, res) => {
  const fields = ['email_address', 'password'];
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
    if (rows1.length == 0) {
      res
        .status(400)
        .json({ error: "Email doesn't exist", success: false });
    }
    salt = rows1[0]['salt']
    sql2 = `SELECT * FROM Passwords WHERE email_address=? AND password=?;`;
    db.all(sql2, [user.email_address, hp.saltPassword(user.password, salt)['passwordHash']], (err, rows2) => {
      if (err) {
        throw err;
      }
      if (rows2.length == 0) {
        res
          .status(400)
          .json({ error: "Wrong password", success: false });
      }
      sql3 = `SELECT user_id FROM Mentors WHERE email_address=? UNION SELECT user_id FROM Mentees WHERE email_address=?`
      db.all(sql3, [user.email_address, user.email_address], (err, rows3) => {
        if (err) {
          throw err;
        }
        res.json({ success: true, rows: rows3 });
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
function userType(id) {
  while (id > 10)
    id /= 10
  if (Math.floor(id) == 1) return "Mentors"
  return "Mentees"
}


function addToString(string, add) {
  array = string.split(",")
  if (array.indexOf(add) == -1) {
    array.push(add);
  }
  return array.join(",")
}

function removeFromString(string, rem) {
  array = string.split(",")
  string = ""
  for (i = 0; i < array.length; i++) {
    if (array[i] == rem) {
      continue;
    }
    string += array[i] + ","
  }
  if (string.charAt(string.length - 1) == ",") {
    string = string.substring(0, string.length - 1)
  }
  return string
}

function getFormattedDate() {
  var date = new Date();
  var str = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

  return str;
}