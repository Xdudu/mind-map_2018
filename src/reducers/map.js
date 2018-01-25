import genUid from 'uuid/v4'
import item from './item'


const genNewItem = item => {
    const defaultItem = {
        id: genUid(),
        text: '',
        childIds: [],
        parentId: ''
    }
    return {...defaultItem, ...item}
}

const initialMap = {
    '0': {
        id: '0',
        text: 'My Mind Map :)',
        childIds: [],
        parentId: '',
    }
}

const addSiblings = (map, id, ifAddBefore) => {
    const commonParentId = map[id].parentId,
        commonParent = map[commonParentId],
        newItemIdIndex = commonParent.childIds.indexOf(id) + (ifAddBefore ? 0 : 1),
        updatedChildIdsOfParent = [...commonParent.childIds];
        
    const newItem = genNewItem({ parentId: commonParentId });
    
    updatedChildIdsOfParent.splice(newItemIdIndex, 0, newItem.id);
    
    return {
        ...map, 
        [commonParentId]: {
            ...commonParent,
            childIds: updatedChildIdsOfParent
        },
        [newItem.id]: newItem
    }
}

const addParent = (map, id) => {
    const currParentId = map[id].parentId,
        currParent = map[currParentId],
        idIndex = currParent.childIds.indexOf(id),
        updatedChildIdsOfParent = [...currParent.childIds];
        
    const newParentItem = genNewItem({
        parentId: currParentId, 
        childIds: [...currParent.childIds]
    });
    
    updatedChildIdsOfParent.splice(idIndex, 1, newParentItem.id);
    
    return {
        ...map, 
        [currParentId]: {
            ...currParent,
            childIds: updatedChildIdsOfParent
        },
        [id]: {
            ...map[id],
            parentId: newParentItem.id
        },
        [newParentItem.id]: newParentItem
    }
}

const addChild = (map, id) => {
    const newChildItem = genNewItem({ parentId: id });
    const updatedChildIds = [...map[id].childIds];
    
    updatedChildIds.push(newChildItem.id);
    
    return {
        ...map,
        [id]: {
            ...map[id],
            childIds: updatedChildIds
        },
        [newChildItem.id]: newChildItem
    }
}

const getDescendantIds = (rootId, map) => (
    map[rootId].childIds.reduce((descendantIds, id) => (
        [...descendantIds, id, getDescendantIds(id, map)]
    ), [])
)

const deleteElFromArr = (arr, el) => {
    const elIndex = arr.indexOf(el);
    return [...arr.slice(0, elIndex), ...arr.slice(elIndex + 1)]
}


const map = (map = initialMap, action, state) => {
    switch (action.type) {
        case 'EDIT_ITEM':
            return {...map, [action.id]: item(map[action.id], action)}
        case 'ADD_ITEM_BEFORE':
            return addSiblings(map, action.id, true)
        case 'ADD_ITEM_AFTER':
            return addSiblings(map, action.id)
        case 'ADD_PARENT_ITEM':
            return addParent(map, action.id)
        case 'ADD_CHILD_ITEM':
            return addChild(map, action.id)
        case 'PASTE': 
            const { copiedBranch, selectedId } = state;
            return {
                ...map, 
                ...copiedBranch.items, 
                [copiedBranch.rootId]: { 
                    ...copiedBranch.items[copiedBranch.rootId], 
                    ...{ parentId: selectedId } 
                },
                [selectedId]: { ...map[selectedId], childIds: [...map[selectedId].childIds, copiedBranch.rootId] }
            }
        case 'CUT':
        case 'REMOVE':
            map = {...map};
            const { parentId } = map[action.id],
                deleteIds = [action.id, ...getDescendantIds(action.id, map)];
            deleteIds.forEach(id => delete map[id]);
            return {
                ...map,
                [parentId]: { ...map[parentId], childIds: deleteElFromArr(map[parentId].childIds, action.id) }
            }
        default:
            return map
    }
}


export {
    map as default,
    initialMap
}