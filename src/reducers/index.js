import { combineReducers } from 'redux'

import map from './map'
import currentSelect from './current-select'

export default combineReducers({
    map,
    currentSelect
})