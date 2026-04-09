const fs = require('fs');
const path = require('path');

const FILE = path.join(__dirname, 'notes.json');

// Make sure the file exists
if (!fs.existsSync(FILE)) {
    fs.writeFileSync(FILE, '[]');
}

function getAll() {
    return JSON.parse(fs.readFileSync(FILE));
}

function saveAll(notes) {
    fs.writeFileSync(FILE, JSON.stringify(notes, null, 2));
}

function create(title, body) {
    const notes = getAll();
    const note = { id: Date.now().toString(), title, body };
    notes.push(note);
    saveAll(notes);
    console.log('Note created!');
}

function read() {
    return getAll();
}

function update(id, title, body) {
    const notes = getAll();
    const i = notes.findIndex(n => n.id === id);
    if (i !== -1) {
        notes[i] = { id, title, body };
        saveAll(notes);
        console.log('Note updated!');
    }
}

function deleteNote(id) {
    const notes = getAll().filter(n => n.id !== id);
    saveAll(notes);
    console.log('Note deleted!');
}

module.exports = { create, read, update, deleteNote };