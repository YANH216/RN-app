import { CHANGE_IS_ENABLE, SET_HOTLIST, UPDATA_IS_ENABLE } from "./contant"

export const setHotList = (hotList) => ({ type: SET_HOTLIST, data: hotList })

export const changeIsEnable = (isEnable) => ({ type: CHANGE_IS_ENABLE, data: isEnable })

export const updataIsEnable = (localIsEnable) => ({ type: UPDATA_IS_ENABLE, data: localIsEnable }) 