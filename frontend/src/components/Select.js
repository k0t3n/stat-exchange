import React from 'react';
import PropTypes from 'prop-types';

import { FormControl, Col } from 'react-bootstrap';

const Select = ({ options, value, size, offset = 0, ...props }) => {
    return (
        <Col
            lg={size}
            md={size}
            sm={size}
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
    offset: PropTypes.number,
    size: PropTypes.number.isRequired
};

export default Select;