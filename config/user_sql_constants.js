/*ALL SQL CONSTANTS FOR USER CONTROLLER */
const sql = require('sql-template-strings');
//create mentor, mentee and matchces table for testing 
module.exports.CREATE_MENTOR_TABLE = sql`  
    CREATE TABLE IF NOT EXISTS Mentors ( 
        user_id int NOT NULL UNIQUE,
        first_name varchar(255) NOT NULL,
        last_name varchar(255) NOT NULL,
        email_address varchar(255) NOT NULL UNIQUE,
        biography varchar(255),
        zipcode varchar(5) NOT NULL,
        date_of_birth DATE NOT NULL,
        profession varchar(255) NOT NULL,
        skills varchar(255) NOT NULL,
        profile_pic_URL varchar(255) NOT NULL,
        hobbies varchar(255)
    );
`

module.exports.CREATE_MENTEE_TABLE = sql`    
    CREATE TABLE IF NOT EXISTS Mentees (
        user_id int NOT NULL UNIQUE,
        first_name varchar(255) NOT NULL,
        last_name varchar(255) NOT NULL,
        email_address varchar(255) NOT NULL UNIQUE,
        biography varchar(255),
        zipcode varchar(5) NOT NULL,
        date_of_birth DATE NOT NULL,
        profession varchar(255) NOT NULL,
        skills varchar(255) NOT NULL,
        profile_pic_URL varchar(255) NOT NULL,
        hobbies varchar(255)
    );
`

module.exports.CREATE_PASSWORD_TABLE = sql`  
    CREATE TABLE IF NOT EXISTS Passwords ( 
        email_address varchar(255) NOT NULL UNIQUE,
        password varchar(255),
        salt varchar(255)
    );
`

module.exports.CREATE_MATCHES_TABLE = sql`
    CREATE TABLE IF NOT EXISTS Matches (
        match_id int NOT NULL UNIQUE,
        mentor_id int NOT NULL,
        mentee_id int NOT NULL,
        ratings int
    );
`

module.exports.CREATE_MESSAGES_TABLE = sql`
    CREATE TABLE IF NOT EXISTS Messages (
        message_id int NOT NULL UNIQUE,
        match_id int NOT NULL,
        to_id int NOT NULL,
        from_id int NOT NULL,
        message_body varchar(255),
        timestamp datetime NOT NULL 
    );
`

module.exports.CREATE_SKILLS_TABLE = sql`
    CREATE TABLE IF NOT EXISTS Skills (
        skills varchar(255) NOT NULL UNIQUE,
        users varchar(255) NOT NULL
    );
`

module.exports.CREATE_SKILLS_TABLE = sql`
    CREATE TABLE IF NOT EXISTS Skills (
        skills varchar(255) NOT NULL UNIQUE,
        users varchar(255) NOT NULL
    );
`


module.exports.CREATE_PROFESSIONS_TABLE = sql`
    CREATE TABLE IF NOT EXISTS Profession (
        profession varchar(255) NOT NULL UNIQUE,
        users varchar(255) NOT NULL
    );
`
