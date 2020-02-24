#### 一，react-router介绍
react-router包含3个库，react-router、react-router-dom、react-router-native。react-router是核心库。react-router-dom是浏览器环境下使用的，react-router-native是native环境下使用的。react-router-dom和react-router-native都需要依赖react-router，安装react-router-dom和react-router-native会自动安装react-router。

#### 二，react-router使用
##### 1.Router，路由器，有两种HashRouter和BrowserRouter
```jsx
<Router>
    <App />>
</Router>
```
Router的参数：
- basename: 基本路径
- children: 子元素
- getUserConfirmation：获取用户确认

##### 2.Link 链接
```jsx
<!-- 第一种方式 -->
<Link to="/user">用户</Link>

<!-- 第二种方式 -->
<Link to={{
    pathname: "/user"
}}></Link>

<!-- 第三种方式 -->
<Link to={location => ({
    ...location,
    pathname: "/user"
})}></Link>
```

##### 3.Route 路由
Route有三种使用方式传递子元素：
1. children
```jsx
<Route path="/user">
    <User />>
</Route>
```
2. component
```jsx
<Route path="/user" component={User}></Route>
```
3. render
```jsx
<Route path="/user" render={() => <div>用户中心</div>}></Route>
```
备注说明：这三种方式传递子元素的优先级：children > component > render;

另外，可以使用`exact`精确匹配
```jsx
<!-- 只有当路径为/user时才能匹配到，/user/detail匹配不到 -->
<Route path="/user" exact component={User}></Route>
```

##### 4.Switch独占路由
内部子元素路由，从上到下进行匹配，匹配到后，后面的子元素就不会再匹配到来
```jsx
<Switch>
    <Route path="/" component={Home} exact />
    <Route path="/user" component={User} />
    <Route path="/404" component={NotFound} />>
    <Redirect to="/404" />>
</Switch>
```
##### 5.Redirect 重定向
```jsx
<!-- 第一种使用方式 -->
<Redirect to="/login" />

<!-- 第二种使用方式 -->
<Redirect to={{
    pathname: "/login",
    state: {back: "/user"}
}}>
```
#### 三，路由守卫
```jsx
import React, { Component } from 'react';
import { Route, Redirect } from "../../react-router-dom";
import { connect } from "react-redux";

@connect(
    state => ({isLogined: state.user.isLogined})
)
export default class AuthRoute extends Component {
    render() {
        const { children, component, render, path, isLogined } = this.props;
        // 优先级：children > component > render
        // 这里：如果没有登录，则直接返回
        if(!isLogined){
            return <Redirect to={{ pathname: "/login" }} />
        }
        return (
            <Route path={path} render={render} component={component}>
                {children}
            </Route>
        )
    }
}
```
说明：Route传递子元素的方式有三种：children, component, render函数，因此在做路由守卫时需要考虑到这三种情况。

#### 四，react-router的实现
##### 1. BrowserRouter的实现
```jsx
import React, { Component } from 'react';
import { createBrowserHistory } from "history";
import { Provider } from "./Context";

export default class BrowserRouter extends Component {
    constructor(props){
        super(props);
        this.history = createBrowserHistory(this.props);
        this.state = {
            location: this.history.location
        }
    }
    componentDidMount(){
        // 监听路由变化
        this.listen = this.history.listen(location => {
            this.setState({location});
        })
    }
    render() {
        const { children } = this.props;
        return (
            <Provider value={{
                location: this.state.location,
                history: this.history
            }}>
                {children}
            </Provider>
        )
    }
}
```
BrowserRouter使用的时h5中history Api实现的，这里直接使用history库。（react-router-dom库依赖history）;

##### 2.HashRouter的实现
```jsx
import React, { Component } from 'react';
import { Provider } from "./Context";

export default class HashRouter extends Component {
    constructor(props){
        super(props);
        this.state = {
            location: {}
        }
    }
    componentDidMount(){
        // 获取hash
        const hash = window.location.hash || "#/";
        window.location.hash = hash;
        this.setLocation(hash);
        // 监测hash变化
        window.addEventListener("hashchange", this.handleHashChange);
    }
    componentWillUnmount(){
        // 移除hash监听
        window.removeEventListener("hashchange", this.handleHashChange);
    }
    // hash变化时的处理函数
    handleHashChange = (event) => {
        const hash = event.currentTarget.location.hash;
        this.setLocation(hash);
    }
    setLocation(hash){
        const pathname = hash.slice(1);
        // 设置pathname
        this.setState({
            location: {
                ...this.state.location,
                pathname: pathname.startsWith("/") ? pathname : `/${pathname}`
            }
        })
    }
    push(path){
        window.location.hash = path.startsWith("#") ? path : `#${path}`;
    }
    render() {
        const { children } = this.props;
        const { location } = this.state;
        return (
            <Provider value={{
                location,
                history: {
                    location,
                    push: this.push
                }
            }}>
                {children}
            </Provider>
        )
    }
}
```
##### 3.Route的实现
```jsx
import React, { useContext } from 'react';
import { pathToRegexp } from "path-to-regexp";
import Context from "./Context";

export default function Route(props) {
    const { path, children, component : Component, render, exact } = props;
    const { location : { pathname }, history } = useContext(Context);
    const keys = [];
    const reg = path ? pathToRegexp(path, keys, {end: exact}) : /^\/(.*)/;
    // 判断是否可以匹配上
    if(!pathname){
        return null;
    }
    const match = pathname.match(reg);
    if(!match){
        return null;
    }
    const params = keys.reduce((total, item, index) => {
        return {...total, [item.name]: match[index + 1]};
    }, {});
    

    // 构建props
    const _props = {
        location,
        match: {
            path: pathname,
            params: params,
            history
        }
    };
    // 判断是否有children
    if(children){
        return React.cloneElement(children, _props);
    }
    // 判断是否有Component
    if(Component){
        return <Component {..._props} />
    }
    // 判断是否有render
    if(render){
        return React.cloneElement(render(), _props);
    }
}
```
备注说明：这里需要支持children, component, render三种传递子元素的方式。

##### 4.Link的实现
```jsx
import React, { useContext } from 'react';
import Context from "./Context";

export default function Link({to, children, className}) {
    const { history, location } = useContext(Context);
    const handleLink = (event) => {
        event.preventDefault();
        history.push(to);
    };
    return (
        <a href={to} onClick={handleLink} className={className}>{children}</a>
    )
}
```
##### 5.Switch的实现
```jsx
import React, { useContext } from 'react';
import { pathToRegexp } from "path-to-regexp";
import Context from "./Context";

export default function Switch({children}) {
    const { location: { pathname }} = useContext(Context);
    if(!pathname) return null;
    for(let i = 0; i < children.length; i ++){
        const child = children[i];
        const { path, to, exact } = child.props;
        const reg = path ? pathToRegexp(path, [], {end: exact}) : /^\/(.*)/;
        if(reg.test(pathname)){
            console.log("ok");
            return child;
        }
    }
    return null;
}
```
##### 6.Redirect的实现
```jsx
import React, { useContext } from 'react';
import Context from "./Context";

export default function Redirect({to}) {
    const { history } = useContext(Context);
    if(to){
        history.push(to);
    }
    return null;
}

```