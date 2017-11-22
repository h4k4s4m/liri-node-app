const inquirer = require('inquirer');

inquirer.prompt([{
    message: "Who Dis?",
    name: 'name'
}]).then(response =>
    console.log(response));