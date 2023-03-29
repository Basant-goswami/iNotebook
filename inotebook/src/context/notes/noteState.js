import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";

  const initialNote = []
  const [notes, setNote] = useState(initialNote);

  // GET ALL NOTES
  const getNotes = async () => {
    //api call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("authtoken")
      }
    });
    const json = await response.json()
    console.log(json)
    setNote(json)
  }

  // ADD A NOTE
  const addNote = async (title, description, tag) => {
    //api call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("authtoken")
      },
      body: JSON.stringify({ title, description, tag })
    });
    const json = await response.json();
    console.log(json);

    console.log("adding a new note");
    const note = {
      "_id": "64063ce679fa4c272c8d3499",
      "user": "6403a08826f9ac8393883caad6",
      "title": title,
      "description": description,
      "tag": tag,
      "date": "2023-03-06T19:20:06.221Z",
      "__v": 0
    };
    setNote(notes.concat(note))   // concat returns a array where as push updates a array
  }

  // DELETE A NOTE
  const deleteNote = async (id) => {
    //api call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("authtoken")
      }
    });
    const json = await response.json();
    console.log(json)

    console.log("deleting the particular node id" + id);
    const newNotes = notes.filter((note) => { return note._id !== id });
    setNote(newNotes);
  }

  // EDIT A NOTE
  const editNote = async (id, title, description, tag) => {
    //api call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("authtoken")
      },
      body: JSON.stringify({ title, description, tag })
    });
    const json = await response.json();
    console.log(json)

    let newNotes = JSON.parse(JSON.stringify(notes))
    // Logic to edit in client
    for (let index = 0; index < notes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNote(newNotes);
  }

  return (
    // <NoteContext.Provider value={{ state, update}}>
    <NoteContext.Provider value={{ notes, addNote, editNote, deleteNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;