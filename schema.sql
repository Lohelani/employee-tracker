DROP DATABASE IF EXISTS employeeTracker_DB;
CREATE database employeeTracker_DB;

USE employeeTracker_DB;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(30),

);

CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30),
  salary DECIMAL,
  department_id INT,
  PRIMARY KEY (department_id),
  FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INT,
  manager_id VARCHAR (30),
  PRIMARY KEY (position),
  FOREIGN KEY (role_id) REFERENCES role(id)
);

SELECT * FROM department;