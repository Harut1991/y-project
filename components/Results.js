import React from 'react';
import { Redirect } from 'react-router-dom';
import Youtube from './elements/Youtube';
import { searchVideo } from '../services/Youtube';
import { Button, Icon, Empty, Spin } from 'antd';
import { searchRutubeVideo } from '../services/Rutube';
import Rutube from './elements/Rutube';
import { LocalStorageService } from '../services/LocalStorageService';
import { searchDailymotionVideo } from '../services/Dailymotion';
import Dailymotion from './elements/Dailymotion';
import { connect } from 'react-redux';

class Results extends React.Component {
    state = {
        data: [],
        query: window.location.search.substr(1) ? window.location.search.substr(1).split('=')[1] : '',
        loading: false,
        nextPage: false,
        yNextPage: '',
        rNextPage: '',
        dNextPage: '',
    };

    constructor(props){
        super(props);
        this.handleLoadData = this.handleLoadData.bind(this);
    }

    componentDidMount() {
        if ( this.state.query ) {
            this.videoSearch(this.state.query);
        }
    }


    handleLoadData() {
        this.setState({loading: true});
        this.videoSearch(this.state.query, true);
    }

    videoSearch(term, next = false) {
        const gyNextPage = this.state.nextPage ? this.state.yNextPage : false,
              grNextPage = this.state.nextPage ? this.state.rNextPage : false,
              gdNextPage = this.state.nextPage ? this.state.dNextPage : false;
              
        Promise.all([
            searchVideo(term, gyNextPage),
            searchRutubeVideo(term, grNextPage),
            searchDailymotionVideo(term, gdNextPage)
        ]).then(result => {
                let data = [],
                    nextPage = false,
                    rNextPage = '',
                    dNextPage = '',
                    yNextPage = '';
                 if ( LocalStorageService.get('Youtube') && result[0].data.items && (!next || (next && gyNextPage))) {
                    data = result[0].data.items.map(r => {
                        return {
                            type: 'y',
                            videoId: r.id.videoId,
                            imgUrl: r.snippet.thumbnails.high.url,
                            title: r.snippet.title,
                            description: this.cutStr(r.snippet.description, 300),
                        }
                    });
                    nextPage = result[0].data.hasOwnProperty("nextPageToken");
                    yNextPage = result[0].data.hasOwnProperty("nextPageToken") ? result[0].data.nextPageToken : ''
                }
                if ( LocalStorageService.get('Rutube') && result[1].data.results && (!next || (next && grNextPage))) {
                    if (!nextPage) {
                        nextPage = result[1].data.has_next;
                    }
                    rNextPage = result[1].data.hasOwnProperty("next") ? result[1].data.next : '';
                    data = [...data, ...result[1].data.results.map(r => {
                        return {
                            type: 'r',
                            videoId: r.embed_url.split('/').pop() + '_|_' + term + '_|_' + r.id,
                            html: r.html,
                            imgUrl: r.thumbnail_url,
                            title: r.title,
                            description: this.cutStr(r.description, 300),
                        }
                    })];
                }

                if ( LocalStorageService.get('Dailymotion') && result[2].data.list && (!next || (next && gdNextPage))) {
                    if (!nextPage) {
                        nextPage = (result[2].data.total - result[2].data.page*result[2].data.limit) > 0 ;
                    }
                    dNextPage = result[2].data.has_more ? result[2].data.page + 1 : '';
                    data = [...data, ...result[2].data.list.map(r => {
                        return {
                            type: 'd',
                            videoId: r.id,
                            imgUrl: r.thumbnail_1080_url,
                            title: r.title,
                            description: this.cutStr(r.description, 300),
                        }
                    })];
                }

                this.setState({
                    data: [...this.state.data, ...data],
                    loading: false,
                    nextPage: nextPage,
                    yNextPage: yNextPage,
                    rNextPage: rNextPage,
                    dNextPage: dNextPage
                });
        })
    }

    cutStr(str, length){
        return str.length > length ? str.substring(0, length) + '...' : str;
    }

    componentDidUpdate(prevProps, prevState) {
        if (JSON.stringify(prevProps.canalTypes) != JSON.stringify(this.props.canalTypes)){
            this.setState({
                data: [],
                query: window.location.search.substr(1) ? window.location.search.substr(1).split('=')[1] : '',
                loading: true,
                nextPage: false,
                yNextPage: '',
                rNextPage: '',
                dNextPage: '',
            });
            this.videoSearch(this.state.query);
        }
    }

    render() {
        if (!window.location.search.substr(1)) {
            return <Redirect to="/home" />;
        }

        if (!this.state.data.length) {
            return <div className="loading"><Spin /></div>;
        }
        return (
            <div>
                {this.state.data.map((r, i) => {
                    if (r.type == 'y') {
                        return (
                            <Youtube key={i} data={r} />
                        )
                    } else if(r.type == 'r') {
                        return (
                            <Rutube key={i} data={r} />
                        )
                    } else {
                        return (
                            <Dailymotion key={i} data={r} />
                        )
                    }
                })}
                {this.state.nextPage && 
                    <Button type="dashed" block onClick={this.handleLoadData}>
                        {this.state.loading && 
                            <Spin style={{marginTop: 5}} />
                        }
                        {!this.state.loading && 
                        <Icon type="down" />
                        }
                    </Button>
                }
                {!this.state.data.length && 
                    <Empty style={{marginTop: 25}} />
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { canalTypes: state.searchReducer.canalTypes }
}

export default connect(mapStateToProps, null)(Results);