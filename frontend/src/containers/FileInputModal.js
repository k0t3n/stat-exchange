import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../styles/FileInputModal.css';

import { Modal, Button } from 'react-bootstrap';
import ListOfStatuses from "../components/ListOfStatuses";
import FileInput from './FileInput';
import ColButton from '../components/ColButton';

class FileInputModal extends Component {
    state = {
        show: false
    }

    handleClose = () => {
        this.setState({ show: false });
    }

    handleShow = () => {
        this.setState({ show: true });
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

const mapStateToProps = (state) => {
    return {
        statuses: state.upload.statuses
    }
};

FileInputModal.propTypes = {
    statuses: PropTypes.array
};

export default connect(mapStateToProps)(FileInputModal);