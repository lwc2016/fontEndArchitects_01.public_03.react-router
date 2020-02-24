import React from 'react';
import { Link } from "../../react-router-dom";
import news from "../data/news";

export default function Home(props) {
    return (
        <div>
            这是主页
            <ul>
                {news.map(item => (
                    <li key={item.id}>
                        <Link to={`/detail/${item.id}`}>{item.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}
