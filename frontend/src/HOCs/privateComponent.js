import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { push } from "react-router-redux";
import { connect } from 'react-redux';

export function privateComponent(WrappedComponent) {
    class AuthenticatedComponent extends Component {
        componentWillMount() {
            this.checkAuth(this.props.isAuthenticated)
        }

        componentWillReceiveProps(nextProps) {
            this.checkAuth(nextProps.isAuthenticated)
        }

        checkAuth(isAuthenticated) {
            if (!isAuthenticated) {
                this.props.redirect("/auth")
            }
        }

        render() {
            return (
                <div>
                    {
                        this.props.isAuthenticated && <WrappedComponent {...this.props}/>
                    }
                </div>
            )
        }
    }

    const mapStateToProps = (state) => {
        return {
            isAuthenticated: state.auth.isAuthenticated
        }
    };

    const mapDispatchToProps = (dispatch) => {
        return {
            redirect: bindActionCreators(push, dispatch)
        }
    };

    return connect(mapStateToProps, mapDispatchToProps)(AuthenticatedComponent);
}

