import React, { Component } from 'react'
import {Spin ,Form,Button,Input,Icon} from 'antd'

import './index.less'
import logo from '@/img/logo_w.svg'

class Login extends Component {
  constructor(props){
    super(props);
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
                    <Button type="primary" className="input-btn">登 录</Button>
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
