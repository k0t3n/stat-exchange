import React from 'react';
import { FormGroup, ControlLabel, FormControl, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';

const Select = ({ label, options, value, offset = 0, ...props }) => {
    return (
        <Col
            lg={2}
            md={2}
            sm={2}
            lgOffset={offset}
            mdOffset={offset}
            smOffset={offset}
        >
            <FormGroup>
                <ControlLabel>{label}</ControlLabel>
                <FormControl
                    componentClass="select"
                    value={value}
                    {...props}
                >
                    {options.map((option, index) => (
                        <option value={option} key={`${option}-${index}`}>{option}</option>
                    ))}
                </FormControl>
            </FormGroup>
        </Col>
    )
};

Select.propTypes = {
    label: PropTypes.string,
    options: PropTypes.array.isRequired,
    value: PropTypes.string.isRequired
};

export default Select;