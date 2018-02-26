import React from 'react';
import PropTypes from 'prop-types';

import { Pagination } from 'react-bootstrap';

const ChartPagination = ({ options, active, onClick, ...props }) => {
    return (
        <div {...props}>
            <Pagination>
                {options.map(option => (
                    <Pagination.Item
                        key={option}
                        active={option === active}
                        onClick={() => onClick(option)}
                    >{option}</Pagination.Item>
                ))}
            </Pagination>
        </div>
    )
};

ChartPagination.propTypes = {
    options: PropTypes.array,
    active: PropTypes.string,
    onClick: PropTypes.func
};

export default ChartPagination;