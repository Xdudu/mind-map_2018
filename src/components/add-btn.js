import React from 'react'
import CSSModules from 'react-css-modules'

import styles from '../css/add-btn.css'


const AddBtn = CSSModules(styles, { allowMultiple: true, handleNotFoundStyleName: 'ignore' })(
    ({ type, show, handleToggleHide, handleClick }) => (
        <div styleName={`add-${type.toLowerCase()}`} style={{ display: show ? 'block' : 'none' }}
           onMouseEnter={() => handleToggleHide(type)}
           onMouseLeave={() => handleToggleHide(type)}
           onClick={() => handleClick(type)}>
           <svg viewBox={btn[type].viewBox} version="1.1" xmlns="http://www.w3.org/2000/svg">
               <path d={btn[type].path}/>
           </svg>
       </div>
    )
)

const btn = {
    BEFORE: {
        viewBox: '0 0 48 24',
        path: 'M19.774 15.407l-1.294-1.294 5.519-5.519 5.519 5.519-1.294 1.294-4.226-4.226z',
    },
    AFTER: {
        viewBox: '0 0 48 24',
        path: 'M19.774 8.593l4.226 4.226 4.226-4.226 1.294 1.294-5.52 5.52-5.52-5.52z',
    },
    PARENT: {
        viewBox: '0 0 24 48',
        path: 'M15.704 28.594l-1.406 1.406-6.001-6.001 6.001-6.001 1.406 1.406-4.594 4.594z',
    },
    CHILD: {
        viewBox: '0 0 24 48',
        path: 'M8.297 28.594l4.594-4.594-4.594-4.594 1.406-1.406 6.001 6.001-6.001 6.001z',
    },
}


export default AddBtn