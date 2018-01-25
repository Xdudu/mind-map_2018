const initialSelectedId = ''

const selectedId = (selectedId = initialSelectedId, action, state) => {
    if (action.type === 'SELECT_ITEM') {
        return action.id || ''
    } else if (action.type === 'CUT' || action.type === 'REMOVE') {
        return ''
    } else {
        return selectedId
    }
}


export {
    selectedId as default,
    initialSelectedId
} 