import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import reducer from './reducers'
import { selectItem } from './actions'
import App from './components/app'

import './css/index.css'


const store = createStore(reducer);

const scrollToView = () => {
    const windowWidth = window.innerWidth,
        windowHeight = window.innerHeight,
        scrollX = 2333 - windowWidth / 4,
        scrollY = 2333 - windowHeight / 3;
    window.scroll(scrollX, scrollY);
}

document.body.onclick = e => {
    if (e.target == document.body) store.dispatch(selectItem())
}

window.onload = () => {
    scrollToView();
    render(<Provider store={store}>
        <App />
    </Provider>, document.getElementById('root'))
}