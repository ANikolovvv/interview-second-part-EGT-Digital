import { createSlice } from "@reduxjs/toolkit";

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

interface InitialState {
  data: User[];
  loading: boolean;
  error: string | null;
}

const initialState: InitialState = {
  data: [],
  loading: false,
  error: null,
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, action) => {
      return {
        ...state,
        data: action.payload,
      };
    },
    upUsers: (state, action) => {
      const { id, name, username, email, address, phone, website, company } =
        action.payload;
      console.log(action.payload, "action");
      const updatedPostIndex = state.data.findIndex((user) => user.id === id);
      const updatedPost = {
        ...state.data[updatedPostIndex],
        name,
        username,
        email,
        address,
        phone,
        website,
        company,
      };
      const updatedPostsArray = [...state.data];
      updatedPostsArray[updatedPostIndex] = updatedPost;

      return {
        ...state,
        data: updatedPostsArray,
      };
    },
  },
});

export const { setUsers, upUsers } = userSlice.actions;

export default userSlice.reducer;
