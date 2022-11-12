import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Provider } from 'mobx-react'
import injects from './store'

ReactDOM.render(
    <Provider {...injects}>
        <App/>
    </Provider>,
    document.getElementById('root')
)