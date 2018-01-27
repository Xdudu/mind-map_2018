import * as actions from '../actions'
import { saveMap } from './storage'


const handler = store => e => {
    if (e.target !== document.body) return
    
    const { selectedId, map } = store.getState(),
        hasSelectedItem = selectedId !== '',
        { dispatch } = store;

    if (hasSelectedItem && e.ctrlKey && e.key.toLowerCase() === 'c') {
        dispatch(actions.copy(selectedId))
    } else if (hasSelectedItem && e.ctrlKey && e.key.toLowerCase() === 'v') {
        dispatch(actions.paste(selectedId))
    } else if (hasSelectedItem && e.ctrlKey && e.key.toLowerCase() === 'x') {
        dispatch(actions.cut(selectedId))
    } else if (hasSelectedItem && e.ctrlKey && e.key.toLowerCase() === 'l') {
        e.preventDefault();
        dispatch(actions.numberChild(selectedId))
    } else if (hasSelectedItem && e.key.toLowerCase() === 'delete') {
        dispatch(actions.remove(selectedId))
    } else if (e.ctrlKey && e.key.toLowerCase() === 's') {
        e.preventDefault();
        saveMap(map);
    } 
}


export default handler