import axios from 'axios'
import {message} from 'antd'
import jwt from './token'

//axios拦截器
// allRes是否直接返回res,无论状态码是否为200
export default(url,option = {},allRes = false) => {
    let token = jwt.getToken()

    token 
    ? axios.defaults.headers.common.authorization = `Bearer ${token}`
    : delete axios.defaults.headers.common.authorization

    return axios({
        url,
        ...option
    }).then(r => {
        if(allRes){
            return r.data
        }

        if(r && r.status === 200){
            return r.data
        }else{
            message.error('网络错误')
        }
    }).catch(e => {
        if(e.response) {
            message.error(e.response.data.msg)
            return e.response.data
        }
        message.error('网络错误')
    })
}