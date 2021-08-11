import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { Container } from 'native-base';
import HeadBack from '../../presentations/HeadBack';
import Car from './Car';

class ShowCars extends Component {

    handleBack = () => this.props.navigation.goBack();

    render() {
        const cars =  this.props.navigation.getParam('cars', []);

        return (
            <Container>
                <HeadBack 
                    handleBack={this.handleBack}
                    title='Autosmoviles válidos'
                />
                <FlatList
                    data={cars}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item,index})=>(
                        <Car 
                            key={index.toString()}
                            car={item}
                        />
                    )}
                />
            </Container>
        );
    }
}

export default ShowCars;