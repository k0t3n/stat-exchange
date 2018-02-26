import React, { Component } from 'react';

import { Tabs, Tab, Col } from 'react-bootstrap';
import Chart from "./Chart";
import Diagram from "./Diagram";

class ChartsTabs extends Component {
    state = {
        active: 1
    }

    handleSelect = (key) => {
        this.setState({ active: key });
    }

    render() {
        const { active } = this.state;

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
                {active === 1 ? <Chart/> : (
                    <div>
                        <Diagram type="trades" title="Топ по количеству сделок" />
                        <Diagram type="profits" title="Топ по сумме профита" />
                    </div>
                )}
            </Col>
        )
    }
}

export default ChartsTabs;