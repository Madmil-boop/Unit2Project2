
const express = require('express');
const app = express();
const { create, read, update, deleteNote } = require('./crud');
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.get('/', async (req, res) => {
    const notes = await read();
    const noteItems = notes.map(note => `
        <li>
            <h1>${note.title}</h1> — ${note.body}
            <a href="/edit/${note._id}">Edit</a>
            <form action="/delete/${note._id}" method="POST" style="display:inline">
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
});

app.get('/new', (req, res) => {
    console.log(__dirname + '/Form/form.html');
    res.sendFile(__dirname + '/Form/form.html');
});

app.post('/new', async (req, res) => {
    const { title, body } = req.body;
    await create(title, body);
    res.redirect('/');
});

app.get('/edit/:id', async (req, res) => {
    const notes = await read();
    const note = notes.find(n => n._id.toString() === req.params.id);
    res.redirect(`/Form/edit.html?id=${note._id}&title=${encodeURIComponent(note.title)}&body=${encodeURIComponent(note.body)}`);
});

app.post('/edit/:id', async (req, res) => {
    const { title, body } = req.body;
    await update(req.params.id, title, body);
    res.redirect('/');
});

app.post('/delete/:id', async (req, res) => {
    await deleteNote(req.params.id);
    res.redirect('/');
});

app.use(express.static(__dirname + '/Form'));

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});