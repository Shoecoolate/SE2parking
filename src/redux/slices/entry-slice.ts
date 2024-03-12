import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EntriesProps } from "../../types";

const initialState: { data: EntriesProps[] } = {
  data: [],
};

const entrySlice = createSlice({
  name: "entries",
  initialState,
  reducers: {
    addEntry(state, action: PayloadAction<EntriesProps>) {
      state.data.unshift(action.payload);
    },
    removeEntry(state, action: PayloadAction<{ entryId: string }>) {
      const filtered = state.data.filter(
        (entry) => entry.id !== action.payload.entryId
      );

      return { data: filtered };
    },
  },
});

export const { addEntry, removeEntry } = entrySlice.actions;

export default entrySlice.reducer;
