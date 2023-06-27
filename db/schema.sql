DROP DATABASE IF EXISTS beer_me_db;
CREATE DATABASE beer_me_db;

USE beer_me_db;

/* AUTO_INCREMENT means ID will auto increment and primary key means all IDs are unique in column */
CREATE TABLE beer_depo_table (
    id INT AUTO_INCREMENT,
    department_name VARCHAR(30),
    PRIMARY KEY (id)
);

CREATE TABLE beer_role_table (
    id INT AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INTEGER,
    PRIMARY KEY (id)
);

CREATE TABLE beer_employee_table (
    id INT AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER,
    manager_id INTEGER,
    PRIMARY KEY (id)
);