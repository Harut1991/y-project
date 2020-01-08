import React from 'react';
import { Button, Icon, Empty, Spin } from 'antd';
import { suggestedRutubeVideosAxios } from '../../services/Rutube';
import RutubeSuggested from './RutubeSuggested';

export default class SuggestedRutubeVideos extends React.Component {
    constructor(props) {
        super(props)
        this.handleLoadData = this.handleLoadData.bind(this);
    }

    state = {
        data: [],
        loading: false,
        mainloading: false,
        nextPage: false,
        rNextPage: ''
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
                rNextPage: ''
            }
            this.setState(this.state);
            this.suggested();
        }
    }

    handleLoadData() {
        this.setState({loading: true});
        this.suggested();
    }
    
    cutStr(str, length){
        return str.length > length ? str.substring(0, length) + '...' : str;
    }

    suggested(){
        suggestedRutubeVideosAxios(this.props.data.split('_|_')[2], this.state.nextPage ? this.state.rNextPage : false).then(result => {
            if ( result.data.results) {
                let data = result.data.results.filter(r => r.id != this.props.data.split('_|_')[2]).map(r => {
                    return {
                        type: 'r',
                        videoId: r.track_id + '_|_' + this.props.data.split('_|_')[1] + '_|_' + r.id,
                        html: r.html,
                        imgUrl: r.thumbnail_url,
                        title: r.title,
                        description: this.cutStr(r.description, 300),
                    }
                });
                
                this.setState({
                    data: [...this.state.data, ...data],
                    loading: false,
                    nextPage: result.data.has_next,
                    mainloading: false,
                    rNextPage: result.data.hasOwnProperty("next") ? result.data.next : ''
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
                        return <RutubeSuggested data={r} key={i} />
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