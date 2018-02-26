import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { fetchData } from "../actions/data";
import { connect } from 'react-redux';

import PairSelect from "./PairSelect";
import ListOfLines from './ListOfLines';
import ChartsTabs from "./ChartsTabs";
import { Alert } from 'react-bootstrap';

class App extends Component {
    componentWillMount() {
        this.fetchData();
    }

    fetchData() {
        const { token, fetchData } = this.props;
        fetchData(token);
    }


    render() {
        const { isFetching, error } = this.props;

        return (
            <div>
                <ChartsTabs/>
                {error && (
                    <Alert bsStyle="danger">
                        Что-то пошло не так, обновите страницу.
                    </Alert>
                )}
                {!isFetching && <PairSelect />}
                <ListOfLines/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.auth.token,
        error: state.data.error,
        isFetching: state.data.isFetching
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: bindActionCreators(fetchData, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);