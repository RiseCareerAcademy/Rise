const dbPromise = require("../../db");
const sql = require("sql-template-strings");

const ip = require("ip");
const axios = require("axios");
const qs = require("qs");
const date = new Date();

const SQL = require("../../config/user_sql_constants.js");
const hp = require("../../config/helper.js");
const ip_address = ip.address();

//create all tables
module.exports.createTables = async (req, res) => {
  try {
    const db = await dbPromise;
    await Promise.all([
      db.run(SQL.CREATE_MENTOR_TABLE),
      db.run(SQL.CREATE_MENTEE_TABLE),
      db.run(SQL.CREATE_PASSWORD_TABLE),
      db.run(SQL.CREATE_MATCHES_TABLE),
      db.run(SQL.CREATE_MESSAGES_TABLE),
      db.run(SQL.CREATE_SKILLS_TABLE),
      db.run(SQL.CREATE_PROFESSIONS_TABLE)
    ]);
    res.json({ success: true, rows: "all tables created" });
  } catch (e) {
    console.error(e.message);
    res.json({ success: false, error: e.message });
  }
};

//drop table
module.exports.deletetable = async (req, res) => {
  const dropMentorsTableSql = sql`DROP TABLE IF EXISTS Mentors;`;
  const dropMenteesTableSql = sql`DROP TABLE IF EXISTS Mentees;`;
  const dropPasswordsTableSql = sql`DROP TABLE IF EXISTS Passwords;`;
  const dropMatchesTableSql = sql`DROP TABLE IF EXISTS Matches;`;
  const dropMessagesTableSql = sql`DROP TABLE IF EXISTS Messages;`;
  const dropSkillsTableSql = sql`DROP TABLE IF EXISTS Skills;`;
  const dropProfessionTableSql = sql`DROP TABLE IF EXISTS Profession;`;

  try {
    const db = await dbPromise;
    await Promise.all([
      db.run(dropMentorsTableSql),
      db.run(dropMenteesTableSql),
      db.run(dropPasswordsTableSql),
      db.run(dropMatchesTableSql),
      db.run(dropMessagesTableSql),
      db.run(dropSkillsTableSql),
      db.run(dropProfessionTableSql)
    ]);
    res.json({ success: true, rows: "delete all tables" });
  } catch (e) {
    console.error(e.message);
    res.json({ success: false, error: e.message });
  }
};

