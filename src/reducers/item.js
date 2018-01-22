const item = (state = {id: '0', text: 'sdfsd'}, action) => {
    switch (action.type) {
        case 'EDIT_ITEM':
            return {...state, ...{ text: action.text }}
        default:
            return state
    }
}


export default item