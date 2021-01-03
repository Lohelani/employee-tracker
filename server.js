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
            let query = connection.query(
                "INSERT INTO role SET ?",
                {
                    title: answer.role, salary: answer.salary, department_id: answer.department
                },
                function (err) {
                    if (err) throw err
                    //console.table(res);
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
            //tutor helped with this bit
            var roleLists = roles.map(({ id, name }) => ({
                name: name,
                value: id
            }))
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
                // {
                //     name: 'department',
                //     type: 'list',
                //     message: "Which department are they in?",
                //     choices: departmentLists
                // }
            ]).then(function (answer) {
                let query = connection.query(
                    "INSERT INTO employee SET? ",
                    {
                        first_name: answer.firstname, last_name: answer.lastname, role_id: answer.role
                    },
                    function (err) {
                        if (err) throw err
                        //console.table(res);
                        runDB();

                    })

            });

        })
};
