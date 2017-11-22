const inquirer = require('inquirer');
const Twitter = require('twitter');

inquirer.prompt([{
    message: "Who Dis?",
    name: 'name'

}]).then(response =>

    console.log(response)


);