import { createSlice } from "@reduxjs/toolkit";

interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

interface InitialState {
  data: Post[];
  loading: boolean;
  error: string | null;
  selectedPost: Post | null;
}

const initialState: InitialState = {
  data: [],
  loading: false,
  error: null,
  selectedPost: null,
};

export const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPosts: (state, action) => {
      return {
        ...state,
        data: action.payload,
      };
    },
    upPost: (state, action) => {
      const { id, title, body } = action.payload;

      const updatedPostIndex = state.data.findIndex((post) => post.id === id);
      const updatedPost = {
        ...state.data[updatedPostIndex],
        title,
        body,
      };
      const updatedPostsArray = [...state.data];
      updatedPostsArray[updatedPostIndex] = updatedPost;

      return {
        ...state,
        data: updatedPostsArray,
      };
    },
    removePost: (state, action) => {
      const updatedPosts = state.data.filter(
        (post) => post.id !== action.payload
      );
      return {
        ...state,
        data: updatedPosts,
      };
    },
    selectPost: (state, action) => {
      state.selectedPost = action.payload;
    },
    clearSelectedPost: (state) => {
      state.selectedPost = null;
    },
  },
});

export const { selectPost, clearSelectedPost, setPosts, upPost, removePost } =
  postSlice.actions;

export default postSlice.reducer;
