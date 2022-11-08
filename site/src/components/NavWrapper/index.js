import React, { Component } from 'react'

import './index.less'
import logo from '@/img/logo.svg'

var MENU_MAIN =[
    // TODO:二级路由没有起作用
    {name:'教务系统',key:'/login',role:0,list:[{name:'二级目录',key:'/tech',role:0,list:[]}]},
    {name:'帮助',key:'/help',role:0,list:[]}
]

export default class NavWrapper extends Component {
    constructor(props){
        super(props);
        this.state = {
            menu:[],
        }
    }

    componentDidMount(){
        let {menu} = this.state;
        MENU_MAIN.map((item,i)=>{
            //TODO
            menu.push(item);
        })
        this.setState({menu:menu})
    }

    render() {
        const {menu} = this.state;
        
        return (
        <div className='g-nav'>
            <div className='m-nav'>
                <a className='navbar-brand' href='/'>
                    <img src={logo} className=""/>
                </a>

                <label>慢清尘作坊</label>

                <div className='m-menu_wrap'>
                    {menu.map((item,i)=>
                        <div key={i} className="m-item">
                            {item.name}
                            <div className='m-sub_menu'>
                                {item.list.map((o,j)=>
                                    <div className='m-sub' key={j}>{o.name}</div>
                                )}
                            </div>
                        </div>
                    )}
                    
                    <div className="m-item">
                        <span>退出登录</span>
                    </div>
                </div>
            </div>
            
            <div className='g-main'>
                {this.props.children}
            </div>

            <div className='m-footer'>
                <p> 
                    <small>© 杭州师范大学信息科学与技术学院 All Rights Reserved. 
                        <a href="https://icp.chinaz.com/info?q=hznu.edu.cn">浙ICP备2022006063号-1</a> 
                    </small>
                </p>
            </div>
        </div>
        )
  }
}
