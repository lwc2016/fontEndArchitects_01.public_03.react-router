import React, { Component } from 'react';
import { connect } from "react-redux";
import styles from "./User.css";

@connect(
    state => state.user
)
export default class User extends Component {
    render() {
        const { avatar, name } = this.props.user;
        return (
            <div>
                <h3>用户中心</h3>
                <div className={styles["content"]}>
                    <img className={styles["avatar"]} src={avatar} />
                    <p>{name}</p>
                </div>
            </div>
        )
    }
}
