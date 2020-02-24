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

