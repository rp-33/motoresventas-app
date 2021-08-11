import React from 'react';
import { Container } from 'native-base';
import Ticket from '../../presentations/Ticket';
import HeadBack from '../../presentations/HeadBack';
import { View } from 'react-native';

const ProductDetailsHistory = ({ navigation }) => {

    const handleBack = () => navigation.goBack();

    const { product, date, ticket, seller_user } = navigation.getParam('product', {});

    return (
        <Container>
            <HeadBack 
                title='Ticket de la Compra'
                handleBack={handleBack}
            />
            <View style={{paddingVertical:10,flex:1,backgroundColor:'rgb(232,232,232)'}}>
                <Ticket 
                    product={product}
                    date={date}
                    ticket={ticket}
                    seller={seller_user}
                />
            </View>
        </Container>
    );
};

export default  ProductDetailsHistory;