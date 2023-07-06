import { createSlice } from "@reduxjs/toolkit";
// import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from "./app/store";

// Define a type for the slice state
interface TodoState {
  id: number;
  title: string;
  note: string;
}

// Define the initial state using that type
const initialState: TodoState[] = [];

export const toDoSlice = createSlice({
  name: "todo",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addNote: (state, action) => {
      state.push(action.payload);
    },
    updateNote: (state, action) => {
      const { id, title, note } = action.payload;
      const existingNote = state.find((note) => note.id === id);
      if (existingNote) {
        existingNote.title = title;
        existingNote.note = note;
      }
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    deleteNote: (state, action) => {
      const { id } = action.payload;
      const existingNote = state.find((note) => note.id === id);
      if (existingNote) {
        return state.filter((note) => note.id !== id);
      }
    },
  },
});

export const { addNote, updateNote, deleteNote } = toDoSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.toDo;

export default toDoSlice.reducer;
