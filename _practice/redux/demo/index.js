const redux = require('redux')
const { createStore, bindActionCreators, combineReducers } = redux

const CAKE_ORDERED = 'CAKE_ORDERED'
const CAKE_RESTOCKED = 'CAKE_RESTOCKED'
const ICE_CREAM_ORDERED = 'ICE_CREAM_ORDERED'
const ICE_CREAM_RESTOCKED = 'ICE_CREAM_RESTOCKED'

//actions
function orderCake() {
  return {
    type: CAKE_ORDERED,
    payload: 1,
  }
}

function restockCake(quantity = 1) {
  return {
    type: CAKE_RESTOCKED,
    payload: quantity,
  }
}

function orderIceCream(quantity = 1) {
  return {
    type: ICE_CREAM_ORDERED,
    payload: quantity,
  }
}

function restockIceCream(quantity = 1) {
  return {
    type: ICE_CREAM_RESTOCKED,
    payload: quantity,
  }
}

//state
// const initialState = {
//   numberOfCakes: 10,
//   numberOfIceCreams: 20,
// }
const initialCakeState = {
  numberOfCakes: 10,
}

const initialIceCreamState = {
  numberOfIceCreams: 20,
}

//reducers
const cakeReducer = (state = initialCakeState, action) => {
  switch (action.type) {
    case CAKE_ORDERED:
      return {
        ...state,
        numberOfCakes: state.numberOfCakes - 1,
      }
    case CAKE_RESTOCKED: {
      return {
        ...state,
        numberOfCakes: state.numberOfCakes + action.payload,
      }
    }
    default:
      return state
  }
}

const iceCreamReducer = (state = initialIceCreamState, action) => {
  switch (action.type) {
    case ICE_CREAM_ORDERED:
      return {
        ...state,
        numberOfIceCreams: state.numberOfIceCreams - action.payload,
      }
    case ICE_CREAM_RESTOCKED: {
      return {
        ...state,
        numberOfIceCreams: state.numberOfIceCreams + action.payload,
      }
    }
    default:
      return state
  }
}

//store
const rootReducer = combineReducers({
  cake: cakeReducer,
  iceCream: iceCreamReducer,
})
const store = createStore(rootReducer)
console.log('Initial state', store.getState())

const unsubscribe = store.subscribe(() => {
  console.log('update', store.getState())
})

const actions = bindActionCreators(
  { orderCake, restockCake, orderIceCream, restockIceCream },
  store.dispatch
)
// store.dispatch(orderCake())
// store.dispatch(orderCake())
// store.dispatch(restockCake(5))
actions.orderCake()
actions.restockCake(3)
actions.orderIceCream(5)
actions.restockIceCream(1)

unsubscribe()
store.dispatch(orderCake())
