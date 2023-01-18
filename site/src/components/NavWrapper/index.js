import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'

import './index.less'
import logo from '@/img/logo.svg'
import {inject, observer} from 'mobx-react'
import {isN} from '@/util/fn.js'
import {getAllToken} from  '@/util/token.js'

var MENU_MAIN =[
    {name:'教务统计',key:'/',role:0,list:[
        {name:'二级目录1',key:'/',role:0,list:[]},
        {name:'二级目录2',key:'/tech',role:0,list:[]}
    ]},
    {name:'帮助',key:'/help',role:0,list:[]}
]

@inject('mainStore')
@observer
class NavWrapper extends Component {
    constructor(props){
        super(props);
        this.store = this.props.mainStore
        this.state = {
            menu:[],
            selM:0,
        }
    }

    //动态加载菜单
    componentDidMount(){
        //从本地存储获取token
        let user = getAllToken();
        if(!isN(user)){
            //解析角色权限
            let role = user.role.split('|');
            let {menu} = this.state;
            MENU_MAIN.map((item,i)=>{
                //一个权限位置对应一个菜单
                if(parseInt(role[i])) menu.push(item)
            })
            this.setState({menu:menu})
        }
    }

    doMenu = (item,i)=>{
        if (isN(item.key)) return
        this.setState({selM:i})
        this.props.history.push(item.key)
    }

    logout = ()=>{
        this.store.logout();
        this.props.history.push('/login')
    }

    render() {
        const {menu,selM} = this.state;
        const {currentUser} = this.store;
        
        return (
        <div className='g-nav'>
            <div className='m-nav'>
                <a className='navbar-brand' href='/'>
                    <img src={logo} className=""/>
                </a>

                <label>慢清尘作坊</label>

                <div className='m-menu_wrap'>
                    {menu.map((item,i)=>
                        <div key={i} className={i==selM? "m-item active":"m-item"}
                            onClick={this.doMenu.bind(this,item,i)}>
                            {item.name}
                            <div className='m-sub_menu'>
                                {item.list.map((o,j)=>
                                    <div className='m-sub' key={j} 
                                    onClick={this.doMenu.bind(this,o,j)}>{o.name}</div>
                                )}
                            </div>
                        </div>
                    )}
                    
                    {!(isN(currentUser)) && <div className="m-item" onClick={this.logout}>
                        <span>退出登录</span>
                    </div>} 
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

export default withRouter(NavWrapper)