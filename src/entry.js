import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import reducer from './reducers'
import Branch from './components/branch'
import './css/index.css'


const store = createStore(reducer);

const App = <Provider store={store}>
    <div style={{ height: 0 }}>
        <Branch id="0" />
    </div>
</Provider>

render(App, document.getElementById('root'))