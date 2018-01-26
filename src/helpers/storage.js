import showToast from './toast'


const KEY = '__MIND_MAP'

const saveMap = (map) => {
    try {
        const stringifiedMap = JSON.stringify(map);
        localStorage.setItem(KEY, stringifiedMap);
        showToast('保存成功，下次打开可继续编辑 :)')
    } catch (e) {
        showToast('保存失败')
    }
}

const retrieveMap = () => {
    try {
        const stringifiedMap = localStorage.getItem(KEY);
        if (stringifiedMap === null) {
            return undefined;
        } else {
            return JSON.parse(stringifiedMap)
        }
    } catch (e) {
        return undefined
    }
}


export {
    saveMap,
    retrieveMap
}