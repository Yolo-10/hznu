var express = require('express');
var jwt = require('jsonwebtoken') 
var router = express.Router();
var db = require('../db/db')
var docxTemplate = require('../util/docxTemplate')

const SECRET_KEY = 'ANT-SYSTEM'
const INPUT_NAME = 'input.docx'
// const OUTPUT_PATH = '../output.docx'
const OUTPUT_NAME = 'output.zip'

//async会返回一个promise对象返回resolve的值
router.post('/login',async(req,res,next) =>{
    let params = req.body;
    let sql = `CALL PROC_LOGIN(?)`
    let r = await callP(sql,params,res)

    if(r.length > 0 ){
        //mysql传回的数据带有RowDataPacket,clone完成转换
        let ret = clone(r[0]); 
        let token = jwt.sign(ret,SECRET_KEY);
        res.status(200).json({code:200,data:ret,token,msg:'登录成功'})
    } else {
        res.status(200).json({code: 301, data: null, msg: '用户名或密码错误'})
    }
})

router.post('/qryCls',async(req,res,next)=>{
    let uid = decodeUser(req).uid;
    let params = {uid:uid};
    let sql = `CALL PROC_QRY_CLS(?)`
    let r = await callP(sql,params,res);
    res.status(200).json({code:200,data:r})
})
router.post('/qryClsMain',async(req,res,next)=>{
    let uid = req.body.uid || decodeUser(req).uid;
    let params = {uid:uid,code:req.body.code};

    let sql1 = `CALL PROC_QRY_CLS_MAIN(?)`
    let sql2 = `CALL PROC_QRY_EXP(?)`
    let sql3 = `CALL PROC_QRY_TECH(?)`
    let r = await callP(sql1,params,res)
    let e = await callP(sql2,params,res)
    let t = await callP(sql3,params,res)
    res.status(200).json({code:200,data:r,expList:e,tecList:t});
})
router.post('/qryClsMainO',async(req,res,next)=>{
    let uid = decodeUser(req).uid;
    let params = {uid:uid,code:req.body.code};

    let sql = `CALL PROC_QRY_CLS_MAIN_O(?)`
    let r = await callP(sql,params,res)
    res.status(200).json({code:200,data:r});
})
router.post('/qrySameCls',async(req,res,next)=>{
    let uid = decodeUser(req).uid;
    let params = {uid:uid,code:req.body.code};

    let sql = `CALL PROC_QRY_SAME_CLS(?)`
    let r = await callP(sql,params,res)
    res.status(200).json({code:200,data:r});
})

router.post('/savCls',async(req,res,next)=>{
    let uid = decodeUser(req).uid
    req.body.uid = uid
    let params = req.body

    let sql1 = `CALL PROC_SAV_CLS(?)`
    let sql2 = `CALL PROC_SAV_EXP(?)`
    let sql3 = `CALL PROC_SAV_TECH(?)`
    let r = await callP(sql1,params,res)
    let e = await callP(sql2,params,res)
    let t = await callP(sql3,params,res)
    res.status(200).json({code: 200, data: r, tecList: t, expList: e})
})

router.post('/export',async(req,res,next)=>{
    let sql1 = `CALL PROC_QRY_ALL_USR_CLS`
    let sql2 = `CALL PROC_QRY_CLS_MAIN(?)`
    let sql3 = `CALL PROC_QRY_EXP(?)`
    let sql4 = `CALL PROC_QRY_TECH(?)`

    let data = []
    let p = await callP(sql1,{},res)
    let pet = clone(p)

    for(let i=0;i<pet.length;i++){
        let r = await callP(sql2,pet[i],res)
        let e = await callP(sql3,pet[i],res)
        let t = await callP(sql4,pet[i],res)
        let c = (clone(r))[0];
        c.w_hour = parseInt(c?.t_hour)+parseInt(c.e_hour)
        c.a_hour = c.w_hour*16
        data.push({cls:c,tecList:t,expList:e,fname:`${c.m_tech}_${c.name}.docx`})
    }
    docxTemplate.generateZip(data,INPUT_NAME,OUTPUT_NAME)

    res.status(200).json({message:'导出成功',path:`/${OUTPUT_NAME}`})
})


const decodeUser = (req) =>{
    let token=req.headers.authorization
    return JSON.parse(token.split(' ')[1])
}

var callSQLProc = (sql,params,res)=>{
    return new Promise(resolve =>{
        //JSON.stringify() 将对象转化为JSON字符串
        //调用执行数据库操作
        db.procedureSQL(sql,JSON.stringify(params),(err,ret)=>{
            if(err){
                res.status(500).json({code:-1,msg:'提交请求失败，请联系管理员',data:null})
            }else{
                resolve(ret)
            }
        })
    })
}

var callP = async(sql,params,res)=>{
    return await callSQLProc(sql,params,res)
}

var clone =(e)=> {
    return JSON.parse(JSON.stringify(e))
}

module.exports = router