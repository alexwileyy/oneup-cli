// Import inquirer library
var inquirer = require('inquirer');

// Import file system
const fs = require('fs');

// Import part module
const path = require('path');

// Import colors module
const colors = require('colors');

// Import Styles
const exampleStyleDir = './templates/styles';

const classTemplate = require('../templates/components/class-redux');

let createDir = false;

/**
 * Creates a new component
 * @param {*} _ 
 */
const createComponent = _ => {
    inquirer
        .prompt([
            {
                type: "list",
                name: "type",
                message: "What type of component would you like to create?",
                choices: [
                    {
                        value: "stateful-class-redux",
                        name: "Stateful Class Component With Redux"
                    },
                    {
                        value: "stateful-clas",
                        name: "Stateful Class Component Without Redux"
                    },
                    {
                        value: "presentation",
                        name: "Presentation Component"
                    },
                    {
                        value: "hooks",
                        name: "React Hooks (New!)"
                    }
                ],
                default: 0
            },
            {
                type: "confirm",
                name: "current_path",
                message: "Should the component be created in your current working directory?",
                default: false
            },
            {
                type: "confirm",
                name: "createDir",
                message: "Would you like to automatically create the component directory strcuture?",
                default: true
            },
            {
                type: "input",
                name: "path",
                message: "Specify a path to install the component into. [Must be a directory]",
                when: (response) => {
                    if(response.createDir) {
                        createDir = true;
                    }
                    return !response['current_path'] && response['createDir'];
                },
                validate: (input) => {
                    if(createDir) return true;
                    const validate = fs.existsSync(path.resolve(input)) && fs.lstatSync(path.resolve(input)).isDirectory();
                    if(!validate) {
                        return "The path specified either does not exist or is not a directory.";
                    } else {
                        return true;
                    }
                  },
            },
            {
                type: "input",
                name: "name",
                message: "Give the component a name:"
            }
        ])
        .then(answers => {
            // Use user feedback for... whatever!!
            //console.log(answers);
            const { name, createDir } = answers;
            let template;
            switch (answers.type) {
                case "stateful-class-redux":

                    // Generate the template
                    template = classTemplate.generateTemplate({name: answers.name});

                    // Get the file path
                    const filePath = answers.current_path ? "./" : answers.path;

                    // Create a new directory if the user has specified to do so
                    if(createDir) fs.mkdirSync(filePath, {recursive: true});
                    
                    // Create new JS/JSX file
                    fs.writeFileSync(`${filePath}/${name.charAt(0).toUpperCase() + name.slice(1)}-Component.jsx`, template);

                    // Copy sass file
                    fs.copyFileSync(path.resolve(`${exampleStyleDir}/example.module.scss`), path.resolve(`${filePath}/example.module.scss`));

                    break;
                default:
                    throw new Error("Component type not found.");
            }
            console.log("Component created".green);
        });
}

exports.createComponent = createComponent;