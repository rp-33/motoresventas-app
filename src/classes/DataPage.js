import React, { Component } from 'react';
import { cancellablePromise } from '../utils/cancellablePromise';
import { newPageState } from '../utils/newPageState';

class DataPage extends Component{

    constructor(props, api=null, status=null, message=null) {
        super(props);
        this.apiData = (api && status) ? cancellablePromise(api, status) : null;
        this.message_0 = message;
        this.state = {
            data: [],
            page: 0,
            loading: true,
            refreshing: true,
            noMore: false,
        }
    };

    componentDidMount() {
        this.requestData();
    };

    componentWillUnmount() {
        if(!this.apiData) return;

        this.apiData.cancel();
    };

    handleRefresh = (state = {}) => {
        this.setState({
            ...state,
            page: 0,
            refreshing: true,
            loading: true,
            noMore: false,
        }, this.requestData);    
    };

    handleLoadMore = () => {
        if(this.state.loading || this.state.noMore || this.state.refreshing) return;
        this.setState({
            page: this.state.page + 1,
            loading: true 
        }, this.requestData)
    };

    requestData = async () => {
        if(!this.apiData) return;
        
        const response = await this.apiData.get(this.state.page);
        
        if(!response) return;
        
        const newState = newPageState(this.state, response, this.message_0);
        this.setState({...newState});
    };
};

export default DataPage;