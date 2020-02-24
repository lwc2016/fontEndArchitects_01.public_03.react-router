import React, { Component } from 'react';
import { Route, Redirect } from "../../react-router-dom";
import { connect } from "react-redux";

@connect(
    state => ({isLogined: state.user.isLogined})
)
export default class AuthRoute extends Component {
    render() {
        const { 
            children,
            component,
            render,
            path, 
            isLogined
        } = this.props;
        // 优先级：children > component > render
        if(!isLogined){
            return <Redirect to={{
                pathname: "/login"
            }} />
        }
        return (
            <Route path={path} render={render} component={component}>
                {children}
            </Route>
        )
    }
}
