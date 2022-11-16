import React, { Component } from 'react'
import {Spin ,Form,Button,Input,Icon} from 'antd'
import { inject, observer } from 'mobx-react'

import {msg} from '@util/fn'
import * as urls from '@constant/urls'

import './index.less'
import logo from '@/img/logo_w.svg'

//TODO:环境变量、路径设定、运行中
@inject('mainStore')
@observer
class Login extends Component {
  constructor(props){
    super(props);
    this.store = this.props.mainStore
    this.state = {
      loading:false,
    }
  }

  doLogin = async(u) =>{
    this.setState({loading:true})
    let r = await this.store.post(urls.API_LOGIN,u);
    if(r.code === 200){
      this.store.saveUser(r.data)
      this.setState({loading:false})
      this.props.history.push('/');
    }else{
      msg('用户密码错误')
      this.setState({loading:false})
    }
  }

  doCheckValid = () =>{
    //async生成的结果是promise
    this.props.form.validateFields(async(err,values)=>{
      if(err) {return}
      //await... 表示整个程序会等到doLogin的promise成功resolve后继续执行
      await this.doLogin(values)
    })
  }

  onKeyUp =(e) =>{
    if(e.keyCode == 13) {
      this.doCheckValid();
    }
  }

  render() {
    const {getFieldDecorator} = this.props.form

    return (
      <Spin spinning={this.state.loading}>
         <div className='g-login' onKeyUp={this.onKeyUp}>
          <div className='m-login'>
              <div className='m-logo'>
                <img src={logo}/>
                <div className='m-title'>
                  <span>慢清尘工坊系统</span>
                </div>
              </div>
              <div className='m-form'>
                <Form>
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
      </Spin>
    )
  }
}

//Form.create()!!!!
export default Form.create()(Login)
