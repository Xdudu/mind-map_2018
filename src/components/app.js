import React from 'react'
import CSSModules from 'react-css-modules'

import Map from './map'
import Tools from './tools'

import styles from '../css/map.css'


const App = () => <div id="app-root">
    <Map />
    <Tools />
</div>


export default App