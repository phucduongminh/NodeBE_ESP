DROP DATABASE IF EXISTS demo_node_api;
CREATE DATABASE demo_node_api DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;

use demo_node_api;

CREATE TABLE IF NOT EXISTS users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);


INSERT INTO users (name,email,password) VALUES
("Test","test@gmail.com","password");

