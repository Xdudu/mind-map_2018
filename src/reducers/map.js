const genUid = require('node-uuid').v4;
import item from './item.js'

const rootItem = {
    id: genUid(),
    text: 'Your Mind Map'
}

const initialState = {
    [rootItem.id]: rootItem
}


const map = (state = initialState, action) => {
    switch (action.type) {
        case 'EDIT_ITEM':
            return {...state, ...item(state, action)}
        default:
            return state
    }
}


export default map 