import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers } from 'redux'
import App from './App'
import ancedoteReducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import filterReducer from './reducers/filterReducer'
import { Provider } from 'react-redux'


const reducer = combineReducers({
  anecdotes: ancedoteReducer,
  message: notificationReducer, 
  filter: filterReducer
})
const store = createStore(reducer)

const render = () => {
  ReactDOM.render(
    <Provider store={store} >
      <App  />
    </Provider>,
    document.getElementById('root')
  )
}

render()
store.subscribe(render)