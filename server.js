
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
            <strong>${note.title}</strong> — ${note.body}
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
});

app.get('/new', (req, res) => {
    res.sendFile(__dirname + '/Form/form.html');


});

app.post('/new', async (req, res) => {
    const { title, body } = req.body;
    await create('', title, body);
    res.redirect('/');
});

app.get ('/edit/:id', (req, res) => {
    res.sendFile(__dirname + '/Form/form.html');
});

app.post('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const { title, body } = req.body;
    await update(id, title, body);
    res.redirect('/');
});

app.post('/delete/:id', async (req, res) => {
    const { id } = req.params;
    await deleteNote(id);
    res.redirect('/');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});