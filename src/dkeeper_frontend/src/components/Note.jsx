import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';

function Note(props) {
  function handleClick(id) {
    console.log("Delete Triggered", id);
    
    props.onDelete(id);
  }

  return (
    <div>
      {props.notes.map((item, index) => (
        <div className="note" key={item.key}>
          <h1>{item.title}</h1>
          <p>{item.content}</p>
          <button onClick={() => handleClick(index+1)}><DeleteIcon/></button>
        </div>
      ))}
    </div>
  );
}

export default Note;
