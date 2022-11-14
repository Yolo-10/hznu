import {observable,action} from 'mobx'
import {removeUser,saveUser} from '@util/token'
import BaseActions from '@components/BaseActions'

class Main extends BaseActions {
    @observable
    currentUser = undefined

    @action
    async post(url,params){
        /**
         * url 接口地址
         * params uid+pwd
         */
        return await this.post(url,params)
    }

    @action
    saveUser(u) {
        this.currentUser = u;
        saveUser(u)
    }

    @action
    loadUser(){
        return this.currentUser
    }

    @action
    logout(){
        this.currentUser = undefined
        removeUser();
    }
}

//TODO:new Main!!!!
export default new Main();