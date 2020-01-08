import React from 'react';
import { suggestedVideos } from '../../services/Youtube';
import YoutubeSuggested from './YoutubeSuggested';
import { Button, Icon, Empty, Spin } from 'antd';

export default class SuggestedVideos extends React.Component {
    constructor(props) {
        super(props)
        this.handleLoadData = this.handleLoadData.bind(this);
    }

    state = {
        data: [],
        loading: false,
        nextPage: false,
        mainloading: false,
        yNextPage: ''
    }

    componentDidMount(){
        this.setState({mainloading: true});
        this.suggested();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.data != this.props.data) {
            this.state = {
                data: [],
                loading: false,
                mainloading: true,
                nextPage: false,
                yNextPage: ''
            }
            this.setState(this.state);
            this.suggested();
        }
    }

    handleLoadData() {
        this.setState({loading: true});
        this.suggested();
    }

    suggested(){
        suggestedVideos(this.props.data, this.state.nextPage ? this.state.yNextPage : false).then(result => {
            if ( result.data.items) {
                let data = result.data.items.map(r => {
                    return {
                        type: 'y',
                        videoId: r.id.videoId,
                        imgUrl: r.snippet.thumbnails.high.url,
                        title: r.snippet.title,
                        description: r.snippet.description,
                    }
                });
                this.setState({
                    data: [...this.state.data, ...data],
                    loading: false,
                    mainloading: false,
                    nextPage: result.data.hasOwnProperty("nextPageToken"),
                    yNextPage: result.data.hasOwnProperty("nextPageToken") ? result.data.nextPageToken : ''
                })
            }
        });
    }


    render() {
        if (this.state.mainloading) {
            return <div className="loading"><Spin /></div>;
        }

        if (!this.state.data.length) {
            return null;
        }

        return (
            <div>
                <div style={{marginLeft: 10}}>
                    {this.state.data.map((r,i) => {
                        return <YoutubeSuggested data={r} key={i} />
                    })}
                </div>
                {this.state.nextPage && 
                    <Button type="dashed" style={{width: '93%', marginLeft: '3.5%'}} block onClick={this.handleLoadData}>
                        {this.state.loading && 
                            <Spin style={{marginTop: 5}} />
                        }
                        {!this.state.loading && 
                            <Icon type="down" />
                        }
                    </Button>
                }
            </div>
        )
    }
}