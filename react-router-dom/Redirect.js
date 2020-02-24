import React, { useContext } from 'react';
import Context from "./Context";

export default function Redirect({to}) {
    const { history } = useContext(Context);
    if(to){
        history.push(to);
    }
    return null;
}
