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

const genNewItem = (parentId, childIds) => ({
    id: genUid(),
    text: '',
    childIds: childIds || [],
    parentId
})

const addSiblings = (state, id, ifAddBefore) => {
    const commonParentId = state[id].parentId,
        commonParent = state[commonParentId],
        newItemIdIndex = commonParent.childIds.indexOf(id) + (ifAddBefore ? 0 : 1),
        updatedChildIdsOfParent = [...commonParent.childIds];
        
    const newItem = genNewItem(commonParentId);
    
    updatedChildIdsOfParent.splice(newItemIdIndex, 0, newItem.id);
    
    return {
        ...state, 
        [commonParentId]: {
            ...commonParent,
            childIds: updatedChildIdsOfParent
        },
        [newItem.id]: newItem
    }
}

const addParent = (state, id) => {
    const currParentId = state[id].parentId,
        currParent = state[currParentId],
        idIndex = currParent.childIds.indexOf(id),
        updatedChildIdsOfParent = [...currParent.childIds];
        
    const newParentItem = genNewItem(currParentId, [...currParent.childIds]);
    
    updatedChildIdsOfParent.splice(idIndex, 1, newParentItem.id);
    
    return {
        ...state, 
        [currParentId]: {
            ...currParent,
            childIds: updatedChildIdsOfParent
        },
        [id]: {
            ...state[id],
            parentId: newParentItem.id
        },
        [newParentItem.id]: newParentItem
    }
}

const addChild = (state, id) => {
    const updatedChildIds = [...state[id].childIds];
    const newChildItem = genNewItem(id);
    
    updatedChildIds.push(newChildItem.id);
    
    return {
        ...state,
        [id]: {
            ...state[id],
            childIds: updatedChildIds
        },
        [newChildItem.id]: newChildItem
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
        case 'ADD_PARENT_ITEM':
            return addParent(state, action.id)
        case 'ADD_CHILD_ITEM':
            return addChild(state, action.id)
        default:
            return state
    }
}


export default map 