
const express = require('express');
const { read } = require('node:fs');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
    const data = await read('');
    res.json(data);
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