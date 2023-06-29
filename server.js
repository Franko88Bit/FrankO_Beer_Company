// for user input when node program runs
const inquirer = require('inquirer');
const db = require('./db/connection');

function beer_employer_tracker() {
    inquirer.prompt([{
        type: 'list',
        name: 'prompt',
        message: 'What would you like to do?',
        choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add A Department', 'Add A Role', 'Add An Employee', 'Update An Employee Role', 'Log Out']
    }]).then((answers) => {
        if (answers.prompt === 'View All Departments') {
            db.query(`SELECT * FROM beer_depo_table`, (err, result) => {
                if (err) throw err;
                console.log("Viewing All Departments: ");
                console.table(result);
                beer_employer_tracker();
            });
        }
        else if (answers.prompt === 'View All Roles') {
            db.query(`SELECT * FROM beer_role_table`, (err, result) => {
                if (err) throw err;
                console.log("Viewing All Roles: ");
                console.table(result);
                beer_employer_tracker();
            });
        }
        else if (answers.prompt === 'View All Employees') {
            db.query(`SELECT * FROM beer_employee_table`, (err, result) => {
                if (err) throw err;
                console.log("Viewing All Employees: ");
                console.table(result);
                beer_employer_tracker();
            });
        }
        else if (answers.prompt === 'Add A Department') {
            inquirer.prompt([{
                type: 'input',
                name: 'department',
                message: 'What is the name of the department to add?'
            }]).then((answers) => {
                db.query(`INSERT INTO beer_depo_table (department_name) VALUES (?)`, [answers.department], (err, result) => {
                    if (err) throw err;
                    console.log(`Added ${answers.department} to the database.`)
                    beer_employer_tracker();
                });
            })
        }
        else if (answers.prompt === 'Add A Role') {
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'role',
                    message: "What new role do you want to add?",
                    validate: add_role => {
                        if (add_role) {
                            return true;
                        } else {
                            console.log('Please enter a role, thank you!');
                            return false;
                        }
                    }
                },
                {
                    type: 'input',
                    name: 'salary',
                    message: "How much is the salary of this new role?"
                }
            ]).then(answer => {
                const params = [answer.role, answer.salary];
                db.query(`SELECT department_name, id FROM beer_depo_table`, (err, data) => {
                    if (err) throw err;
                    const dept = data.map(({ name, id }) => ({ name: name, value: id }));
                    inquirer.prompt([
                        {
                            type: 'list',
                            name: 'department',
                            message: "What department is this role in?",
                            choices: dept
                        }
                    ]).then(dept_choice => {
                        const dept = dept_choice.department;
                        params.push(dept);
                        db.query(`INSERT INTO beer_role_table (title, salary, department_id)
                                VALUES (?, ?, ?)`, params, (err, result) => {
                            if (err) throw err;
                            console.log('Added ' + answer.role + " to the database");
                            beer_employer_tracker();
                        });
                    });
                });
            });

        }
        else if (answers.prompt === 'Add An Employee') {
            db.query(`SELECT * FROM beer_employee_table, beer_role_table`, (err, result) => {
                if (err) throw err;
                inquirer.prompt([
                    {
                        type: 'input',
                        name: 'firstName',
                        message: 'What is the employees first name?'
                    },
                    {
                        type: 'input',
                        name: 'lastName',
                        message: 'What is the employees last name?'
                    },
                    {
                        type: 'list',
                        name: 'role',
                        message: 'What is the employees role?',
                        choices: () => {
                            var array = [];
                            for (var i = 0; i < result.length; i++) {
                                array.push(result[i].title);
                            }
                            var newArray = [...new Set(array)];
                            return newArray;
                        }
                    },
                    {
                        type: 'input',
                        name: 'manager',
                        message: 'Who is the employees manager?'
                    }
                ]).then((answers) => {
                    for (var i = 0; i < result.length; i++) {
                        if (result[i].title === answers.role) {
                            var role = result[i];
                        }
                    }
                    db.query(`INSERT INTO beer_employee_table (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`, [answers.firstName, answers.lastName, role.id, answers.manager.id], (err, result) => {
                        if (err) throw err;
                        console.log(`Added ${answers.firstName} ${answers.lastName} to the database.`)
                        beer_employer_tracker();
                    });
                })
            });
        }
        else if (answers.prompt === 'Update An Employee Role') {
            db.query(`SELECT * FROM beer_employee_table, beer_role_table`, (err, result) => {
                if (err) throw err;
                inquirer.prompt([
                    {
                        type: 'list',
                        name: 'employee',
                        message: 'Which employee role do you want to update?',
                        choices: () => {
                            var array = [];
                            for (var i = 0; i < result.length; i++) {
                                array.push(result[i].last_name);
                            }
                            var employee_array = [...new Set(array)];
                            return employee_array;
                        }
                    },
                    {
                        type: 'list',
                        name: 'role',
                        message: 'What is the new role?',
                        choices: () => {
                            var array = [];
                            for (var i = 0; i < result.length; i++) {
                                array.push(result[i].title);
                            }
                            var new_array = [...new Set(array)];
                            return new_array;
                        }
                    }
                ]).then((answers) => {
                    for (var i = 0; i < result.length; i++) {
                        if (result[i].last_name === answers.employee) {
                            var name = result[i];
                        }
                    }

                    for (var i = 0; i < result.length; i++) {
                        if (result[i].title === answers.role) {
                            var role = result[i];
                        }
                    }
                    db.query(`UPDATE beer_employee_table SET ? WHERE ?`, [{ role_id: role }, { last_name: name }], (err, result) => {
                        if (err) throw err;
                        console.log(`Updated ${answers.employee} role to the database.`)
                        beer_employer_tracker();
                    });
                })
            });
        }
        else if (answers.prompt === 'Log Out') {
            db.end();
            console.log("Good Bye and Take Care!");
        }
    })
};

db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
    beer_employer_tracker();
});
