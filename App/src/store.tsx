import { combineReducers, configureStore } from "@reduxjs/toolkit";
import postReducer from "./features/postSlice";
import userReduser from "./features/userSlice"
import { useDispatch } from "react-redux";

const rootReducer = combineReducers({
    post: postReducer,
    user:userReduser
    // other reducers...
  });
  
 const store = configureStore({
  reducer: {
    post: postReducer,
    user:userReduser
  },
});
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch // Export a hook that can be reused to resolve types

export default store