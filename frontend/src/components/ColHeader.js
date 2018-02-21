import React from 'react';
import PropTypes from 'prop-types';

import { Col } from 'react-bootstrap';

const ColHeader = ({ size, offset = 0, h = 1, children, ...props }) => {
    const header = [
        <h1 {...props}>{children}</h1>,
        <h2 {...props}>{children}</h2>,
        <h3 {...props}>{children}</h3>,
        <h4 {...props}>{children}</h4>,
        <h5 {...props}>{children}</h5>,
        <h6 {...props}>{children}</h6>,
    ][h - 1];
    return (
        <Col
            lg={size}
            md={size}
            sm={size}
            lgOffset={offset}
            mdOffset={offset}
            smOffset={offset}
        >
            {header}
        </Col>
    )
};

ColHeader.propTypes = {
    size: PropTypes.number.isRequired,
    offset: PropTypes.number,
    h: PropTypes.number,
    children: PropTypes.node.isRequired
};

export default ColHeader;