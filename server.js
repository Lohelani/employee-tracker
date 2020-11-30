const mysql = require('mysql');
const inquirer = require('inquirer');
const ctable = require('console.table');
const express = require('express');
const app = express();


app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "employeeTracker_DB"
});


connection.connect(function (err) {
    if (err) throw err;
    runDB();
});

function runDB() {
    inquirer
        .prompt({
            name: "action",
            type: "rawlist",
            message: "What would you like to do?",
            choices: [
                'Add department',
                'Add role',
                'Add employee',
                'View departments',
                'View roles',
                'View employees',
                'Update employee roles'
            ]
        })
        .then(function (answer) {
            switch (answer.action) {
                case 'Add department':
                    departmentAdd();
                    break;

                case 'Add role':
                    roleAdd();
                    break;

                case 'Add employee':
                    employeeAdd();
                    break;

                case 'View departments':
                    departmentView();
                    break;

                case 'View roles':
                    roleView();
                    break;

                case 'View employees':
                    employeeView();
                    break;

                case 'Update employee roles':
                    employeeRoleUpdate();
                    break;
            }
        });
}

function departmentAdd() {
    inquirer
        .prompt({
            name: 'department',
            type: 'input',
            message: 'Add a department:'
        })
        .then(function (answer) {
            let query = connection.query(
                "INSERT INTO department SET ? ",
                {
                    name: answer.name
                },
                function (err) {
                    if (err) throw err
                    console.table(res);
                    startPrompt();
                }
            )
        })
}
//function departmentAdd

// () {
//     inquirer
//       .prompt({
//         name: 'department',
//         type: 'input',
//         message: 'Add a department:'
//       })
//       .then(function(answer) {
//         let query = "INSERT INTO department SET ? ":
//         connection.query
//         {
//           name: answer.name
//         },
//         function(err) {
//             if (err) throw err
//             console.table(res);
//             startPrompt();
//           runSearch();
//         };

//     }};