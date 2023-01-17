import React, { Component } from 'react'
import {Button} from 'antd'
import * as urls from '@constant/urls'
import { inject, observer } from 'mobx-react'

@inject('mainStore')
@observer
export default class Help extends Component {
  constructor(props){
    super(props)
    this.store = this.props.mainStore
  }

  doExport = async()=>{
    let r = await this.store.post(urls.API_EXPORT);
    
    // 获取服务器内zip路径，window直接获取该资源下载，以下两种方法皆可
    // window.open(urls.API_SERVER + r.path);
    window.location.href = urls.API_SERVER + r.path;
  }

  render() {
    return (
      <div>
        <Button type='primary' style={{margin:'20px'}} onClick={this.doExport}>导出数据</Button>
      </div>
    )
  }
}
