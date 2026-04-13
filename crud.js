//reads and writes to a JSON file to manage notes

const fs = require('fs');
const path = require('path');
// Choose file.json because MongoDB wouldn't work
const FILE = path.join(__dirname, 'notes.json');


if (!fs.existsSync(FILE)) {
    fs.writeFileSync(FILE, '[]');
}
// opens the file and parses it to an array of notes, then returns it
function getAll() {
    return JSON.parse(fs.readFileSync(FILE));
}
// saves the array of notes back to the file
function saveAll(notes) {
    fs.writeFileSync(FILE, JSON.stringify(notes, null, 2));
}
// creates a new note with a unique ID and saves it
function create(title, body) {
    const notes = getAll();
    const note = { id: Date.now().toString(), title, body }; //https://shivam1100.medium.com/making-a-simple-yet-interesting-unique-id-generator-using-javascript-72f652557ccA
    notes.push(note); 
    saveAll(notes);
    console.log('Note created!');
}

// finds a note by ID and updates its title and body, then saves it
function update(id, title, body) {
    const notes = getAll();
    const i = notes.findIndex(n => n.id === id);
    if (i !== -1) {
        notes[i] = { id, title, body };
        saveAll(notes);
        console.log('Note updated!');
    }
}
// same as update but deletes the note instead of updating it
function deleteNote(id) {
    const notes = getAll();
    const i = notes.findIndex(n => n.id === id);
    if (i !== -1) {
        notes.splice(i, 1); 
        saveAll(notes);
        console.log('Note deleted!');
    }
}

module.exports = { create, getAll, update, deleteNote }; 