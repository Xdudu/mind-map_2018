import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import reducer from './reducers'
import { selectItem } from './actions'
import App from './components/app'
import { retrieveMap } from './helpers/storage'
import keyMaster from './helpers/key-master'

import './css/index.css'


const retrievedMap = retrieveMap();
const store = createStore(reducer, { map: retrievedMap });

keyMaster(store)

document.body.onclick = e => {
    if (e.target === document.body || typeof e.target.className === 'string' && e.target.className.indexOf('branch') === 0) {
        store.dispatch(selectItem())
    }
}

const scrollToView = () => {
    const windowWidth = window.innerWidth,
    windowHeight = window.innerHeight,
    scrollX = 333 - windowWidth / 4,
    scrollY = 3333 - windowHeight / 3;
    window.scroll(scrollX, scrollY);
}

window.onload = () => {
    scrollToView();
    render(<Provider store={store}>
        <App />
    </Provider>, document.getElementById('root'))
}
