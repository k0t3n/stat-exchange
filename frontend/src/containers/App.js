import React from 'react';

import PairSelect from "./PairSelect";
import ListOfLines from './ListOfLines';
import { Alert } from 'react-bootstrap';
import ChartsTabs from "./ChartsTabs";

const App = ({ error }) => {
    console.log('App rendered');

    return (
        <div>
            {error && (
                <Alert bsStyle="danger">Что-то пошло не так, перезагрузите страницу.</Alert>
            )}
            <ChartsTabs />
            <PairSelect />
            <ListOfLines />
        </div>
    );
};

export default App;