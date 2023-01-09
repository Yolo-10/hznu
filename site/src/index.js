import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import zhCN from 'antd/es/locale/zh_CN'
import { Provider } from 'mobx-react'
import { ConfigProvider } from 'antd';
import injects from './store'

ReactDOM.render(
    <ConfigProvider locale={zhCN}>
        <Provider {...injects}>
            <App/>
        </Provider> 
    </ConfigProvider>,
    document.getElementById('root')
)