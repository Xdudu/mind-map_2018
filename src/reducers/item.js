const item = (item, action) => {
    switch (action.type) {
        case 'EDIT_ITEM':
            return {...item, ...{ text: action.text }}
        case 'NUMBER_CHILD':
            return {...item, ...{ numberChild: !item.numberChild }}
        default:
            return item
    }
}


export default item