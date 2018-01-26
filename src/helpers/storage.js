const KEY = '__MIND_MAP'

const saveMap = (map) => {
    const stringifiedMap = JSON.stringify(map);
    localStorage.setItem(KEY, stringifiedMap);
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