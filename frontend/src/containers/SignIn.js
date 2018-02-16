import React, { Component } from 'react';
import '../styles/SignIn.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loginUser } from "../actions/auth";
import LoginForm from "../components/LoginForm";

class SignIn extends Component {
    constructor() {
        super();
        this.state = {
            login: '',
            password: ''
        };

        this.onChangeInput = this.onChangeInput.bind(this);
        this.validateForm = this.validateForm.bind(this);
    }

    validateForm() {
        const { login, password } = this.state;
        return (login.length < 4) || (password.length < 4)
    }

    onChangeInput(e) {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    render() {
        const { login, password } = this.state;
        return (
            <LoginForm
                loginUser={this.props.loginUser}
                onChangeInput={this.onChangeInput}
                validateForm={this.validateForm}
                login={login}
                password={password}
            />
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loginUser: bindActionCreators(loginUser, dispatch)
    }
};

export default connect(undefined, mapDispatchToProps)(SignIn);