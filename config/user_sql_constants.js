/*ALL SQL CONSTANTS FOR USER CONTROLLER */

//create mentor, mentee and matchces table for testing 
module.exports.create_mentee_table_sql = function()  {
    sql = `    
        CREATE TABLE IF NOT EXISTS Mentees (
            user_id int NOT NULL UNIQUE,
            first_name varchar(255) NOT NULL,
            last_name varchar(255) NOT NULL,
            email_address varchar(255) NOT NULL UNIQUE,
            biography varchar(255),
            zipcode varchar(5) NOT NULL,
            date_of_birth DATE NOT NULL,
            area_of_study varchar(255) NOT NULL,
            skills varchar(255) NOT NULL,
            profile_pic_URL varchar(255) NOT NULL,
            hobbies varchar(255)
        );`
    return sql; 
}

module.exports.create_mentor_table_sql = function()  {
    sql = `  
    CREATE TABLE IF NOT EXISTS Mentors ( 
        user_id int NOT NULL UNIQUE,
        first_name varchar(255) NOT NULL,
        last_name varchar(255) NOT NULL,
        email_address varchar(255) NOT NULL UNIQUE,
        biography varchar(255),
        zipcode varchar(5) NOT NULL,
        date_of_birth DATE NOT NULL,
        occupation varchar(255) NOT NULL,
        skills varchar(255) NOT NULL,
        profile_pic_URL varchar(255) NOT NULL,
        hobbies varchar(255)
    );`
    return sql; 
}
module.exports.create_password_table_sql = function()  {
    sql = `  
    CREATE TABLE IF NOT EXISTS Passwords ( 
        user_id int NOT NULL UNIQUE,
        email_address varchar(255) NOT NULL UNIQUE,
        password varchar(255) 
    );`
    return sql; 
}

module.exports.create_matches_table_sql = function()  {
    sql = `
    CREATE TABLE IF NOT EXISTS Matches (
        match_id int NOT NULL UNIQUE,
        mentor_id int NOT NULL,
        mentee_id int NOT NULL
    );`
    return sql; 
}

module.exports.create_messages_table_sql = function()  {
    sql = `CREATE TABLE IF NOT EXISTS Messages (
        message_id int NOT NULL UNIQUE,
        match_id int NOT NULL,
        to_id int NOT NULL,
        from_id int NOT NULL,
        message_body varchar(255),
        timestamp datetime NOT NULL
    );`
    return sql; 
}

module.exports.create_skills_table_sql = function()  {
    sql = `CREATE TABLE IF NOT EXISTS Skills (
        skill varchar(255) NOT NULL UNIQUE,
        users varchar(255) NOT NULL
    );`
    return sql; 
}

//create new mentor
module.exports.post_mentor_sql = function(user)  {
    sql = `INSERT INTO Mentors VALUES ('${user.user_id}', '${user.first_name}', '${user.last_name}', '${user.email_address}', 
    '${user.biography}', '${user.zipcode}', '${user.date_of_birth}', '${user.occupation}', '${user.skills}', 
      '${user.profile_pic_URL}', '${user.hobbies}') `

    return sql; 
}

//create new mentee
module.exports.post_mentee_sql = function(user)  {
    sql = `INSERT INTO Mentees VALUES ('${user.user_id}', '${user.first_name}', '${user.last_name}', '${user.email_address}', 
    '${user.biography}', '${user.zipcode}', '${user.date_of_birth}', '${user.area_of_study}', '${user.skills}', 
     '${user.profile_pic_URL}', '${user.hobbies}') `

    return sql; 
}

//create new password
module.exports.post_password_sql = function(user)  {
    sql = `INSERT INTO Passwords VALUES ('${user.user_id}', '${user.email_address}', '${user.password}') `

    return sql; 
}

//create new match 
module.exports.post_matches_sql = function(user){
    sql = `INSERT INTO Matches VALUES ('${user.match_id}', '${user.mentor_id}','${user.mentee_id}')`
    return sql; 
}

//create new message 
module.exports.post_message_sql = function(user){
    console.log(user)
    sql = `INSERT INTO Messages VALUES ('${user.message_id}','${user.match_id}', '${user.to_id}', '${user.from_id}','${user.message_body}','${user.timestamp}')`
    return sql; 
}

