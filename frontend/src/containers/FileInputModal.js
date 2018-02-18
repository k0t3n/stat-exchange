import React, { Component } from 'react';
import { Modal, Button, Col } from 'react-bootstrap';
import FileInput from './FileInput';
import ColButton from '../components/ColButton';
import ListOfLines from './ListOfLines';
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
                <Col
                    lg={2}
                    md={2}
                    sm={2}
                >
                    <ColButton
                        onClick={this.handleShow}
                        size={12}
                    >
                        Загрузить файл
                    </ColButton>
                    <ListOfLines />
                </Col>
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