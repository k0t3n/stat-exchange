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