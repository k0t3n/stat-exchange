import React from 'react';
import PropTypes from 'prop-types';

import { Button, Col } from 'react-bootstrap';

const ColButton = ({ children, size = 1, offset = 0, ...props }) => {
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
                block
                {...props}
            >{children}
            </Button>
        </Col>
    )
};

Button.propTypes = {
    children: PropTypes.node.isRequired,
    size: PropTypes.number,
    offset: PropTypes.number
};

export default ColButton;