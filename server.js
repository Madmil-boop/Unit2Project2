
const express = require('express');
const app = express();
const { create, read, update, deleteNote } = require('./crud');
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
  try {
    const notes = read();
    const noteItems = notes.map(note => `
        <li>
            <h1>${note.title}</h1> — ${note.body}
            <a href="/edit/${note.id}">Edit</a>
            <form action="/delete/${note.id}" method="POST" style="display:inline">
                <button type="submit">Delete</button>
            </form>
        </li>
    `).join('');

    res.send(`
        <!DOCTYPE html>
        <html>
        <head><title>My Notes</title></head>
        <body>
            <h1>My Notes</h1>
            <a href="/new"><button>+ Add Note</button></a>
            <ul>${noteItems.length ? noteItems : '<li>No notes yet.</li>'}</ul>
        </body>
        </html>
    `);
  } catch (error) {
    console.error('HOME ROUTE ERROR:', error);
    res.status(500).send('Unable to load notes.');
  }
});

app.get('/new', (req, res) => {
  res.sendFile(__dirname + '/Form/form.html');
});

app.post('/new', async (req, res) => {
  try {
    const { title, body } = req.body;
    create(title, body);
    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.status(500).send('Unable to save note.');
  }
});

app.get('/edit-form', (req, res) => {
  res.sendFile(__dirname + '/Form/edit.html');
});

app.get('/edit/:id', (req, res) => {
  try {
    const notes = read();
    const note = notes.find(n => n.id === req.params.id);
    if (!note) return res.status(404).send('Note not found');
    res.redirect(`/edit-form?id=${note.id}&title=${encodeURIComponent(note.title)}&body=${encodeURIComponent(note.body)}`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Unable to load note for editing.');
  }
});

app.post('/edit/:id', (req, res) => {
  try {
    const { title, body } = req.body;
    update(req.params.id, title, body);
    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.status(500).send('Unable to update note.');
  }
});

app.post('/delete/:id', (req, res) => {
  try {
    deleteNote(req.params.id);
    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.status(500).send('Unable to delete note.');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});