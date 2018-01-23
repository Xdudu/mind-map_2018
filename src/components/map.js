import React from 'react'
import CSSModules from 'react-css-modules'

import Branch from './branch'

import styles from '../css/map.css'


const Map = CSSModules(styles, { allowMultiple: true, handleNotFoundStyleName: 'ignore' })(
    () => <div styleName="map">
        <Branch id="0" level={0} />
    </div>
)


export default Map