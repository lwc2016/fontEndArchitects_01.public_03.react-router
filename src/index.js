import React from "react";
import ReactDOM from "react-dom";

import App from "./app";


const render = (Comp) => {
    ReactDOM.render(<Comp />, document.getElementById("app"));
};

// 第一次渲染
render(App);

if(module.hot){
    module.hot.accept("./app.js", ()=>{
        const nextApp = require("./app.js").default;
        render(App);
    })
}