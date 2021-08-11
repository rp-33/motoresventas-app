import React from 'react';
import { Container, Text } from 'native-base';
import { FlatList, RefreshControl } from 'react-native';
import Product from './Product';
import HeadBack from '../../presentations/HeadBack';
import { purchasesHistory } from '../../services/api';
import color from '../../theme/color';
import DataPage from '../../classes/DataPage';

class BuyerHistory extends DataPage{

    constructor(props) {
        super(props, purchasesHistory, 200, 'No hay historial de compras');
    };

    handleDetails = (history) => () => this.props.navigation.navigate('productDetailsHistory', { product: history });

    handleBack = () => this.props.navigation.goBack();

    render(){
        const { data, loading } = this.state;
        
        return(
            <Container>
                <HeadBack 
                    handleBack={this.handleBack}
                    title='Historial de Compras'
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
        )
    }
};

export default BuyerHistory;