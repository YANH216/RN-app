import ajax from './ajax'

const BASE = 'http://localhost.charlesproxy.com/api'

export const reqIndex = () => ajax(BASE + '/index.json')

export const reqHotList = () => ajax(BASE + '/hotlist.json')

export const  reqItemList = (id) => ajax(BASE + `/mainFoodList.json?id=${id}`)