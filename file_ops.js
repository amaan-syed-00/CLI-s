const fs = require('fs')
const { Command } = require('commander')
const cmd = new Command()

function counter(file){
    fs.readFile(file , 'utf-8' , callback)
}

function callback(err , data){
    if(err){
        console.log("Error in reading the file !")
        console.log(err)
    }
    else{
        const words = data.split(" ").length;
        console.log(`There are ${words} number of words in the file`)
    }
}

cmd
    .name('word counter')
    .description('CLI to do file based tasks')
    .version('1.0.0')

cmd
    .command('count')
    .description('counting the number of words in the given file')
    .argument('<filename>', 'file on which operations are to be done')
    .action(counter)

cmd.parse()