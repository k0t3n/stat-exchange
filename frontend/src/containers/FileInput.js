import React, { Component } from 'react';
import { checkStatuses, clearError, uploadFile } from "../actions/upload";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import '../styles/FileInput.css';

import { Form, Alert, Col, ButtonGroup } from 'react-bootstrap';
import ColButton from "../components/ColButton";
import ColHeader from "../components/ColHeader";

class FileInput extends Component {
    constructor() {
        super();
        this.state = {
            file: null,
            fileSize: 0,
            fileName: 'Выберите файл',
            activeExchange: 'bittrex'
        };

        this.maxSize = 1000000;
        this.exchanges = ['bittrex', 'binance', 'poloniex'];
    }

    componentWillMount() {
        this.props.clearError();
    }

    componentDidMount() {
        const { token, checkStatuses } = this.props;

        checkStatuses(token);
    }

    handleChangeFile = (file) => {
        this.setState({
            fileSize: file.size,
            fileName: file.name,
            file
        });
    }

    handleChangeExchange = (exchange) => {
        this.setState({ activeExchange: exchange })
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
        const { token, checkStatuses } = this.props;
        const { file, activeExchange } = this.state;

        this.props.uploadFile(file, activeExchange, token);

        this.setState({
            file: null,
            fileSize: 0,
            fileName: 'Выберите файл'
        });

        setTimeout(() => checkStatuses(token), 5000);
    }

    render() {
        const { error } = this.props;
        const { fileSize, fileName, activeExchange } = this.state;

        return (
            <Form horizontal>
                <div className="FileInputContainer">
                    <label htmlFor="fileInput">{fileName}</label>
                    <input
                        id="fileInput"
                        type="file"
                        accept=".csv"
                        onChange={(e) => this.handleChangeFile(e.target.files[0])}
                    />
                </div>
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
                <ColHeader size={12} h={4}>Выберите биржу</ColHeader>
                <Col
                    lg={12}
                    md={12}
                    sm={12}
                >
                    <ButtonGroup justified className="Exchanges">
                        {this.exchanges.map(exchange => (
                            <ColButton
                                onClick={() => this.handleChangeExchange(exchange)}
                                bsStyle={exchange === activeExchange ? 'primary' : 'default'}
                                size={4}
                                key={exchange}
                            >
                                {exchange}
                            </ColButton>
                        ))}
                    </ButtonGroup>
                </Col>

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