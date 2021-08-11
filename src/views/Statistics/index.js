import React, { Component } from 'react';
import { Container, Text } from 'native-base';
import Head from './Head';

class Statistics extends Component {

    handleHistory = () => this.props.navigation.navigate('salesHistory');

    handleSales = () => this.props.navigation.navigate('sales');

    render() {
        return (
            <Container>
                <Head 
                    handleHistory={this.handleHistory}
                    handleStatistics={this.handleSales}
                />
            </Container>
        );
    }
}

export default Statistics;