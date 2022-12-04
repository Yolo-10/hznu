import React, { Component } from 'react'
import {Tooltip,Switch,Input,Form,Spin,Select} from "antd"
import {inject, observer} from 'mobx-react'
import {isN} from '@util/fn'
import * as urls from '@constant/urls'
import "./index.less"

const { TextArea } = Input
const { Option } = Select
const menuList = ['全部','基本信息','教学进度','实验进度']

@inject('mainStore')
@observer
export default class Tech extends Component {
  constructor(props){
    super(props)
    this.store = this.props.mainStore
    this.state = {
      loading:false,
      clsList:[],
      clsDetail:[],
      tecList:[],
      expList:[]
    }
  }

  async componentDidMount(){
    if(isN(this.store.currentUser)){
      this.props.history.push('/login')
    }else{
      this.setState({loading:true})
      let r = await this.store.post(urls.API_QRY_CLS,null);
      this.setState({clsList:r.data,loading:false});
      
      // 默认第一个课程
      this.doSelCls(this.state.clsList[0].code);
    }
  }

  doSelCls = async(code) =>{
    //TODO:bind的作用
    let params =  {code:code}
    this.setState({loading:true})
    let r = await this.store.post(urls.API_QRY_CLS_MAIN,params);
    this.setState({loading:false, clsDetail:r.data, tecList:r.tecList, expList:r.expList})
  }


