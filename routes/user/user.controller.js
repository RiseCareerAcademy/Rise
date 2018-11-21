const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs");
const config = require("../../config/database.js");
const db = require("../../db");
var date = new Date();

const os = require("os");
const ip = require("ip");
const axios = require("axios");
const qs = require("qs");

const { getRandomArbitrary } = require("../../utils/getRandomArbitrary");

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
  sql7 = user_sql_constants.create_professions_table_sql();

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
};
//drop table
module.exports.deletetable = (req, res) => {
  sql1 = `DROP TABLE IF EXISTS Mentors;`;
  sql2 = `DROP TABLE IF EXISTS Mentees;`;
  sql3 = `DROP TABLE IF EXISTS Passwords;`;
  sql4 = `DROP TABLE IF EXISTS Matches;`;
  sql5 = `DROP TABLE IF EXISTS Messages;`;
  sql6 = `DROP TABLE IF EXISTS Skills;`;
  sql7 = `DROP TABLE IF EXISTS Profession;`;

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
};

//create new mentor
module.exports.linkedin = async (req, res) => {
  const requestBody = {
    grant_type: "authorization_code",
    code: req.body.code,
    redirect_uri: req.body.redirect_uri,
    client_id: process.env.LINKEDIN_CLIENT_ID,
    client_secret: process.env.LINKEDIN_CLIENT_SECRET,
  };
  try {
    const response = await axios.post(
      "https://www.linkedin.com/oauth/v2/accessToken",
      qs.stringify(requestBody)
    );
    const {
      data: { access_token, expires_in },
    } = response;
    const config = {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    };
    const linkedinFileds = [
      "id",
      "first-name",
      "last-name",
      "maiden-name",
      "formatted-name",
      "phonetic-first-name",
      "phonetic-last-name",
      "formatted-phonetic-name",
      "headline",
      "location",
      "industry",
      "current-share",
      "num-connections",
      "num-connections-capped",
      "summary",
      "specialties",
      "positions",
      "picture-urls::(original)",
      "site-standard-profile-request",
      "api-standard-profile-request",
      "public-profile-url",
      "email-address",
    ];
    const fieldsString = linkedinFileds.join(",");
    const linkedinApiUrl = `https://api.linkedin.com/v1/people/~:(${fieldsString})?format=json`;
    const { data } = await axios.get(linkedinApiUrl, config);
    const {
      emailAddress: email_address,
      firstName: first_name,
      industry: profession,
      lastName: last_name,
      pictureUrls,
      summary: biography,
    } = data;
    const profile_pic_URL = pictureUrls.values[0];
    const result = {
      email_address,
      first_name,
      profession,
      last_name,
      biography,
      profile_pic_URL,
    };
    res.json({ success: true, fields: result });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};

//create new mentor
module.exports.postMentor = (req, res) => {
  const fields = [
    "first_name",
    "last_name",
    "email_address",
    "biography",
    "zipcode",
    "date_of_birth",
    "profession",
    "skills",
    "hobbies",
    "profile_pic_URL",
  ];
  const user = {};

  fields.forEach(field => {
    if (req.body[field] === undefined) {
      res
        .status(500)
        .json({ error: `Missing credential ${field}`, success: false });
      return true;
    }
    user[field] = req.body[field];
  });

  sql_email = `Select * from Mentors where email_address = ?  `;
  db.all(sql_email, [user.email_address], (err, rows_email) => {
    if (err) {
      res.json({ success: false, rows: "Email is not unique" });
      return false;
    }
    //post mentor
    if (rows_email.length != 0) {
      res.json({ success: false, rows: "Email is not unique" });
      return false;
    }

    date = new Date();
    userID = "1"+iid(parseInt(date.getTime()));
    user.user_id = userID;
    sql = `INSERT INTO Mentors VALUES (?, ? , ?, ?, ?, ?, ?, ?, ?, ?, ?) `;
    console.log(sql);
    db.all(
      sql,
      [
        userID,
        user.first_name,
        user.last_name,
        user.email_address,
        user.biography,
        user.zipcode,
        user.date_of_birth,
        user.profession,
        user.skills,
        user.profile_pic_URL,
        user.hobbies,
      ],
      (err, rows) => {
        if (err) {
          res.status(500).json({ error: err.message, success: false });
          return false;
        }
      }
    );

    //add user ID to skills table
    skills = user.skills.split(",");
    for (i in skills) {
      skill = skills[i];
      sql3 = `SELECT users FROM Skills WHERE skills = '${skills[i]}'`;
      db.all(sql3, [], (err, rows3) => {
        if (err) {
          throw err;
        }
        if (rows3.length == 0) {
          sql4 = `INSERT INTO Skills VALUES (?,CAST(? AS int))`;
          db.all(sql4, [skill, parseInt(userID)], (err, rows4) => {
            if (err) {
              throw err;
            }
            console.log("insert users into new skill");
          });
        } else {
          users = rows3[0]["users"];
          users = addToString(users, userID);

          sql5 = `UPDATE Skills SET users = ? WHERE skills = ?`;
          db.all(sql5, [users, skill], (err, rows5) => {
            if (err) {
              throw err;
            }
            console.log("add user to existed users list");
          });
        }
      });
    }

    //add user ID to profession table
    profession = user.profession;
    sql3 = `SELECT users FROM Profession WHERE profession = ?`;
    db.all(sql3, [profession], (err, rows3) => {
      if (err) {
        throw err;
      }
      //this means profession doesnt exist
      if (rows3.length == 0) {
        sql4 = `INSERT INTO Profession VALUES (?,CAST(? AS int))`;
        db.all(sql4, [profession, userID], (err, rows4) => {
          if (err) {
            throw err;
          }
          console.log("new profession added, user attached");
        });
      }
      //profession exists, append the user to list
      else {
        users = rows3[0]["users"];
        users = addToString(users, userID);
        //add the users to the profession
        sql5 = `UPDATE Profession SET users = ? WHERE profession = ?`;
        db.all(sql5, [users, profession], (err, rows5) => {
          if (err) {
            throw err;
          }
          console.log("Appended a user to an existed users list");
        });
      }
    });

    res.json({ success: true, mentor: user });
  });
};
//create new mentee
module.exports.postMentee = (req, res) => {
  const fields = [
    "first_name",
    "last_name",
    "email_address",
    "biography",
    "zipcode",
    "date_of_birth",
    "skills",
    "profession",
    "hobbies",
  ];
  const user = {};
  const missingFields = fields.some(field => {
    if (req.body[field] === undefined) {
      res.status(500).json({ error: "Missing credentials", success: false });
      return true;
    }
    user[field] = req.body[field];
    return false;
  });

  if (missingFields) {
    return;
  }

  sql_email = `Select * from Mentees where email_address = ?  `;
  db.all(sql_email, [user.email_address], (err, rows_email) => {
    if (err) {
      throw err;
    }

    if (rows_email.length != 0) {
      res.json({ success: false, rows: "Email is not unique" });
      return;
    }
    date = new Date();
    userID = "2"+iid(parseInt(date.getTime()));
    user.user_id = userID;
    const ip_address = ip.address();
    user.profile_pic_URL = `http://${ip_address}:8000/user/${
      user.user_id
    }/profilepic`;

    sql = `INSERT INTO Mentees VALUES (?,?,?,?,?,?,?,?,?,?,?) `;
    console.log(sql);
    db.all(
      sql,
      [
        userID,
        user.first_name,
        user.last_name,
        user.email_address,
        user.biography,
        user.zipcode,
        user.date_of_birth,
        user.profession,
        user.skills,
        user.profile_pic_URL,
        user.hobbies,
      ],
      (err, rows) => {
        if (err) {
          throw err;
        }
        res.json({ success: true, mentee: user });
      }
    );
    //add user ID to skills table
    skill = user.skills;
    sql3 = `SELECT users FROM Skills WHERE skills = ?`;
    db.all(sql3, [skill], (err, rows3) => {
      if (err) {
        throw err;
      }
      if (rows3.length == 0) {
        sql4 = `INSERT INTO Skills VALUES (?,CAST(? AS int))`;
        db.all(sql4, [skill, parseInt(userID)], (err, rows4) => {
          if (err) {
            throw err;
          }
          console.log("insert users into new skill");
        });
      } else {
        users = rows3[0]["users"];
        users = addToString(users, userID);

        sql5 = `UPDATE Skills SET users = ? WHERE skills = ?`;
        db.all(sql5, [users, skill], (err, rows5) => {
          if (err) {
            throw err;
          }
          console.log("add user to existed users list");
        });
      }
    });

    //add user ID to profession table
    profession = user.profession;
    console.log(profession, userID);
    sql3 = `SELECT users FROM Profession WHERE profession = ?`;
    db.all(sql3, [profession], (err, rows3) => {
      if (err) {
        throw err;
      }
      //this means profession doesnt exist
      if (rows3.length == 0) {
        sql4 = `INSERT INTO Profession VALUES (?,CAST(? AS int))`;
        db.all(sql4, [profession, userID], (err, rows4) => {
          if (err) {
            throw err;
          }
          console.log("new profession added, user attached");
        });
      }
      //profession exists, append the user to list
      else {
        users = rows3[0]["users"];
        users = addToString(users, userID);
        //add the users to the profession
        sql5 = `UPDATE Profession SET users = ? WHERE profession = ?`;
        db.all(sql5, [users, profession], (err, rows5) => {
          if (err) {
            throw err;
          }
          console.log("Appended a user to an existed users list");
        });
      }
    });
  });
};
//create a new message
module.exports.postMessage = (req, res) => {
  const fields = ["match_id", "to_id", "from_id", "message_body"];
  const user = {};
  const missingFields = fields.some(field => {
    if (req.body[field] === undefined) {
      res.status(500).json({ error: "Missing credentials", success: false });
      return true;
    }
    user[field] = req.body[field];
    return false;
  });

  if (missingFields) {
    return;
  }
  console.log(user);
  sql = `INSERT INTO Messages VALUES ('${date.getTime()}',?,?,?,?,?)`;
  date = new Date();
  console.log(date.getTime());
  db.all(
    sql,
    [
      user.match_id,
      user.to_id,
      user.from_id,
      user.message_body,
      getFormattedDate(),
    ],
    (err, rows) => {
      if (err) {
        throw err;
      }
      res.json({ success: true, rows: rows });
    }
  );
};

const sockets = {};

//create a new message
module.exports.conversation = (ws, req) => {
  const { to_id, from_id } = req.query;
  console.log(to_id);
  console.log(from_id);
  console.log('');
  sockets[from_id] = ws;
  ws.on('message', stringifiedMessage => {
    console.log(`received ws message: ${JSON.stringify(stringifiedMessage)}`);
    if (Object.keys(sockets).includes(to_id)) {
      const toWs = sockets[to_id];
      toWs.send(stringifiedMessage);
    }

    const message = JSON.parse(stringifiedMessage);

    const req = {
      body: {
        match_id: message.match_id,
        to_id: message.to_id,
        from_id: message.from_id,
        message_body: message.message_body,
      },
    };

    const res = {
      status: function() { return this; },
      json: function() { return this; },
    };

    module.exports.postMessage(req, res);
  });

  ws.on('close', () => {
    delete sockets[from_id];
    console.log('closed!');
  })
}


//create new password (SQL INJ.)
module.exports.postPassword = (req, res) => {
  const fields = ["email_address", "password"];
  const user = {};
  const missingFields = fields.some(field => {
    if (req.body[field] === undefined) {
      res
        .status(500)
        .json({ error: `Missing credential ${field}`, success: false });
      return true;
    }
    user[field] = req.body[field];
    return false;
  });

  if (missingFields) {
    return;
  }

  sql_email = `Select * from Mentors where email_address = ?  `;
  db.all(sql_email, [user.email_address], (err, rows_email) => {
    if (err) {
      throw err;
    }
    if (rows_email != 0) {
      res.json({ success: false, rows: "Email already exists" });
      return;
    }
  });
  var salt = hp.genRandomString(16);
  var passwordData = hp.saltPassword(user.password, salt);

  sql = `INSERT INTO Passwords VALUES (?,'${passwordData.passwordHash}', '${
    passwordData.salt
  }') `;
  db.all(sql, [user.email_address], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message, success: false });
      return;
    }
    res.json({ success: true, passwordHash: passwordData.passwordHash });
  });
};

