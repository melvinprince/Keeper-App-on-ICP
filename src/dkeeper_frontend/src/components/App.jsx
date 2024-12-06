import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import AddNote from "./AddNote";
import { dkeeper_backend } from  "../../../declarations/dkeeper_backend";


function App() {
  const [notes, setNotes] = useState([]);

  // console.log(dkeeper_backend.readNotes());
  

  function addNote(note) {
    setNotes((prevNotes) => {
      dkeeper_backend.createNote(note.title, note.content);
      const newNote = {
        ...note,
        key: prevNotes.length + 1, // Incremental key
      };
      return [...prevNotes, newNote];
    });
  }

  function deleteNote(id) {
    dkeeper_backend.removeNote(id-1);
    setNotes((prevNotes) => {
      const updatedNotes = prevNotes.filter((note) => note.key !== id);
      return updatedNotes.map((note, index) => ({
        ...note,
        key: index + 1,
      }));
    });
  }


  async function fethcNotes() {
    const notesArray = await dkeeper_backend.readNotes();
    setNotes(
      notesArray.map((note, index) => ({
        ...note,
        key: index + 1, 
      }))
    );
  }


  useEffect(() => {
    // console.log("Triggered");
    fethcNotes();
  }, []);

  return (
    <div>
      <Header />
      <AddNote onAdd={addNote} />
      <Note notes={notes} onDelete={deleteNote}/>
      <Footer />
    </div>
  );
}

export default App;
