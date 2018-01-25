const initialSelectedId = ''

const selectedId = (selectedId = initialSelectedId, action) => {
    if (action.type === 'SELECT_ITEM') {
        return action.id || ''
    } else {
        return selectedId
    }
}


export {
    selectedId as default,
    initialSelectedId
} 