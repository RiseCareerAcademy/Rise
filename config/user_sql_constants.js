/*ALL SQL CONSTANTS FOR USER CONTROLLER */

//create new mentor
module.exports.post_mentor_sql = function(user)  {
    sql = `INSERT INTO Mentors VALUES ('${user.user_id}', '${user.first_name}', '${user.last_name}', '${user.email_address}', 
    '${user.biography}', '${user.zipcode}', '${user.date_of_birth}', '${user.occupation}', '${user.skills}', 
    '${user.blocked_users}', '${user.rating}', '${user.profile_pic_URL}', '${user.match_key}', '${user.hobbies}') `

    return sql; 
}

//create new mentee
module.exports.post_mentee_sql = function(user)  {
    sql = `INSERT INTO Mentors VALUES ('${user.user_id}', '${user.first_name}', '${user.last_name}', '${user.email_address}', 
    '${user.biography}', '${user.zipcode}', '${user.date_of_birth}', '${user.occupation}', '${user.skills}', 
    '${user.blocked_users}', '${user.rating}', '${user.profile_pic_URL}', '${user.match_key}', '${user.hobbies}') `

    return sql; 
}

//create new match 
module.exports.post_matches_sql = function(user){
    sql = `INSERT INTO Mentors VALUES ('${user.match_id}', '${user.mentor_id}', '${user.messages}','${user.mentee_id}')`
    return sql; 
}

//get all mentors
module.exports.get_all_mentors = function(){
    sql = `SELECT * FROM Mentors;`;    return sql; 
}

//get all mentees
module.exports.get_all_mentees = function(){
    sql = `SELECT * FROM Mentees;`;    return sql; 
}

//get all matches 
module.exports.get_all_matches = function(){
    sql = `SELECT * FROM Matches;`;    return sql; 
}
