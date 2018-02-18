import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import FileInput from './FileInput';
import ColButton from '../components/ColButton';
import '../styles/FileInputModal.css';

class FileInputModal extends Component {
    constructor() {
        super();
        this.state = {
            show: false
        };

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
    }

    render() {
        return (
            <div>
                <ColButton
                    onClick={this.handleShow}
                    size={3}
                >
                    Загрузить файл
                </ColButton>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header>
                        <Modal.Title>Загрузка файла</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="FileInput">
                            <FileInput />
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

export default FileInputModal;