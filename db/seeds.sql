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
    (first_name, last_name, role_id)
VALUES
    ('John', 'Marsh', 1),
    ('Sarah', 'Trudeau', 2),
    ('Jake', 'Clemons', 3),
    ('Samuel', 'Clinton', 4),
    ('Laura', 'Stevens', 5),
    ('Mike', 'Mercer', 6),
    ('Ken', 'Sloane', 7),
    ('Leeroy', 'Carmichael', 8),
    ('JJ', 'Stewart', 9),
    ('Brianna', 'Maven', 10),
    ('Maggie', 'Walkens', 11);