var express = require('express');
//跨域
var cors = require('cors'); 
//提供给node.js能够进行http请求传输数据的方法
var http = require('http'); 
//压缩请求
var compression = require('compression');
//nodejs的
var path = require('path');
//路由
var router  = require('./routes/index')


const app = express();
const port = 8030;
app.use(cors());
app.use(compression());
//配置解析application/json格式数据的内置中间件
//解析带有JSON数据的请求，把解析结果放入req.body
//如果没有这个中间件,req.body是undefined
app.use(express.json());
// 配置解析application/x-www-form-urlencoded格式数据的内置中间件
// extended控制解析数据是选择qs模块还是querystring模块
// qs模块能够嵌套数据
// extended=false 采用querystring模块，只能解析单层数据，无法解析嵌套数据
app.use(express.urlencoded({extended:false}))
//与express.json()|express.urlencoded作用相同
//express早期捆绑了许多中间件
//Express 4.0发布时，删除捆绑的中间件，而是将它们变成单独的程序包,所以有bodyParser
//bodyParser在4.16.0版中又重新添加到Express中
// app.use(bodyParser.json({limit: '10mb', extended: true}))
// app.use(bodyParser.urlencoded({limit: '10mb', extended: true}))
app.use(express.static(__dirname+"/"));
// 效果同以上，app.use(express.static(path.join(__dirname,'/public')));



app.use('/',router);



//app.listen同样可以监听端口
var server = http.createServer(app).listen(port);
server.on('error',onError);
server.on('listening',()=>{
    console.log('Listening on Port 8030');
})

//端口错误处理
function onError(error){
    if(error.syscall !== 'listen') {throw error;}
    switch(error.code){
        case 'EACCES'://端口需要更高权限
            console.log('Port 8030 requires elevated privileges');
            process.exit(1);//node.js以1的退出状态同步终止进程，1表示由于某种故障而终止进程
            break;
        case 'EADDRINUSE'://端口已被使用
            console.error('Port 8030 is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

