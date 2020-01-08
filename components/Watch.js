import React from 'react';
import YouTube from 'react-youtube';
import { Redirect } from 'react-router-dom';
import { Row, Col } from 'antd';
import SuggestedVideos from './elements/SuggestedVideos';
import SuggestedRutubeVideos from './elements/SuggestedRutubeVideos';

export default class Watch extends React.Component {
    state = {
        data: [],
        redirect: false
    }
    
    componentDidMount = () => this.setData()

    setData() {
        const data = window.location.search.substr(1) ? window.location.search.substr(1).split('&') : [];
        this.setState({data: data, redirect: data.lengt})
    }

    componentDidUpdate(prevProps, prevState){
        const data = window.location.search.substr(1) ? window.location.search.substr(1).split('&') : [];
        if ( prevState.data.length && prevState.data[1] != data[1]) {
            this.setData()
        }
    }

    _onReady(event) {
        event.target.pauseVideo();
    }
    
    render() {
        console.log(this.state.data)
        if (this.state.redirect) {
            return <Redirect to="/home" />;
        }
        if (!this.state.data.length) {
            return null;
        }
        return (
            <Row style={{marginTop: 10}}>
                <Col span={18}>
                    {this.state.data[0] == 't=Y' && 
                        <YouTube
                            videoId={this.state.data[1].split('=')[1]}
                            opts={{
                                height: '500',
                                width: '100%',
                            }}
                            onReady={this._onReady}
                        />
                    }
                    {this.state.data[0] == 't=R' &&  
                        <iframe width="100%" height="500" src={"https://rutube.ru/play/embed/" + this.state.data[1].split('=')[1].split('_|_')[0]} frameborder="0" ></iframe>
                    }
                    {this.state.data[0] == 't=D' && 
                        <iframe  width="100%" height="500" src={`//www.dailymotion.com/embed/video/${this.state.data[1].split('=')[1]}`} allow="autoplay"></iframe> 
                    }
                </Col>
                <Col span={6}>
                    {this.state.data[0] == 't=Y' && 
                        <SuggestedVideos data={this.state.data[1].split('=')[1]} />
                    }
                    {this.state.data[0] == 't=R' && 
                        <SuggestedRutubeVideos data={this.state.data[1].split('=')[1]} />
                    }
                </Col>
            </Row>
        )
    }
}