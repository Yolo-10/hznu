import React, { Component } from 'react'
import {Spin ,Form,Button,Input,Icon} from 'antd'
import { inject, observer } from 'mobx-react'

import {msg} from '../../util/fn'
import { saveUser } from '../../util/token'
import * as urls from '../../constant/urls'

import './index.less'
import logo from '@/img/logo_w.svg'

//TODO:环境变量、路径设定、运行中
@inject('mainStore')
@observer
class Login extends Component {
  constructor(props){
    super(props);
    this.store = this.props.mainStore
  }

  doLogin = async (u) =>{
    let r = await this.store.post(urls.API_LOGIN, u)
    console.log('res',r)

    if(r.code === 200){
      //mobx中存储用户身份
      this.store.saveUser(r.data);
      //localStorage中存储token
      saveUser(r.data);
      this.props.history.push("/");
    }else{
      msg('用户密码错误')
    }
  }

  doCheckValid = ()=>{
    this.props.form.validateFields(async (err,values) =>{
      if(err){return}
      await this.doLogin(values)
    })
  }

  render() {
    const {getFieldDecorator} = this.props.form

    return (
        <div className='g-login'>
          <div className='m-login'>
              <div className='m-logo'>
                <img src={logo}/>
                <div className='m-title'>
                  <span>慢清尘工坊系统</span>
                </div>
              </div>
              <div className='m-form'>
                <Form >
                  <Form.Item>
                    {getFieldDecorator('uid', {
                      rules: [{required: true, message: ' 请输入账号!'}],
                      initialValue: ''
                    })(
                      <Input
                        icon="search"
                        size='large'
                        placeholder="请输入账号"
                        allowClear
                        prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                      />)}
                  </Form.Item>

                  <Form.Item>
                    {getFieldDecorator('pwd', {
                      rules: [{required: true, message: '请输入密码！'}],
                    })(
                      <Input.Password
                        size='large'
                        placeholder="请输入密码"
                        prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                      />)}
                  </Form.Item>

                  <Form.Item>
                    <Button type="primary" className="input-btn" onClick={this.doCheckValid}>登 录</Button>
                  </Form.Item>
                </Form>
              </div>

          </div>
        </div>
    )
  }
}

//Form.create()!!!!
export default Form.create()(Login)
