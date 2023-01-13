## 一点问题

### yarn start报错

  ```json
  "start": "set REACT_APP_MY_VAR=development&& react-app-rewired start",
  ```

### 文件中路径报错

```jsx
import {isN,msg} from '@util/fn'
 //加上@符号
```


## HTTP请求编码格式
[参考链接](https://blog.csdn.net/Greenhand_BN/article/details/114750061)

- application/x-www-form-urlencoded
数据类型：`FormData` ，把`form`数据转换成一个字串`（name1=value1&name2=value2…）`，然后把这个字串`append`到`url`后面，用`?`分割，加载这个新的`url`。 当`action`为`post`时候，浏览器把`form`数据封装到`http body`中，然后发送到`server`

- application/json
以纯文本形式进行编码，其格式为 JSON

- multipart/form-data
把整个表单以控件为单位分割，并为每个部分加上`Content-Disposition(form-data或者file),name(控件name)`等信息，并加上分割符`(boundary)`。报文分割符为：`------WebKitFormBoundarys70zFPQBqcgHeMy9`

- text/plain
以纯文本形式进行编码，其中不含任何控件或格式字符

##  module.exports 与 exports 的一点理解
> 简单而言： `module.exports = exports = {}`

每个JS文件执行或被`require`时，`nodejs`悄悄执行
```js
var module = new Module();
var exports = module.exports;
```
`module.exports` 与 `exports` 的关系 形如`var a={}; var b=a;中a和b的区别

## mysql数据库

### 存储过程传递参数格式
`'{"uid":"20050027"}'`
`'{"uid":"20050027","code":"225037001"}'`

### FIND_IN_SET
- str 要查询的字符串
- strList 字段名，参数以“,”分隔，如(1,2,6,8)
- 查询字段(strList)中包含的结果，返回结果null或记录。

```sql
select * from tab_tech_main where FIND_IN_SET(`code`, _code);
```

## 导出zip

### 使用的js库
- docxtemplater:doc模块生成库
- pizzip:实现文档解析和压缩
- file-saver:下载库

### 导出pdf功能实践历程
1. 导出一个word
```
问题1：得到的是RowDataPacket,如何取第一个
解决：处理数据，将RowDataPacket转换成对象，JSON.parse(JSON.stringify(data))
问题2：未定义的字段undefined
解决：配置项中增加nullGetter选项
```

2. 打包zip
```js
//新建zip实例
let zip = new pizZip()

//生成单个docx数据buf_doc
//....

//doc加入zip包中，并生成zip
zip.file(数据名, buf_doc);
let buf = zip.generate(ZIP_OPTIONS);
fs.writeFileSync(path.resolve(__dirname, oPath), buf);
```
3. 批量导出个word

问题1：获取每个教师每个课程对应的uname、code等
解决：思考逻辑过程，灵活运用group by、GROUP_CONCAT、distinct
问题2：由于clone(p).map内是异步任务，await对应的是map内的async,console.log('data',data) 中data为空

```js
clone(p).map(async(item)=>{
    let r = await callP(sql2,item,res)
    let e = await callP(sql3,item,res)
    let t = await callP(sql4,item,res)
    let c = (clone(r))[0];
    data.push({cls:c,tecList:t,expList:e,fname:`${c.m_tech}_${c.name}.docx`})
})
console.log('data',data) 
docxTemplate.generateZip(data,INPUT_PATH,OUTPUT_PATH)
```

解决：思考原因，不采用map执行异步任务，用for循环,await对应的是外层的async
```js
for(let i=0;i<pet.length;i++){
    let r = await callP(sql2,pet[i],res)
    let e = await callP(sql3,pet[i],res)
    let t = await callP(sql4,pet[i],res)
    let c = (clone(r))[0];
    data.push({cls:c,tecList:t,expList:e,fname:`${c.m_tech}_${c.name}.docx`})
}
docxTemplate.generateZip(data,INPUT_PATH,OUTPUT_PATH)
```

### import 和require的区别
>   https://juejin.cn/post/6844903912487518221#heading-0

1. require,exports,module.exports属于CommonJS规范,import,export,export default属于ES6规范
2. require支持动态导入,动态匹配路径,import对这两者都不支持
3. require是运行时调用,import是编译时调用
4. require是赋值过程,import是解构过程
5. 对于export和export default 不同的使用方式,import就要采取不同的引用方式,主要区别在于是否存在{},export导出的,6. import导入需要{},导入和导出一一对应,export default默认导出的,import导入不需要{}
7. exports是module.exports一种简写形式,不能直接给exports赋值
8. 当直接给module.exports赋值时,exports会失效