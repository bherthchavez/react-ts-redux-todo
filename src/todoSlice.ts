import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from "./app/store";
import { firestore } from "./firebase";
import { InitialState, KeepNote } from "./types/Notes";
import { WritableDraft } from "immer/dist/internal.js";



export const fetchNotes = createAsyncThunk("notes/fetchNotes", async (_data, { rejectWithValue }) => {
  try {
    const querySnapshot = await firestore.collection('todos').get();
    const items = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    // console.log(items)
    return items;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});



// Define the initial state using that type
const initialState: InitialState = {
  notes: [],
  loading: false,
  error: null,
};

export const toDoSlice = createSlice({
  name: "todos",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addNote: (_state, action) => {
      const { title, note } = action.payload;
      firestore.collection('todos')
        .add({ title, note })
        .then(() => {
          console.log( "Added new notes.")
        })
        .catch((error) => {
          console.log(error.message)
        });
    },
    updateNote: (_state, action) => {
      const { id, title, note } = action.payload;
      firestore
      .collection("todos")
      .doc(id)
      .update({ title, note })
      .then(() => {
        console.log("updated notes");
      })
      .catch((error) => {
        console.log(error.message);
      });
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    deleteNote: (_state, action) => {
      const { id } = action.payload;
      firestore.collection('todos')
      .doc(id)
      .delete()
      .then(() => {
       console.log("deleted note!")
      })
      .catch((error) => {
        console.log(error.message)
      });
    },
  },
  extraReducers: (builder) => {
    builder
      // The pending case sets the loading state to true
      .addCase(fetchNotes.pending, (state) => {
        state.loading = true
        state.error = null
      })
      // The fulfilled case updates the loading state to false and stores the fetched users' data
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.loading = false
        state.error = null
        state.notes = action.payload as WritableDraft<KeepNote>[]
      })
      // The rejected case sets the loading state to false and stores the error message.
      .addCase(fetchNotes.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  }
});

export const { addNote, updateNote, deleteNote } = toDoSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.toDo;

export default toDoSlice.reducer;
