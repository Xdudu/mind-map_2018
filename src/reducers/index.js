import map, { initialMap } from './map'
import copiedBranch, { initialCopiedBranch } from './copied-branch'
import selectedId, { initialSelectedId } from './selected-id'


const initialState = {
    map: initialMap,
    copiedBranch: initialCopiedBranch,
    selectedId: initialSelectedId
}

export default (state = initialState, action) => ({
    map: map(state.map, action, state),
    copiedBranch: copiedBranch(state.copiedBranch, action, state.map),
    selectedId: selectedId(state.selectedId, action)
})