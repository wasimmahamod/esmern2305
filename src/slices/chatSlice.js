import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  chatData:"Mern 2205",
}

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    activeChatInfo: (state,action) => {
      state.chatData = action.payload;
    },

  },
})

// Action creators are generated for each case reducer function
export const { activeChatInfo} = chatSlice.actions

export default chatSlice.reducer