//post a new skill
module.exports.postSkill = (req, res) => {
  const fields = ["skill", "users"];
  const skill = {};
  const missingFields = fields.some(field => {
    if (req.body[field] === undefined) {
      res.status(500).json({ error: "Missing credentials", success: false });
      return true;
    }
    skill[field] = req.body[field];
    return false;
  });
  sql = `INSERT INTO Skills VALUES (?, ?) `;
  console.log(sql);
  db.all(sql, [skill.skill, skill.users], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json({ success: true, rows: rows });
  });
};

//post a new profession
module.exports.postProfession = (req, res) => {
  const fields = ["profession", "users"];
  const profession = {};
  const missingFields = fields.some(field => {
    if (req.body[field] === undefined) {
      res.status(500).json({ error: "Missing credentials", success: false });
      return true;
    }
    profession[field] = req.body[field];
    return false;
  });
  sql = `INSERT INTO Profession VALUES (?, ?) `;
  console.log(sql);
  db.all(sql, [profession.profession, profession.users], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json({ success: true, rows: rows });
  });
};

//get all mentors
module.exports.getAllMentors = (req, res) => {
  if (req.query.user_ids !== undefined) {
    const user_ids = JSON.parse(req.query.user_ids)
    const sql = `SELECT * FROM Mentors WHERE user_id IN (${user_ids.join(',')})`;
    db.all(sql, [], (err, rows) => {
      if (err) {
        throw err;
      }
      res.json({ success: true, rows: rows });
    })
  } else {
    sql = `SELECT * FROM Mentors;`;
    db.all(sql, [], (err, rows) => {
      if (err) {
        throw err;
      }
      res.json({ success: true, rows: rows });
    });
  }
};
//get all mentees
module.exports.getAllMentees = (req, res) => {
  sql = `SELECT * FROM Mentees;`;

  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json({ success: true, rows: rows });
  });
};
//get all mentees
module.exports.getAllPasswords = (req, res) => {
  sql = `SELECT * FROM Passwords;`;

  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json({ success: true, rows: rows });
  });
};

