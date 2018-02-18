import React, { Component } from 'react';
import { logoutUser } from "../actions/auth";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

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

SignOut.propTypes = {
    logoutUser: PropTypes.func.isRequired
};

export default connect(undefined, mapDispatchToProps)(SignOut);