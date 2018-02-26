import React, { Component } from 'react';
import { createDiagramConfig } from "../utils";

import Hichchart from 'react-highcharts/ReactHighcharts.src';
import { Col } from 'react-bootstrap';

class Diagram extends Component {
    componentDidMount() {
        console.log("diagram mounted");
    }

    render() {
        const { title, options, name } = this.props;
        console.log('Diagram rendered');
        const config = createDiagramConfig(options, title, name);
        return (
            <Col
                lg={6}
                md={6}
                sm={6}
            >
                <Hichchart config={config}/>
            </Col>
        )
    }
}

export default Diagram;