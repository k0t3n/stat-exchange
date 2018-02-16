import React from 'react';
import { Button, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';

const ColButton = ({ children, size, offset, ...props }) => {
    return (
        <Col
            lg={size}
            md={size}
            sm={size}
            lgOffset={offset}
            mdOffset={offset}
            smOffset={offset}
        >
            <Button
                {...props}
            >{children}
            </Button>
        </Col>
    )
};

Button.propTypes = {
    children: PropTypes.node.isRequired,
    size: PropTypes.number.isRequired,
    offset: PropTypes.number.isRequired
};

export default ColButton;