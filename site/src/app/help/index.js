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

  doExport = ()=>{
    console.log(111)
    // console.log(this.store,'store');
    let r = this.store.post(urls.API_EXPORT);
    console.log(r)
  }

  render() {
    return (
      <div>
        <Button type='primary' style={{margin:'20px'}} onClick={this.doExport}>导出数据</Button>
      </div>
    )
  }
}
