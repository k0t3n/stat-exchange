import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import FileInput from './FileInput';
import PropTypes from 'prop-types';
import ColButton from '../components/ColButton';
import '../styles/FileInputModal.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { checkStatus, uploadFile, clearError } from "../actions/upload";
import ListOfStatuses from "../components/ListOfStatuses";

class FileInputModal extends Component {
    constructor() {
        super();
        this.state = {
            show: false
        };

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        console.log('>>>>>>>>>>>>>>>>>>>>>>>');
        const { token } = this.props;

        this.props.clearError();
        this.props.checkStatus(token);
    }

    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
    }

    handleSubmit(file) {
        const { token } = this.props;

        this.props.uploadFile(file);
        let request = setInterval(this.props.checkStatus(token), 5000);

        if (this.props.status !== 'uploading') {
            clearInterval(request);
            console.log('errir');
        }
    }

    render() {
        const { statuses } = this.props;
        const { show } = this.state;

        return (
            <div>
                <ColButton
                    className="add-button"
                    bsStyle="info"
                    onClick={this.handleShow}
                    size={6}
                >
                    Загрузить файл
                </ColButton>
                <Modal show={show} onHide={this.handleClose}>
                    <Modal.Header>
                        <Modal.Title>Загрузка файла</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ListOfStatuses statuses={statuses}/>
                        <div className="FileInput">
                            <FileInput onClick={this.handleSubmit} />
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.handleClose}>Закрыть</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        statuses: state.upload.statuses,
        error: state.upload.error,
        token: state.auth.token
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        uploadFile: bindActionCreators(uploadFile, dispatch),
        checkStatus: bindActionCreators(checkStatus, dispatch),
        clearError: bindActionCreators(clearError, dispatch)
    }
};

FileInputModal.propTypes = {
    statuses: PropTypes.array,
    uploadFile: PropTypes.func,
    checkStatus: PropTypes.func,
    error: PropTypes.bool,
    token: PropTypes.string
};

export default connect(mapStateToProps, mapDispatchToProps)(FileInputModal);