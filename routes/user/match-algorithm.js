const dbPromise = require("../../db");
const sql = require('sql-template-strings');

/**
 * TODO:
 * MATCHING ALGORITHM FUNCTION
 */
module.exports = (mentee, mentorsWithSameProfession, mentorsWithSameSkills) => {
  const mentorsScores = {};

  // Add 2 for mentors with same profession.
  mentorsWithSameProfession.forEach(mentor => {
    mentorsScores[mentor] = 2;
  });

  // Add 1 for mentors with same skills.
  mentorsWithSameSkills.forEach(mentor => {
    mentorsScores[mentor] =
      mentorsScores[mentor] === undefined ? 1 : mentorsScores[mentor] + 1;
  });

  // Sore the mentors by score.
  const sortedMentors = Object.entries(mentorsScores)
    .sort((mentorA, mentorB) => {
      const [, mentorAScore] = mentorA;
      const [, mentorBScore] = mentorB;
      return mentorBScore - mentorAScore;
    })
    .map(mentor => mentor[0]);

  return sortedMentors;
};


/**
 * FOR DEVELOPMENT AND DEBUGGING.
 * For a test mentee, you must edit the mentee object below.
 * For menteors, you must create them via Postman.
 *
 * Run using the following command:
 *  node routes/user/match-algorithm.js
 *
 */
(async () => {

  // CHANGE ME
  const mentee = {
    skills: '',
    profession: 'Computer Software',
  };
















  


  // DO NOT TOUCH BELOW
  const db = await dbPromise;
  const { skills, profession } = mentee;

  const selectUsersByProfessionSql = sql`SELECT users FROM Profession WHERE profession = ${profession}`;
  const mentorsWithProfession = (await db.get(selectUsersByProfessionSql))
    .users
    .split(",")
    .filter(user => user[0] === "1");

  const selectUsersBySkillsSql = sql`SELECT users FROM Skills WHERE skills = ${skills}`;
  const mentorsWithSkills = (await db.get(selectUsersBySkillsSql))
    .users
    .split(",")
    .filter(user => user[0] === "1");

  const mentorIds = module.exports(mentee, mentorsWithProfession, mentorsWithSkills);

  const mentors = await Promise.all(mentorIds.map(mentorId => {
    return db.get(sql`SELECT * FROM Users WHERE user_id = ${mentorId}`);
  }));

  console.log(mentors);
})();
