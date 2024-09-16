//! basic commmands
//? writeFileSync (creats a new file in directorty)
// let fs = require('fs')
// fs.writeFileSync('helloo.txt','hey there i am new here ')

//? appendFileSync (updates a current file)
// let fs = require('fs')
// fs.appendFileSync('hello.txt','\n hey i am using append!');

//? lets  read a file from directory 
// const fs = require('fs');
// let data = fs.readFileSync('hello.txt', 'utf8');
// console.log(data);

//? lets delete helloo.txt from the directory (we use unlink)
// const fs = require('fs')
// fs.unlinkSync('hello.txt')
// console.log('file deleted')

//? importing a created module (also see util.js) (11)
// const funBlock =  require('./util.js')
// require('./util.js')
// console.log('app.js is executed');
// funBlock()

//? importing a funtion Add as module in app.js
// let addFuntion = require('./util')
// addFuntion(1,2)

//! Mini projects it seems !
//? importing a function from file notes .js 
// import chalk from 'chalk';
// let validator = require('validator')
// let getNotes = require('./notes')
// getNotes()

//! use cases 
//? validator library
// console.log(validator.isEmail('a@gmail.com'));
// console.log(validator.isURL('https://google.com'));
// const str = "Hello, world!";
// const seed = "world";
// console.log(validator.contains(str, seed)); 
//! use cases 
//? chalk library
// console.log(chalk.red.bold.italic('Chalk successfully imported'))
// console.log(chalk.hex('#DEADED').underline('Hello, world!'))
// console.log(chalk.rgb(15, 100, 204).inverse('Hello!'))

//! process is a object which has mulitiple methods 
//? array [] after argv defines index to be executed from particular array if you dont give that array it will give you full array 
// console.log(process.argv[2]);

//! actual mini project (NOTE APP)
import { getNotes, writeNotes, removeNotes, listNotes, updateNotes } from './notes.js';
import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';

getNotes()
//! process package
// let command1 = process.argv
// console.log(command1);
// let command2 = yargs.argv //video method if we use old require method instead of import method we will get output for this orelse UnDefined 

//! yargs package
//? note: if you type node app.js --help you will get two options you can check the current app.js verion which is yarn version and a help option 
//!how to customize your yargs or app verion note changing yargs version should always be upside oreles it will not show the changes 
yargs(hideBin(process.argv))
  .version('21.07.02')
  .argv;

// console.log(yargs(hideBin(process.argv)).argv) //you will get output for this 
// console.log(command2); //you will get undefined 

//! create your own command using yargs 

//? create command - ADD
yargs(hideBin(process.argv))
  .command({
    command: 'add',
    describe: 'Add a New Note Using this command',
    builder: {
      title: {
        describe: 'Note title',
        demandOption: true,
        type: 'string'
      },
      body: {
        describe: 'Note Body',
        demandOption: true,
        type: 'string'
      }
    },
    handler: function (argv) {
      writeNotes(argv.title, argv.body);
    }
  }).argv;

// Create command - REMOVE
yargs(hideBin(process.argv)).command({
  command: 'remove',
  describe: 'Remove a Note using this command',
  builder: {
    title: {
      describe: 'Remove Title',
      demandOption: true,
      type: 'string'
    }
  },
  handler: function (argv) {
    removeNotes(argv.title);
  }
}).argv;

// Create command - LIST 
yargs(hideBin(process.argv)).command({
  command: 'list',
  describe: 'List all Notes by using this command',
  handler: function () {
    listNotes();
  }
}).argv;

// Create command - UPDATE 
yargs(hideBin(process.argv)).command({
  command: 'update',
  describe: 'Update a Note using this command',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string'
    },
    body: {
      describe: 'New Note Body',
      demandOption: true,
      type: 'string'
    }
  },
  handler: function (argv) {
    updateNotes(argv.title, argv.body);
  }
}).argv