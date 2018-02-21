import React from 'react';
import PropTypes from 'prop-types';
import '../styles/ListOfStatuses.css';

import { ListGroup, Badge, Label, Well } from 'react-bootstrap';

const ListOfStatuses =  ({ statuses, ...props }) => {
    return (
        <ListGroup {...props}>
            {statuses.map(task => {
                const bsStyle = task.status === 'in_progress' ? 'warning' : task.status === 'failed' ? 'danger' : task.status;
                const status = task.status === 'in_progress' ? 'Загружается' : task.status === 'failed' ? 'Ошибка' : 'Успешно';
                const date = new Date(task.uploaded_at).toLocaleString();

                return (
                    <div
                        key={task.id}
                    >
                        <Label bsStyle={bsStyle}>{status}</Label>
                        <Well >
                            Записей загружено: {task.uploaded_records}
                            <Badge pullRight>{date}</Badge>
                        </Well>
                    </div>
                )
            })}
        </ListGroup>
    )
};

ListOfStatuses.propTypes = {
    statuses: PropTypes.array
};

export default ListOfStatuses;