const item = (item, action) => {
    switch (action.type) {
        case 'EDIT_ITEM':
            return {...item, ...{ text: action.text }}
        default:
            return item
    }
}


export default item