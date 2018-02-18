import React from 'react';
import { FormControl, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';

const Select = ({ options, value, offset = 0, ...props }) => {
    return (
        <Col
            lg={6}
            md={6}
            sm={6}
            lgOffset={offset}
            mdOffset={offset}
            smOffset={offset}
        >
            <FormControl
                componentClass="select"
                value={value}
                {...props}
            >
                {options.map((option, index) => (
                    <option value={option} key={`${option}-${index}`}>{option}</option>
                ))}
            </FormControl>
        </Col>
    )
};

Select.propTypes = {
    options: PropTypes.array.isRequired,
    value: PropTypes.string.isRequired,
    offset: PropTypes.number
};

export default Select;