import React from 'react';
import PropTypes from 'prop-types';
import { FormControl, FormGroup, ControlLabel, Col } from 'react-bootstrap';

const Input = ({ id, label, size, offset, ...props }) => {
    return (
        <FormGroup controlId={id}>
            <Col
                lg={size}
                md={size}
                sm={size}
                lgOffset={offset}
                mdOffset={offset}
                smOffset={offset}
            >
                <ControlLabel>
                    {label}
                </ControlLabel>
                <FormControl {...props}/>
            </Col>
        </FormGroup>
    )
};

Input.propTypes = {
    id: PropTypes.string,
    label: PropTypes.string,
    size: PropTypes.number,
    offset: PropTypes.number
};

export default Input;