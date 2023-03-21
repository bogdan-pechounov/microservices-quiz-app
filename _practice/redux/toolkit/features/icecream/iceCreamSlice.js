const { createSlice } = require('@reduxjs/toolkit')
const { cakeActions } = require('../cake/cakeSlice')

const initialState = {
  numOfIceCreams: 20,
}

const iceCreamSlice = createSlice({
  name: 'icecream',
  initialState,
  reducers: {
    ordered: (state) => {
      state.numOfIceCreams--
    },
    restocked: (state, action) => {
      state.numOfIceCreams += action.payload
    },
  },
  // extraReducers: {
  //   ['cake/ordered']: (state,action) => {
  //     state.numOfIceCreams--
  //   }
  // }
  extraReducers: (builder) => {
    builder.addCase(cakeActions.ordered, (state) => {
      state.numOfIceCreams--
    })
  },
})

module.exports = iceCreamSlice.reducer
module.exports.iceCreamActions = iceCreamSlice.actions
