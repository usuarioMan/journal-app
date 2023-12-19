import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSaving: false,
  messageSaved: "",
  notes: [],
  active: {
    id: null,
    title: "",
    body: "",
    date: null,
    imageUrl: [],
  },
};
export const journalSlice = createSlice({
  name: "journal",
  initialState,
  reducers: {
    creatingNewNote: (state) => {
      state.isSaving = true;
    },
    addNewEmptyNote: (state, action) => {
      state.notes.push(action.payload);
      state.isSaving = false;
    },

    setActiveNote: (state, action) => {
      state.active = action.payload;
      state.messageSaved = "";
    },

    setNotes: (state, action) => {
      state.notes = action.payload;
    },

    setSaving: (state) => {
      state.isSaving = true;
      state.messageSaved = "";
    },

    updateNote: (state, action) => {
      state.isSaving = false;
      state.notes = state.notes.map((note) => {
        if (note.id !== action.payload.id) return note;
        return action.payload;
      });
      state.messageSaved = `${action.payload.title}, successfully saved`;
    },

    deleteNoteById: (state, action) => {},

    setPhotoToActiveNote: (state, action) => {
      state.active.imageUrl = [...state.active.imageUrl, ...action.payload];
      state.isSaving = false;
    },
  },
});
// Action creators are generated for each case reducer function
export const {
  creatingNewNote,
  addNewEmptyNote,
  setActiveNote,
  setNotes,
  setSaving,
  updateNote,
  deleteNoteById,
  setPhotoToActiveNote,
} = journalSlice.actions;
