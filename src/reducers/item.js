const item = (state, action) => {
    switch (action.type) {
        case 'EDIT_ITEM':
            return {...state, ...{ text: action.text }}
        default:
            return state
    }
}


export default item