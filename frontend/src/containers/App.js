import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { fetchData } from "../actions/data";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import '../styles/App.css';

import PairSelect from "./PairSelect";
import Chart from "../components/Chart";
import ListOfLines from './ListOfLines';
import { Pagination, Col, Alert } from 'react-bootstrap';

class App extends Component {
    state = {
        active: 1
    }

    componentWillMount() {
        this.fetchData();
    }

    fetchData() {
        const { token, fetchData } = this.props;

        fetchData(token);
    }

    renderFirst() {
        const { pairsOnChart } = this.props;

        const priceOptions = pairsOnChart.map(pair => {
            return {
                name: `${pair.firstCurrencyName}/${pair.lastCurrencyName}`,
                data: pair.stats.price
            }
        });

        const amountOptions = pairsOnChart.map(pair => {
            return {
                name: `${pair.lastCurrencyName}/${pair.firstCurrencyName}`,
                data: pair.stats.amount
            }
        });

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

        const feeOptions = pairsOnChart.map(pair => {
            return {
                name: `${pair.firstCurrencyName}/${pair.lastCurrencyName}`,
                data: pair.stats.fee
            }
        });

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

        const quoteOptions = pairsOnChart.map(pair => {
            return {
                name: `${pair.firstCurrencyName}/${pair.lastCurrencyName}`,
                data: pair.stats.quote_total_less_fee
            }
        });

        return (
            <div>
                <Chart options={baseOptions} title="Base total less fee" />
                <Chart options={quoteOptions} title="Quote total less fee" />
            </div>
        )
    }

    renderPagination() {
        const { active } = this.state;

        return (
            <Pagination className="Pagination">
                <Pagination.Item
                    active={active === 1}
                    onClick={() => this.handleClick(1)}
                >{1}</Pagination.Item>
                <Pagination.Item
                    active={active === 2}
                    onClick={() => this.handleClick(2)}
                >{2}</Pagination.Item>
                <Pagination.Item
                    active={active === 3}
                    onClick={() => this.handleClick(3)}
                >{3}</Pagination.Item>
            </Pagination>
        )
    }

    handleClick = (num) => {
        this.setState({
            active: num
        })
    }

    render() {
        const { error } = this.props;
        const { active } = this.state;

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
                {error && (
                    <Alert bsStyle="danger">Что-то пошло не так, перезагрузите страницу.</Alert>
                )}
                <PairSelect />
                <ListOfLines />
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        pairsOnChart: state.chart.pairs,
        token: state.auth.token,
        error: state.data.error
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
    fetchData: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(App);