//get all mentors
module.exports.get_all_mentors = function(){
    sql = `SELECT * FROM Mentors;`;    
    return sql; 
}

//get all mentees
module.exports.get_all_mentees = function(){
    sql = `SELECT * FROM Mentees;`;   
    return sql; 
}

//get all passwords
module.exports.get_all_passwords = function(){
    sql = `SELECT * FROM Passwords;`;   
    return sql; 
}

//get all matches 
module.exports.get_all_matches = function(){
    sql = `SELECT * FROM Matches;`;    
    return sql; 
}

//get user Id 
module.exports.get_user_id = function(id){
    if(isMentor(id))
        sql = `SELECT * FROM Mentors where Mentors.user_id = ${id}`;    //starts with 1
    else
        sql = `SELECT * FROM Mentees where Mentees.user_id = ${id}`;    //starts with 2 

    return sql; 
}

//confirm email
module.exports.confirm_email = function(id,email){
    if(isMentor(id))
        sql = `SELECT email_address FROM Mentors WHERE user_id = ${id}`;    //starts with 1
    else
        sql = `SELECT email_address FROM Mentees WHERE user_id = ${id}`;    //starts with 2 

    return sql; 
}

//get email by Id 
module.exports.get_email_by_id = function(id){
    if(isMentor(id))
        sql = `SELECT email_address FROM Mentors WHERE user_id = ${id}`;    //starts with 1
    else
        sql = `SELECT email_address FROM Mentees WHERE user_id = ${id}`;    //starts with 2 

    return sql; 
}

//update email by Id 
module.exports.update_email_by_id = function(id,email_address){
    if(isMentor(id))
        sql = `UPDATE Mentors SET email_address='${email_address}' WHERE user_id = ${id}`;    //starts with 1
    else
        sql = `UPDATE Mentees SET email_address='${email_address}' WHERE user_id = ${id}`;    //starts with 2 

    return sql; 
}

//get hobbies by Id 
module.exports.get_hobbies_by_id = function(id){
    console.log(id)
    if(isMentor(id))
    
        sql = `SELECT hobbies FROM Mentors WHERE Mentors.user_id = ${id}`;    //starts with 1
    else
        
        sql = `SELECT hobbies FROM Mentees WHERE Mentees.user_id = ${id}`;    //starts with 2 

    return sql; 
}

//update/delete hobbies by Id 
module.exports.update_hobbies_by_id = function(id,hobbies){
    if(isMentor(id))
        sql = `UPDATE Mentors SET hobbies='${hobbies}' WHERE user_id = ${id}`;    //starts with 1
    else
        sql = `UPDATE Mentees SET hobbies='${hobbies}' WHERE user_id = ${id}`;    //starts with 2 

    return sql; 
}

//get blocked users by Id 
module.exports.get_blocked_users_by_id = function(id){
    if(isMentor(id))
        sql = `SELECT blocked_users FROM Mentors WHERE Mentors.user_id = ${id}`;    //starts with 1
    else
        sql = `SELECT blocked_users FROM Mentees WHERE Mentees.user_id = ${id}`;    //starts with 2 

    return sql; 
}

//add blocked users by Id 
module.exports.add_blocked_users_by_id = function(id,new_block){
    console.log(new_block)
    if(isMentor(id)){
        sql = `UPDATE Mentors SET blocked_users = printf('%s,%s', blocked_users, ${new_block}) WHERE user_id = ${id}`;    //starts with 1
    }
    else
        sql = `UPDATE Mentees SET blocked_users = printf('%s,%s', blocked_users, ${new_block}) WHERE user_id = ${id}`;    //starts with 2 

    return sql; 
}

function isMentor(id){
    while(id>10)
        id/=10
    return (Math.floor(id)==1)
}


module.exports.get_skill_by_id = function(id){
    if(isMentor(id))
        sql = `SELECT skills FROM Mentors WHERE Mentors.user_id = ${id}`;    //starts with 1
    else
        sql = `SELECT skills FROM Mentees WHERE Mentees.user_id = ${id}`;    //starts with 2 

    return sql; 
}

