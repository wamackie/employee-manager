const inquirer = require('inquirer');
const mysql = require("mysql2");
const connection = require('./db/connection');
const cTable = require('console.table');

const teamPrompt = () => {
    inquirer.prompt([
        {
            name: 'menu',
            type: 'list',
            message: 'What would you like to do?',
            choices: [
                'View All Departments',
                'View All Roles',
                'View All Employees',
                'Add Department',
                'Add Role',
                'Add Employee',
                'Update Employee Role'
            ]
        }
    ])
    .then(function (option) {
        switch (option.menu) {
            case 'View All Departments':
                viewDepartments();
                break;
            
            case 'View All Roles':
                viewRoles();
                break;

            case 'View All Employees':
                viewEmployees();
                break;

            case 'Add Department':
                addDepartment();
                break;

            case 'Add Role':
                addRole();
                break;

            case 'Add Employee':
                addEmployee();
                break;

            case 'Update Employee Role':
                updateEmployeeRole();
                break;
        }
    })
}

function viewDepartments() {
<<<<<<< HEAD
    console.log('View All Departments\n')
    const sql = `SELECT * FROM department;`
=======
    const select = `SELECT * FROM department`;
    connection.query(select, (error, response) => {
        if (error) throw error;
        console.table(response);
        teamPrompt();
    })
>>>>>>> 8eb7da9 (update)
}

function viewRoles() {
    const select = `SELECT role.id,
    role.title,
    department.name AS department,
    role.salary
    FROM role
    LEFT JOIN department on role.department_id = department.id`;
    connection.query(select, (error, response) => {
        if (error) throw error;
        console.table(response);
        teamPrompt();
    })
}

function viewEmployees() {
    const select = `SELECT employee.id,
    employee.first_name,
    employee.last_name,
    role.title AS job_title,
    department.name AS department,
    role.salary AS salary,
    CONCAT(manager.first_name, ' ', manager.last_name) AS Manager
    FROM employee
    LEFT JOIN role on employee.role_id = role.id
    LEFT JOIN department on role.department_id = department.id
    LEFT JOIN employee manager on manager.id = employee.manager_id`;
    connection.query(select, (error, response) => {
        if (error) throw error;
        console.table(response);
        teamPrompt();
    })
}

function addDepartment() {
    inquirer.prompt([
        {
            name: 'department',
            type: 'input',
            message: 'Enter department name',
        }
    ])
    .then(response => {
        connection.query(`INSERT INTO department (name) values (?);`, response.department, (err) => {
            if (err) { throw err 
            } else {
                console.log('Success');
                teamPrompt();
            }
        } )
    })
}

function addRole() {
    inquirer.prompt([
        {
            name: 'title',
            type: 'input',
            message: 'Enter role name',
        },
        {
            name: 'salary',
            type: 'input',
            message: 'Enter the salary',
        },
        {
            name: 'id',
            type: 'input',
            message: 'Enter the department_id'
        }
    ])
    .then(response => {
        connection.query(`INSERT INTO role (title, salary, department_id) values (?, ?, ?);`, [response.title, response.salary, response.id], (err) => {
            if (err) { throw err
            } else {
                console.log('Success');
                teamPrompt();
            }
        })
    })
}

function addEmployee() {

}

function updateEmployeeRole() {
    
}


teamPrompt()