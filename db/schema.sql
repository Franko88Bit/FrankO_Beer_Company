DROP DATABASE IF EXISTS beer_me_db;
CREATE DATABASE beer_me_db;

USE beer_me_db;

/* AUTO_INCREMENT means ID will auto increment and primary key means all IDs are unique in column */
CREATE TABLE beer_depo_table {
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    department_name VARCHAR(30)
};

CREATE TABLE beer_role_table (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INTEGER
);

CREATE TABLE beer_employee_table (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER,
    manager_id INTEGER
);