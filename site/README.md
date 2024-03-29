React 16.11.0

## 引用库
- react-loading-spinkit
[github库](https://github.com/phobal/react-loading-spinkit)
- react-loadable (静态代码分割)
[react-loadable 介绍](https://zhuanlan.zhihu.com/p/25874892)
- react-app-rewired(在eject的情况下覆盖CRA配置)[博文使用参考](https://blog.csdn.net/qq_40629521/article/details/110517762)
- babel-plugin-import(按需加载组件代码和样式的bable插件)
- customize-cra(重写CRA默认配置和行为)[github仓库](https://github.com/arackaf/customize-cra)

## 遇到的问题
- `login.js`中`this.props.form`,`props`中有`form`是因为有`Form.create()(Login)`
- `Main.js`需要`new Main()`
- `NavWrapper`组件上没有`history`对象，使用`withRouter`
- mysql数据导入问题

    ```sql
    -- ----------------------------
    -- View structure for view_cls_name
    -- ---------------------------
    DROP VIEW IF EXISTS `view_cls_name`;
    CREATE ALGORITHM = UNDEFINED SQL SECURITY DEFINER VIEW `view_cls_name` AS select concat(`b`.`name`,'实践') AS `name` from (select trim(trailing '实践' from `a`.`name`) AS `name` from (select distinct `t`.`name` AS `name` from `hznu`.`tab_tech_main` `t` where (`t`.`name` like '%实践')) `a`) `b` where `b`.`name` in (select `hznu`.`tab_tech_main`.`name` from `hznu`.`tab_tech_main`);
    ```

    相关子查询不行，问题是 mysql版本过低

    5.7及以上的版本才会支持相关子查询-----升级mysql

- mysql版本升级以及出现问题

    1. 卸载mysql：https://blog.csdn.net/weixin_32639437/article/details/113439600

    2. 安装新版本：https://blog.csdn.net/weixin_42869365/article/details/83472466
    3. 更新root密码：https://blog.csdn.net/qq_40757240/article/details/118068317 （不用这个，用这个会出现以下问题，直接用以下问题的解决办法）
    4. navicat 连接 mysql 出现Client does not support authentication protocol requested by server：https://blog.csdn.net/u013700358/article/details/80306560
    5. MySQL: Error Code: 3065  存储过程中 Expression #1 of ORDER BY clause is not in SELECT list,references column 'xxxxxxx' : https://blog.csdn.net/hanshanyunhai/article/details/105701771
    6. 3065 问题还是存在：*** 重新运行数据库文档！！！***

    7. 安装Mysql5.7报错Install/Remove of the Service Denied! ：用管理员身份打开命令行界面



## 学习
### CSS属性
- `ImeMode`控制输入法
`ime-mode` : `auto` | `active` | `inactive` | `disabled`
1. `auto`  : 默认值。不影响IME(Input Method Editors 输入法编辑器)的状态。与不指定 ime-mode 属性时相同
2. `active`  : 指定所有使用IME输入的字符。即激活本地语言输入法。用户仍可以撤销激活IME
3. `inactive`  : 指定所有不使用IME输入的字符。即激活非本地语言。用户仍可以撤销激活IME
4. `disabled`  : 完全禁用IME。对于有焦点的控件(如输入框)，用户不可以激活IME

- `box-shadow`: 阴影效果
    ```less
    //box-shadow： x偏移量 y偏移量 阴影模糊半径 颜色
    box-shadow: 0 0.05em 0.25em rgb(0 0 0 / 20%);
    ```

- `order`: 设置弹性盒对象元素的顺序
例子：https://www.runoob.com/try/try.php?filename=trycss3_order

- `transition`：过渡效果

### `path.resolve`
```js
path.resolve(__dirname,'src')
// __dirname 当前模块的目录名
// path.resolve(__dirname,'src') 返回（ 当前模块的目录/src ）
```


### Mobx中的`toJS`
将对象转换成JS

### onKeyUp事件
键盘按键被释放的事件
```js
onKeyUp = (e) =>{
    console.log(e.keyCode);
}
```

### 扩展运算符
```js
//从user中拿出uname,其余部分为token
var {uname,...token} = user
console.log(user);
//{id: 1, uid: '20030013', uname: '董文', pwd: '20030013', role: '1|1|1|1'}
console.log(token);
//{id: 1, uid: '20030013', pwd: '20030013', role: '1|1|1|1'}
```

### bind
- 创建一个新函数
- 新函数被调用的时候，新函数中的`this`被指定为`bind()`的第一个参数，其余参数作为新函数的参数，供调用时使用
- 改变`this`指向

### `JSON.parse`与`JSON.stringify`
字符串对象(就是一个字符串)：`'{"id":23,"uid":"20050027","pwd":"20050027","role":"1|1|1|1"}'`
JS对象(就是一个对象):`{id: 23, uid: '20050027', pwd: '20050027', role: '1|1|1|1'}`
将字符串转为对象:`JSON.parse`
将数据转为字符串：`JSON.stringify`


### 动态加载权限菜单
获取用户权限数据，遍历权限菜单，对应的权限数据允许，则加入加载菜单名单

### `withRouter`

#### 作用
在不是通过路由切换的组件中使用，能将`react-router` 的 `history`、`location`、`match` 三个对象传入`props`对象上

#### 解释
默认情况下必须是经过路由匹配渲染的组件才存在this.props，才拥有路由参数，才能使用编程式导航的写法，执行this.props.history.push('/detail')跳转到对应路由的页面。

然而不是所有组件都直接与路由相连（通过路由跳转到此组件）的，当这些组件需要路由参数时，使用withRouter就可以给此组件传入路由参数，此时就可以使用this.props

#### 使用方法
```jsx
import {withRouter} from 'react-router-dom' 
export default withRouter(组件名); 
```

### 输出数组的一个位置的元素并返回
- `splice()` 方法用于添加或删除数组中的元素。
- 会改变原数组

```js
var fruits = ["Banana", "Orange", "Apple", "Mango"];
//从下标为2位置的开始删除一个元素
fruits.splice(2,1); // ['Apple']
fruits  //['Banana', 'Orange', 'Mango']
```

### js剪贴板操作
https://juejin.cn/post/6961718112852901896#heading-1

1. `document.execCommand() `

```js

// 粘贴、chrome不支持
document.execCommand('paste')  
```

2. `navigator.clipboard`

3. `Clipboard` 库

### mysql存储过程
https://www.w3cschool.cn/sqlserver/sqlserver-hw2328n6.html
https://www.runoob.com/w3cnote/mysql-stored-procedure.html

- 操作数据库语言SQL语句在执行的时候需要先编译 --> 然后执行
- 存储过程是一组为了完成特定功能的SQL语句集，经编译后存储在数据库中，用户通过指定存储过程的名字并给定参数来调用执行它。

#### 变量定义:
`DECLARE variable_name [,variable_name...] datatype [DEFAULT value];`

```sql
DECLARE l_int int unsigned default 4000000;  
DECLARE l_numeric number(8,2) DEFAULT 9.95;  
DECLARE l_date date DEFAULT '1999-12-31';  
```

#### 变量赋值
`SET 变量名 = 表达式值 [,variable_name = expression ...]`