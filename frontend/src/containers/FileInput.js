import React, { Component } from 'react';
import { Form, Alert, Col } from 'react-bootstrap';
import Input from '../components/Input';
import ColButton from "../components/ColButton";

class FileInput extends Component {
    constructor() {
        super();
        this.state = {
            file: null,
            fileSize: 0
        };

        this.maxSize = 100;
        this.handleChange = this.handleChange.bind(this);
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
                        lg={6}
                        md={6}
                        sm={6}
                        lgOffset={3}
                        mdOffset={3}
                        smOffset={3}
                    >
                        <Alert bsStyle="danger">
                            Файл не должен превышать 10мб
                        </Alert>
                    </Col>
                )}
                <ColButton
                    bsStyle="success"
                    disabled={this.validate()}
                    onClick={() => {}}
                    size={4}
                    offset={4}
                >
                    Загрузить файл
                </ColButton>
            </Form>
        )
    }
}

export default FileInput;

//todo: actions for loading file
//todo: selects
//todo: style file input
//todo: edit actions and reducers for loading data from api
//todo[OPTIONAL]: edit login form to be managed by redux
//todo[OPTIONAL]: edit input file to be managed by redux
//todo[OPTIONAL]: edit selects to be managed by redux