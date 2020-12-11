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

                    //uses SET
            }
        });
}

function departmentAdd() {
    inquirer.prompt({
        name: 'department',
        type: 'input',
        message: 'Add a department:'
    }).then(function (answer) {
        let query = connection.query(
            "INSERT INTO department VALUES ? ",
            {
                name: answer.name
            },
            function (err) {
                if (err) throw err
                console.table(answer);
                runDB();
            }
        )
    });
};

function roleAdd() {
    connection.query('SELECT * FROM department', function(err, results){
        if (err) throw err;
        console.log(results);
        var departmentName = []
    for (let i = 0; i<results.length; i++){
        //console.log(results[i].name);
        departmentName.push(results[i].name)
    }
    console.log(departmentName)
    inquirer.prompt({
        name: 'role',
        type: 'input',
        message: 'Add a role:'
    },
    {
        name: 'salary',
        type: 'number',
        message: 'Enter Salary for this role:'
    },
    {
        name: 'department',
        type: 'choice',
        choices: [
            departmentName
        ]
    }).then(function (answer) {
        let query = connection.query(
            "INSERT INTO role SET ? ",
            {
               title: answer.role, salary: answer.salary, department_id: answer.department
            },
            function (err) {
                if (err) throw err
                //console.table(res);
                runDB();
            }

            //salary?

            // 

            // name role input, salaray input, Department choice select all from bd find all department.name, use options from choices


        )})
    });
};

function employeeAdd() {
    inquirer.prompt({
        name: 'employee',
        type: 'input',
        message: 'Add an employee:'
    }).then(function (answer) {
        let query = connection.query(
            "INSERT INTO employee VALUES ? ",
            {
                name: answer.name
            },
            function (err) {
                if (err) throw err
                //console.table(res);
                runDB();

                //add first name
                //add last name
                //insert into role_id: answer.role
                //what department is 
            }
        )
    });
};

