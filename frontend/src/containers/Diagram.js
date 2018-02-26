import React, { Component } from 'react';
import Hichchart from 'react-highcharts/ReactHighcharts.src';
import { createDiagramConfig } from "../utils";
import { Col } from 'react-bootstrap';

class Diagram extends Component {
    componentDidMount() {
        console.log("diagram mounted");
        // const { getTop10, typeOfTop, token } = this.props;
        //
        // getTop10(typeOfTop, token);
    }

    render() {
        const { title } = this.props;
        console.log('Diagram rendered');
        const config = createDiagramConfig(undefined, title);

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