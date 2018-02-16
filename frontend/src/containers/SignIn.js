import React, { Component } from 'react';
import '../styles/SignIn.css';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
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

    componentWillMount() {
        if (this.props.isAuthenticated) {
            this.props.redirect("/");
        }
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
        const { loginUser, error, statusText } = this.props;

        return (
            <LoginForm
                loginUser={loginUser}
                onChangeInput={this.onChangeInput}
                validateForm={this.validateForm}
                login={login}
                password={password}
                error={error}
                statusText={statusText}
            />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        error: state.auth.error,
        statusText: state.auth.statusText,
        isAuthenticated: state.auth.isAuthenticated
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        loginUser: bindActionCreators(loginUser, dispatch),
        redirect: bindActionCreators(push, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);