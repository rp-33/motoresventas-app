import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'native-base';
import Product from './Product';
import { FlatList, RefreshControl } from 'react-native';
import HeadBack from '../../presentations/HeadBack';
import { getSales } from '../../services/api';
import color from '../../theme/color';
import DataPage from '../../classes/DataPage';
import { connect } from 'react-redux';
import { newPageState } from '../../utils/newPageState';
import { SELLER } from '../../constants/userTypes';

class Sales extends DataPage {

    constructor(props) {
        super(props, getSales, 200);
    };

    componentDidUpdate() {
        const refresh = this.props.navigation.getParam('refresh', false);
        if(refresh) {
            this.props.navigation.state.params = null;
            this.handleRefresh({ data: [] });
        }
    };

    requestData = async () => {
        const { emitter: _id } = this.props;
        const response = await this.apiData.get(this.state.page, _id);
        
        if(!response) return;
        
        const newState = newPageState(this.state, response, 'No hay ventas en proceso');
        this.setState({...newState});
    };

    // navegacion

    handleQRscanner = ({_id, product, date, ticket}) => () => this.props.navigation.navigate('qrScanner', { _id, product, date, ticket })

    handleBack = () => this.props.navigation.goBack();

    handleDetails = (id) => () => this.props.navigation.navigate('productDetailsSeller', { id });

    handleChat = ({ product, buyer_user, _id }) => () => {
        const { name, image } = product;
        const { emitter } = this.props;
        const { _id: receiver } = buyer_user;
        this.props.navigation.navigate('chat', { product: { emitter, receiver, _id, name, image, type: SELLER } });
    };

    // render

    render() {
        const { data, loading } = this.state;

        return (
            <Container>
                <HeadBack 
                    title='Ventas activas'
                    handleBack={this.handleBack}
                />
                <FlatList
                    data={data}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item,index})=>(
                        <Product 
                            key={index}
                            item={item}
                            handleQRscanner={this.handleQRscanner(item)}
                            handleDetails={this.handleDetails(item.product._id)}
                            handleChat={this.handleChat(item)}
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

Sales.proptypes = {
    emitter: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
    emitter: state.seller._id
});

export default connect(mapStateToProps, null)(Sales);