//get all skills
module.exports.getAllSkills = (req, res) => {
  sql = `SELECT * FROM Skills`;
  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json({ success: true, rows: rows });
  });
};

//get all skills
module.exports.getAllProfessions = (req, res) => {
  sql = `SELECT * FROM Profession`;
  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json({ success: true, rows: rows });
  });
};

//get user by ID
module.exports.getUserById = (req, res) => {
  console.log("get user by id");
  userID = req.params.id;
  sql = `SELECT * FROM '${userType(userID)}'where user_id = ?;`;
  db.all(sql, [userID], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json({ success: true, rows: rows });
  });
};

module.exports.getEmailById = (req, res) => {
  userID = req.params.id;
  sql = `SELECT email_address FROM '${userType(userID)}'where user_id = ?;`;
  db.all(sql, [userID], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json({ success: true, rows: rows });
  });
};

module.exports.updateEmailById = (req, res) => {
  userID = req.params.id;
  if (req.body["email_address"] === undefined) {
    res.status(500).json({ error: "Missing credentials", success: false });
    return true;
  }
  newEmail = req.body.email_address;

  sql = `UPDATE '${userType(userID)}' SET email_address = ? WHERE user_id = ?`; //starts with 1

  db.all(sql, [newEmail, userID], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json({ success: true, rows: rows });
  });
};

