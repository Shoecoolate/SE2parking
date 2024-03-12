import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ModalIds } from "../../types";

interface SetModalProps {
  modalId: ModalIds;
}

const initialState = {
  modalId: "",
};

const modalSlice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    setModalId(state, action: PayloadAction<SetModalProps>) {
      state.modalId = action.payload.modalId;
    },
    clearModalId(state) {
      state.modalId = "";
    },
  },
});

export const { setModalId, clearModalId } = modalSlice.actions;

export default modalSlice.reducer;
