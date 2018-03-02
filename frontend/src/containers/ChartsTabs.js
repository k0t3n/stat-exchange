import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { getTop10Profits, getTop10Trades } from "../actions/diagram";
import { connect } from "react-redux";

import { Tabs, Tab, Col } from 'react-bootstrap';
import Chart from "./ChartContainer";
import Diagram from "./Diagram";

class ChartsTabs extends Component {
    state = {
        active: 1
    }

    componentDidMount() {
        const { token, getTop10Trades, getTop10Profits } = this.props;

        getTop10Trades(token);
        getTop10Profits(token);
    }

    handleSelect = (key) => {
        this.setState({ active: key });
    }

    render() {
        const { active } = this.state;
        const { trades, profits, options } = this.props;

        return (
            <Col
                lg={12}
                md={12}
                sm={12}
            >
                <Tabs
                    activeKey={active}
                    onSelect={this.handleSelect}
                    id="ChartsTabs"
                >
                    <Tab eventKey={1} title={'График'}>
                    </Tab>
                    <Tab eventKey={2} title={'Диаграммы'}>
                    </Tab>
                </Tabs>
                {active === 1 ? <Chart options={options} /> : (
                    <div>
                        <Diagram
                            type="trades"
                            title="Топ по количеству сделок"
                            name="Кол-во сделок"
                            options={trades}
                        />
                        <Diagram
                            type="profits"
                            title="Топ по сумме профита"
                            name="Общий профит"
                            options={profits}
                        />
                    </div>
                )}
            </Col>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.auth.token,
        trades: state.diagram.trades.map(option => ({
            name: `${option.first_currency}/${option.last_currency}`,
            y: option.trades_count
        })),
        profits: state.diagram.profits.map(option => ({
            name: `${option.first_currency}/${option.last_currency}`,
            y: option.trades_profit
        })),
        options: state.chart.pairsOnChart
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getTop10Trades: bindActionCreators(getTop10Trades, dispatch),
        getTop10Profits: bindActionCreators(getTop10Profits, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ChartsTabs);