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
                    return departmentAdd();


                case 'Add role':
                    return roleAdd();


                case 'Add employee':
                    return employeeAdd();


                case 'View departments':
                    return departmentView();


                case 'View roles':
                    return roleView();


                case 'View employees':
                    return employeeView();


                case 'Update employee roles':
                    return employeeRoleUpdate();

                //uses SET okayyyyyy???? I can't even right now.
            }
        });
}

function departmentAdd() {
    inquirer.prompt({
        name: 'department',
        type: 'input',
        message: 'Add a department:'
    }).then(function (answer) {
        connection.query(
            "INSERT INTO department SET ?",
            {
                name: answer.department
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
    connection.query('SELECT * FROM department', function (err, results) {
        if (err) throw err;
        //console.log(results);
        var departments = []
        for (let i = 0; i < results.length; i++) {

            departments.push(results[i])
        }
        console.log(departments)
        //tutor helped with this bit
        var departmentLists = departments.map(({ id, name }) => ({
            name: name,
            value: id
        }))
        console.log(departmentLists)
        console.log(departmentLists.value)
        inquirer.prompt([{
            name: 'role',
            type: 'input',
            message: 'Add a role:'
        },
        {
            name: 'salary',
            type: 'input',
            message: 'Enter Salary for this role:'
        },
        {
            name: 'department',
            type: 'list',
            message: "Which Department does this belong to?",
            choices: departmentLists

        }]).then(function (answer) {
            console.log(answer)
            connection.query(
                "INSERT INTO role SET ?",
                {
                    title: answer.role, salary: answer.salary, department_id: answer.department
                },
                function (err, res) {
                    if (err) throw err
                    console.log("role added");
                    runDB();
                }
            )
        })
    });
};

function employeeAdd() {
    connection.query('SELECT * FROM role',
        (err, results) => {
            if (err) throw err;
            var roles = []
            for (let i = 0; i < results.length; i++) {
                roles.push(results[i])
            }
            console.log(roles)
            var roleLists = roles.map(({ id, title }) => ({
                name: title,
                value: id
            }))
            inquirer.prompt([
                {
                    name: 'firstname',
                    type: 'input',
                    message: 'Enter first name:'
                },
                {
                    name: 'lastname',
                    type: 'input',
                    message: 'Enter last name: '
                },
                {
                    name: 'role',
                    type: 'list',
                    message: "What role will this person have?",
                    choices: roleLists
                }

            ]).then(function (answer) {
                connection.query(
                    "INSERT INTO employee SET? ",
                    {
                        first_name: answer.firstname, last_name: answer.lastname, role_id: answer.role
                    },
                    function (err, res) {
                        if (err) throw err
                        console.table(res);
                        runDB();

                    })

            });

        })
};

function departmentView() {
    connection.query("SELECT * FROM department",
        function (err, res) {
            if (err) throw err;
            console.table(res);
            runDB()
        })
};

function roleView() {
    connection.query("SELECT * FROM role",
        function (err, res) {
            if (err) throw err;
            console.table(res);
            runDB()
        })
};

function employeeView() {
    connection.query("SELECT * FROM employee",
        function (err, res) {
            if (err) throw err;
            console.table(res);
            runDB()
        })
};

function employeeRoleUpdate() {
    connection.query("SELECT * FROM employee", (err, res) => {
        if (err) throw err;
        var employees = []
            for (let i = 0; i < res.length; i++) {
                employees.push(res[i])
            }
            console.log(employees)
            var employeeLists = employees.map(({ id, first_name, last_name }) => ({
                name: `${last_name}, ${first_name}`, 
                value: id
            }))
        inquirer.prompt([
            {
                name: "employeeRoleUpdate",
                type: "list",
                message: "Which employee role would you like to update?",
                choices: employeeLists
            }
        ])
        .then(function (answer) {
        //need to grab choice 
        console.log(answer.employeeRoleUpdate)
        connection.query("SELECT * FROM role", (err, res) => {
            if (err) throw err;
            var roles = []
            for (let i = 0; i < res.length; i++) {
                roles.push(res[i])
            }
            console.log(roles)
            var roleLists = roles.map(({ id, title }) => ({
                name: title,
                value: id
            }))
        
            //store employee id as var
            //store role id picked as var
            inquirer.prompt([
                {
                    name: "roleSelect",
                    type: "list",
                    message: "Which new role would you like to assign this employee?",
                    choices: roleLists
                }
                //need to grab choice 
            ])
        })
            // connection.query(
            //     "UPDATE employee SET ? WHERE ?",
            //     [
            //         {

            //         }
            //     ]
            // )
        })
    })
};
    //connection.query get all emplyees 
    //map for employees
    //list employees
    //which emplyee do you wnat to update 
    //use response from first query to generate choices in inquirer as to which employee to update
    //then query for all the roles and use that to update what the new role will be


    // connection.query(
    //     "UPDATE role SET ? WHERE ?",

    //     {
    //         title: answer.role, salary: answer.salary, department_id: answer.department
    //     },
    //     function (err, res) {
    //         if (err) throw err
    //         console.log("role added");
    //         runDB();
    //     }
    // )

    //need to get name, salary, 
