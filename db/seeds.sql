INSERT INTO department
    (name)
VALUES
    ('Marketing'),
    ('Sales'),
    ('Operations'),
    ('Human Resource'),
    ('Finance');

INSERT INTO role
    (title, salary, department_id)
VALUES
    ('Marketing Assistant', '45000', 1),
    ('Creative Director', '85000', 1),
    ('Marketing Specialist', '70000', 1),
    ('Sales Representative', '45000', 2),
    ('Account Manager', '65000', 2),
    ('Operations Analyst', '60000', 3),
    ('Operations Manager', '80000', 3),
    ('Chief Human Resources Officer', '78000', 4),
    ('HR Generalist', '40000', 4),
    ('Finance Intern', '20000', 5),
    ('Chief Financial Officer', '80000', 5);

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ('John', 'Marsh', 1, null),
    ('Sarah', 'Trudeau', 2, null),
    ('Jake', 'Clemons', 3, null),
    ('Samuel', 'Clinton', 4, null),
    ('Laura', 'Stevens', 5, null),
    ('Mike', 'Mercer', 6, null),
    ('Ken', 'Sloane', 7, null),
    ('Leeroy', 'Carmichael', 8, null),
    ('JJ', 'Stewart', 9, null),
    ('Brianna', 'Maven', 10, null),
    ('Maggie', 'Walkens', 11, null);