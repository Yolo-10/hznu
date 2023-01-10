import React, { Component } from 'react'
import {Tooltip,Switch,Input,Form,Spin,Select,Modal,Drawer,InputNumber,Button,message} from "antd"
import {inject, observer} from 'mobx-react'
import {isN} from '@util/fn'
import * as urls from '@constant/urls'
import "./index.less"

const { TextArea } = Input
const { Option } = Select
const { confirm } = Modal;
const menuList = ['全部','基本信息','教学进度','实验进度']

@inject('mainStore')
@observer
class Tech extends Component {
  constructor(props){
    super(props)
    this.store = this.props.mainStore
    this.state = {
      loading:false,
      selMenu:0,
      clsList:[],
      clsDetail:[],
      code:[],
      tecList:[],
      expList:[],
      showDraT:false,
      showDraE:false,
      fieT:{week:16},
      fieE:{week:16,type:'验证',prop:'必做',addr:'勤园13号楼208',gnum:1},
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
    this.setState({loading:false, clsDetail:r.data, code:code, tecList:r.tecList, expList:r.expList})
  }

  doSelMenu = (i) =>{
    this.setState({selMenu:i})
  }

  doSelWeb = ()=>{
    let {clsDetail} = this.state;
    clsDetail[0].web = (!clsDetail[0].web)? 1:0;
    this.setState({clsDetail:clsDetail});
  }

  doDelTechItem = (i)=>{
    let {tecList} = this.state;
    tecList.splice(i,1);
    this.setState({tecList:tecList})
  }

  doDelExpItem = (i)=>{
    let {expList} = this.state;
    expList.splice(i,1);
    this.setState({expList:expList})
  }

  doChgVal = (key,e)=>{
    let val = e.currentTarget.value;
    let {clsDetail} = this.state;
    clsDetail[0][key] = val
    this.setState({clsDetail:clsDetail})
  }

  doChgT = (i,k,e)=>{
    let val = e.currentTarget.value;
    let {tecList} = this.state;
    tecList[i][k] = val;
    this.setState({tecList:tecList})
  }

  doChgE = (i,k,e)=>{
    let val = (k =="prop" || k =='type')? e:e.currentTarget.value;
    let {expList} = this.state;
    expList[i][k] = val;
    this.setState({expList:expList})
  }

  doSave = async() =>{
    this.props.form.validateFields(async(err,values)=>{
      if(err) {return}

      values.web = (values.web)? 1:0
      let {expList,tecList,code} = this.state
      let params = {code:code,expList:expList,tecList:tecList,...values}
      this.setState({loading:true})
      let r = await this.store.post(urls.API_SAV_CLS,params);
      this.setState({loading:false,clsDetail:r.data,expList:r.expList,tecList:r.tecList})
    })
  }

  doImportT= ()=>{
    let that = this
    confirm({
      title: '提示',
      content: '你确认要将剪贴板的数据导入到教学进度？（原教学进度数据会被全部替换）',
      async onOk() {
        const r = [];
        const text = await navigator.clipboard.readText();
        const list = text.split('\r\n');
        list.map((item,j)=>{
          if(j!=list.length-1){
            let i = item.split('\t');
            r.push({cnt:i[0],method:i[1],task:i[2]})
          }
        })
        if(r.length>16){
          message.error('剪贴数据不能超过16周')
        }else if(r.length<=0){
          message.error('无剪贴数据')
        }else{
          that.setState({tecList:r})
        }
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  doImportE = () =>{
    let that = this
    confirm({
      title: '提示',
      content: '你确认要将剪贴板的数据导入到实验进度吗？（原实验进度数据会被全部替换）',
      async onOk() {
        const r = [];
        const text = await navigator.clipboard.readText();
        const list = text.split('\r\n');
        list.map((item,j)=>{
          if(j!=list.length-1){
            let i = item.split('\t')
            r.push({name:i[0],type:i[1],prop:i[2],addr:i[3],gnum:i[4]});
          }
        })
        if(r.length>16){
          message.error('剪贴数据不能超过16周')
        }else if(r.length<=0){
          message.error('无剪贴数据')
        }else{
          that.setState({expList:r})
        }
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  doShowDraT = () => {
    this.setState({showDraT:true})
  };

  doCloseDraT = () => {
    this.setState({showDraT:false})
  };

  doShowDraE = () => {
    this.setState({showDraE:true})
  }

  doCloseDraE = () => {
    this.setState({showDraE:false})
  }

  doChgFieT = (k,e) =>{
    let val = (k=='week')? e: e.currentTarget.value;
    let {fieT} = this.state;
    fieT[k] = val;
    this.setState({fieT:fieT})
  }

  doChgFieE = (k,e) =>{
    let val = (k=='name' || k=='addr')? e.currentTarget.value:e;
    let {fieE} = this.state;
    fieE[k] = val;
    this.setState({fieE:fieE})
  }

  doSavFieT = () =>{
    let {week,cnt,method,task} = this.state.fieT;
    let ret = [];
    for(let i=0;i<week;i++){
      ret.push({cnt:cnt||'',method:method||'',task:task||''})
    }
    this.setState({tecList:ret,fieT:{week:16},showDraT:false})
  }

  doSavFieE = () =>{
    let {week,name,type,prop,addr,gnum} = this.state.fieE;
    let ret = [];
    for(let i=0;i<week;i++){
      ret.push({name:name||'',type:type,prop:prop,addr:addr,gnum:gnum})
    }
    this.setState({expList:ret,fieE:{week:16,type:'验证',prop:'必做',addr:'勤园13号楼208',gnum:10},showDraE:false})
  }

  render() {
    const {getFieldDecorator} = this.props.form;
    let {loading,clsList,clsDetail,tecList,expList,selMenu,showDraT,showDraE} = this.state;
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
                  <div className='m-item' style={{background:'#21A557',color:'#fff'}} onClick={this.doSave}>保存数据</div>
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
                    <div className='m-item' style={{background:'#41BA00',color:'#fff'}} onClick={this.doImportT}>剪贴导入教学</div>
                  </Tooltip>
                  <Tooltip placement="right" title="Excel选择16行5列拷贝">
                    <div className='m-item' style={{background:'#41BA00',color:'#fff'}} onClick={this.doImportE}>剪贴导入实验</div>
                  </Tooltip>
                </div>

                <div className='m-fun'>
                  <Tooltip placement="right" title="批量生成若干周教学数据">
                    <div className='m-item' style={{background:'#B8D800',color:'#fff'}} onClick={this.doShowDraT}>批量教学进度</div>
                  </Tooltip>
                  <Tooltip placement="right" title="批量生成若干周实验数据">
                    <div className='m-item' style={{background:'#B8D800',color:'#fff'}} onClick={this.doShowDraE}>批量实验进度</div>
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
                    <Form.Item>
                      {getFieldDecorator('web',{
                        valuePropName: 'checked',
                        initialValue: cls?.web==1
                      })(<Switch checkedChildren="网" unCheckedChildren="普" onClick={this.doSelWeb}></Switch>)}
                    </Form.Item>
                  </div>
                  <div className='m-menu'>
                    {menuList.map((item,i)=>
                      <div key={i} className="m-item" onClick={this.doSelMenu.bind(this,i)}>{item}</div>
                    )}
                  </div>
                </div>

                <>
                  <div className={(selMenu==0 || selMenu==1)? "m-main":"m-main fn-hide"}>
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
                        <Form.Item>
                          {getFieldDecorator('t_hour',{
                            rules:[{required:true,message:'请输入理论课时！'}],
                            initialValue:cls?.t_hour
                          })(<Input onChange={this.doChgVal.bind(this,'t_hour')}/>)}
                        </Form.Item>
                      </div>
                      <div className='m-item'>
                        <label>实验课时</label>
                        <Form.Item>
                          {getFieldDecorator('e_hour',{
                            rules:[{required:true,message:'请输入实验课时！'}],
                            initialValue:cls?.e_hour
                          })(<Input onChange={this.doChgVal.bind(this,'e_hour')}/>)}
                        </Form.Item>
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
                        <Form.Item>
                          {getFieldDecorator('m_tech',{
                            rules:[{required:true,message:'请输入主讲教师！'}],
                            initialValue:cls?.m_tech
                          })(<Input onChange={this.doChgVal.bind(this,'m_tech')}/>)}
                        </Form.Item>
                      </div>
                      <div className='m-item'>
                        <label>辅导教师</label>
                        <Form.Item>
                          {getFieldDecorator('s_tech',{
                            rules:[{required:true,message:'请输入辅导教师！'}],
                            initialValue:cls?.s_tech
                          })(<Input onChange={this.doChgVal.bind(this,'s_tech')}/>)}
                        </Form.Item>
                      </div>
                      <div className='m-item'>
                        <label>答疑时间</label>
                        <Form.Item>
                          {getFieldDecorator('q_time',{
                            rules:[{required:true,message:'请输入答疑时间！'}],
                            initialValue:cls?.q_time
                          })(<Input onChange={this.doChgVal.bind(this,'q_time')}/>)}
                        </Form.Item>
                      </div>
                      <div className='m-item'>
                        <label>答疑地点</label>
                        <Form.Item>
                          {getFieldDecorator('q_addr',{
                            rules:[{required:true,message:'请输入答疑地点！'}],
                            initialValue:cls?.q_addr
                          })(<Input onChange={this.doChgVal.bind(this,'q_addr')}/>)}
                        </Form.Item>
                      </div>
                    </div>

                    {(cls?.web==1) && <div className='m-sect'>
                      <div className='m-item'>
                        <label>教学网站</label>
                        <Form.Item>
                          {getFieldDecorator('url',{
                            rules:[{required:true,message:'请输入教学网站网址！'}],
                            initialValue:cls?.url
                          })(<Input onChange={this.doChgVal.bind(this,'url')}/>)}
                        </Form.Item>
                      </div>
                      <div className='m-item'>
                        <label>点击次数</label>
                        <Form.Item>
                          {getFieldDecorator('click',{
                            rules:[{required:true,message:'请输入点击次数！'}],
                            initialValue:cls?.click
                          })(<Input onChange={this.doChgVal.bind(this,'click')}/>)}
                        </Form.Item>
                      </div>
                      <div className='m-item'>
                        <label>账号名称</label>
                        <Form.Item>
                          {getFieldDecorator('uid',{
                            rules:[{required:true,message:'请输入账号名称！'}],
                            initialValue:cls?.uid
                          })(<Input onChange={this.doChgVal.bind(this,'uid')}/>)}
                        </Form.Item>
                      </div>
                      <div className='m-item'>
                        <label>登录密码</label>
                        <Form.Item>
                          {getFieldDecorator('pwd',{
                            rules:[{required:true,message:'请输入登录密码！'}],
                            initialValue:cls?.pwd
                          })(<Input onChange={this.doChgVal.bind(this,'pwd')}/>)}
                        </Form.Item>
                      </div>
                    </div>}
                    
                  </div>
                  <div className={(selMenu==0 || selMenu==1)? "m-main":"m-main fn-hide"}>
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
                  <div className={(selMenu==0 || selMenu==1)? "m-main":"m-main fn-hide"}>
                    <div className='m-tab'>
                      <label>课程描述及与其他课程关系<em>(不超过200字)</em></label>
                      <Form.Item>
                        {getFieldDecorator('desc',{
                          initialValue:cls?.desc
                        })(<TextArea maxLength={200}/>)}
                      </Form.Item>

                      <label>使用教材与参考书目<em>(不超过200字)</em></label>
                      <Form.Item>
                        {getFieldDecorator('mate',{
                          initialValue:cls?.mate
                        })(<TextArea maxLength={200}/>)}
                      </Form.Item>

                      <label>课程考核<em>(不超过200字)</em></label>
                      <Form.Item>
                        {getFieldDecorator('exam',{
                          initialValue:cls?.exam
                        })(<TextArea maxLength={200}/>)}
                      </Form.Item>

                      <label>教学方法与手段及相关要求<em>(不超过200字)</em></label>
                      <Form.Item>
                        {getFieldDecorator('method',{
                          initialValue:cls?.method
                        })(<TextArea maxLength={200}/>)}
                      </Form.Item>
                    </div>
                  </div>
                </>

                <div className={(selMenu==0 || selMenu==2)? "m-main":"m-main fn-hide"} style={{'margin': '35px 0 0'}}>
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
                        <span onClick={()=>this.doDelTechItem(i)}>{i+1}</span>
                        <Input value={item.cnt} onChange={this.doChgT.bind(this,i,'cnt')}/>
                        <Input value={item.method} onChange={this.doChgT.bind(this,i,'method')}/>
                        <Input value={item.task} onChange={this.doChgT.bind(this,i,'task')}/>
                      </div>
                    )}
                  </div>
                </div>

                <div className={(selMenu==0 || selMenu==3)? "m-main":"m-main fn-hide"} style={{'margin': '35px 0 0'}}>
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
                      <div className='m-row-e' key={i}>
                        <span onClick={()=>this.doDelExpItem(i)}>{i+1}</span>
                        <Input value={item.name} onChange={this.doChgE.bind(this,i,'name')}/>
                        <Select value={item.type} style={{width:'80px',marginLeft:'10px'}} size="small" onChange={this.doChgE.bind(this,i,'type')}>
                          <Option value={'验证'}>验证</Option>
                          <Option value={'设计'}>设计</Option>
                          <Option value={'研究'}>研究</Option>
                          <Option value={'综合'}>综合</Option>
                          <Option value={'演示'}>演示</Option>
                        </Select>
                        <Select value={item.prop} style={{width:'80px',marginLeft:'10px'}} size="small" onChange={this.doChgE.bind(this,i,'prop')}>
                          <Option value={'必做'}>必做</Option>
                          <Option value={'选做'}>选做</Option>
                        </Select>
                        <Input value={item.addr} onChange={this.doChgE.bind(this,i,'addr')}/>
                        <Input value={item.gnum} onChange={this.doChgE.bind(this,i,'gnum')}/>
                      </div>
                    ))}
                  </div>
                </div>
              </Form>
            </div>
            }
          </div>
        </div>

        <Drawer
          title="批量教学进度"
          onClose={this.doCloseDraT}
          visible={showDraT}
          width={300}
        >
          <div className='g-field'>
            <label>教学周</label>
            <InputNumber min={1} max={16} defaultValue={16} style={{width:'100%'}} onChange={this.doChgFieT.bind(this,'week')}/>
          </div>
          <div className='g-field'>
            <label>主要教学内容</label>
            <TextArea rows={4}  onChange={this.doChgFieT.bind(this,'cnt')}/>
          </div>
          <div className='g-field'>
            <label>教学形式及内容资料</label>
            <TextArea rows={4} onChange={this.doChgFieT.bind(this,'method')}/>
          </div>
          <div className='g-field'>
            <label>作业与辅导安排</label>
            <TextArea rows={4} onChange={this.doChgFieT.bind(this,'task')}/>
          </div>
          <div className='g-fun'>
            <Button onClick={this.doCloseDraT}>取消</Button>
            <Button type="primary" onClick={this.doSavFieT}>生成数据</Button>
          </div>
        </Drawer>

        <Drawer
          title="批量实验进度"
          onClose={this.doCloseDraE}
          visible={showDraE}
          width={300}>
            <div className='g-field'>
              <label>教学周</label>
              <InputNumber min={1} max={16} defaultValue={16} style={{width:'100%'}} onChange={this.doChgFieE.bind(this,'week')}/>
            </div>
            <div className='g-field'>
              <label>实验项目名称</label>
              <TextArea rows={2} onChange={this.doChgFieE.bind(this,'name')}/>
            </div>
            <div className='g-field'>
              <label>实验性质</label>
              <Select defaultValue={'验证'} onChange={this.doChgFieE.bind(this,'type')}>
                <Option value={'验证'}>验证</Option>
                <Option value={'设计'}>设计</Option>
                <Option value={'研究'}>研究</Option>
                <Option value={'综合'}>综合</Option>
                <Option value={'演示'}>演示</Option>
              </Select>
            </div>
            <div className='g-field'>
              <label>实验要求</label>
              <Select defaultValue={'必做'} onChange={this.doChgFieE.bind(this,'prop')}>
                <Option value={'必做'}>必做</Option>
                <Option value={'选做'}>选做</Option>
              </Select>
            </div>
            <div className='g-field'>
              <label>实验教室</label>
              <Input defaultValue={'勤园13号楼208'} onChange={this.doChgFieE.bind(this,'addr')}/>
            </div>
            <div className='g-field'>
              <label>每组人数</label>
              <InputNumber min={1} max={10} defaultValue={1} style={{width:'100%'}} onChange={this.doChgFieE.bind(this,'gnum')}/>
            </div>
            <div className='g-fun'>
              <Button onClick={this.doCloseDraE}>取消</Button>
              <Button type='primary'  onClick={this.doSavFieE}>生成数据</Button>
            </div>
        </Drawer>
      </Spin>
    )
  }
}

export default Form.create()(Tech)