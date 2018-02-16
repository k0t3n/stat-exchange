import React from 'react';
import { Button, Form, Col, Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';

import Input from './Input';

const LoginForm = ({ login, password, onChangeInput, validateForm, loginUser }) => {
    return (
        <div className="SignIn">
            <Modal.Dialog>
                <Modal.Header>
                    <Modal.Title>Авторизация</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form horizontal>
                        <Input
                            id="login"
                            type="text"
                            label="Логин"
                            onChange={onChangeInput}
                            value={login}
                            placeholder="Введите логин"
                            size={10}
                            offset={1}
                        />
                        <Input
                            id="password"
                            type="password"
                            label="Пароль"
                            onChange={onChangeInput}
                            value={password}
                            placeholder="Введите пароль"
                            size={10}
                            offset={1}
                        />
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Col
                        lg={4}
                        md={4}
                        sm={4}
                        lgOffset={4}
                        mdOffset={4}
                        smOffset={4}
                    >
                        <Button
                            bsStyle="success"
                            disabled={validateForm()}
                            onClick={() => loginUser(login, password)}
                            block
                        >Войти
                        </Button>
                    </Col>
                </Modal.Footer>
            </Modal.Dialog>
        </div>
    )
};

LoginForm.propTypes = {
    loginUser: PropTypes.func.isRequired,
    login: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    onChangeInput: PropTypes.func.isRequired,
    validateForm: PropTypes.func.isRequired
};

export default LoginForm;