module.exports.add_skill = function(id,new_skill){
    if(isMentor(id))
        sql = `UPDATE Mentors SET skills = printf('%s,%s', skills, '${new_skill}') WHERE user_id = ${id}`;    //starts with 1
    else
        sql = `UPDATE Mentees SET skills = printf('%s,%s', skills, '${new_skill}') WHERE user_id = ${id}`;    //starts with 2 
    return sql; 
    }


//get profile pic 
module.exports.get_profile_pic = function(id){
    if(isMentor(id))
        sql = `SELECT profile_pic_URL FROM Mentors WHERE Mentors.user_id = ${id}`;    
    else
        sql = `SELECT profile_pic_URL FROM Mentees WHERE Mentees.user_id = ${id}`;    

    return sql; 
}

//update prof pic
module.exports.update_profile_pic = function(id,profile_pic){
    if(isMentor(id))
        sql = `UPDATE Mentors SET profile_pic_URL ='${profile_pic}' WHERE user_id = ${id}`;    
    else
        sql = `UPDATE Mentees SET profile_pic_URL ='${profile_pic}'  WHERE user_id = ${id}`;    

    return sql; 
}

//get profession
module.exports.get_profession = function(id){
    if(isMentor(id))
        sql = `SELECT occupation FROM Mentors WHERE Mentors.user_id = ${id}`;    
    else
        sql = `SELECT area_of_study FROM Mentees WHERE Mentees.user_id = ${id}`;    

    return sql; 
}

//update profession
module.exports.update_profession = function(id,profession){
    if(isMentor(id))
        sql = `UPDATE Mentors SET occupation ='${profession}' WHERE user_id = ${id}`;    
    else
        sql = `UPDATE Mentees SET area_of_study ='${profession}'  WHERE user_id = ${id}`;    

    return sql; 
}

//get bio
module.exports.get_bio = function(id){
    if(isMentor(id))
        sql = `SELECT biography FROM Mentors WHERE Mentors.user_id = ${id}`;    
    else
        sql = `SELECT biography FROM Mentees WHERE Mentees.user_id = ${id}`;    

    return sql; 
}

//update bio
module.exports.update_bio = function(id,bio){
    if(isMentor(id))
        sql = `UPDATE Mentors SET biography ='${bio}' WHERE user_id = ${id}`;    
    else
        sql = `UPDATE Mentees SET biography ='${bio}'  WHERE user_id = ${id}`;    

    return sql; 
}
//delete bio
module.exports.delete_bio = function(id){
    if(isMentor(id))
        sql = `UPDATE Mentors SET biography =' ' WHERE user_id = ${id}`;    
    else
        sql = `UPDATE Mentees SET biography =' '  WHERE user_id = ${id}`;    

    return sql; 
}

//update zip
module.exports.update_zip = function(id,new_zip){
    if(isMentor(id))
        sql = `UPDATE Mentors SET zipcode ='${new_zip}' WHERE user_id = ${id}`;    
    else
        sql = `UPDATE Mentees SET zipcode ='${new_zip}'  WHERE user_id = ${id}`;    

    return sql; 
}

//get match by match match id 
module.exports.get_match_by_id = function(id){
    sql = `SELECT * FROM Matches WHERE match_id = ${id};`;    
    return sql; 
}


//login 
module.exports.login = function(email,password){
    sql = `SELECT COUNT(*) FROM (SELECT * FROM Passwords WHERE email_address='${email}' AND password='${password}');`;  
    return sql; 
}

//get match by user ID 
module.exports.get_match_by_UserId = function(id){
    if(isMentor(id))
    sql = `SELECT * FROM Matches WHERE mentor_id = ${id};`;    
    else
    sql = `SELECT * FROM Matches WHERE mentee_id = ${id};`;    
    return sql; 
}

//get latest message by match id 
module.exports.get_message_by_matchid = function(id){
    console.log(id)
    sql = `SELECT * FROM Messages WHERE match_id = ${id} order by timestamp LIMIT 1;`;    
    return sql; 
}

//get all message by match id 
module.exports.get_all_message_by_matchid = function(id){
    sql = `SELECT * FROM Messages WHERE match_id = ${id} order by timestamp;`;    
    return sql; 
}
