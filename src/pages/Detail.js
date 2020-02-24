import React from 'react';
import { Redirect } from "react-router-dom";
import news from "../data/news";

export default function Detail(props) {
    const { match: { params: { id } }, history } = props;
    const data = news.find(item => item.id == id);
    // if(!data){
    //     return <Redirect to="/" />
    // }
    console.log(props);
    // const data = {title: "ok", content: "hello world"};
    return (
        <div>
            <h3>{data.title}</h3>
            <p>{data.content}</p>
        </div>
    )
}
