import React from 'react';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Navbar, Button } from 'react-bootstrap';

const Header = ({ redirect, isAuthenticated }) => {
    return (
        <Navbar>
            <Navbar.Header>
                <Navbar.Brand>Brand</Navbar.Brand>
            </Navbar.Header>
            <Navbar.Form pullRight>
                {
                    isAuthenticated && (
                        <div>
                            <Button
                                type="submit"
                                bsStyle="danger"
                                onClick={() => redirect("/logout")}
                            >Выйти</Button>
                        </div>
                    )
                }
            </Navbar.Form>
        </Navbar>
    )
};

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

Header.propTypes = {
    redirect: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);