module.exports.getHobbiesById = (req, res) => {
  userID = req.params.id;
  sql = `SELECT hobbies FROM '${userType(userID)}' where user_id = ?;`; //starts with 1

  db.all(sql, [userID], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json({ success: true, rows: rows });
  });
};

module.exports.updateHobbiesById = (req, res) => {
  userID = req.params.id;
  if (req.body["hobbies"] === undefined) {
    res.status(500).json({ error: "Missing credentials", success: false });
    return true;
  }
  hobbies = req.body.hobbies;
  sql = `UPDATE '${userType(userID)}' SET hobbies = ? WHERE user_id = ?`; //starts with 1

  db.all(sql, [hobbies, userID], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json({ success: true, rows: rows });
  });
};

module.exports.getSkillbyId = (req, res) => {
  userID = req.params.id;
  sql = `SELECT skills FROM '${userType(userID)}' where user_id = ?;`;

  db.all(sql, [userID], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json({ success: true, rows: rows });
  });
};

module.exports.getUsersbySkill = (req, res) => {
  skill = req.params.skill;
  sql = `SELECT users FROM Skills WHERE skills = ?`;

  db.all(sql, [skill], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json({ success: true, rows: rows });
  });
};

module.exports.getUsersbyProfession = (req, res) => {
  profession = req.params.profession;
  sql = `SELECT users FROM Profession WHERE profession = ?`;

  db.all(sql, [profession], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json({ success: true, rows: rows });
  });
};

