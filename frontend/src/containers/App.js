import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../styles/App.css';
import PairSelect from "./PairSelect";
import Chart from "../components/Chart";
import ListOfLines from './ListOfLines';
import { fetchData } from "../actions/data";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Pagination, Col } from 'react-bootstrap';

class App extends Component {
    constructor() {
        super();
        this.state = {
            active: 1
        };

        this.handleClick = this.handleClick.bind(this);
    }

    componentWillMount() {
        this.fetchData();
    }

    fetchData() {
        let token = this.props.token;
        this.props.fetchData(token);
    }

    renderFirst() {
        const { pairsOnChart } = this.props;

        const priceOptions = pairsOnChart.map(pair => {
            return {
                name: `${pair.firstCurrencyName}/${pair.lastCurrencyName}`,
                data: pair.stats.price
            }
        });
        // console.log('priceOptions = ', priceOptions);

        const amountOptions = pairsOnChart.map(pair => {
            return {
                name: `${pair.lastCurrencyName}/${pair.firstCurrencyName}`,
                data: pair.stats.amount
            }
        });
        // console.log('amountOptions = ', amountOptions);

        return (
            <div>
                <Chart options={priceOptions} title="Price" />
                <Chart options={amountOptions} title="Amount" />
            </div>
        )
    }

    renderSecond() {
        const { pairsOnChart } = this.props;

        const totalOptions = pairsOnChart.map(pair => {
            return {
                name: `${pair.firstCurrencyName}/${pair.lastCurrencyName}`,
                data: pair.stats.total
            }
        });
        // console.log('totalOptions = ', totalOptions);

        const feeOptions = pairsOnChart.map(pair => {
            return {
                name: `${pair.firstCurrencyName}/${pair.lastCurrencyName}`,
                data: pair.stats.fee
            }
        });
        // console.log('feeOptions = ', feeOptions);

        return (
            <div>
                <Chart options={totalOptions} title="Total" />
                <Chart options={feeOptions} title="Fee" />
            </div>
        )
    }

    renderThird() {
        const { pairsOnChart } = this.props;

        const baseOptions = pairsOnChart.map(pair => {
            return {
                name: `${pair.firstCurrencyName}/${pair.lastCurrencyName}`,
                data: pair.stats.base_total_less_fee
            }
        });
        // console.log('totalOptions = ', baseOptions);

        const quoteOptions = pairsOnChart.map(pair => {
            return {
                name: `${pair.firstCurrencyName}/${pair.lastCurrencyName}`,
                data: pair.stats.quote_total_less_fee
            }
        });
        // console.log('feeOptions = ', quoteOptions);

        return (
            <div>
                <Chart options={baseOptions} title="Base total less fee" />
                <Chart options={quoteOptions} title="Quote total less fee" />
            </div>
        )
    }

    renderPagination() {
        return (
            <Pagination className="Pagination">
                <Pagination.Item
                    active={this.state.active === 1}
                    onClick={() => this.handleClick(1)}
                >{1}</Pagination.Item>
                <Pagination.Item
                    active={this.state.active === 2}
                    onClick={() => this.handleClick(2)}
                >{2}</Pagination.Item>
                <Pagination.Item
                    active={this.state.active === 3}
                    onClick={() => this.handleClick(3)}
                >{3}</Pagination.Item>
            </Pagination>
        )
    }

    handleClick(num) {
        this.setState({
            active: num
        })
    }

    render() {
        const { active } = this.state;

        console.log('rendered');

        return (
            <div>
                <Col
                    lg={12}
                    md={12}
                    sm={12}
                >
                    <div>
                        {active === 1 ? this.renderFirst() : null}
                        {active === 2 ? this.renderSecond() : null}
                        {active === 3 ? this.renderThird() : null}
                    </div>
                    <div className="Pagination">
                        {this.renderPagination()}
                    </div>
                </Col>
                {!this.props.isFetching && <PairSelect />}
                <ListOfLines />
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        pairsOnChart: state.chart.pairs,
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
    pairsOnChart: PropTypes.array,
    token: PropTypes.string,
    isFetching: PropTypes.bool,
    fetchData: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(App);