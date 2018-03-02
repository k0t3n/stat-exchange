import React from 'react';
import PropTypes from 'prop-types';
import { updateTask } from '../utils';
import '../styles/ListOfStatuses.css';

import { ListGroup, Badge, Label, Well, ProgressBar, } from 'react-bootstrap';

const ListOfStatuses =  ({ statuses, ...props }) => {
    return (
        <ListGroup {...props}>
            {statuses.map(task => {
                const date = new Date(task.uploaded_at).toLocaleString();
                const newTask = updateTask(task);

                return (
                    <div
                        key={task.id}
                    >
                        <Label bsStyle="info">{task.exchange}</Label>
                        <Well>
                            <ProgressBar>
                                <ProgressBar
                                    striped
                                    active={task.status === 'in_progress'}
                                    now={newTask.uploadStatus}
                                    bsStyle={newTask.uploadBsStyle}
                                    label={'Загрузка файла'}
                                />
                                <ProgressBar
                                    striped
                                    active={task.status === 'in_progress'}
                                    now={newTask.parseStatus}
                                    bsStyle={newTask.parseBsStyle}
                                    label={'Парсинг файла'}
                                />
                            </ProgressBar>
                            <div>
                                Записей загружено: {task.uploaded_records}
                                <Badge pullRight>{date}</Badge>
                            </div>
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