module.exports.getFirstLastById = (req, res) => {
  userId = req.params.id;
  sql = `SELECT first_name,last_name FROM '${userType(
    userId
  )}' WHERE user_id = ?`;

  db.all(sql, [userId], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json({ success: true, rows: rows });
  });
};

//LARGE SKILLS METHODS
module.exports.addSkill = (req, res) => {
  //get input
  userID = req.params.id;
  if (req.body.skill === undefined && req.body.skills === undefined) {
    res.status(500).json({ error: "Missing credentials", success: false });
    return true;
  }
  skill = req.body.skill || req.body.skills;

  //add skill to user table
  sql1 = `SELECT skills FROM ${userType(userID)} WHERE user_id = ?`;
  db.all(sql1, [userID], (err, rows1) => {
    if (err) {
      throw err;
    }
    if (rows1.length == 0) {
      res.status(400).json({ error: "User not found!", success: false });
    }

    skills = rows1[0]["skills"];
    skills = addToString(skills, skill);

    sql2 = `UPDATE '${userType(userID)}' SET skills = ? WHERE user_id = ?`;
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
      sql4 = `INSERT INTO Skills VALUES (?,CAST(? AS int))`;
      db.all(sql4, [skill, parseInt(userID)], (err, rows4) => {
        if (err) {
          throw err;
        }
        res.json({ success: true, rows: "insert users into new skill" });
      });
    } else {
      users = rows3[0]["users"];
      users = addToString(users, userID);

      sql5 = `UPDATE Skills SET users = ? WHERE skills = ?`;
      db.all(sql5, [users, skill], (err, rows5) => {
        if (err) {
          throw err;
        }
        res.json({ success: true, rows: "add user to existed users list" });
      });
    }
  });
};

module.exports.removeSkill = (req, res) => {
  //get input
  userID = req.params.id;
  if (req.body.skill === undefined) {
    res.status(500).json({ error: "Missing credentials", success: false });
  }
  skill = req.body.skill;

  //remove skill to user table
  sql1 = `SELECT skills FROM ${userType(userID)} WHERE user_id = ?`;
  db.all(sql1, [userID], (err, rows1) => {
    if (err) {
      throw err;
    }
    if (rows1.length == 0) {
      res.status(400).json({ error: "User not found!", success: false });
    }

    skills = rows1[0]["skills"];
    skills = removeFromString(skills, skill);

    sql2 = `UPDATE '${userType(userID)}' SET skills = ? WHERE user_id = ?`;
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
      users = rows3[0]["users"];
      users = removeFromString(users, userID);

      sql5 = `UPDATE Skills SET users = ? WHERE skills = ?`;
      db.all(sql5, [users, skill], (err, rows5) => {
        if (err) {
          throw err;
        }
        res.json({ success: true, rows: "remove user successfully" });
      });
    }
  });
};

