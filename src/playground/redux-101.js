import { createStore } from 'redux'

/*
  lets explain the parameter. Ignore incrementBy = 1. So you have:
  ({} = {}) that says, if object use it. If no object is passed in, set the default to an empty object. Now lets add in the rest: 
  ({ incrementBy = 1 } = {}). This says take out incrementBy from the object passed in. If it was not passed in, if something attempts to use it, set it to 1 by default. So basically, no matter what you pass in, even if you pass in nothing, the output will AT LEAST be an object (NOT empty) with incrementBy AT LEAST equalling 1, if not the actual value.
*/

// action generators - determines WHAT data will be passed to state
const incrementCount = ({ incrementBy = 1 } = {}) => ({
  type: 'INCREMENT',
  incrementBy
})

const decrementCount = ({ decrementBy = 1 } = {}) => ({
  type: 'DECREMENT',
  decrementBy
})

const setCount = ({ count } = {}) => ({
  type: 'SET',
  count
})

const resetCount = () => ({
  type: 'RESET'
})

// Reducers - determines HOW state handles data
// pure function: output is only determined by input (state & action only)
// never change state or action, just reading off of & returning state
const countReducer = (state = { count: 0 }, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return {
        count: state.count + action.incrementBy
      }

    case 'DECREMENT':
      return {
        count: state.count - action.decrementBy
      }

    case 'SET':
      return {
        count: action.count
      }

    case 'RESET':
      return {
        count: 0
      }
    default:
      return state // no changes to state, so return it
  }
}

// store (state) manipulations based on actions
const store = createStore(countReducer)

const unsubscribe = store.subscribe(() => {
  console.log(store.getState())
})

// action dispatches
store.dispatch(incrementCount({ incrementBy: 5 }))

store.dispatch(incrementCount())

store.dispatch(resetCount())

store.dispatch(decrementCount())

store.dispatch(decrementCount({ decrementBy: 10 }))

store.dispatch(setCount({ count: 101 }))

// redux can be summarized as follows:
// store dispatch with function ->
// function returns payload with type and data ->
// store determines what to do with data based on type (action.type prop)
