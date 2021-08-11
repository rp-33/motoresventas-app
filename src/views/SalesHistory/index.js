import React from 'react';
import PropTypes from 'prop-types';
import { FlatList, RefreshControl } from 'react-native';
import { Container } from 'native-base';
import HeadBack from '../../presentations/HeadBack';
import Product from './Product';
import { connect } from 'react-redux';
import { salesHistory } from '../../services/api';
import color from '../../theme/color';
import DataPage from '../../classes/DataPage';
import { newPageState } from '../../utils/newPageState';

class SalesHistory extends DataPage {

    constructor(props) {
        super(props, salesHistory, 200);
    };

    requestData = async () => {
        const { _id } = this.props.seller;
        const response = await this.apiData.get(this.state.page, _id);

        if(!response) return;
        
        const newState = newPageState(this.state, response, 'No hay historial de ventas');
        this.setState({...newState});
    };

    handleDetails = (history) => () => {
        const { name, rif, rifCode } = this.props.seller;
        const product = {...history, seller_user: { name, rif, rifCode }};
        this.props.navigation.navigate('productDetailsHistory', { product })
    };

    handleBack = () => this.props.navigation.goBack();

    render() {
        const { data, loading } = this.state;

        return (
            <Container>
                <HeadBack 
                    title='Historial de Ventas'
                    handleBack={this.handleBack}
                />
                <FlatList
                    data={data}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item,index})=>(
                        <Product 
                            key={index}
                            item={item}
                            handleDetails={this.handleDetails(item)}
                        />
                    )}
                    refreshControl={<RefreshControl colors={[color.primary]} refreshing={loading} onRefresh={this.handleRefresh}/>}
                    onEndReached={this.handleLoadMore}
                    onEndReachedThreshold={0.1}
                />
            </Container>
        );
    }
};

SalesHistory.proptypes = {
    seller: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    seller: state.seller
});

export default connect(mapStateToProps, null)(SalesHistory);