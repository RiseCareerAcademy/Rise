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
    messages varchar(255),
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
    messages varchar(255),
    hobbies varchar(255) NOT NULL
);
CREATE TABLE Matches (
    match_id int NOT NULL UNIQUE,
    mentor_id int NOT NULL,
    mentee_id int NOT NULL
);
INSERT INTO Mentors VALUES (
    1, 
    'rita', 
    'roloff', 
    'r.roloff@wisc.edu', 
    'sencha  tea', 
    '53703', 
    'strong independent woman',
    '12/24/1996', 
    'computer science', 
    'react native',  
    'a', 
    '13rquhnfuio3qhr81q', 
    'hidoi', 
    'helping kids'
);
INSERT INTO Mentors VALUES (
    2, 
    'kevin', 
    'mui', 
    'kmui2@wisc.edu', 
    'cc music', 
    '53703', 
    'technical consultant',
    '5/22/1997', 
    'computer science', 
    'all',  
    'b', 
    'qj34ri2uhqfewa3thrf1ioihaon', 
    'no', 
    'what is that'
);
INSERT INTO Mentees VALUES (
    11, 
    'minh', 
    'nguyen', 
    'mnguyen26@wisc.edu', 
    'momo', 
    '53703', 
    '20 June', 
    'computer science', 
    'anything',  
    'c', 
    'qq34rqfadrf1ioihaon', 
    'no', 
    'what is that'
);
SELECT * FROM Mentors;
SELECT * FROM Mentees;
SELECT * FROM Matches;
DROP TABLE Mentors;
DROP TABLE Mentees;
DROP TABLE Matches;

