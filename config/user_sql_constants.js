/*ALL SQL CONSTANTS FOR USER CONTROLLER */

//create mentor, mentee and matchces table for testing 
module.exports.create_mentee_table_sql = function()  {
    sql = `    
        CREATE TABLE IF NOT EXISTS Mentees (
            user_id int NOT NULL UNIQUE,
            first_name varchar(255) NOT NULL,
            last_name varchar(255) NOT NULL,
            email_adress varchar(255) NOT NULL UNIQUE,
            biography varchar(255),
            zipcode varchar(5) NOT NULL,
            date_of_birth DATE NOT NULL,
            area_of_study varchar(255) NOT NULL,
            skills varchar(255) NOT NULL,
            blocked_users int[] NOT NULL,
            profile_pic_URL varchar(255) NOT NULL,
            match_key int[],
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
        blocked_users int NOT NULL,
        rating int NOT NULL,
        profile_pic_URL varchar(255) NOT NULL,
        match_key int[],
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

//get user by id (join mentor or mentee)
module.exports.get_all_matches = function(){
    sql = `SELECT * FROM Mentors`;    
    return sql; 
}
