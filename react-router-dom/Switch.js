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
