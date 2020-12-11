INSERT INTO department (name)
VALUES 
("Human Resources"),
("Mobile Development"),
("Customer Service");

INSERT INTO role (title, salary, department_id)
VALUES 
("Associate", 40000.00, 1), 
("Associate", 40000.00, 3), 
("Programmer", 60000.00, 2), 
("Lead Programmer", 80000.00, 2);

INSERT INTO employee (first_name, last_name, role_id)
VALUES 
("Samwise", "Gamgee", 1),
("Bilbo", "Baggins", 1),
("Pipin", "Took", 2),
("Mary", "Brandybuck", 2),
("Rosie", "Cotton", 3),
("Gandalf", "Grey", 3),
("Gandalf", "White", 4),
("Eowyn", "Rohan", 4);