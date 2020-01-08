import React from 'react';
import { AutoComplete, Input, Button, Row, Col } from 'antd';
import { Layout, Menu, Icon, Switch } from 'antd';
import { Link, Redirect } from 'react-router-dom';
import { autoComplate } from '../services';
import { LocalStorageService } from '../services/LocalStorageService';
import { connect } from 'react-redux';
import { changeCanalTypes } from '../actions/search_action';
const { Sider } = Layout;
String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

class MainLayout extends React.Component {
    state = {
        collapsed: false,
        dataSource: [],
        enterValue: '',
        redirectUrl: '',
        selectvalue: '',
        Youtube: LocalStorageService.get('Youtube') ? LocalStorageService.get('Youtube') : false,
        Rutube: LocalStorageService.get('Rutube') ? LocalStorageService.get('Rutube') : false,
        Dailymotion: LocalStorageService.get('Dailymotion') ? LocalStorageService.get('Dailymotion') : false
    };

    handleSearch = (value) => {
        autoComplate(value).then((result) => {
            const res = result.data[1].map(r => r[0])
            this.setState({
                dataSource: !res.length ? [] : res,
            });
        });
    }

    handleSearchButton = (event) => {
        event.stopPropagation();
        if (document.getElementsByClassName('ant-input-affix-wrapper')[0].childNodes[0].value) {
            let redirectUrl = `results?query=${document.getElementsByClassName('ant-input-affix-wrapper')[0].childNodes[0].value}`;
            this.setState({redirectUrl: redirectUrl}) 
        }
    }

    handleSelect = (value) => {
        if (value) {
            let redirectUrl = `results?query=${value}`;
            this.setState({redirectUrl: redirectUrl}) 
        }
    }

    onCollapse = collapsed => {
        this.setState({ collapsed });
    };

    onChange(checked, type) {
        LocalStorageService.set(type, checked);
        this.setState({[type] : checked})
        this.props.change_canal_types({[type] : checked})
    }

    render(){
        const { dataSource } = this.state;
        const { Header, Content, Footer } = Layout;
        if (this.state.redirectUrl) {
            this.setState({redirectUrl: ''})
            return <Redirect to={ this.state.redirectUrl } />;
        }

        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                <div className="logo" />
                <Menu theme="dark" 
                defaultSelectedKeys={[window.location.pathname]} 
                mode="inline">
                    <Menu.Item key="/">
                        <Link className="routeLink" to='/'>
                            <Icon type="home" />
                            <span>Home</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="/about">
                        <Link className="about" to='/about'>
                            <Icon type="desktop" />
                            <span>About</span>
                        </Link>
                    </Menu.Item>
                    
                </Menu>
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', padding: 0 }}>
                    <Row className="checkboxTypes">
                        <Col span={21}>
                            <AutoComplete
                                className="global-search"
                                size="large"
                                defaultValue={window.location.search.substr(1) ? window.location.search.substr(1).split('=')[1].replaceAll('%20', ' ') : ''}
                                style={{ width: '60%', marginLeft: 15 }}
                                dataSource={dataSource}
                                onSelect={this.handleSelect}
                                onSearch={this.handleSearch}
                                placeholder="Search..."
                            >
                            <Input
                                    suffix={(
                                    <Button onClick={this.handleSearchButton} className="search-btn-autocomplate" size="large" type="primary">
                                        <Icon type="search" />
                                    </Button>
                                    )}
                                />
                            </AutoComplete>
                        </Col>
                        <Col span={1} className="youtube">
                            <Switch checkedChildren="Y" unCheckedChildren="Y" defaultChecked={this.state.Youtube} onChange={(r) => this.onChange(r, 'Youtube')}/>
                        </Col>
                        <Col span={1} className="rutube">
                            <Switch checkedChildren="R" unCheckedChildren="R" defaultChecked={this.state.Rutube} onChange={(r) => this.onChange(r, 'Rutube')}/>
                        </Col>
                        <Col span={1} className="dailymotion">
                            <Switch checkedChildren="D" unCheckedChildren="D" defaultChecked={this.state.Dailymotion} onChange={(r) => this.onChange(r, 'Dailymotion')}/>
                        </Col>
                    </Row>
                        
                    </Header>
                    <Content style={{ margin: '0 16px' }}>
                        <div style={{ padding: 24, background: '#fff', minHeight: 800 }}> 
                            {this.props.children}
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
                </Layout>
            </Layout>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        change_canal_types: (data) => dispatch(changeCanalTypes(data))
    }
}

export default connect(null, mapDispatchToProps)(MainLayout);
