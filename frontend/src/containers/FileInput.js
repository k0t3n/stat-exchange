import React, { Component } from 'react';
import { Form, Alert, Col } from 'react-bootstrap';
import Input from '../components/Input';
import ColButton from "../components/ColButton";
import PropTypes from 'prop-types';

class FileInput extends Component {
    constructor() {
        super();
        this.state = {
            file: null,
            fileSize: 0
        };

        this.maxSize = 1000000;
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validate = this.validate.bind(this);
    }

    handleChange(file) {
        this.setState({
            fileSize: file.size,
            file
        });
    }

    validate() {
        const { file, fileSize } = this.state;
        return (fileSize > this.maxSize || file === null);
    }

    handleSubmit() {
        this.props.onClick(this.state.file);
        this.setState({
            file: null,
            fileSize: 0
        })
    }

    render() {
        return (
            <Form horizontal>
                <Input
                    id="fileInput"
                    type="file"
                    accept=".txt"
                    size={6}
                    offset={3}
                    onChange={(e) => this.handleChange(e.target.files[0])}
                />
                {this.state.fileSize > this.maxSize && (
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
                    </Col>
                )}
                <ColButton
                    bsStyle="success"
                    disabled={this.validate()}
                    onClick={this.handleSubmit}
                    size={4}
                    offset={4}
                >
                    Загрузить файл
                </ColButton>
            </Form>
        )
    }
}

FileInput.propTypes = {
    onClick: PropTypes.func
};

export default FileInput;

//todo: style file input
//todo[OPTIONAL]: edit login form to be managed by redux
//todo[OPTIONAL]: edit input file to be managed by redux
//todo[OPTIONAL]: edit selects to be managed by redux