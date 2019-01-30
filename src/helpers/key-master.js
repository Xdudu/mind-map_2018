import * as actions from '../actions'
import { saveMap } from './storage'

export default function(store) {
  document.body.onkeydown = handleKeyDown(store)
  document.body.onkeyup = handleKeyUp
}

const MODIFIER_KEY_MAP = {
  'ctrl': 17,
  '⌘': [ 91, 93, 224 ]
}

const MODIFIER_KEY_VALUE_MAP = Object.entries(MODIFIER_KEY_MAP)

let modifierKey = ''

const getPressedModifierKey = pressedKeyCode => {
  for (let i = 0; i < MODIFIER_KEY_VALUE_MAP.length; i++) {
    const [ key, keyCode ] = MODIFIER_KEY_VALUE_MAP[i]
    if (pressedKeyCode === keyCode
      || Array.isArray(keyCode) && keyCode.includes(pressedKeyCode)
    ) return key
  }
}

const setModifierKey = pressedModifierKey => modifierKey = pressedModifierKey
const clearModifierKey = pressedModifierKey => {
  if (pressedModifierKey === modifierKey) modifierKey = ''
}

const handleKeyDown = store => e => {
  if (e.target !== document.body) return

  const pressedKey = e.key
  const pressedKeyCode = e.keyCode
  const pressedModifierKey = getPressedModifierKey(pressedKeyCode)
  if (pressedModifierKey) setModifierKey(pressedModifierKey)
  else {
    const { selectedId, map } = store.getState()
    const hasSelectedItem = selectedId !== ''
    const { dispatch } = store

    if (hasSelectedItem && ifCMDOrCTRLPressed() && ifKeyPressed('c', pressedKey)) {
      dispatch(actions.copy(selectedId))
    } else if (hasSelectedItem && ifCMDOrCTRLPressed() && ifKeyPressed('v', pressedKey)) {
      dispatch(actions.paste(selectedId))
    } else if (hasSelectedItem && ifCMDOrCTRLPressed() && ifKeyPressed('x', pressedKey)) {
      dispatch(actions.cut(selectedId))
    } else if (hasSelectedItem && ifCMDOrCTRLPressed() && ifKeyPressed('l', pressedKey)) {
      e.preventDefault();
      dispatch(actions.numberChild(selectedId))
    } else if (hasSelectedItem && (
      ifKeyPressed('delete', pressedKey)
      || ifCMDPressed() && ifKeyPressed('d', pressedKey)
    )) {
      dispatch(actions.remove(selectedId))
    } else if (ifCMDOrCTRLPressed() && ifKeyPressed('s', pressedKey)) {
      e.preventDefault()
      saveMap(map)
    }
  }
}

const handleKeyUp = e => {
  const pressedKeyCode = e.keyCode
  const pressedModifierKey = getPressedModifierKey(pressedKeyCode)
  if (pressedModifierKey) clearModifierKey(pressedModifierKey)
}

const ifCMDOrCTRLPressed = () => modifierKey === 'ctrl' || modifierKey === '⌘'
const ifCMDPressed = () => modifierKey === '⌘'

const ifKeyPressed = (key, pressedKey) => pressedKey.toLowerCase() === key

export const KEY_MAP = {
  copy: {
    name: '复制',
    shortcut: 'Ctrl/⌘ + C'
  },
  paste: {
    name: '粘贴',
    shortcut: 'Ctrl/⌘ + V'
  },
  cut: {
    name: '剪切',
    shortcut: 'Ctrl/⌘ + X'
  },
  remove: {
    name: '删除分支',
    shortcut: 'Delete / ⌘ + D'
  },
  numberChild: {
    name: '编号子级',
    shortcut: 'Ctrl/⌘ + L'
  },
  save: {
    name: '保存',
    shortcut: 'Ctrl/⌘ + S'
  }
}
