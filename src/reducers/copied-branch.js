import genUid from 'uuid/v4'


const initialCopiedBranch = { 
    rootId: '', 
    items: {} 
};

const renewIdsInItem = (item, parentId, id) => ({
    ...item,
    parentId: parentId,
    id: id || genUid(),
    childIds: item.childIds.map(oldId => genUid())
})

const genMapBetween2Array = (arr1, arr2) => new Map(arr1.map((el, i) => [el, arr2[i]]))

const copyDescendants = (rootItem, newRootItem, map) => {
    const mapOfChildIds = genMapBetween2Array(rootItem.childIds, newRootItem.childIds);
    
    return rootItem.childIds.reduce((descendants, id) => {
        const newChildItem = { ...renewIdsInItem(map[id], newRootItem.id, mapOfChildIds.get(id)) };
        return ({
            ...descendants, 
            [newChildItem.id]: newChildItem,
            ...copyDescendants(map[id], newChildItem, map)
        })
    }, {})
}

const copiedBranch = (copiedBranch = initialCopiedBranch, action, state) => {
    if (action.type === 'COPY' || action.type === 'CUT') {
        const rootId = action.id,
            rootItem = state.map[rootId],
            newRootItem = renewIdsInItem(rootItem, '');
        return ({
            rootId: newRootItem.id,
            items: { 
                [newRootItem.id]: newRootItem,
                ...copyDescendants(rootItem, newRootItem, state.map)
            }
        }) 
    } else if (action.type === 'PASTE') {
        const rootItem = copiedBranch.items[copiedBranch.rootId],
            newRootItem = renewIdsInItem(rootItem, '');
        return ({
            rootId: newRootItem.id,
            items: { 
                [newRootItem.id]: newRootItem,
                ...copyDescendants(rootItem, newRootItem, copiedBranch.items)
            }
        }) 
    } else {
        return copiedBranch
    }
}


export {
    copiedBranch as default,
    initialCopiedBranch
}