module.exports.updateSkill = (req, res) => {
  userID = req.params.id;
  sql = `SELECT profile_pic_URL FROM '${userType(userID)}' where user_id = ?;`;

  db.all(sql, [userID], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json({ success: true, rows: rows });
  });
};

module.exports.updateUsersbySkill = (req, res) => {
  skill = req.params.skill;
  if (req.body["users"] === undefined) {
    res.status(500).json({ error: "Missing credentials", success: false });
    return true;
  }
  user_list = req.body.users;
  sql = user_sql_constants.update_users_by_skill(skill, user_list);

  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json({ success: true, rows: rows });
  });
};

module.exports.getProfilePic = (req, res) => {
  const userID = req.params.id;
  const uploadsPath = path.join(__dirname, "../../uploads");
  if (!fs.existsSync(uploadsPath)) {
    fs.mkdirSync(uploadsPath);
  }
  const filepath = path.join(uploadsPath, `${userID}.jpg`);
  res.sendFile(filepath);
};

module.exports.updateProfilePic = (req, res) => {
  userID = req.params.id;
  if (req.body["profile_pic_URL"] === undefined) {
    res.status(500).json({ error: "Missing credentials", success: false });
    return true;
  }
  profile_pic = req.body.profile_pic_URL;
  sql = `UPDATE ${userType(userID)} SET profile_pic_URL = ? WHERE user_id = ?`; //starts with 1
  console.log(sql, profile_pic, userID);

  db.all(sql, [profile_pic, userID], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json({ success: true, rows: rows });
  });
};

module.exports.postProfilePic = (req, res) => {
  res.json(req.file);
};

module.exports.getProfession = (req, res) => {
  userID = req.params.id;
  sql = `SELECT profession FROM '${userType(userID)}' where user_id = ?;`;

  db.all(sql, [userID], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json({ success: true, rows: rows });
  });
};

module.exports.updateProfession = (req, res) => {
  //get input
  userID = req.params.id;
  if (req.body.profession === undefined) {
    res.status(500).json({ error: "Missing credentials", success: false });
  }
  //THIS IS THE NEW PROFESSION VALUE USED
  profession = req.body.profession;

  //get old profession to delete
  sql = `Select profession from '${userType(userID)}' WHERE user_id = ?`;
  db.all(sql, [userID], (err, rows) => {
    if (err) {
      throw err;
    }
    old_profession = rows[0]["profession"];
    //REMOVE A USER FROM A PROFESSION IN A PROFESSION TABLE
    sql3 = `SELECT users FROM Profession WHERE profession = ?`;
    db.all(sql3, [old_profession], (err, rows3) => {
      if (err) {
        throw err;
      }

      console.log("old", old_profession);
      //seing if there was an old profession (there should always be)
      if (rows3.length == 0) {
        res.json({ success: true, rows: "Profession not found !" });
      } else {
        users = rows3[0]["users"];
        users = removeFromString(users, userID);

        sql5 = `UPDATE Profession SET users = ? WHERE profession = ?`;
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
      sql4 = `INSERT INTO Profession VALUES (?,CAST(? AS int))`;
      db.all(sql4, [profession, userID], (err, rows4) => {
        if (err) {
          throw err;
        }
        console.log("new profession added, user attached");
      });
    }
    //profession exists, append the user to list
    else {
      users = rows3[0]["users"];
      users = addToString(users, userID);
      //add the users to the profession
      sql5 = `UPDATE Profession SET users = ? WHERE profession = ?`;
      db.all(sql5, [users, profession], (err, rows5) => {
        if (err) {
          throw err;
        }
        console.log("Appended a user to an existed users list");
      });
    }
  });

  res.json({ success: true });
}; //end of updatedProfession

module.exports.getBio = (req, res) => {
  userID = req.params.id;
  sql = `SELECT biography FROM '${userType(userID)}' where user_id = ?;`;

  db.all(sql, [userID], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json({ success: true, rows: rows });
  });
};

module.exports.updateBio = (req, res) => {
  userID = req.params.id;
  if (req.body["biography"] === undefined) {
    res.status(500).json({ error: "Missing credentials", success: false });
    return true;
  }
  bio = req.body.biography;
  sql = `UPDATE '${userType(userID)}' SET biography = ? WHERE user_id = ?`;

  db.all(sql, [bio, userID], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json({ success: true, rows: rows });
  });
};

