const currentSelect = (currentSelect = '', action) => {
    if (action.type === 'SELECT_ITEM') {
        return action.id || ''
    } else {
        return currentSelect
    }
}


export default currentSelect