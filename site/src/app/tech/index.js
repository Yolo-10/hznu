import React, { Component } from 'react'
import {Tooltip,Switch,Input,Form,Drawer} from "antd"
import {inject, observer} from 'mobx-react'
import {isN} from '@util/fn'
import "./index.less"

const { TextArea } = Input
const menuList = ['全部','基本信息','教学进度','实验进度']

@inject('mainStore')
@observer
export default class Tech extends Component {
  constructor(props){
    super(props)
    this.store = this.props.mainStore
  }

  componentDidMount(){
    if(isN(this.store.currentUser)){
      this.props.history.push('login')
    }else{
      //已经登录有token，获取本来的数据
    }
  }


  render() {
    return (
      <div className='g-sys'>
        <div className='m-bd'>
          <div className='m-tab_list'>
            <div className='m-fun'>
              <div className='m-tl'>2021-2022-2课程</div>
              <div className='m-cls'>嵌入式C语言设计与应用</div>
              <div className='m-cls'>电子系统设计与进阶（3）</div>
            </div>

            <div className='m-fun'>
              <div className='m-item' style={{background:'#21A557',color:'#fff'}}>保存数据</div>
            </div>

            <div className='m-fun'>
              <Tooltip placement="right" title="尚未支持">
                <div className='m-item' style={{background:'#666',color:'#fff'}}>导入历史课程</div>
              </Tooltip>
              <Tooltip placement="right" title="尚未支持">
                <div className='m-item' style={{background:'#666',color:'#fff'}}>导入同类课程</div>
              </Tooltip>
            </div>

            <div className='m-fun'>
              <Tooltip placement="right" title="Excel选择16行3列拷贝">
                <div className='m-item' style={{background:'#41BA00',color:'#fff'}}>剪贴导入教学</div>
              </Tooltip>
              <Tooltip placement="right" title="Excel选择16行5列拷贝">
                <div className='m-item' style={{background:'#41BA00',color:'#fff'}}>剪贴导入实验</div>
              </Tooltip>
            </div>

            <div className='m-fun'>
              <Tooltip placement="right" title="批量生成若干周教学数据">
                <div className='m-item' style={{background:'#B8D800',color:'#fff'}}>批量教学进度</div>
              </Tooltip>
              <Tooltip placement="right" title="批量生成若干周实验数据">
                <div className='m-item' style={{background:'#B8D800',color:'#fff'}}>批量实验进度</div>
              </Tooltip>
            </div>
          </div>
          {/* <div className='m-tab_none'>cnt</div> */}
          <div className='m-tab_cnt'>
            <Form className="m-form" layout="horizontal" >
              <div className='m-hd'>
                <div className='m-term'>2021-2022-2学年</div>
                <div className='m-title'>
                  <span>嵌入式C语言设计与应用</span>
                  <span>Design and Application of Embedded C Language</span>
                </div>
                <div className='m-info'>
                  <span>主修课程</span>
                  <span>专业选修课</span>
                  <Switch checkedChildren="网" unCheckedChildren="普"></Switch>
                </div>
                <div className='m-menu'>
                  {menuList.map((item,i)=>
                    <div key={i} className="m-item">{item}</div>
                  )}
                </div>
              </div>
              <div className='m-main'>
                <div className='m-tl'>基本信息</div>
                <div className='m-sect'>
                  <div className='m-item'>
                    <label>授课校区</label>
                    <span>仓前</span>
                  </div>
                  <div className='m-item'>
                    <label>开课学院</label>
                    <span>信息科学与技术学院</span>
                  </div>
                  <div className='m-item'>
                    <label>课程学分</label>
                    <span>1.0</span>
                  </div>
                  <div className='m-item'>
                    <label>教学周期</label>
                    <span>1-16周</span>
                  </div>
                </div>
                <div className='m-sect'>
                  <div className='m-item'>
                    <label>理论课时</label>
                    <span>3</span>
                  </div>
                  <div className='m-item'>
                    <label>实验课时</label>
                    <span>1</span>
                  </div>
                  <div className='m-item'>
                    <label>周学时数</label>
                    <span>4</span>
                  </div>
                  <div className='m-item'>
                    <label>总课时数</label>
                    <span>64</span>
                  </div>
                </div>

                <div className='m-sect'>
                  <div className='m-item'>
                    <label>主讲教师</label>
                    <span>董文</span>
                  </div>
                  <div className='m-item'>
                    <label>辅导教师</label>
                    <span></span>
                  </div>
                  <div className='m-item'>
                    <label>答疑时间</label>
                    <span></span>
                  </div>
                  <div className='m-item'>
                    <label>答疑地点</label>
                    <span></span>
                  </div>
                </div>

                <div className='m-sect'>
                  <div className='m-item'>
                    <label>教学网站</label>
                    <span></span>
                  </div>
                  <div className='m-item'>
                    <label>点击次数</label>
                    <span></span>
                  </div>
                  <div className='m-item'>
                    <label>账号名称</label>
                    <span></span>
                  </div>
                  <div className='m-item'>
                    <label>登录密码</label>
                    <span></span>
                  </div>
                </div>
              </div>
              <div className='m-main'>
                  <div className='m-tab'>
                    <div className='m-row'>
                      <span>1</span>
                      <span>嵌入式C语言设计与应用</span>
                      <span>物联网191</span>
                      <span>17</span>
                      <span>星期四第1-1节（1-16周）</span>
                      <span>勤园13号楼402</span>
                    </div>
                    <div className='m-row'>
                      <span>2</span>
                      <span>嵌入式C语言设计与应用</span>
                      <span>物联网191</span>
                      <span>17</span>
                      <span>星期四第1-1节（1-16周）</span>
                      <span>勤园13号楼402</span>
                    </div>
                  </div>
              </div>
              <div className='m-main'>
                <div className='m-tab'>
                  <label>课程描述及与其他课程关系<em>(不超过200字)</em></label>
                  <TextArea maxLength={200}/>

                  <label>使用教材与参考书目<em>(不超过200字)</em></label>
                  <TextArea maxLength={200}/>

                  <label>课程考核<em>(不超过200字)</em></label>
                  <TextArea maxLength={200}/>

                  <label>教学方法与手段及相关要求<em>(不超过200字)</em></label>
                  <TextArea maxLength={200}/>
                </div>
              </div>

              <div className='m-main' style={{'margin': '35px 0 0'}}>
                <div className='m-tl'>教学进度</div>
                <div className='m-tech'>
                  <div className='m-row-t'>
                    <span className="fn-hide"></span>
                    <span>主要教学内容</span>
                    <span>教学形式与内容资料</span>
                    <span>作业与辅导安排</span>
                  </div>
                  <div className="m-none">暂无数据</div>
                </div>
              </div>

              <div className='m-main' style={{'margin': '35px 0 0'}}>
                <div className='m-tl'>实验进度</div>
                <div className='m-tech'>
                  <div className='m-row-e'>
                    <span className="fn-hide"></span>
                    <span>实验项目名称</span>
                    <span>实验性质</span>
                    <span>实验要求</span>
                    <span>实验教室</span>
                    <span>每组人数</span>
                  </div>
                  <div className='m-none'>暂无数据</div>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
    )
  }
}
