import React from 'react';
import { Navbar, Button } from 'react-bootstrap';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const Header = ({ redirect, isAuthenticated }) => {
    return (
        <Navbar>
            <Navbar.Header>
                <Navbar.Brand>Brand</Navbar.Brand>
            </Navbar.Header>
            <Navbar.Form pullRight>
                {
                    isAuthenticated && <Button
                        type="submit"
                        bsStyle="danger"
                        onClick={() => redirect("/logout")}
                    >Выйти</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(Header);