import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import reducer from './reducers/item'
import Item from './components/item'
import './css/index.css'


const store = createStore(reducer);

const App = <Provider store={store}>
    <Item />
</Provider>

render(App, document.getElementById('root'))