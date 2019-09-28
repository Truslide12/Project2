-- Database already created, you do not need to create. Start from line 7 for use


-- CREATE DATABASE gcb461vpdz9w11s8;


USE gcb461vpdz9w11s8;

CREATE TABLE leaderboard
(
	user_id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
	user_name varchar(255) NOT NULL,
	score varchar(255) NOT NULL,
	last_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
);