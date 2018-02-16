import React, { Component } from 'react';
import { logoutUser } from "../actions/auth";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { privateComponent } from "../HOCs/privateComponent";

class SignOut extends Component {
    componentWillMount() {
        this.props.logoutUser();
    }

    render() {
        return (
            <div className="SignOut">
                Signed out
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logoutUser: bindActionCreators(logoutUser, dispatch)
    }
};

export default connect(undefined, mapDispatchToProps)(privateComponent(SignOut));