//create new mentor
module.exports.linkedin = async (req, res) => {
  const requestBody = {
    grant_type: "authorization_code",
    code: req.body.code,
    redirect_uri: req.body.redirect_uri,
    client_id: process.env.LINKEDIN_CLIENT_ID,
    client_secret: process.env.LINKEDIN_CLIENT_SECRET
  };
  try {
    const response = await axios.post(
      "https://www.linkedin.com/oauth/v2/accessToken",
      qs.stringify(requestBody)
    );
    const {
      data: { access_token }
    } = response;
    const config = {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
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
      "email-address"
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
      summary: biography
    } = data;
    const profile_pic_URL = pictureUrls.values[0];
    const result = {
      email_address,
      first_name,
      profession,
      last_name,
      biography,
      profile_pic_URL
    };
    res.json({ success: true, fields: result });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};

//create new mentor
module.exports.postMentor = async (req, res) => {
  const fields = [
    "first_name",
    "last_name",
    "email_address",
    "biography",
    "zipcode",
    "date_of_birth",
    "profession",
    "skills",
    "hobbies"
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

  try {
    const db = await dbPromise;
    const getMentorsByEmailSql = sql`Select * from Mentors where email_address = ${user.email_address}`;
    const emailRows = await db.all(getMentorsByEmailSql);
    //post mentor
    if (emailRows.length != 0) {
      res.json({ success: false, rows: "Email is not unique" });
      return false;
    }

    user.user_id = parseInt(10000000000000 + date.getTime());
    user.profile_pic_URL = `http://${ip_address}:8000/user/${user.user_id}/profilepic`;
    const insertMentorSql = sql`INSERT INTO Mentors VALUES (
        ${user.user_id},
         ${user.first_name} ,
         ${user.last_name},
         ${user.email_address},
         ${user.biography},
         ${user.zipcode},
         ${user.date_of_birth},
         ${user.profession},
         ${user.skills},
         ${user.profile_pic_URL},
         ${user.hobbies}
      )`;
    db.run(insertMentorSql);

    // //add user ID to skills table
    // const skills = user.skills.split(",");
    // await Promise.all([
    //   ...skills.map(async skill => {
    //     const getUsersBySkillSql = sql`SELECT users FROM Skills WHERE skills = '${skill}'`;
    //     const usersWithSkillObject = db.get(getUsersBySkillSql);

    //     if (usersWithSkillObject === undefined) {
    //       const insertSkillSql = sql`INSERT INTO Skills VALUES (${skill}, ${parseInt(user.user_id)})`;
    //       await db.run(insertSkillSql);
    //     } else {
    //       let { users: usersWithSkill } = usersWithSkillObject;
    //       usersWithSkill = addToString(usersWithSkill, user.user_id);
    //       const updateSkillSql = sql`UPDATE Skills SET users = ${usersWithSkill} WHERE skills = ${skill}`;
    //       await db.run(updateSkillSql);
    //     }
    //   }),
    //   async () => {
    //     const selectUsersByProfessionSql = sql`SELECT users FROM Profession WHERE profession = ${
    //       user.profession
    //     }`;
    //     const usersWithProfessionObject = db.get(selectUsersByProfessionSql);

    //     if (usersWithProfessionObject === undefined) {
    //       const insertProfessionSql = sql`INSERT INTO Profession VALUES (${
    //         user.profession
    //       }, ${user.user_id})`;
    //       await db.run(insertProfessionSql);
    //     } else {
    //       let { users: usersWithProfession } = usersWithProfessionObject;
    //       usersWithProfession = addToString(usersWithProfession, user.user_id);
    //       const updateProfessionSql = sql`UPDATE Profession SET users = ${usersWithProfession} WHERE profession = ${user.profile_pic_URL}`;
    //       await db.run(updateProfessionSql);
    //     }
    //   }
    // ]);

    res.json({ success: true, mentor: user });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};

//create new mentee
module.exports.postMentee = async (req, res) => {
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

  try {
    const db = await dbPromise;
    const sql_email = sql`select * from Mentees where email_address = ${user.email_address}`;
    const usersWithEmailObject = await db.get(sql_email);

      if (usersWithEmailObject !== undefined) {
        res.json({ success: false, rows: "Email is not unique" });
        return;
      }
      user.user_id = parseInt(20000000000000 + date.getTime());
      user.profile_pic_URL = `http://${ip_address}:8000/user/${user.user_id}/profilepic`;

      const insertMenteeSql = sql`INSERT INTO Mentees VALUES (
        ${user.user_id},
        ${user.first_name},
        ${user.last_name},
        ${user.email_address},
        ${user.biography},
        ${user.zipcode},
        ${user.date_of_birth},
        ${user.profession},
        ${user.skills},
        ${user.profile_pic_URL},
        ${user.hobbies}
      ) `;
      await db.run(insertMenteeSql);

      // //add user ID to skills table
      // skill = user.skills;
      // sql3 = `SELECT users FROM Skills WHERE skills = ?`;
      // db.all(sql3, [skill], (err, rows3) => {
      //   if (err) {
      //     throw err;
      //   }
      //   if (rows3.length == 0) {
      //     sql4 = `INSERT INTO Skills VALUES (?,CAST(? AS int))`;
      //     db.all(sql4, [skill, parseInt(userID)], (err, rows4) => {
      //       if (err) {
      //         throw err;
      //       }
      //       console.log("insert users into new skill");
      //     });
      //   } else {
      //     users = rows3[0]["users"];
      //     users = addToString(users, userID);

      //     sql5 = `UPDATE Skills SET users = ? WHERE skills = ?`;
      //     db.all(sql5, [users, skill], (err, rows5) => {
      //       if (err) {
      //         throw err;
      //       }
      //       console.log("add user to existed users list");
      //     });
      //   }
      // });

      // //add user ID to profession table
      // profession = user.profession;
      // console.log(profession, userID);
      // sql3 = `SELECT users FROM Profession WHERE profession = ?`;
      // db.all(sql3, [profession], (err, rows3) => {
      //   if (err) {
      //     throw err;
      //   }
      //   //this means profession doesnt exist
      //   if (rows3.length == 0) {
      //     sql4 = `INSERT INTO Profession VALUES (?,CAST(? AS int))`;
      //     db.all(sql4, [profession, userID], (err, rows4) => {
      //       if (err) {
      //         throw err;
      //       }
      //       console.log("new profession added, user attached");
      //     });
      //   }
      //   //profession exists, append the user to list
      //   else {
      //     users = rows3[0]["users"];
      //     users = addToString(users, userID);
      //     //add the users to the profession
      //     sql5 = `UPDATE Profession SET users = ? WHERE profession = ?`;
      //     db.all(sql5, [users, profession], (err, rows5) => {
      //       if (err) {
      //         throw err;
      //       }
      //       console.log("Appended a user to an existed users list");
      //     });
      //   }
      // });

      res.json({ success: true, mentee: user });
    
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};

//create a new message
module.exports.postMessage = async (req, res) => {
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

  try {
    const db = await dbPromise;
    const insertMessageSql = sql`INSERT INTO Messages VALUES (
      '${date.getTime()}',
      ${user.match_id},
      ${user.to_id},
      ${user.from_id},
      ${user.message_body},
      ${getFormattedDate()}
    )`;
    await db.run(insertMessageSql);
    res.json({ success: true });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};

//create new password (SQL INJ.)
module.exports.postPassword = async (req, res) => {
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

  try {
    const db = await dbPromise;
    const getMentorsByEmailSql = sql`Select * from Mentors where email_address = ${user.email_address}`;
    const mentorsWithEmailObject = await db.get(getMentorsByEmailSql);
    if (mentorsWithEmailObject !== undefined) {
      res.json({ success: false, rows: "Email already exists" });
      return;
    }
  
    const salt = hp.genRandomString(16);
    const passwordData = hp.saltPassword(user.password, salt);
  
    const insertPasswordSql = sql`INSERT INTO Passwords VALUES (
      ${user.email_address},
      '${passwordData.passwordHash}', 
      '${passwordData.salt}'
    ) `;
  
    await db.run(insertPasswordSql);
    res.json({ success: true, passwordHash: passwordData.passwordHash });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};

//post a new profession
module.exports.postProfession = async (req, res) => {
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

  if (missingFields) {
    return;
  }

  try {
    const db = await dbPromise;
    const insertProfessionSql = sql`INSERT INTO Profession VALUES (${profession.profession}, ${profession.users}) `;
    await db.run(insertProfessionSql);
    res.json({ success: true });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};

//get all mentors
module.exports.getAllMentors = async (req, res) => {
  try {
    const db = await dbPromise;
    if (req.query.user_ids !== undefined) {
      // Get Specific User Ids
      const user_ids = JSON.parse(req.query.user_ids);
      const getMentorsByUserIdSql = sql`SELECT * FROM Mentors WHERE user_id IN (${user_ids.join(',')})`;
      const mentorRows = await db.all(getMentorsByUserIdSql);
      res.json({ success: true, rows: mentorRows });
    } else {
      const getAllMentorsSql = `SELECT * FROM Mentors;`;
      const mentorRows = await db.all(getAllMentorsSql);
      res.json({ success: true, rows: mentorRows });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};

//get all mentees
module.exports.getAllMentees = async (req, res) => {
  try {
    const db = await dbPromise;
    const getAllMenteesSql = sql`SELECT * FROM Mentees;`;
    const menteeRows = await db.all(getAllMenteesSql);
    res.json({ success: true, rows: menteeRows });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};

//get all mentees
module.exports.getAllPasswords = async (req, res) => {
  try {
    const db = await dbPromise;
    const getAllPasswordsSql = sql`SELECT * FROM Passwords;`;
    const passwordRows = await db.all(getAllPasswordsSql);
    res.json({ success: true, rows: passwordRows });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};

//get all skills
module.exports.getAllSkills = async (req, res) => {
  try {
    const db = await dbPromise;
    const getAllSkillsSql = sql`SELECT * FROM Skills`;
    const skillRows = await db.all(getAllSkillsSql)
    res.json({ success: true, rows: skillRows });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};

//get all skills
module.exports.getAllProfessions = async (req, res) => {
  try {
    const db = await dbPromise;
    const getAllProfessionsSql = sql`SELECT * FROM Profession`;
    const professionRows = db.all(getAllProfessionsSql);
    res.json({ success: true, rows: professionRows });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};

//get user by ID
module.exports.getUserById = async (req, res) => {
  try {
    const db = await dbPromise;
    const userID = req.params.id;
    const getAllUsersSql = sql`SELECT * FROM '${userType(userID)}'where user_id = ${userID};`;
    const userRows = await db.all(getAllUsersSql);
    res.json({ success: true, rows: userRows });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports.getEmailById = async (req, res) => {
  try {
    const db = await dbPromise;
    const userID = req.params.id;
    const getAllUsersEmailSql = sql`SELECT email_address FROM '${userType(userID)}'where user_id = ${userID};`;
    const emailRows = await db.all(getAllUsersEmailSql)
    res.json({ success: true, rows: emailRows });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports.updateEmailById = async (req, res) => {
  const userID = req.params.id;
  const newEmail = req.body.email_address;
  if (newEmail === undefined) {
    res.status(500).json({ error: "Missing credentials", success: false });
    return;
  }
  try {
    const db = await dbPromise;
    const updateEmailSql = sql`UPDATE '${userType(userID)}' SET email_address = ${newEmail} WHERE user_id = ${userID}`; //starts with 1
    await db.run(updateEmailSql)
    res.json({ success: true });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports.getHobbiesById = async (req, res) => {
  try {
    const db = await dbPromise;
    const userID = req.params.id;
    const getEmailSql = sql`SELECT hobbies FROM '${userType(userID)}' where user_id = ${userID};`; //starts with 1
    const hobbyRows = await db.all(getEmailSql)
    res.json({ success: true, rows: hobbyRows });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports.updateHobbiesById = async (req, res) => {
  const userID = req.params.id;
  const hobbies = req.body.hobbies;

  if (hobbies === undefined) {
    res.status(500).json({ error: "Missing credentials", success: false });
    return;
  }

  try {
    const db = await dbPromise;
    const updateHobbiesSql = sql`UPDATE '${userType(userID)}' SET hobbies = ${hobbies} WHERE user_id = ${userID}`; //starts with 1
    const hobbieRows = await db.all(updateHobbiesSql);
    res.json({ success: true, rows: hobbieRows });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports.getSkillbyId = async (req, res) => {
  const userID = req.params.id;
  try {
    const db = await dbPromise;
    const getSkillsSql = sql`SELECT skills FROM '${userType(userID)}' where user_id = ${userID};`;
    const skillRows = await db.all(getSkillsSql);
    res.json({ success: true, rows: skillRows });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports.getUsersbySkill = async (req, res) => {
  const skill = req.params.skill;

  try {
    const db = await dbPromise;
    const getUsersBySkillSql = sql`SELECT users FROM Skills WHERE skills = ${skill}`;
    const userRows = await db.all(getUsersBySkillSql);
    res.json({ success: true, rows: userRows });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports.getUsersbyProfession = async (req, res) => {
  const profession = req.params.profession;

  try {
    const db = await dbPromise;
    const getUserByProfessionSql = sql`SELECT users FROM Profession WHERE profession = ${profession}`;
  
    const professionRows = await db.all(getUserByProfessionSql);
    res.json({ success: true, rows: professionRows });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports.getFirstLastById = async (req, res) => {
  const userId = req.params.id;

  try {
    const db = await dbPromise;
    const getFirstLastSql = sql`SELECT first_name,last_name FROM '${userType(userId)}' WHERE user_id = ${userId}`;
    const firstLastRows = await db.all(getFirstLastSql)
    res.json({ success: true, rows: firstLastRows });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};

//LARGE SKILLS METHODS
module.exports.addSkill = async (req, res) => {
  //get input
  const userID = req.params.id;
  if (req.body.skill === undefined && req.body.skills === undefined) {
    res.status(500).json({ error: "Missing credentials", success: false });
    return;
  }
  const skill = req.body.skill || req.body.skills;

  try {
    const db = await dbPromise;
    //add skill to user table
    const getSkillsSql = sql`SELECT skills FROM ${userType(userID)} WHERE user_id = ${userID}`;
    const userSkillsObject = await db.get(getSkillsSql);
    if (userSkillsObject === undefined) {
      res.status(400).json({ error: "User not found!", success: false });
      return;
    }
    let skills = userSkillsObject.skills;
    skills = addToString(skills, skill);
    const updateSkillsSql = sql`UPDATE '${userType(userID)}' SET skills = ${skills} WHERE user_id = ${userID}`;
    await db.run(updateSkillsSql);


    //add user to skills table
    const getUsersBySkillSql = sql`SELECT users FROM Skills WHERE skills = ${skill}`;
    const usersSkillsObject = await db.get(getUsersBySkillSql);
    if (usersSkillsObject== undefined) {
      const insertSkillsSql  = sql`INSERT INTO Skills VALUES (${skill},CAST(${parseInt(userID)} AS int))`;
      await db.run(insertSkillsSql);
      res.json({ success: true, rows: "insert users into new skill" });
    } else {
      let users = usersSkillsObject.users;
      users = addToString(users, userID);
      const updateSkillsSql = `UPDATE Skills SET users = ${users} WHERE skills = ${skill}`;
      await db.run(updateSkillsSql);
      res.json({ success: true });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports.removeSkill = async(req, res) => {
  //get input
  const userID = req.params.id;
  if (req.body.skill === undefined  && req.body.skills === undefined) {
    res.status(500).json({ error: "Missing credentials", success: false });
  }
  const skill = req.body.skill || req.body.skill ;

  try{
    const db = await dbPromise;
    //remove skill from user table
    const getSkillSql = sql`SELECT skills FROM ${userType(userID)} WHERE user_id = ${userID}`
    let skills = await db.get(getSkillSql)
    if(skills.length==0){
      res.status(400).json({ error: "User not found!", success: false });
    }
    skills = removeFromString(skills, skill);
    const removeSkillSql = `UPDATE '${userType(userID)}' SET skills = ? WHERE user_id = ${userID}`;
    await db.run(removeSkillSql);

      //remove user to skill table
    const getUsersSql = `SELECT users FROM Skills WHERE skills = ${skill}`
    let users = await db.get(getUsersSql);
    if(users.length==0){
      res.status(400).json({ error: "Skill not found!", success: false });
    }
    users = removeFromString(users, userID);
    const removeUserSql =  `UPDATE Skills SET users = ${userID} WHERE skills = ${skill}`;
    await db.run(removeUserSql);
    res.json({ success: true });
  }catch(error){
    res.status(500).json({ success: false, error: error.message });
  }
 
};

// module.exports.updateSkill = (req, res) => {
//   userID = req.params.id;
//   sql = `SELECT profile_pic_URL FROM '${userType(userID)}' where user_id = ?;`;

//   db.all(sql, [userID], (err, rows) => {
//     if (err) {
//       throw err;
//     }
//     res.json({ success: true, rows: rows });
//   });
// };

// module.exports.updateUsersbySkill = (req, res) => {
//   skill = req.params.skill;
//   if (req.body["users"] === undefined) {
//     res.status(500).json({ error: "Missing credentials", success: false });
//     return true;
//   }
//   user_list = req.body.users;
//   sql = user_sql_constants.update_users_by_skill(skill, user_list);

//   db.all(sql, [], (err, rows) => {
//     if (err) {
//       throw err;
//     }
//     res.json({ success: true, rows: rows });
//   });
// };

// module.exports.getProfilePic = (req, res) => {
//   const userID = req.params.id;
//   const uploadsPath = path.join(__dirname, "../../uploads");
//   if (!fs.existsSync(uploadsPath)) {
//     fs.mkdirSync(uploadsPath);
//   }
//   const filepath = path.join(uploadsPath, `${userID}.jpg`);
//   res.sendFile(filepath);
// };

// module.exports.updateProfilePic = (req, res) => {
//   userID = req.params.id;
//   if (req.body["profile_pic_URL"] === undefined) {
//     res.status(500).json({ error: "Missing credentials", success: false });
//     return true;
//   }
//   profile_pic = req.body.profile_pic_URL;
//   sql = `UPDATE ${userType(userID)} SET profile_pic_URL = ? WHERE user_id = ?`; //starts with 1
//   console.log(sql, profile_pic, userID);

//   db.all(sql, [profile_pic, userID], (err, rows) => {
//     if (err) {
//       throw err;
//     }
//     res.json({ success: true, rows: rows });
//   });
// };

// module.exports.postProfilePic = (req, res) => {
//   res.json(req.file);
// };

// module.exports.getProfession = (req, res) => {
//   userID = req.params.id;
//   sql = `SELECT profession FROM '${userType(userID)}' where user_id = ?;`;

//   db.all(sql, [userID], (err, rows) => {
//     if (err) {
//       throw err;
//     }
//     res.json({ success: true, rows: rows });
//   });
// };

// module.exports.updateProfession = (req, res) => {
//   //get input
//   userID = req.params.id;
//   if (req.body.profession === undefined) {
//     res.status(500).json({ error: "Missing credentials", success: false });
//   }
//   //THIS IS THE NEW PROFESSION VALUE USED
//   profession = req.body.profession;

//   //get old profession to delete
//   sql = `Select profession from '${userType(userID)}' WHERE user_id = ?`;
//   db.all(sql, [userID], (err, rows) => {
//     if (err) {
//       throw err;
//     }
//     old_profession = rows[0]["profession"];
//     //REMOVE A USER FROM A PROFESSION IN A PROFESSION TABLE
//     sql3 = `SELECT users FROM Profession WHERE profession = ?`;
//     db.all(sql3, [old_profession], (err, rows3) => {
//       if (err) {
//         throw err;
//       }

//       console.log("old", old_profession);
//       //seing if there was an old profession (there should always be)
//       if (rows3.length == 0) {
//         res.json({ success: true, rows: "Profession not found !" });
//       } else {
//         users = rows3[0]["users"];
//         users = removeFromString(users, userID);

//         sql5 = `UPDATE Profession SET users = ? WHERE profession = ?`;
//         db.all(sql5, [users, old_profession], (err, rows5) => {
//           if (err) {
//             throw err;
//           }
//           console.log("remove user successfully from old profession");
//         });
//       }
//     });
//   });

//   //updates profession in a user table (works)
//   sql1 = `UPDATE '${userType(userID)}' SET profession = ? WHERE user_id = ?`;
//   db.all(sql1, [profession, userID], (err, rows1) => {
//     if (err) {
//       throw err;
//     }
//   });

//   //ADD A USER TO A PROFESSSION IN PROFESSION TABLE (DONE)
//   sql3 = `SELECT users FROM Profession WHERE profession = ?`;
//   db.all(sql3, [profession], (err, rows3) => {
//     if (err) {
//       throw err;
//     }
//     //this means profession doesnt exist
//     if (rows3.length == 0) {
//       sql4 = `INSERT INTO Profession VALUES (?,CAST(? AS int))`;
//       db.all(sql4, [profession, userID], (err, rows4) => {
//         if (err) {
//           throw err;
//         }
//         console.log("new profession added, user attached");
//       });
//     }
//     //profession exists, append the user to list
//     else {
//       users = rows3[0]["users"];
//       users = addToString(users, userID);
//       //add the users to the profession
//       sql5 = `UPDATE Profession SET users = ? WHERE profession = ?`;
//       db.all(sql5, [users, profession], (err, rows5) => {
//         if (err) {
//           throw err;
//         }
//         console.log("Appended a user to an existed users list");
//       });
//     }
//   });

//   res.json({ success: true });
// }; //end of updatedProfession

// module.exports.getBio = (req, res) => {
//   userID = req.params.id;
//   sql = `SELECT biography FROM '${userType(userID)}' where user_id = ?;`;

//   db.all(sql, [userID], (err, rows) => {
//     if (err) {
//       throw err;
//     }
//     res.json({ success: true, rows: rows });
//   });
// };

// module.exports.updateBio = (req, res) => {
//   userID = req.params.id;
//   if (req.body["biography"] === undefined) {
//     res.status(500).json({ error: "Missing credentials", success: false });
//     return true;
//   }
//   bio = req.body.biography;
//   sql = `UPDATE '${userType(userID)}' SET biography = ? WHERE user_id = ?`;

//   db.all(sql, [bio, userID], (err, rows) => {
//     if (err) {
//       throw err;
//     }
//     res.json({ success: true, rows: rows });
//   });
// };

// module.exports.deleteBio = (req, res) => {
//   userID = req.params.id;
//   sql = `UPDATE '${userType(userID)}' SET biography = '' WHERE user_id = ?`;

//   db.all(sql, [userID], (err, rows) => {
//     if (err) {
//       throw err;
//     }
//     res.json({ success: true, rows: rows });
//   });
// };

// module.exports.updateZipcode = (req, res) => {
//   userID = req.params.id;
//   zip = req.body.zipcode;
//   sql = `UPDATE '${userType(userID)}' SET zipcode = ? WHERE user_id = ?`;

//   db.all(sql, [zip, userID], (err, rows) => {
//     if (err) {
//       throw err;
//     }
//     res.json({ success: true, rows: rows });
//   });
// };

// module.exports.login = (req, res) => {
//   const fields = ["email_address", "password"];
//   const user = {};
//   const missingFields = fields.some(field => {
//     if (req.body[field] === undefined) {
//       res.status(500).json({ error: "Missing credentials", success: false });
//       return true;
//     }
//     user[field] = req.body[field];
//   });

//   if (missingFields) {
//     return;
//   }
//   sql1 = `SELECT salt FROM Passwords WHERE email_address= ?;`;
//   a = db.all(sql1, [user.email_address], (err, rows1) => {
//     if (err) {
//       throw err;
//     }
//     if (rows1.length == 0) {
//       res.status(400).json({ error: "Email doesn't exist", success: false });
//       return;
//     }
//     salt = rows1[0]["salt"];
//     sql2 = `SELECT * FROM Passwords WHERE email_address=? AND password=?;`;
//     db.all(
//       sql2,
//       [
//         user.email_address,
//         hp.saltPassword(user.password, salt)["passwordHash"]
//       ],
//       (err, rows2) => {
//         if (err) {
//           throw err;
//         }
//         if (rows2.length == 0) {
//           res.status(400).json({ error: "Wrong password", success: false });
//           return;
//         }
//         console.log(rows2[0].email_address);
//         sql3 = `SELECT user_id FROM Mentors WHERE email_address=? UNION SELECT user_id FROM Mentees WHERE email_address=?`;
//         db.all(sql3, [user.email_address, user.email_address], (err, rows3) => {
//           if (err) {
//             throw err;
//           }
//           console.log(rows3);
//           res.json({ success: true, rows: rows3 });
//         });
//       }
//     );
//   });
// };

// //MESSAGE API

// module.exports.getMessages = (req, res) => {
//   sql = `SELECT * FROM Messages;`;
//   console.log("here");
//   db.all(sql, [], (err, rows) => {
//     if (err) {
//       throw err;
//     }
//     console.log(rows);
//     res.json({ success: true, rows: rows });
//   });
// };

// //get latest message by match id
// module.exports.getLatestMessageById = (req, res) => {
//   matchId = req.params.matchid;
//   sql = `SELECT * FROM Messages WHERE match_id = ? order by message_id LIMIT 1;`;
//   db.all(sql, [matchId], (err, rows) => {
//     if (err) {
//       throw err;
//     }
//     res.json({ success: true, rows: rows });
//   });
// };

// //get message chain  by match id
// module.exports.getMessageChain = (req, res) => {
//   matchId = req.params.matchid;
//   sql = `SELECT * FROM Messages WHERE match_id = ? order by message_id;`;

//   db.all(sql, [matchId], (err, rows) => {
//     if (err) {
//       throw err;
//     }
//     res.json({ success: true, rows: rows });
//   });
// };

//controller function to determine if mentee or mentor based on id, returns corresponding table name
function userType(id) {
  if (id[0] == '1') 
    return "Mentors";
  return "Mentees";
}

function addToString(string, add) {
  const array = string.split(",");
  if (array.indexOf(add) == -1) {
    array.push(add);
  }
  return array.join(",");
}

function removeFromString(string, rem) {
  const array = string.split(",");
  string = "";
  for (let i = 0; i < array.length; i++) {
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
