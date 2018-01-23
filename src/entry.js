import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import reducer from './reducers'
import Branch from './components/branch'
import './css/index.css'


const store = createStore(reducer);

const scrollToView = () => {
    const windowWidth = window.innerWidth,
        windowHeight = window.innerHeight,
        scrollX = 2333 - windowWidth / 4,
        scrollY = 2333 - windowHeight / 3;
    window.scroll(scrollX, scrollY);
}
    
const map = <div className="map">
    <Branch id="0" />
</div>


window.onload = () => {
    scrollToView();
    render(<Provider store={store}>
        {map}
    </Provider>, document.getElementById('root'))
}