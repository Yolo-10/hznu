import React, { Component } from 'react'
import {HashRouter as Routes,Route,Switch} from 'react-router-dom'
import Loadable from './components/Loadable'

class App extends Component {
  render() {
    return (
      <Routes>
        <Switch>
          <Route path='/login' component={Loadable({ loader: () => import ('./app/login')})}></Route>
          <Route path='/tech' component={Loadable({loader: () => import('./app/tech')})}></Route>
        </Switch>
      </Routes>
    )
  }
}

export default App
