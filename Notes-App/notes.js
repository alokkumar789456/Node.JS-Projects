import chalk from 'chalk'
import fs from 'fs'

function getNotes() {
    console.log(chalk.green('Mini Project - note App'), chalk.blue('\nadd : to Add a Note\nremove : to Remove a note \nlist : to List all The notes \nupdate : to Update the List'))
}

function writeNotes(title, body) {
    let notes = loadNotes()
    const duplicateNotes = notes.filter((note) => note.title === title)
    if (duplicateNotes.length == 0) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse(title), chalk.bgGreen('Got Added !'))
    } else {
        console.log(chalk.red.inverse('title is already been taken !'))
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

function loadNotes() {
    try {
        let dataBuffer = fs.readFileSync('notes.json')
        let dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        console.log('no data')
        return []
    }
}
function removeNotes(title) {
    let notes = loadNotes()
    const notesToKeep = notes.filter((note) => note.title !== title)
    if (notes.length > notesToKeep.length) {
        console.log(chalk.green.inverse('Notes Got Removed!'))
        saveNotes(notesToKeep)
    } else {
        console.log(chalk.red.inverse('No Note Found !'))
    }
}

function listNotes() {
    let notes = loadNotes()
    notes.forEach((note) => { console.log(chalk.yellow('title :'), chalk.blue.bold(note.title), chalk.green('\n Body :'), chalk.green.bold(note.body)) })
}

function updateNotes(title, newBody) {
    let notes = loadNotes();
    const noteToUpdate = notes.find((note) => note.title === title)
    if (noteToUpdate) {
        noteToUpdate.body = newBody;
        saveNotes(notes);
        console.log(chalk.green.inverse('Note Updated!'))
    } else {
        console.log(chalk.red.inverse('No Note Found!'))
    }
}

export { getNotes, writeNotes, loadNotes, removeNotes, listNotes, updateNotes }
