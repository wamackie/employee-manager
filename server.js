const inquirer = require('inquirer');
const mysql = require("mysql2");
const connection = require('./db/connection');
const cTable = require('console.table');
const { listenerCount } = require('./db/connection');

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
    const select = `SELECT * FROM department`;
    connection.query(select, (error, response) => {
        if (error) throw error;
        console.table(response);
        teamPrompt();
    })
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
    inquirer.prompt([
        {
            name: 'first_name',
            type: 'input',
            message: 'Enter first name',
        },
        {
            name: 'last_name',
            type: 'input',
            message: 'Enter last name',
        },
        {
            name: 'role_id',
            type: 'input',
            message: 'Enter role id',
        },
        {
            name: 'manager_id',
            type: 'input',
            message: 'Enter manager id',
        }
    ])
    .then(response => {
        connection.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) values (?, ?, ?, ?);`, [response.first_name, response.last_name, response.role_id, response.manager_id], (err) => {
            if (err) { throw err
            } else {
                console.log('Success');
                teamPrompt();
            }
        })
    })
}

function updateEmployeeRole() {
    connection.query(`SELECT * FROM employee;`, (error, response) => {
        if (error) throw error;
    inquirer.prompt([
        {
            name: 'employee_name',
            type: 'list',
            message: 'Choose employee to update',
            choices() {
                const choicesList = [];
                for (let i = 0; i < response.length; i++){
                    choicesList.push(`${response[i].first_name} ${response[i].last_name}`)
                }
                return choicesList;
            },
        }
    ])
    .then(response => {
        connection.query(`SELECT id FROM employee WHERE CONCAT (first_name,' ', last_name) = ?`, response.employee_name, (err, res) => {
            if (err) { throw err
            } else {
                let employeeId = JSON.stringify(res[0].id)
                connection.query(`SELECT * FROM role`, (err, data) => {
                    if (err) throw err;
                    inquirer.prompt([
                        {
                            name: 'new_role',
                            message: 'What is the new employee role?',
                            type: 'list',
                            choices() {
                                const rolesList = [];
                                for (let i=0; i<data.length; i++){
                                    rolesList.push(data[i].title)
                                }
                                return rolesList;
                            }
                        }
                    ])
                    .then(result => {
                        console.log(result)
                        connection.query(`SELECT id FROM role WHERE title=?`, result.new_role, (err, data) => {
                            if (err) { throw err
                            } else {
                                let roleId = JSON.stringify(data[0].id)
                                // the query that UPDATEs the employee role id using employeeId and roleID
                                connection.query(`UPDATE employee SET role_id = ? WHERE id = ?`, [roleId, employeeId], (err) => {
                                    if (err) {throw err
                                    }
                                    console.log('success')
                                    teamPrompt();
                                })
                            }
                        })
                    })
                
                })
            }
        })
        })
    
    })
}


teamPrompt()