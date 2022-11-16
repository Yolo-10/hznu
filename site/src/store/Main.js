import {observable,action} from 'mobx'
import {removeToken,saveToken} from '@util/token'
import BaseActions from '@components/BaseActions'

//store以及localStorage存入用户信息
class Main extends BaseActions {
    @observable
    currentUser = undefined

    @action
    async post(url,params){
        return await this.post(url,params)
    }

    @action
    saveUser(u) {
        this.currentUser = u;
        saveToken(u)
    }

    @action
    getUser(){
        return this.currentUser
    }

    @action
    logout(){
        this.currentUser = undefined
        removeToken();
    }
}

//TODO:new Main!!!!
export default new Main();