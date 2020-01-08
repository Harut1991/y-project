import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col } from 'antd';

export default class RutubeSuggested extends React.Component {
    render() {
        return (
            <Row className="RowClass">
                <Link to={`/watch?t=R&v=${this.props.data.videoId}`}>
                    <Col span={12}>
                        <img alt="example" className="SuggestedVideoImg" src={this.props.data.imgUrl} />
                    </Col>
                    <Col span={10} className="SuggestedText">
                        <p className="bold">{this.props.data.title}</p>
                    </Col>
                </Link>
            </Row>
        )
    }
}