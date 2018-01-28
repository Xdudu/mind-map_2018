import React from 'react'
import CSSModules from 'react-css-modules'

import styles from '../css/tool-btn.css'


const ToolBtn = CSSModules(styles, { allowMultiple: true, handleNotFoundStyleName: 'ignore' })(
    ({ svgPath, handleClick }) => <div styleName="btn" onClick={handleClick}>
        <svg viewBox="0 0 36 36" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <path d={svgPath} />
        </svg>
    </div>
)


export default ToolBtn