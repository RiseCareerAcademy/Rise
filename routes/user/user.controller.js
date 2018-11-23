const path = require("path");
const fs = require("fs");
const { Expo } = require('expo-server-sdk');
const dbPromise = require("../../db");
const sql = require("sql-template-strings");

const ip = require("ip");
const axios = require("axios");
const qs = require("qs");

const SQL = require("../../config/user_sql_constants.js");
const hp = require("../../config/helper.js");
const ip_address = ip.address();

//create all tables
module.exports.createTables = async (req, res) => {
  try {
    const db = await dbPromise;
    await Promise.all([
      db.run(SQL.CREATE_USERS_TABLE),
      db.run(SQL.CREATE_PASSWORD_TABLE),
      db.run(SQL.CREATE_MATCHES_TABLE),
      db.run(SQL.CREATE_MESSAGES_TABLE),
      db.run(SQL.CREATE_SKILLS_TABLE),
      db.run(SQL.CREATE_PROFESSIONS_TABLE),
    ]);
    res.json({ success: true, rows: "all tables created" });
  } catch (e) {
    console.error(e.message);
    res.json({ success: false, error: e.message });
  }
};

//drop table
module.exports.resetTable = async (req, res) => {
  const dropUsersTableSql = sql`DROP TABLE IF EXISTS Users;`;
  const dropPasswordsTableSql = sql`DROP TABLE IF EXISTS Passwords;`;
  const dropMatchesTableSql = sql`DROP TABLE IF EXISTS Matches;`;
  const dropMessagesTableSql = sql`DROP TABLE IF EXISTS Messages;`;
  const dropSkillsTableSql = sql`DROP TABLE IF EXISTS Skills;`;
  const dropProfessionTableSql = sql`DROP TABLE IF EXISTS Profession;`;

  try {
    const db = await dbPromise;
    await Promise.all([
      db.run(dropUsersTableSql),
      db.run(dropPasswordsTableSql),
      db.run(dropMatchesTableSql),
      db.run(dropMessagesTableSql),
      db.run(dropSkillsTableSql),
      db.run(dropProfessionTableSql),
    ]);

    await Promise.all([
      db.run(SQL.CREATE_USERS_TABLE),
      db.run(SQL.CREATE_PASSWORD_TABLE),
      db.run(SQL.CREATE_MATCHES_TABLE),
      db.run(SQL.CREATE_MESSAGES_TABLE),
      db.run(SQL.CREATE_SKILLS_TABLE),
      db.run(SQL.CREATE_PROFESSIONS_TABLE),
    ]);

    res.json({ success: true, rows: "reset all tables" });
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
    client_secret: process.env.LINKEDIN_CLIENT_SECRET,
  };
  try {
    const response = await axios.post(
      "https://www.linkedin.com/oauth/v2/accessToken",
      qs.stringify(requestBody)
    );
    const {
      data: { access_token },
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

  try {
    const db = await dbPromise;
    const getMentorsByEmailSql = sql`Select * from Users WHERE email_address = ${user.email_address}`;
    const emailRows = await db.all(getMentorsByEmailSql);
    //post mentor
    if (emailRows.length != 0) {
      res.json({ success: false, rows: "Email is not unique" });
      return false;
    }
    const date = new Date();
    user.user_id = "1" + iid(date.getTime());
    user.profile_pic_URL = `http://${ip_address}:8000/user/${user.user_id}/profilepic`;
    const insertMentorsSql = sql`INSERT INTO Users VALUES (
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
         ${user.hobbies},
         1
      )`;
    await db.run(insertMentorsSql);


    let skills = user.skills.split(",");
    for (let i in skills) {
      const skill = skills[i]
      const getUsersBySkillSql = sql`SELECT users FROM Skills WHERE skills = ${skill}`;
      const usersWithSkillObject = await db.all(getUsersBySkillSql);
      if (usersWithSkillObject === undefined || usersWithSkillObject.length == 0) {
        const insertSkillSql = sql`INSERT INTO Skills VALUES (${skill}, ${user.user_id})`;
        await db.run(insertSkillSql);
      } else {
        let usersWithSkill = usersWithSkillObject[0]["users"];
        usersWithSkill = addToString(usersWithSkill, user.user_id);
        const updateSkillSql = sql`UPDATE Skills SET users = ${usersWithSkillObject} WHERE skills = ${skill}`;
        await db.run(updateSkillSql);
      }
    }
    const selectUsersByProfessionSql = sql`SELECT users FROM Profession WHERE profession =
          ${user.profession}`;
    const usersWithProfessionObject = await db.get(selectUsersByProfessionSql);

    if (usersWithProfessionObject === undefined) {
      const insertProfessionSql = sql`INSERT INTO Profession VALUES (${
        user.profession
        }, ${user.user_id})`;
      await db.run(insertProfessionSql);
    } else {
      let { users: usersWithProfession } = usersWithProfessionObject;
      usersWithProfession = addToString(usersWithProfession, user.user_id);
      const updateProfessionSql = sql`UPDATE Profession SET users = ${usersWithProfession} WHERE profession = ${user.profession}`;
      await db.run(updateProfessionSql);
    }

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
    const sql_email = sql`select * from Users where email_address = ${user.email_address}`;
    const usersWithEmailObject = await db.get(sql_email);

    if (usersWithEmailObject !== undefined) {
      res.json({ success: false, rows: "Email is not unique" });
      return;
    }
    user.skills = user.skills || '';
    user.profession = user.profession || '';
    const date = new Date();
    user.user_id = "2" + iid(date.getTime());
    console.log(user.user_id)
    user.profile_pic_URL = `http://${ip_address}:8000/user/${user.user_id}/profilepic`;

    const insertMenteeSql = sql`INSERT INTO Users VALUES (
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
        ${user.hobbies},
        0
      ) `;
    await db.run(insertMenteeSql);

    let skills = user.skills.split(",");
    for (let i in skills) {
      const skill = skills[i]
      const getUsersBySkillSql = sql`SELECT users FROM Skills WHERE skills = ${skill}`;
      const usersWithSkillObject = await db.all(getUsersBySkillSql);
      if (usersWithSkillObject === undefined || usersWithSkillObject.length == 0) {
        const insertSkillSql = sql`INSERT INTO Skills VALUES (${skill}, ${user.user_id})`;
        await db.run(insertSkillSql);
      } else {
        let usersWithSkill = usersWithSkillObject[0]["users"];
        usersWithSkill = addToString(usersWithSkill, user.user_id);
        const updateSkillSql = sql`UPDATE Skills SET users = ${usersWithSkillObject} WHERE skills = ${skill}`;
        await db.run(updateSkillSql);
      }
    }
    const selectUsersByProfessionSql = sql`SELECT users FROM Profession WHERE profession =
          ${user.profession}`;
    const usersWithProfessionObject = await db.get(selectUsersByProfessionSql);

    if (usersWithProfessionObject === undefined) {
      const insertProfessionSql = sql`INSERT INTO Profession VALUES (${
        user.profession
        }, ${user.user_id})`;
      await db.run(insertProfessionSql);
    } else {
      let { users: usersWithProfession } = usersWithProfessionObject;
      usersWithProfession = addToString(usersWithProfession, user.user_id);
      const updateProfessionSql = sql`UPDATE Profession SET users = ${usersWithProfession} WHERE profession = ${user.profession}`;
      await db.run(updateProfessionSql);
    }

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
  fields.some(field => {
    if (req.body[field] === undefined) {
      res.status(500).json({ error: "Missing credentials", success: false });
      return true;
    }
    user[field] = req.body[field];
    return false;
  });
  const date = new Date();
  try {
    const db = await dbPromise;
    const insertMessageSql = sql`INSERT INTO Messages VALUES (
      ${iid(date)},
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

module.exports.registerPushToken = (req, res) => {
  const { pushToken } = req.body;
  if (pushToken === undefined) {
    res.status(500).json({ error: "Missing credentials", success: false });
    return;
  }
  const pushTokens = [pushToken];
  // Create a new Expo SDK client
  const expo = new Expo();

  // Create the messages that you want to send to clents
  const messages = [];
  pushTokens.forEach( pushToken => {
    // Each push token looks like ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]

    // Check that all your push tokens appear to be valid Expo push tokens
    if (!Expo.isExpoPushToken(pushToken)) {
      console.error(`Push token ${pushToken} is not a valid Expo push token`);
    } else {
      // Construct a message (see https://docs.expo.io/versions/latest/guides/push-notifications.html)
      messages.push({
        to: pushToken,
        sound: 'default',
        body: 'This is a test notification',
        data: { withSome: 'data' },
      })
    }

  });

  // The Expo push notification service accepts batches of notifications so
  // that you don't need to send 1000 requests to send 1000 notifications. We
  // recommend you batch your notifications to reduce the number of requests
  // and to compress them (notifications with similar content will get
  // compressed).
  const chunks = expo.chunkPushNotifications(messages);
  const tickets = [];
  (async () => {
    // Send the chunks to the Expo push notification service. There are
    // different strategies you could use. A simple one is to send one chunk at a
    // time, which nicely spreads the load out over time:
    for (let chunk of chunks) {
      try {
        let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
        console.log(ticketChunk);
        tickets.push(...ticketChunk);
        // NOTE: If a ticket contains an error code in ticket.details.error, you
        // must handle it appropriately. The error codes are listed in the Expo
        // documentation:
        // https://docs.expo.io/versions/latest/guides/push-notifications#response-format
      } catch (error) {
        console.error(error);
      }
    }
  })();




    // Later, after the Expo push notification service has delivered the
    // notifications to Apple or Google (usually quickly, but allow the the service
    // up to 30 minutes when under load), a "receipt" for each notification is
    // created. The receipts will be available for at least a day; stale receipts
    // are deleted.
    //
    // The ID of each receipt is sent back in the response "ticket" for each
    // notification. In summary, sending a notification produces a ticket, which
    // contains a receipt ID you later use to get the receipt.
    //
    // The receipts may contain error codes to which you must respond. In
    // particular, Apple or Google may block apps that continue to send
    // notifications to devices that have blocked notifications or have uninstalled
    // your app. Expo does not control this policy and sends back the feedback from
    // Apple and Google so you can handle it appropriately.
    let receiptIds = [];
    for (let ticket of tickets) {
      // NOTE: Not all tickets have IDs; for example, tickets for notifications
      // that could not be enqueued will have error information and no receipt ID.
      if (ticket.id) {
        receiptIds.push(ticket.id);
      }
    }

    let receiptIdChunks = expo.chunkPushNotificationReceiptIds(receiptIds);
    (async () => {
      // Like sending notifications, there are different strategies you could use
      // to retrieve batches of receipts from the Expo service.
      for (let chunk of receiptIdChunks) {
        try {
          let receipts = await expo.getPushNotificationReceiptsAsync(chunk);
          console.log(receipts);

          // The receipts specify whether Apple or Google successfully received the
          // notification and information about an error, if one occurred.
          for (let receipt of receipts) {
            if (receipt.status === 'ok') {
              continue;
            } else if (receipt.status === 'error') {
              console.error(`There was an error sending a notification: ${receipt.message}`);
              if (receipt.details && receipt.details.error) {
                // The error codes are listed in the Expo documentation:
                // https://docs.expo.io/versions/latest/guides/push-notifications#response-format
                // You must handle the errors appropriately.
                console.error(`The error code is ${receipt.details.error}`);
              }
            }
          }
        } catch (error) {
          console.error(error);
        }
      }
    })();

}

const sockets = {};

//create a new message
module.exports.conversation = (ws, req) => {
  const { from_id } = req.query;
  sockets[from_id] = ws;
  ws.on('message', stringifiedMessage => {
    console.log(`received ws message: ${stringifiedMessage}`);


    const message = JSON.parse(stringifiedMessage);
    const { to_id } = message;

    if (Object.keys(sockets).includes(to_id)) {
      const toWs = sockets[to_id];
      toWs.send(stringifiedMessage);
    }

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
    const getUsersByEmailSql = sql`Select * from Users where email_address = ${user.email_address}`;
    const mentorsWithEmailObject = await db.get(getUsersByEmailSql);
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

//get all mentors
module.exports.getAllMentors = async (req, res) => {
  try {
    const db = await dbPromise;
    if (req.query.user_ids !== undefined) {
      // Get Specific User Ids
      const user_ids = JSON.parse(req.query.user_ids);
      const getMentorsByUserIdSql = sql`SELECT * FROM Users WHERE is_mentor=1 AND user_id IN (${user_ids.join(',')})`;
      const mentorRows = await db.all(getMentorsByUserIdSql);
      res.json({ success: true, rows: mentorRows });
    } else {
      const getAllMentorsSql = `SELECT * FROM Users WHERE is_mentor=1;`;
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
    if (req.query.user_ids !== undefined) {
      // Get Specific User Ids
      const user_ids = JSON.parse(req.query.user_ids);
      const getMenteesByUserIdSql = sql`SELECT * FROM Users WHERE is_mentor=0 AND user_id IN (${user_ids.join(',')})`;
      const mentorRows = await db.all(getMenteesByUserIdSql);
      res.json({ success: true, rows: mentorRows });
    } else {
      const getAllMenteesSql = `SELECT * FROM Users WHERE is_mentor=0;`;
      const mentorRows = await db.all(getAllMenteesSql);
      res.json({ success: true, rows: mentorRows });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};

//get all passwords
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
    const professionRows = await db.all(getAllProfessionsSql);
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
    const getAllUsersSql = sql`SELECT * FROM Users WHERE user_id = ${userID};`;
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
    const getAllUsersEmailSql = sql`SELECT email_address FROM Users WHERE user_id = ${userID};`;
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
    const updateEmailSql = sql`UPDATE Users SET email_address = ${newEmail} WHERE user_id = ${userID}`;
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
    const getHobbiesSql = sql`SELECT hobbies FROM Users WHERE user_id = ${userID};`; //starts with 1
    const hobbyRows = await db.all(getHobbiesSql)
    res.json({ success: true, rows: hobbyRows });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports.updateFirstNameById = async (req, res) => {
  const userID = req.params.id;
  const newFirstName = req.body.first_name;

  if (newFirstName === undefined) {
    res.status(500).json({ error: "Missing credentials", success: false });
    return;
  }

  try {
    const db = await dbPromise;
    const updatenewFirstNameSql = sql`UPDATE Users SET first_name = ${newFirstName} WHERE user_id = ${userID}`;
    const firstNameRows = await db.all(updatenewFirstNameSql);
    res.json({ success: true, rows: firstNameRows });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports.updateLastNameById = async (req, res) => {
  const userID = req.params.id;
  const newLastName = req.body.last_name;

  if (newLastName === undefined) {
    res.status(500).json({ error: "Missing credentials", success: false });
    return;
  }

  try {
    const db = await dbPromise;
    const updatenewLastNameSql = sql`UPDATE Users SET last_name = ${newLastName} WHERE user_id = ${userID}`;
    const lastNameRows = await db.all(updatenewLastNameSql);
    res.json({ success: true, rows: lastNameRows });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports.updateHobbiesById = async (req, res) => {
  const userID = req.params.id;
  const newHobbies = req.body.hobbies;

  if (newHobbies === undefined) {
    res.status(500).json({ error: "Missing credentials", success: false });
    return;
  }

  try {
    const db = await dbPromise;
    const updateHobbiesSql = sql`UPDATE Users SET hobbies = ${newHobbies} WHERE user_id = ${userID}`;
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
    const getSkillsSql = sql`SELECT skills FROM Users where user_id = ${userID};`;
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
    const getFirstLastSql = sql`SELECT first_name,last_name FROM Users WHERE user_id = ${userId}`;
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
    const getSkillsSql = sql`SELECT skills FROM Users WHERE user_id = ${userID}`;
    const userSkillsObject = await db.get(getSkillsSql);
    if (userSkillsObject === undefined) {
      res.status(400).json({ error: "User not found!", success: false });
      return;
    }
    let skills = userSkillsObject.skills;
    skills = addToString(skills, skill);
    const updateSkillsSql = sql`UPDATE Users SET skills = ${skills} WHERE user_id = ${userID}`;
    await db.run(updateSkillsSql);


    //add user to skills table
    const getUsersBySkillSql = sql`SELECT users FROM Skills WHERE skills = ${skill}`;
    const usersSkillsObject = await db.get(getUsersBySkillSql);
    if (usersSkillsObject == undefined) {
      const insertSkillsSql = sql`INSERT INTO Skills VALUES (${skill},CAST(${parseInt(userID)} AS int))`;
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

module.exports.removeSkill = async (req, res) => {
  //get input
  const userID = req.params.id;
  if (req.body.skill === undefined && req.body.skills === undefined) {
    res.status(500).json({ error: "Missing credentials", success: false });
    return;
  }
  const skill = req.body.skill || req.body.skill;

  try {
    const db = await dbPromise;
    //remove skill from user table
    const getSkillSql = sql`SELECT skills FROM Users WHERE user_id = ${userID}`
    let skills = await db.get(getSkillSql)
    if (skills.length == 0) {
      res.status(400).json({ error: "User not found!", success: false });
      return
    }
    skills = removeFromString(skills, skill);
    const removeSkillSql = `UPDATE Users SET skills = ${skill} WHERE user_id = ${userID}`;
    await db.run(removeSkillSql);

    //remove user to skill table
    const getUsersSql = `SELECT users FROM Skills WHERE skills = ${skill}`
    let users = await db.get(getUsersSql);
    if (users.length == 0) {
      res.status(400).json({ error: "Skill not found!", success: false });
      return
    }
    users = removeFromString(users, userID);
    const removeUserSql = `UPDATE Skills SET users = ${userID} WHERE skills = ${skill}`;
    await db.run(removeUserSql);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }

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

module.exports.updateProfilePic = async (req, res) => {
  const userID = req.params.id;
  if (req.body["profile_pic_URL"] === undefined) {
    res.status(500).json({ error: "Missing credentials", success: false });
    return;
  }
  try {
    const db = await dbPromise;
    const profile_pic = req.body.profile_pic_URL;
    const updateProfilePicSql = `UPDATE Users SET profile_pic_URL = ${profile_pic} WHERE user_id = ${userID}`; //starts with 1
    const profilePicRows = await db.all(updateProfilePicSql);
    res.json({ success: true, rows: profilePicRows });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports.postProfilePic = (req, res) => {
  res.json(req.file);
};

module.exports.getProfessionById = async (req, res) => {
  const userId = req.params.id;
  try {
    const db = await dbPromise;
    const getProfessionSql = sql`SELECT profession FROM Users WHERE user_id = ${userId}`;
    const professionRows = await db.all(getProfessionSql)
    res.json({ success: true, rows: professionRows });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports.updateProfession = async (req, res) => {
  //get input
  const userID = req.params.id;
  if (req.body.profession === undefined && req.body.professions === undefined) {
    res.status(500).json({ error: "Missing credentials", success: false });
    return;
  }
  //THIS IS THE NEW PROFESSION VALUE USED
  const profession = req.body.profession || req.body.professions;
  try {
    const db = await dbPromise;


    const getProfessionSql = sql`SELECT profession FROM Users WHERE user_id = ${userID}`;
    const oldProfession = await db.get(getProfessionSql)

    const updateProfessionInUsersSql = sql`UPDATE Users SET profession = ${profession} WHERE user_id = ${userID}`;
    await db.run(updateProfessionInUsersSql);

    if (oldProfession.length == 0) {
      res.status(400).json({ error: "User not found!", success: false });
      return
    }
    const findUsersFromProfessionSql = sql`SELECT users FROM Profession WHERE profession = ${oldProfession["profession"]}`;
    const usersToRemove = await db.all(findUsersFromProfessionSql);
    if (usersToRemove.length == 0) {
      res.json({ success: true, rows: "Profession not found !" });
      return
    }
    let users = usersToRemove[0]["users"];
    users = removeFromString(users, userID);
    const removeUserFromProfessionSql = sql`UPDATE Profession SET users = ${users} WHERE profession = ${oldProfession}`;
    await db.run(removeUserFromProfessionSql);


    const findUsersFromNewProfessionSql = sql`SELECT users FROM Profession WHERE profession = ${profession}`;
    const usersToAdd = await db.all(findUsersFromNewProfessionSql);

    if (usersToAdd.length == 0) {
      const addUserToProfessionSql = sql`INSERT INTO Profession VALUES (${profession},${users});`;
      await db.run(addUserToProfessionSql);
      res.json({ success: true });
      return
    } else {
      users = usersToAdd[0]["users"];
      users = addToString(users, userID);
      const addUserToProfessionSql = sql`UPDATE Profession SET users = ${users} WHERE profession = ${profession}`;
      await db.run(addUserToProfessionSql);
      res.json({ success: true });
      return
    }



  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}; //end of updatedProfession

module.exports.getBio = async (req, res) => {
  const userId = req.params.id;
  try {
    const db = await dbPromise;
    const getBioSql = sql`SELECT biography FROM Users WHERE user_id = ${userId}`;
    const biographyRows = await db.all(getBioSql)
    res.json({ success: true, rows: biographyRows });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports.updateBio = async (req, res) => {
  const userID = req.params.id;
  if (req.body["biography"] === undefined) {
    res.status(500).json({ error: "Missing credentials", success: false });
    return;
  }
  try {
    const db = await dbPromise;
    const biography = req.body.biography;
    const updateBiographySql = sql`UPDATE Users SET biography = ${biography} WHERE user_id = ${userID}`; //starts with 1
    const biographyRows = await db.all(updateBiographySql);
    res.json({ success: true, rows: biographyRows });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports.deleteBio = async (req, res) => {
  const userID = req.params.id;
  try {
    const db = await dbPromise;
    const updateBiographySql = sql`UPDATE Users SET biography = '' WHERE user_id = ${userID}`; //starts with 1
    const biographyRows = await db.all(updateBiographySql);
    res.json({ success: true, rows: biographyRows });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports.updateZipcode = async (req, res) => {
  const userID = req.params.id;
  if (req.body["zipcode"] === undefined) {
    res.status(500).json({ error: "Missing credentials", success: false });
    return;
  }
  try {
    const db = await dbPromise;
    const zipcode = req.body.zipcode;
    const updateZipcodeSql = `UPDATE Users SET zipcode = ${zipcode} WHERE user_id = ${userID}`; //starts with 1
    const zipcodeRows = await db.all(updateZipcodeSql);
    res.json({ success: true, rows: zipcodeRows });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};
//create new password (SQL INJ.)
module.exports.register = async (req, res) => {
  const fields = ['email_address', 'password'];
  const user = {};
  fields.some(field => {
    if (req.body[field] === undefined) {
      res
        .status(500)
        .json({ error: `Missing credential ${field}`, success: false });
      return;
    }
    user[field] = req.body[field];
  });
  try {
    const db = await dbPromise;
    const getEmailSql = sql`Select * from Passwords where email_address = ${user.email_address};`;
    const emailRows = await db.all(getEmailSql);
    if (emailRows.length != 0) {
      res.json({ success: false, rows: "Email is not unique" });
      return;
    }
    // console.log(emailRows)
    const salt = hp.genRandomString(16)
    const passwordData = hp.saltPassword(user.password, salt)
    const postPasswordSql = `INSERT INTO Passwords VALUES ("${user.email_address}","${passwordData.passwordHash}", "${passwordData.salt}")`;
    db.run(postPasswordSql);
    res.json({ success: true, passwordHash: passwordData.passwordHash })
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports.login = async (req, res) => {
  const fields = ["email_address", "password"];
  const user = {};
  fields.some(field => {
    if (req.body[field] === undefined) {
      res.status(500).json({ error: "Missing credentials", success: false });
      return true;
    }
    user[field] = req.body[field];
  });

  try {
    const db = await dbPromise;
    const getSaltSql = sql`SELECT salt FROM Passwords WHERE email_address= ${user.email_address};`;
    const saltObject = await db.get(getSaltSql);
    const salt = saltObject["salt"]
    const loginSql = sql`SELECT u.user_id FROM Users u INNER JOIN
    (SELECT email_address FROM Passwords
    WHERE email_address = ${user.email_address}
    AND password = ${hp.saltPassword(user.password, salt)["passwordHash"]}) p
    ON (u.email_address = p.email_address)
    ;`;
    const id = await db.all(loginSql);
    res.json({ success: true, rows: id });

  } catch (error) {

    console.error(error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};

//MESSAGE API

module.exports.getMessages = async (req, res) => {
  try {
    const db = await dbPromise;
    const getAllMessagessSql = `SELECT * FROM Messages;`;
    const messageRows = await db.all(getAllMessagessSql);
    res.json({ success: true, rows: messageRows });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};

//get latest message by match id
module.exports.getLatestMessagesById = async (req, res) => {
  req.body.limit = req.body.limit || 1
  req.body.timestamp = req.body.timestamp || getFormattedDate();
  console.log(req.body.timestamp)
  try {
    const db = await dbPromise;
    const matchID = req.params.matchid;
    const getAllMessagesSql =
      sql`SELECT * FROM Messages WHERE match_id = ${matchID}
    AND timestamp <=  ${req.body.timestamp} ORDER BY timestamp LIMIT ${req.body.limit};`;
    const messagesRows = await db.all(getAllMessagesSql);
    res.json({ success: true, rows: messagesRows });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};

//get message chain  by match id
module.exports.getMessageChain = async (req, res) => {
  try {
    const db = await dbPromise;
    const matchID = req.params.matchid;
    const getAllMessagesSql =
      sql`SELECT * FROM Messages WHERE match_id = ${matchID};`;
    const messagesRows = await db.get(getAllMessagesSql);
    res.json({ success: true, rows: messagesRows });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};


function addToString(string, add) {
  const array = string.split(",");
  if (array.indexOf(add) == -1) {
    array.push(add);
  }
  return array.join(",");
}

function removeFromString(string, rem) {
  console.log(1, string)
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
  console.log(string)
  return string;
}

function getFormattedDate() {
  const date = new Date();
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
function iid(num) {
  let res = ""
  const chars = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n',
    'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B',
    'D', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P',
    'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
  while (num > 0) {
    res += chars[num % 62]
    num = (num - num % 62) / 62
  }
  return res
}
