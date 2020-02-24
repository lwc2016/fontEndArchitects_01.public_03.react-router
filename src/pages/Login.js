import React, { Component } from 'react';
import { Redirect } from "../../react-router-dom";
import { connect } from "react-redux";

@connect(
    state => ({
        isLogined: state.user.isLogined,
        logining: state.user.logining,
        error: state.user.error
    }),
    {
        onLogin: (user) => dispatch => {
            dispatch({type: "USER_LOGIN"});
            setTimeout(() => {
                if(Math.random() >= 0.5){
                    dispatch({type: "USER_LOGIN_SUCCESS", user});
                }else{
                    dispatch({type: "USER_LOGIN_FAIL", error: "用户名或密码错误！"});
                }
            }, 1000);
        }
    }
)
export default class Login extends Component {
    render() {
        const { isLogined, error, logining, onLogin} = this.props;
        if(isLogined){
            return <Redirect to="/" />
        }
        const user = {
            name: "Jack",
            age: 20,
            avatar: "http://p2.ifengimg.com/a/2018_31/2dd37bca611f306_size220_w1024_h1027.jpg"
        }
        return (
            <div>
                <h3>欢迎登录</h3>
                {logining ? <span>登录中...</span> : <button onClick={onLogin.bind(this, user)}>登录</button>}
                {error && <p>{error}</p>}
            </div>
        )
    }
}
