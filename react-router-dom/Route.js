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
