import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col } from 'antd';

export default class Youtube extends React.Component {
    render() {
        return (
            <Row className="RowClass">
                <Link to={`/watch?t=Y&v=${this.props.data.videoId}`}>
                    <Col span={6} className="rowHeight">
                        <img alt="example" src={this.props.data.imgUrl} className="youtubeImg" />
                        <p className="youtubeIcon"></p>
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