import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class SignIn extends Component {
    render() {
        return (
            <div className="SignIn">
                <Link to={"register"}>Регистрация</Link>
            </div>
        );
    }
}