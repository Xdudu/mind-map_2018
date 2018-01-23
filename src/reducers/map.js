const genUid = require('node-uuid').v4;
import item from './item'

const rootItem = {
    id: '0',
    text: 'My Mind Map :)',
    childIds: [],
    parentId: '',
}

const initialState = {
    '0': rootItem
}

const genNewItem = parentId => ({
    id: genUid(),
    text: '',
    childIds: [],
    parentId
})

const addSiblings = (state, id, ifAddBefore) => {
    const commonParentId = state[id].parentId,
        commonParent = state[commonParentId],
        idIndex = commonParent.childIds.indexOf(id) + (ifAddBefore ? 0 : 1),
        updatedChildIdsOfParent = [...commonParent.childIds];
        
    const newItem = genNewItem(commonParentId);
    
    updatedChildIdsOfParent.splice(idIndex, 0, newItem.id);
    
    return {
        ...state, 
        [commonParentId]: {
            ...commonParent,
            childIds: updatedChildIdsOfParent
        },
        [newItem.id]: newItem
    }
}


const map = (state = initialState, action) => {
    switch (action.type) {
        case 'EDIT_ITEM':
            return {...state, [action.id]: item(state[action.id], action)}
        case 'ADD_ITEM_BEFORE':
            return addSiblings(state, action.id, true)
        case 'ADD_ITEM_AFTER':
            return addSiblings(state, action.id)
        default:
            return state
    }
}


export default map 