function loadNotes() {
  const notesList = document.getElementById('notes-list'); 
  notesList.innerHTML = ''; // Clear existing notes
    fetch('/api/notes') // Fetch notes from the server
    .then(response => response.json())
    .then(notes => {
      notes.forEach(note => {
        const noteItem = document.createElement('li');
        noteItem.innerHTML = `
          <h3>${note.title}</h3>
          <p>${note.body}</p>
            <button onclick="editNote('${note._id}')">Edit</button>
            <button onclick="deleteNote('${note._id}')">Delete</button>
        `;
        notesList.appendChild(noteItem);
      });
    })
    .catch(error => console.error('Error fetching notes:', error));
}
