const mysql = require('mysql');
const config = require('./conf')

/**
 * 
 * @param {*} sql 数据库语句
 * @param {*} params 参数
 * @param {*} cb  回调函数
 */
var procedureSQL = async (sql,params,cb)=>{
    var conn = mysql.createConnection(config);
    conn.query(sql,params,function(err,ret,fields){
        if(err){
            console.log('SQL error',err);
            cb(err,ret)
        }else{
            cb(err,ret[0])
        }
        conn.end();
    })
}

exports.procedureSQL = procedureSQL;