module.exports.deleteBio = (req, res) => {
  userID = req.params.id;
  sql = `UPDATE '${userType(userID)}' SET biography = '' WHERE user_id = ?`;

  db.all(sql, [userID], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json({ success: true, rows: rows });
  });
};

module.exports.updateZipcode = (req, res) => {
  userID = req.params.id;
  zip = req.body.zipcode;
  sql = `UPDATE '${userType(userID)}' SET zipcode = ? WHERE user_id = ?`;

  db.all(sql, [zip, userID], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json({ success: true, rows: rows });
  });
};

module.exports.login = (req, res) => {
  const fields = ["email_address", "password"];
  const user = {};
  const missingFields = fields.some(field => {
    if (req.body[field] === undefined) {
      res.status(500).json({ error: "Missing credentials", success: false });
      return true;
    }
    user[field] = req.body[field];
  });

  if (missingFields) {
    return;
  }
  sql1 = `SELECT salt FROM Passwords WHERE email_address= ?;`;
  a = db.all(sql1, [user.email_address], (err, rows1) => {
    if (err) {
      throw err;
    }
    if (rows1.length == 0) {
      res.status(400).json({ error: "Email doesn't exist", success: false });
      return;
    }
    salt = rows1[0]["salt"];
    sql2 = `SELECT * FROM Passwords WHERE email_address=? AND password=?;`;
    db.all(
      sql2,
      [
        user.email_address,
        hp.saltPassword(user.password, salt)["passwordHash"],
      ],
      (err, rows2) => {
        if (err) {
          throw err;
        }
        if (rows2.length == 0) {
          res.status(400).json({ error: "Wrong password", success: false });
          return;
        }
        console.log(rows2[0].email_address);
        sql3 = `SELECT user_id FROM Mentors WHERE email_address=? UNION SELECT user_id FROM Mentees WHERE email_address=?`;
        db.all(sql3, [user.email_address, user.email_address], (err, rows3) => {
          if (err) {
            throw err;
          }
          console.log(rows3);
          res.json({ success: true, rows: rows3 });
        });
      }
    );
  });
};

//MESSAGE API

module.exports.getMessages = (req, res) => {
  sql = `SELECT * FROM Messages;`;
  console.log("here");
  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    console.log(rows);
    res.json({ success: true, rows: rows });
  });
};

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
};

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
};

//controller function to determine if mentee or mentor based on id, returns corresponding table name
function userType(id) {
  while (id > 10) id /= 10;
  if (Math.floor(id) == 1) return "Mentors";
  return "Mentees";
}

function addToString(string, add) {
  array = string.split(",");
  if (array.indexOf(add) == -1) {
    array.push(add);
  }
  return array.join(",");
}

function removeFromString(string, rem) {
  array = string.split(",");
  string = "";
  for (i = 0; i < array.length; i++) {
    if (array[i] == rem) {
      continue;
    }
    string += array[i] + ",";
  }
  if (string.charAt(string.length - 1) == ",") {
    string = string.substring(0, string.length - 1);
  }
  return string;
}

function getFormattedDate() {
  var date = new Date();
  var str =
    date.getFullYear() +
    "-" +
    (date.getMonth() + 1) +
    "-" +
    date.getDate() +
    " " +
    date.getHours() +
    ":" +
    date.getMinutes() +
    ":" +
    date.getSeconds();

  return str;
}

function iid(i){
  res =""
  i = i.toString().split('').reverse().join('');
  chars=['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','A','B','D','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','0','1','2','3','4','5','6','7','8','9']
  while(i >0){
    res+=chars[i%62]
    i=(i-i%62)/62
  }
  return res
}
