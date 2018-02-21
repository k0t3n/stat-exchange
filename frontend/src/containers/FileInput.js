import React, { Component } from 'react';
import { checkStatuses, clearError, uploadFile } from "../actions/upload";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import PropTypes from 'prop-types';

import { Form, Alert, Col } from 'react-bootstrap';
import ColButton from "../components/ColButton";
import Input from '../components/Input';

class FileInput extends Component {
    constructor() {
        super();
        this.state = {
            file: null,
            fileSize: 0
        };

        this.maxSize = 1000000;
    }

    componentWillMount() {
        console.log('File Input will mount'); // todo: delete this console.log

        this.props.clearError(); // todo: connect to redux FileInput, not modal
    }

    componentDidMount() {
        const { token } = this.props;

        this.props.checkStatuses(token);
    }

    handleChange = (file) => {
        this.setState({
            fileSize: file.size,
            file
        });
    }

    handleUpdateStatuses = () => {
        const { token } = this.props;

        this.props.checkStatuses(token);
    }

    validate() {
        const { file, fileSize } = this.state;
        return (fileSize > this.maxSize || file === null);
    }

    handleSubmit = () => {
        const { token } = this.props;
        const { file } = this.state;

        this.props.uploadFile(file, token);

        this.setState({
            file: null,
            fileSize: 0
        })
    }

    render() {
        const { error } = this.props;
        const { fileSize } = this.state;

        return (
            <Form horizontal>
                <Input
                    id="fileInput"
                    type="file"
                    accept=".cvs"
                    size={6}
                    offset={3}
                    onChange={(e) => this.handleChange(e.target.files[0])}
                />
                {fileSize > this.maxSize && (
                    <Col
                        lg={8}
                        md={8}
                        sm={8}
                        lgOffset={2}
                        mdOffset={2}
                        smOffset={2}
                    >
                        <Alert bsStyle="danger">
                            Файл не должен превышать 10мб
                        </Alert>
                        {error && (
                            <Alert bsStyle="danger">
                                Что-то пошло не так
                            </Alert>
                        )}
                    </Col>
                )}
                <ColButton
                    bsStyle="info"
                    onClick={this.handleUpdateStatuses}
                    offset={2}
                    size={4}
                >
                    Обновить статусы
                </ColButton>

                <ColButton
                    bsStyle="success"
                    disabled={this.validate()}
                    onClick={this.handleSubmit}
                    size={4}
                >
                    Загрузить файл
                </ColButton>
            </Form>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        error: state.upload.error,
        token: state.auth.token
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        uploadFile: bindActionCreators(uploadFile, dispatch),
        checkStatuses: bindActionCreators(checkStatuses, dispatch),
        clearError: bindActionCreators(clearError, dispatch),
    }
};

FileInput.propTypes = {
    uploadFile: PropTypes.func,
    checkStatuses: PropTypes.func,
    clearError: PropTypes.func,
    error: PropTypes.bool,
    token: PropTypes.string
};

export default connect(mapStateToProps, mapDispatchToProps)(FileInput);

//todo: style file input
//todo[OPTIONAL]: edit login form to be managed by redux
//todo[OPTIONAL]: edit input file to be managed by redux
//todo[OPTIONAL]: edit selects to be managed by redux