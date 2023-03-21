const createSlice = require('@reduxjs/toolkit').createSlice

const initialState = {
  numOfCakes: 10,
}
const cakeSlice = createSlice({
  name: 'cake',
  initialState,
  reducers: {
    ordered: (state, action) => {
      console.log('STATE', state)
      console.log('ACTION', action)
      state.numOfCakes--
    },
    restocked: (state, action) => {
      console.log('STATE', state)
      console.log('ACTION', action)
      state.numOfCakes += action.payload
    },
  },
})

module.exports = cakeSlice.reducer
module.exports.cakeActions = cakeSlice.actions
