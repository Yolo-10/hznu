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


## 学习
- CSS属性`ImeMode`控制输入法
`ime-mode` : `auto` | `active` | `inactive` | `disabled`
1. `auto`  : 默认值。不影响IME(Input Method Editors 输入法编辑器)的状态。与不指定 ime-mode 属性时相同
2. `active`  : 指定所有使用IME输入的字符。即激活本地语言输入法。用户仍可以撤销激活IME
3. `inactive`  : 指定所有不使用IME输入的字符。即激活非本地语言。用户仍可以撤销激活IME
4. `disabled`  : 完全禁用IME。对于有焦点的控件(如输入框)，用户不可以激活IME

