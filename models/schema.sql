-- Database already created, you do not need to create. Start from line 7 for use


-- CREATE DATABASE gcb461vpdz9w11s8;
-- USE gcb461vpdz9w11s8;

CREATE DATABASE rumrunner_db;
USE rumrunner_db;

CREATE TABLE players
(
	id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
	username varchar(255) NOT NULL,
	score varchar(255) NOT NULL,
	createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updateAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);