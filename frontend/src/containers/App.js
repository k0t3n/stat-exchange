import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../styles/App.css';
import PairSelect from "./PairSelect";
import Chart from "../components/Chart";
import FileInputModal from "./FileInputModal";
import { fetchData } from "../actions/data";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

let options = [{  // from redux to chart
    name: 'BTC/RUB',
    data: []
}];

class App extends Component {
    componentWillMount() {
        this.fetchData();
    }

    fetchData() {
        let token = this.props.token;
        this.props.fetchData(token);
    }

    render() {
        const { pairs, currencies } = this.props;
        return (
            <div className="App">
                <Chart options={options} />
                <FileInputModal />
                {!this.props.isFetching && <PairSelect pairs={pairs} currencies={currencies} />}
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        currencies: state.data.currencies,
        pairs: state.data.pairs,
        token: state.auth.token,
        isFetching: state.data.isFetching
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: bindActionCreators(fetchData, dispatch)
    }
};

App.propTypes = {
    currencies: PropTypes.array,
    pairs: PropTypes.array,
    token: PropTypes.string,
    isFetching: PropTypes.bool,
    fetchData: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

//todo: graphic component
//todo: get pairs and currencies from redux and give it to pairselect