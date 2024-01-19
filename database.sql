DROP DATABASE IF EXISTS device_signal;
create database device_signal;
use device_signal;

CREATE TABLE IF NOT EXISTS brands (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) UNIQUE
);

CREATE TABLE IF NOT EXISTS devices (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) UNIQUE,
    brand_id INT,
    FOREIGN KEY (brand_id) REFERENCES brands(id)
);

CREATE TABLE IF NOT EXISTS remote_buttons (
    id INT UNIQUE AUTO_INCREMENT,
    type VARCHAR(255) PRIMARY KEY,
    icon VARCHAR(255),
    label VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS remote_controls (
    id INT PRIMARY KEY,
    device_id INT,
    button_type VARCHAR(255),
    code TEXT,
    FOREIGN KEY (device_id) REFERENCES devices(id),
    FOREIGN KEY (button_type) REFERENCES remote_buttons(type)
);


