import decode from 'jwt-decode'
import {isN} from './fn'

const USER_KEY = 'HZUN_TOKEN'

//localStorage关于token的操作：存入、清除、获取
export const getToken = () =>{
    let user = loadToken();

    if(isN(user)){
        token = null
    }else{
        // TODO:????????
        var {uname,...token} = user
    }

    return JSON.stringify(token)
}

export const removeToken = () => {
    window.localStorage.removeItem(USER_KEY);
}

export const saveToken = (data) => {
    window.localStorage.setItem(USER_KEY,JSON.stringify(data));
}

export const loadToken= () => {
    return JSON.parse(window.localStorage.getItem(USER_KEY))
}

export default {saveToken,removeToken,loadToken,getToken}