import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { firebaseDB } from "../../firebase/config";
import {
  addNewEmptyNote,
  setActiveNote,
  creatingNewNote,
  setNotes,
  setSaving,
  updateNote,
  setPhotoToActiveNote,
  deleteNoteById,
} from "./journalSlice";
import { loadNotes } from "../../helpers/loadNotes";
import { fileUpload } from "../../helpers/fileUpload";
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

export const thunkStartSaveNote = () => {
  return async (dispatch, getState) => {
    dispatch(setSaving());
    const { uid } = getState().auth;
    const { active: note } = getState().journal;

    const noteToFirestore = { ...note };
    delete noteToFirestore.id;
    const docRef = doc(firebaseDB, `${uid}/journal/notes/${note.id}`);
    await setDoc(docRef, noteToFirestore, { merge: true });
    dispatch(updateNote(note));
  };
};

export const thunkStartUploadingFiles = (files = []) => {
  return async (dispatch) => {
    dispatch(setSaving());
    const fileUploadPromisses = [];
    for (const file of files) {
      fileUploadPromisses.push(fileUpload(file));
    }
    const photosUrls = await Promise.all(fileUploadPromisses);
    dispatch(setPhotoToActiveNote(photosUrls));
  };
};

export const thunkDeleteNote = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    const { active: note } = getState().journal;
    const docRef = doc(firebaseDB, `${uid}/journal/notes/${note.id}`);
    try {
      // Delete note.
      await deleteDoc(docRef);
      dispatch(deleteNoteById(note.id));
    } catch (error) {
      // TODO: Handle error here
      console.error(error.message || error);
    }
  };
};
