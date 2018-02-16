import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import Input from '../components/Input';
import ColButton from "../components/ColButton";

class FileInput extends Component {
    constructor() {
        super();
        this.state = {
            file: null
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(file) {
        this.setState({ file });
    }

    render() {
        return (
            <Form horizontal>
                <Input
                    id="fileInput"
                    type="file"
                    size={4}
                    offset={4}
                    onChange={(e) => this.handleChange(e.target.files)}
                />
                <ColButton
                    bsStyle="success"
                    disabled={this.state.file === null}
                    onClick={() => {}}
                    size={4}
                    offset={4}
                    block
                >
                    Загрузить файл
                </ColButton>
            </Form>
        )
    }
}

export default FileInput;