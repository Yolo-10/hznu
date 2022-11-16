import decode from 'jwt-decode'
import {isN} from './fn'

const USER_KEY = 'HZUN_TOKEN'

//localStorage关于token的操作：存入、清除、获取
export const getToken = () =>{
    let user = getAllToken();

    if(isN(user)){
        token = null
    }else{
        //从user中拿出uname,其余部分为token
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

export const getAllToken= () => {
    return JSON.parse(window.localStorage.getItem(USER_KEY))
}

export default {saveToken,removeToken,getAllToken,getToken}