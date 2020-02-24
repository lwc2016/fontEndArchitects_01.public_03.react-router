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
