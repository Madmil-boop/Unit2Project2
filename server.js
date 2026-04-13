// server.js
// This file sets up an Express server to handle CRUD operations for notes. It serves HTML pages for creating and editing notes, and provides API endpoints for managing notes in a JSON file.

const express = require('express');
const app = express();
const { create, getAll, update, deleteNote } = require('./crud');
const PORT = 3000;
 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/Form')); 
 
// Serve HTML pages
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
// Route to serve the form for creating a new note
app.get('/new', (req, res) => {
    res.sendFile(__dirname + '/Form/form.html');
});
// Route to serve the form for editing an existing note
app.get('/edit-form', (req, res) => {
    res.sendFile(__dirname + '/Form/edit.html');
});
 
// API endpoints for CRUD operations
app.get('/api/notes', (req, res) => {
    const notes = getAll();
    res.json(notes); 
});

// get a single note by ID
app.get('/api/notes/:id', (req, res) => {
    const notes = getAll();
    const note = notes.find(n => n.id === req.params.id);
    if (!note) return res.status(404).json({ error: 'Note not found' });
    res.json(note);
});

// create a new note
//
app.post('/api/notes', (req, res) => {
    const { title, body } = req.body;
    create(title, body);
    res.json({ success: true });
});
 
// update an existing note
app.put('/api/notes/:id', (req, res) => {
    const { title, body } = req.body;
    update(req.params.id, title, body);
    res.json({ success: true });
});
 
// delete a note
app.delete('/api/notes/:id', (req, res) => {
    deleteNote(req.params.id);
    res.json({ success: true });
});
 
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
 