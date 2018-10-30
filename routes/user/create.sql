CREATE TABLE Mentors (
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
);
CREATE TABLE Mentees (
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
);
CREATE TABLE Matches (
    match_id int NOT NULL UNIQUE,
    mentor_id int NOT NULL,
    messages varchar(255),
    mentee_id int NOT NULL
);