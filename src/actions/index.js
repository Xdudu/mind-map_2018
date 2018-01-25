const selectItem = id => ({
    type: 'SELECT_ITEM',
    id
})

const editItem = (id, text) => ({
    type: 'EDIT_ITEM',
    id,
    text
})

const addItem = {
    BEFORE: id => ({
        type: 'ADD_ITEM_BEFORE',
        id
    }),
    AFTER: id => ({
        type: 'ADD_ITEM_AFTER',
        id
    }),
    PARENT: id => ({
        type: 'ADD_PARENT_ITEM',
        id
    }),
    CHILD: id => ({
        type: 'ADD_CHILD_ITEM',
        id
    })
}

const copy = id => ({
    type: 'COPY',
    id
})

const paste = id => ({
    type: 'PASTE',
    id
})

const cut = id => ({
    type: 'CUT',
    id
})

const remove = id => ({
    type: 'REMOVE',
    id
})

const numberChild = id => ({
    type: 'NUMBER_CHILD',
    id
})

export {
    selectItem,
    editItem,
    numberChild,
    addItem,
    copy,
    paste,
    cut,
    remove
}