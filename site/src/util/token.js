import decode from 'jwt-decode'
import {isN} from './fn'

const USER_KEY = 'HZUN_TOKEN'

//localStorage关于token的操作
//增删查
export const getToken = () =>{
    let user = loadUser();

    if(isN(user)){
        token = null
    }else{
        var {uname,...token} = t
    }

    return JSON.stringify(token)
}

export const removeUser = () => {
    window.localStorage.removeItem(USER_KEY);
}

export const saveUser = (data) => {
    window.localStorage.setItem(USER_KEY,JSON.stringify(data));
}

export const loadUser = () => {
    return JSON.parse(window.localStorage.getItem(USER_KEY))
}

export default {saveUser,removeUser,loadUser,getToken}