import React, { Component } from 'react'
import QRCode from 'react-native-qrcode-svg';
import { View, Dimensions } from 'react-native';
import HeadBack from '../../presentations/HeadBack';
import { Container } from 'native-base';

let { width } = Dimensions.get('window');

class QRcode extends Component {
    
    handleBack = () => this.props.navigation.navigate('purchases', { refresh: true });;

    render() {
        const id = this.props.navigation.getParam('id', 'motoresventas');
        return (
            <Container>
                <HeadBack 
                    handleBack={this.handleBack}
                    title='Código QR de la compra'
                />
                <View style={{flex: 1,backgroundColor:'white',alignItems: 'center',justifyContent: 'center'}}>
                    <QRCode
                        value={id}
                        size={width*0.7}
                    />
                </View>
            </Container>
        );
    };
};

export default QRcode;