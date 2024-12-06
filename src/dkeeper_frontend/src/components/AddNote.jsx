import React, { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import { Fab } from "@mui/material";
import { Zoom } from '@mui/material';

function AddNote(props) {

  const [clicked, setClicked] = useState(false);

  const [note, setNote] = useState({
    title: "",
    content: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setNote((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  }

  function newNote(event) {
    event.preventDefault();
    if (note.title && note.content) {
        props.onAdd(note);
        setNote({
        title: "",
        content: "",
        });
        setClicked(false);
    } else {
        alert("Please fill out both fields");
    }
  }

  function handleClick(event) {
    setClicked(true);
  }

  return (
    <div>
      <form className="create-note">
        {clicked && (
          <input
            name="title"
            placeholder="Title"
            onChange={handleChange}
            value={note.title}
          />
        )}

        <textarea
          name="content"
          placeholder="Take a note..."
          rows={clicked ? "3" : "1"}
          onChange={handleChange}
          value={note.content}
          onClick={handleClick}
        />
        {clicked && (
        <Zoom in={true}>
            <Fab onClick={newNote}><AddIcon/></Fab>
        </Zoom>
        )}
      </form>
    </div>
  );
}

export default AddNote;
