const store = require('./app/store')
const { cakeActions } = require('./features/cake/cakeSlice')
const { iceCreamActions } = require('./features/icecream/iceCreamSlice')
const { fetchUsers } = require('./features/user/userSlice')

console.log('Initial state', store.getState())

const unsubscribe = store.subscribe(() => {
  console.log('-----')
  console.log('update', store.getState())
  console.log('-----')
})

// store.dispatch(cakeActions.ordered())
// store.dispatch(cakeActions.ordered(2))
// store.dispatch(cakeActions.restocked(3))
// store.dispatch(iceCreamActions.ordered())
// store.dispatch(iceCreamActions.restocked(3))

store.dispatch(fetchUsers())
// unsubscribe()
