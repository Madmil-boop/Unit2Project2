
const { MongoClient} = require('mongodb');
const uri = "mongodb+srv://mmiller827212_db_user:ZQM0zFxXh3FFprSi@notes.64upxgx.mongodb.net/?appName=Notes";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri);




async function create(note, title, body) {
  try {
    await client.connect();
    const database = client.db('NoteDB');
    const notes = database.collection('note');
    await notes.insertOne({ title: title, body: body });
    console.log('Note created successfully!');
  }
    finally {
      await client.close();
    }
}

async function read() {
    try {
    await client.connect();
    const database = client.db('NoteDB');
    const notes = database.collection('note');
    const allNotes = await notes.find({}).toArray();
    console.log(allNotes);
  }
    finally {
      await client.close();
    }



}

async function update(id, title, body) {
    try {
    await client.connect();
    const database = client.db('NoteDB');
    const notes = database.collection('note');
    await notes.updateOne({ _id: id }, { $set: { title: title, body: body } });
    console.log('Note updated successfully!');
  }
    finally {
      await client.close();
    }

  
}

async function deleteNote(id) {
    try {
    await client.connect();
    const database = client.db('NoteDB');
    const notes = database.collection('note');
    await notes.deleteOne({ _id: id });
    console.log('Note deleted successfully!');
  }
    finally {
      await client.close();
    }
  
}


