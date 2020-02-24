import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect, Switch } from "../react-router-dom";
import { Provider, connect } from "react-redux";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import NotFound from "./pages/NotFound";
import User from "./pages/User";
import Login from "./pages/Login";
import AuthRoute from "./components/AuthRoute";
import styles from "./app.css";
import store from "../store";

@connect(
    state => ({isLogined: state.user.isLogined}),
    {
        onLogout: () => ({type: "USER_LOGOUT"})
    }
)
class Header extends Component {
    render() {
        const { isLogined, onLogout } = this.props;
        return (
            <div className={styles["header"]}>
                <div>
                    <Link to="/">首页</Link>
                </div>
                <div>
                    {isLogined && <Link to="/user">用户</Link>}
                    {isLogined ? <span onClick={onLogout}>退出</span> : <Link to="/login">登录</Link>}
                </div>
            </div>
        )
    }
}

/*
route优先级：children > component > render
*/
function Content() {
    return (
        <div className={styles["content"]}>
            <Switch>
                <Route 
                    exact={true} 
                    path="/" 
                    component={Home}
                    render={() => <div>render</div>} 
                ></Route>
                <AuthRoute 
                    path="/detail/:id" 
                    render={() => <Detail />}
                >
                </AuthRoute>
                <AuthRoute path="/user" component={User} />
                <Route path="/login" component={Login} />
                <Route path="/404" component={NotFound} />
                <Redirect to="/404"></Redirect>
            </Switch>
        </div>
    )
}


export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <Header />
                    <Content />
                </Router>
            </Provider>
        )
    }
}
