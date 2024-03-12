import { configureStore } from "@reduxjs/toolkit";

// Slices
import modalSlice from "./slices/modal-slice";
import entrySlice from "./slices/entry-slice";

export const store = configureStore({
  reducer: {
    modals: modalSlice,
    entries: entrySlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
