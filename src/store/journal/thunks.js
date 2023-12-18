import { collection, doc, setDoc } from "firebase/firestore/lite";
import { firebaseDB } from "../../firebase/config";
import {
  addNewEmptyNote,
  setActiveNote,
  creatingNewNote,
  setNotes,
} from "./journalSlice";
import { loadNotes } from "../../helpers/loadNotes";
export const thunkStartNewNote = () => {
  return async (dispatch, getState) => {
    dispatch(creatingNewNote());
    const { uid } = getState().auth;

    // The note that is going to be added to the state.
    const newNote = {
      title: "",
      body: "",
      date: new Date().getTime(),
    };
    // Ref to document
    const newDoc = doc(collection(firebaseDB, `${uid}/journal/notes`));
    // Insert new empty note.
    await setDoc(newDoc, newNote);
    // Add id to note. Not saved to the database.
    newNote.id = newDoc.id;

    dispatch(addNewEmptyNote(newNote));
    dispatch(setActiveNote(newNote));
  };
};

export const thunkStartLoadingNotes = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    if (!uid) throw new Error("El UID del usuario no existe!");
    const notes = await loadNotes(uid);
    dispatch(setNotes(notes));
  };
};
