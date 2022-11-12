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