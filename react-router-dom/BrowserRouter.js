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
        this.history.listen(location => {
            console.log(location);
            this.setState({location});
        })
    }
    componentWillUnmount(){
        
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

