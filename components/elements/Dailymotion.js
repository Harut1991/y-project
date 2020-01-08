import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col } from 'antd';

export default class Dailymotion extends React.Component {
    render() {
        return (
            <Row className="RowClass">
                <Link to={`/watch?t=D&v=${this.props.data.videoId}`}>
                    <Col span={6} className="rowHeight">
                        <div style={{backgroundImage:  `url(${this.props.data.imgUrl})`}} className="dailymotionImg"></div>
                        <p className="dailymotionIcon"></p>
                    </Col>
                    <Col span={10} className="titleText">
                        <p className="bold">{this.props.data.title}</p>
                        <p>{this.props.data.description}</p>
                    </Col>
                </Link>
            </Row>
        )
    }
}