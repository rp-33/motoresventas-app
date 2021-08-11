import React, { Component } from 'react';
import { View } from 'react-native';
import { Container } from 'native-base';
import HeadBack from '../../presentations/HeadBack';
import InstructionsQR from './InstructionsQR';
import FirstView from './FirstView';
import ScannerCamera from './ScannerCamera ';

class QRcodeScanner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            scanner: false,
        }
    };

    // navegacion

    handleBack = () => this.props.navigation.goBack();

    handleScanner = () => this.setState({ scanner: true });

    // escaner

    handleBarcodesDetected = ({ data }) => {
        const id = this.props.navigation.getParam('_id', null);
        
        if(!id || data!==id) return;

        const product = this.props.navigation.getParam('product');
        const date = this.props.navigation.getParam('date');
        const ticket = this.props.navigation.getParam('ticket');
        this.props.navigation.navigate('saleConfimation', { product, date, ticket, id });
    };

    // render

    render() {        
        return (
            <Container>
                <HeadBack 
                    handleBack={this.handleBack}
                    title='Escanear código QR'
                />
                <View style={{flex:1}}>
                    <InstructionsQR 
                        instructions='Para usar, pidale a su cliente que muestre el codigo QR de la compra.'
                    />
                    <View style={{flex:3}}>
                    {!this.state.scanner ?
                        <FirstView 
                            handleScanner={this.handleScanner}
                        />
                        :
                        <ScannerCamera 
                            handleBarcodesDetected={this.handleBarcodesDetected}
                        />
                    }
                    </View>
                </View>
            </Container>
        );
    }
};

export default QRcodeScanner;