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
    FROM role`;
    connection.query(select, (error, response) => {
        if (error) throw error;
        console.table(response);
        teamPrompt();
    })
}

function viewEmployees() {
    const select = `SELECT * FROM employee`;
    connection.query(select, (error, response) => {
        if (error) throw error;
        console.table(response);
        teamPrompt();
    })
}

function addDepartment() {

}

function addRole() {

}

function addEmployee() {

}

function updateEmployeeRole() {
    
}


teamPrompt()