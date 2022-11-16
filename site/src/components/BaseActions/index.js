import {param} from '@util/param'
import request from '@util/request'
import { toJS } from 'mobx'


//封装get请求、post请求
//request中将token放入请求头中
export default class BaseAction{
    constructor(store){
      this.store = store;
    }

    get = async (api = '', params = {}, allRes) =>{
      let url;
      if (api.indexOf('?') === -1) { //api本不携带参数
          url = api + `?${param(params)}`
      } else { 
          url = api + `&${param(params)}`
      }
      let data = await request(url, {}, allRes)
      // console.log('data',data);
      // console.log('toJS',toJS(data))
      return toJS(data)
    }

    post = async (api, data, allRes) => {
      return await request(
        api,
        {
          method: 'POST',
          data
        },
        allRes
      )
    }
}