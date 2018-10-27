/*ALL SQL CONSTANTS FOR USER CONTROLLER */

//create mentor, mentee and matchces table for testing 
module.exports.create_mentee_table_sql = function()  {
    sql = `    
        CREATE TABLE IF NOT EXISTS Mentees (
            user_id int NOT NULL UNIQUE,
            first_name varchar(255) NOT NULL,
            last_name varchar(255) NOT NULL,
            email_adress varchar(255) NOT NULL UNIQUE,
            biography varchar(255) NOT NULL,
            zipcode varchar(5) NOT NULL,
            date_of_birth DATE NOT NULL,
            area_of_study varchar(255) NOT NULL,
            skills varchar(255) NOT NULL,
            blocked_users varchar(255) NOT NULL,
            profile_pic_URL varchar(255) NOT NULL,
            match_key varchar(255),
            hobbies varchar(255) NOT NULL 
        );`
    return sql; 
}

module.exports.create_mentor_table_sql = function()  {
    sql = `  
    CREATE TABLE IF NOT EXISTS Mentors ( 
        user_id int NOT NULL UNIQUE,
        first_name varchar(255) NOT NULL,
        last_name varchar(255) NOT NULL,
        email_adress varchar(255) NOT NULL UNIQUE,
        biography varchar(255),
        zipcode varchar(5) NOT NULL,
        date_of_birth DATE NOT NULL,
        occupation varchar(255) NOT NULL,
        skills varchar(255) NOT NULL,
        blocked_users varchar(255) NOT NULL,
        rating int NOT NULL,
        profile_pic_URL varchar(255) NOT NULL,
        match_key varchar(255),
        hobbies varchar(255) NOT NULL
    );`
    return sql; 
}

module.exports.create_matches_table_sql = function()  {
    sql = `CREATE TABLE IF NOT EXISTS Matches (
        match_id int NOT NULL UNIQUE,
        mentor_id int NOT NULL,
        messages varchar(255),
        mentee_id int NOT NULL
    );`
    return sql; 
}

//create new mentor
module.exports.post_mentor_sql = function(user)  {
    sql = `INSERT INTO Mentors VALUES ('${user.user_id}', '${user.first_name}', '${user.last_name}', '${user.email_address}', 
    '${user.biography}', '${user.zipcode}', '${user.date_of_birth}', '${user.occupation}', '${user.skills}', 
    '${user.blocked_users}', '${user.rating}', '${user.profile_pic_URL}', '${user.match_key}', '${user.hobbies}') `

    return sql; 
}

//create new mentee
module.exports.post_mentee_sql = function(user)  {
    sql = `INSERT INTO Mentees VALUES ('${user.user_id}', '${user.first_name}', '${user.last_name}', '${user.email_address}', 
    '${user.biography}', '${user.zipcode}', '${user.date_of_birth}', '${user.area_of_study}', '${user.skills}', 
    '${user.blocked_users}', '${user.profile_pic_URL}', '${user.match_key}', '${user.hobbies}') `

    return sql; 
}

//create new match 
module.exports.post_matches_sql = function(user){
    sql = `INSERT INTO Matches VALUES ('${user.match_id}', '${user.mentor_id}', '${user.messages}','${user.mentee_id}')`
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

//get all matches 
module.exports.get_all_matches = function(){
    sql = `SELECT * FROM Matches;`;    
    return sql; 
}

//get user Id 
module.exports.get_user_id = function(id){
    if(isMentor)
        sql = `SELECT * FROM Mentors where Mentors.user_id = ${id}`;    //starts with 1
    else
        sql = `SELECT * FROM Mentees where Mentees.user_id = ${id}`;    //starts with 2 

    return sql; 
}


//get email by Id 
module.exports.get_email_by_id = function(id){
    if(isMentor)
        sql = `SELECT email_adress FROM Mentors WHERE Mentors.user_id = ${id}`;    //starts with 1
    else
        sql = `SELECT email_adress FROM Mentees WHERE Mentees.user_id = ${id}`;    //starts with 2 

    return sql; 
}

//update email by Id 
module.exports.update_email_by_id = function(id,email_address){
    if(isMentor)
        sql = `UPDATE Mentors SET email_adress='${email_address}' WHERE Mentors.user_id = ${id}`;    //starts with 1
    else
        sql = `UPDATE Mentors SET email_adress='${email_address}' WHERE Mentees.user_id = ${id}`;    //starts with 2 

    return sql; 
}

//get hobbies by Id 
module.exports.get_hobbies_by_id = function(id){
    if(isMentor)
        sql = `SELECT hobbies FROM Mentors WHERE Mentors.user_id = ${id}`;    //starts with 1
    else
        sql = `SELECT hobbies FROM Mentees WHERE Mentees.user_id = ${id}`;    //starts with 2 

    return sql; 
}

//update/delete hobbies by Id 
module.exports.update_hobbies_by_id = function(id,hobbies){
    i=id;
    while(i>10)
        i/=10
        
    console.log(hobbies)
    if(Math.floor(i)==1)
        sql = `UPDATE Mentors SET hobbies='${hobbies}' WHERE Mentors.user_id = ${id}`;    //starts with 1
    else
        sql = `UPDATE Mentors SET hobbies='${hobbies}' WHERE Mentees.user_id = ${id}`;    //starts with 2 

    return sql; 
}

//get blocked users by Id 
module.exports.get_blocked_users_by_id = function(id){
    if(isMentor)
        sql = `SELECT blocked_users FROM Mentors WHERE Mentors.user_id = ${id}`;    //starts with 1
    else
        sql = `SELECT blocked_userss FROM Mentees WHERE Mentees.user_id = ${id}`;    //starts with 2 

    return sql; 
}

//add blocked users by Id 
module.exports.add_blocked_users_by_id = function(id,new_block){
    console.log(new_block)
    if(isMentor){
        sql = `UPDATE Mentors SET blocked_users=printf('%s,%s', blocked_users, ${new_block}) WHERE Mentors.user_id = ${id}`;    //starts with 1
    }
    else
        sql = `UPDATE Mentors SET blocked_users=printf('%s,%s', blocked_users, ${new_block}) WHERE Mentees.user_id = ${id}`;    //starts with 2 

    return sql; 
}

function isMentor(id){
    while(id>10)
        id/=10
    return (Math.floor(id)==1)
}