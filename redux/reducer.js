import { combineReducers } from "redux"
import { CHANGE_IS_ENABLE, SET_HOTLIST, UPDATA_IS_ENABLE } from './contant';

const initHotList = []
export const hotList = (preState = initHotList, action) => {
    const { type, data } = action
    switch(type) {
        case SET_HOTLIST:
            return data
        default:
            return preState
    }
}

const initIsEnable = true
export const isEnable = (preState = initIsEnable, action) => {
    const { type, data } = action
    switch(type) {
        case CHANGE_IS_ENABLE: 
            return !data
        case UPDATA_IS_ENABLE:
            return data
        default: 
            return preState
    }
}

export default combineReducers({
    hotList,
    isEnable
})