// for user input when node program runs
const inquirer = require('inquirer');
const db = require('./db/connection.js');

db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
    beer_employer_tracker();
});

