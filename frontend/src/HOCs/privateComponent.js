import { bindActionCreators } from "redux";
import { push } from "react-router-redux";
import { connect } from 'react-redux';

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