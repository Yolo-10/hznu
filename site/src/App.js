import React, { Component } from 'react'
import {HashRouter as Routes,Route,Switch} from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import Loadable from '@components/Loadable'
import NavWrapper from '@components/NavWrapper'
import {getAllToken} from '@util/token'
import {isN} from '@util/fn'

import './less/global.less'
import './less/var.less';

@inject('mainStore')
@observer
class App extends Component {
  constructor(props){
    super(props)
    this.store = this.props.mainStore
  }

  componentDidMount(){
    let user = getAllToken();
    if(!isN(user)){
      this.store.saveUser(user);
    }
  }

  render() {
    return (
      <Routes>
        <Switch>
          <Route path='/login' component={Loadable({ loader: () => import ('./app/login')})}></Route>
          <Route path='/'  render={()=>(
            <div className='app-root'>
              <NavWrapper>
                <Switch>
                  {/* exact 严格匹配：/help只匹配/help，不显示/的内容 */}
                  <Route exact path='/' component={Loadable({loader: () => import('./app/tech')})}></Route>
                  <Route exact path='/help' component={Loadable({loader: () => import('./app/help')})}></Route>
                </Switch>
              </NavWrapper>
            </div>
          )}>
          </Route>
        </Switch>
      </Routes>
    )
  }
}

export default App