  render() {
    let {loading,clsList,clsDetail,tecList,expList} = this.state;
    let cls = clsDetail[0]

    if(!isN(cls)){
      cls.w_hour = parseInt(cls?.t_hour)+parseInt(cls?.e_hour)
      cls.a_hour = cls.w_hour*16
    }

    return (
      <Spin spinning={loading}>
        <div className='g-sys'>
          <div className='m-bd'>
            <div className='m-tab_list'>
              <div className='m-fun'>
                <div className='m-tl'>2021-2022-2课程</div>
                {clsList?.map((item,i)=>
                  <div className='m-cls' key={i} onClick={this.doSelCls.bind(this,item.code)}>{item.name}</div>
                )}
              </div>

              {(clsDetail.length>0) &&
              <>
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
              </>
              }
              
            </div>

            {(clsDetail.length===0) && <div className='m-tab_none'>cnt</div>}

            {(clsDetail.length>0) &&
            <div className='m-tab_cnt'>
              <Form className="m-form" layout="horizontal" >
                <div className='m-hd'>
                  <div className='m-term'>{cls?.term}学年</div>
                  <div className='m-title'>
                    <span>{cls?.name}</span>
                    <span>{cls?.ename}</span>
                  </div>
                  <div className='m-info'>
                    <span>{cls?.cform}</span>
                    <span>{cls?.cprop}</span>
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
                      <span>{cls?.pos}</span>
                    </div>
                    <div className='m-item'>
                      <label>开课学院</label>
                      <span>{cls?.col}</span>
                    </div>
                    <div className='m-item'>
                      <label>课程学分</label>
                      <span>{cls?.mark}</span>
                    </div>
                    <div className='m-item'>
                      <label>教学周期</label>
                      <span>{cls?.week}</span>
                    </div>
                  </div>

                  <div className='m-sect'>
                    <div className='m-item'>
                      <label>理论课时</label>
                      <span>{cls?.t_hour}</span>
                    </div>
                    <div className='m-item'>
                      <label>实验课时</label>
                      <span>{cls?.e_hour}</span>
                    </div>
                    <div className='m-item'>
                      <label>周学时数</label>
                      <span>{cls?.w_hour}</span>
                    </div>
                    <div className='m-item'>
                      <label>总课时数</label>
                      <span>{cls?.a_hour}</span>
                    </div>
                  </div>

                  <div className='m-sect'>
                    <div className='m-item'>
                      <label>主讲教师</label>
                      <span>{cls?.m_tech}</span>
                    </div>
                    <div className='m-item'>
                      <label>辅导教师</label>
                      <span>{cls?.s_tech}</span>
                    </div>
                    <div className='m-item'>
                      <label>答疑时间</label>
                      <span>{cls?.q_time}</span>
                    </div>
                    <div className='m-item'>
                      <label>答疑地点</label>
                      <span>{cls?.q_addr}</span>
                    </div>
                  </div>

                  <div className='m-sect'>
                    <div className='m-item'>
                      <label>教学网站</label>
                      <span>{cls?.url}</span>
                    </div>
                    <div className='m-item'>
                      <label>点击次数</label>
                      <span>{cls?.click}</span>
                    </div>
                    <div className='m-item'>
                      <label>账号名称</label>
                      <span>{cls?.uid}</span>
                    </div>
                    <div className='m-item'>
                      <label>登录密码</label>
                      <span>{cls?.pwd}</span>
                    </div>
                  </div>
                </div>
                <div className='m-main'>
                    <div className='m-tab'>
                      {clsDetail.map((item,i)=>
                        <div className='m-row' key={item.id}>
                          <span>{i+1}</span>
                          <span>{item.name}</span>
                          <span>{item.cls}</span>
                          <span>{item.st_num}</span>
                          <span>{item.wt}</span>
                          <span>{item.addr}</span>
                        </div> 
                      )}
                    </div>
                </div>
                <div className='m-main'>
                  <div className='m-tab'>
                    <label>课程描述及与其他课程关系<em>(不超过200字)</em></label>
                    <TextArea maxLength={200} value={cls?.desc}/>

                    <label>使用教材与参考书目<em>(不超过200字)</em></label>
                    <TextArea maxLength={200} value={cls?.mate}/>

                    <label>课程考核<em>(不超过200字)</em></label>
                    <TextArea maxLength={200} value={cls?.exam}/>

                    <label>教学方法与手段及相关要求<em>(不超过200字)</em></label>
                    <TextArea maxLength={200} value={cls?.method}/>
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

                    {tecList.length==0 && <div className="m-none">暂无数据</div>}
                    
                    {tecList.map((item,i)=>
                      <div className='m-row-t' key={i}>
                        <span>{i+1}</span>
                        <Input value={item.cnt}/>
                        <Input value={item.method}/>
                        <Input value={item.task}/>
                      </div>
                    )}
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
                    {expList.length==0 && <div className='m-none'>暂无数据</div>}

                    {expList.map((item,i)=>(
                      <div className='m-row-e' key={item.id}>
                        <span>{i+1}</span>
                        <Input value={item.name}/>
                        <Select value={item.type} style={{width:'80px',marginLeft:'10px'}} size="small">
                          <Option value={'验证'}>验证</Option>
                          <Option value={'设计'}>设计</Option>
                          <Option value={'研究'}>研究</Option>
                          <Option value={'综合'}>综合</Option>
                          <Option value={'演示'}>演示</Option>
                        </Select>
                        <Select value={item.prop} style={{width:'80px',marginLeft:'10px'}} size="small">
                          <Option value={'必做'}>必做</Option>
                          <Option value={'选做'}>选做</Option>
                        </Select>
                        <Input value={item.addr}/>
                        <Input value={item.gnum}/>
                            {/* <Input value={item.name} />
                        <Select value={item.type} style={{'width':'80px','margin':'0 5px'}} size='small' > 
                          <Option value="验证">验证</Option>
                          <Option value="设计">设计</Option>
                          <Option value="研究">研究</Option>
                          <Option value="综合">综合</Option>
                          <Option value="演示">演示</Option>
                        </Select>
                        <Select value={item.prop} style={{'width':'80px','margin':'0 5px'}} size='small'> 
                          <Option value="验证">必做</Option>
                          <Option value="设计">选做</Option>
                        </Select>
                        <Input value={item.addr} />
                        <Input value={item.gnum} /> */}
                      </div>
                    ))}
                  </div>
                </div>
              </Form>
            </div>
            }
          </div>
        </div>
      </Spin>
      
    )
  }
}
