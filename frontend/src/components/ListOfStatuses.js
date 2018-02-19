import React from 'react';
import PropTypes from 'prop-types';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

const ListOfStatuses =  ({ statuses, ...props }) => {
    return (
        <ListGroup>
            {statuses.map(task => (
                <ListGroupItem
                    key={task.id}
                    className={`status-${task.status}`}
                >
                    {`${task.status} Загружено: ${task.uploaded_records}`}
                </ListGroupItem>
            ))}
        </ListGroup>
    )
};

ListOfStatuses.propTypes = {
    statuses: PropTypes.array
};

export default ListOfStatuses;