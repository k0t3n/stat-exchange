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
                    size={4}
                    offset={4}
                    onChange={(e) => this.handleChange(e.target.files[0])}
                />
                {this.state.fileSize > this.maxSize && (
                    <Col
                        lg={4}
                        md={4}
                        sm={4}
                        lgOffset={4}
                        mdOffset={4}
                        smOffset={4}
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