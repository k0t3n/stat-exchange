import React from 'react';
import { Form, Modal, Alert } from 'react-bootstrap';
import PropTypes from 'prop-types';

import Input from './Input';
import ColButton from "./ColButton";

const LoginForm = ({ login, password, onChangeInput, validateForm, loginUser, error, statusText }) => {
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
                    {
                        error && (
                            <Alert bsStyle="danger">
                                {statusText}
                            </Alert>
                        )
                    }
                </Modal.Body>
                <Modal.Footer>
                    <ColButton
                        size={4}
                        offset={4}
                        disabled={validateForm()}
                        onClick={() => loginUser(login, password)}
                        bsStyle="success"
                    >Войти
                    </ColButton>
                </Modal.Footer>
            </Modal.Dialog>
        </div>
    )
};

LoginForm.propTypes = {
    loginUser: PropTypes.func.isRequired,
    login: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    statusText: PropTypes.string,
    onChangeInput: PropTypes.func.isRequired,
    validateForm: PropTypes.func.isRequired,
    error: PropTypes.bool.isRequired,
};

export default LoginForm;