import React from 'react'

import '../css/add-wrap.css'


const AddWrap = ({ handleClick }) => <div>
    <div className="add-before" onClick={() => handleClick('BEFORE')}>
        <svg viewBox="0 0 48 24" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <path d="M19.774 15.407l-1.294-1.294 5.519-5.519 5.519 5.519-1.294 1.294-4.226-4.226z"></path>
        </svg>
    </div>
    <div className="add-after" onClick={() => handleClick('AFTER')}>
        <svg viewBox="0 0 48 24" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <path d="M19.774 8.593l4.226 4.226 4.226-4.226 1.294 1.294-5.52 5.52-5.52-5.52z"></path>
        </svg>
    </div>
    <div className="add-parent" onClick={() => handleClick('PARENT')}>
        <svg viewBox="0 0 24 48" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.704 28.594l-1.406 1.406-6.001-6.001 6.001-6.001 1.406 1.406-4.594 4.594z"></path>
        </svg>
    </div>
    <div className="add-child" onClick={() => handleClick('CHILD')}>
        <svg viewBox="0 0 24 48" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.297 28.594l4.594-4.594-4.594-4.594 1.406-1.406 6.001 6.001-6.001 6.001z"></path>
        </svg>
    </div>
</div>

export default AddWrap