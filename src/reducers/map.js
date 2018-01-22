const genUid = require('node-uuid').v4;
import item from './item'

const rootItem = {
    id: '0',
    text: 'My Mind Map :)',
    childIds: ['1', '2'],
}

const initialState = {
    '0': rootItem,
    '1': {
        id: '1',
        text: 'sub1',
        childIds: [ ],
    },
    '2': {
        id: '2',
        text: 'sub2',
        childIds: [ ],
    }
}


const map = (state = initialState, action) => {
    switch (action.type) {
        case 'EDIT_ITEM':
            return {...state, [action.id]: item(state[action.id], action)}
        default:
            return state
    }
}


export default map 