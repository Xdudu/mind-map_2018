import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import reducer from './reducers'
import Map from './components/map'
import './css/index.css'


const store = createStore(reducer);

const scrollToView = () => {
    const windowWidth = window.innerWidth,
        windowHeight = window.innerHeight,
        scrollX = 2333 - windowWidth / 4,
        scrollY = 2333 - windowHeight / 3;
    window.scroll(scrollX, scrollY);
}


window.onload = () => {
    scrollToView();
    render(<Provider store={store}>
        <Map />
    </Provider>, document.getElementById('root'))
}