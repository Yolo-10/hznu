//TODO:待了解
import {  notification } from 'antd'

var unitList = {tp:'℃',rh:'%',dv:'g/Kg',hv:'kj/kg',fr:'hz',po:'kw',poa:'kw',el:'kwh',ela:'kwh',ffl:'m³/h',fsp:'m/s',fpr:'Pa',vls:'',vlp:'%',prd:'Pa',coh:'',son:'',sof:'',sma:'',wsp:'m/s',wfl:'m³/h',wfla:'m³/h',wtpi:'℃',wtpo:'℃',chcp:'kw',chcpa:'kw',ot1:'',ot2:'',ot3:''}

export const fieldList = (i,type,ret=null)=>{
  switch(type) {
    case 'mix':
      ret = `mix_${i}_tp_1,mix_${i}_rh_1,mix_${i}_dv_1,mix_${i}_hv_1,mix_${i}_tp_2,mix_${i}_rh_2,mix_${i}_dv_2,mix_${i}_hv_2,mix_${i}_ffl,mix_${i}_fsp,mix_${i}_vls_1,mix_${i}_vls_2,mix_${i}_vlp_1,mix_${i}_vlp_2,mix_${i}_ot1,mix_${i}_ot2,mix_${i}_ot3`.split(',')
      break;
    case 'fil':
      ret = `fil_${i}_prd,fil_${i}_ot1,fil_${i}_ot2,fil_${i}_ot3`.split(',')
      break;
    case 'col':
      ret = `col_${i}_coh,col_${i}_tp_1,col_${i}_rh_1,col_${i}_dv_1,col_${i}_hv_1,col_${i}_tp_2,col_${i}_rh_2,col_${i}_dv_2,col_${i}_hv_2,col_${i}_ffl,col_${i}_fsp,col_${i}_wtpi,col_${i}_wtpo,col_${i}_wsp,col_${i}_wfl,col_${i}_wfla,col_${i}_vls,col_${i}_vlp,col_${i}_chcp,col_${i}_chcpa,col_${i}_ot1,col_${i}_ot2,col_${i}_ot3`.split(',')
      break;
    case 'oth':
      ret = `oth_${i}_son,oth_${i}_sof,oth_${i}_tp_1,oth_${i}_rh_1,oth_${i}_dv_1,oth_${i}_hv_1,oth_${i}_tp_2,oth_${i}_rh_2,oth_${i}_dv_2,oth_${i}_hv_2,oth_${i}_ffl,oth_${i}_fsp,oth_${i}_chcp,oth_${i}_ot1,oth_${i}_ot2,oth_${i}_ot3`.split(',')
      break;
    case 'fan':
      ret = `fan_${i}_son,fan_${i}_sof,fan_${i}_sma,fan_${i}_ffl,fan_${i}_fsp,fan_${i}_fpr,fan_${i}_fr,fan_${i}_po,fan_${i}_poa,fan_${i}_el,fan_${i}_ela,fan_${i}_ot1,fan_${i}_ot2,fan_${i}_ot3`.split(',')
      break;
    default:
      ret = []
  } 
  return ret
}

export const formatDtFromInt = (d)=>{
  d = d.toString()
  let year  = d.substr(0,4)
  let month = d.substr(4,2)
  let day   = d.substr(6,2)
  let hour  = d.substr(8,2)
  let minute= d.substr(10,2)
  let second= d.substr(12,2)
  let ret = `${year}-${month}-${day} ${hour}:${minute}:${second}`
  return ret
}

export const formatDtFromIntS = (d)=>{
  d = d.toString()
  let year  = d.substr(2,2)
  let month = d.substr(4,2)
  let day   = d.substr(6,2)
  let hour  = d.substr(8,2)
  let minute= d.substr(10,2)
  let ret = `${year}-${month}-${day} ${hour}:${minute}`
  return ret
}


export const formatState = (d)=>{
  return (d==1)? '运行':'关机'
}


export const unitByVal = (field)=>{
  return unitList[field.split('_')[0]]
}

export const debug=(e)=>{
  // e = JSON.stringify(e)
  console.log(`%c [debug]:`,'color:#a605c6')
  console.log(e)
}


export const isN=(e)=>{
  return  ((e===null)||(e==='')||(e===undefined))?true:false
}


export const msg=(info)=>{
  notification.info({
    message:'提示',
    description: info,
    placement: 'topLeft',
    duration:2,
    style: {
      width: 300,
      color:'#ff0000',
      background: 'rgba(255,255,255,.9)',
    },
  })
}