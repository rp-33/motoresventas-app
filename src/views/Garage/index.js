import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    FlatList
} from 'react-native';
import {
    Container,
    Text,
    Toast
} from 'native-base';
import Car from './Car';
import { connect } from 'react-redux';
import { removeCar } from '../../actions/garage';
import { setCurrentCar } from '../../actions/user';
import { setLoading } from '../../actions/loading';
import Head from './Head';
import {updateCar, deleteCars } from '../../services/api';
import { withToDelete } from '../../hoc/withToDelete';

class Garage extends Component {

    // navegacion 

    handleBack = () => this.props.navigation.goBack();

    handlePlus = () => this.props.navigation.navigate('garageOptions');

    // eliminar

    handleDelete = async () => {
        let message = '';
        let type = 'danger';
        const { removeCar, setCurrentCar, setLoading, garage, currentCar, resetToDelete, toDelete } = this.props;
        setLoading(true);
        let carsToDelete = [];
        let newGarage = [];
        garage.forEach(car => {
            if(toDelete.includes(car._id)) carsToDelete = [...carsToDelete, car];
            else newGarage = [...newGarage, car]
        });
        let newCar = null;
        if(newGarage.length>0) {
            if(toDelete.includes(currentCar)) newCar = newGarage[0]._id;
            else newCar = currentCar;
        }
        try {              
            let { status, data } = await deleteCars(newCar, carsToDelete);
            if(status === 201) {
                message = data.message;
                type = 'success';
                setCurrentCar(newCar);
                removeCar(newGarage);
                resetToDelete();
            } else{  
                message = data.error || 'Error en el servidor';           
            }
        } catch (err) {
            message = 'Error en el servidor';
        } finally {
            setLoading(false);
            Toast.show({
                text: message,
                textStyle: { fontSize: 15  },
                buttonTextStyle: { color: '#000000', fontSize: 15 },
                buttonText: "Cerrar",
                duration: 3000,
                type
            });
        }
    };
    
    // seleccionar

    handleActive = (newCar) => async () => {
        const { setCurrentCar, setLoading, currentCar } = this.props;
        if(currentCar === newCar) return;

        let message = '';
        let type = 'danger';
        setLoading(true);
        try {                 
            let { status, data } = await updateCar(newCar);
            if(status === 201) {
                message = data.message;
                type = 'success';
                setCurrentCar(newCar);
            } else{  
                message = data.error || 'Error en el servidor';           
            }
        } catch (err) {
            message = 'Error en el servidor';
        } finally {
            setLoading(false);
            Toast.show({
                text: message,
                textStyle: { fontSize: 15  },
                buttonTextStyle: { color: '#000000', fontSize: 15 },
                buttonText: "Cerrar",
                duration: 3000,
                type
            });
        }
    };
    
    // render

    render() {
        const { currentCar = null, garage = [], toDelete, marketToDelete, activeToDelete } = this.props;
    
        return (
            <Container>
                <Head 
                    handleBack={this.handleBack}
                    handleAdd={this.handlePlus}
                    handleDelete={this.handleDelete}
                    toDelete={toDelete}
                />
                <FlatList
                    data={garage}
                    keyExtractor={(item, index) => item._id}
                    renderItem={({item,index})=>(
                        <Car 
                            key={index}
                            car={item}
                            toDelete={toDelete}
                            active={currentCar}
                            handleActive={this.handleActive(item._id)}
                            handleToDelete={marketToDelete(item._id)}
                            handleLongToDelete={activeToDelete(item._id)}
                        />
                    )}
                    ListEmptyComponent={
                        <Text style={{alignSelf:'center',marginTop:10,color:'#575757',textAlign:'center',paddingHorizontal:10}}>
                            Añade un automóvil al garaje para buscar sus repuestos.
                        </Text>
                    }
                />
            </Container>
        );
    }
};

Garage.proptypes = {
    currentCar: PropTypes.string.isRequired,
    garage: PropTypes.array.isRequired,
    setLoading: PropTypes.func.isRequired,
    removeCar: PropTypes.func.isRequired,
    setCurrentCar: PropTypes.func.isRequired,
    toDelete: PropTypes.array.isRequired, 
    marketToDelete: PropTypes.func.isRequired, 
    activeToDelete: PropTypes.func.isRequired,
    resetToDelete: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
    setLoading: value => dispatch(setLoading(value)),
    removeCar: value => dispatch(removeCar(value)),
    setCurrentCar: value => dispatch(setCurrentCar(value)),
});

const mapStateToProps = state => ({
    currentCar: state.user.currentCar,
    garage: state.garage
})

export default connect(mapStateToProps, mapDispatchToProps)( withToDelete( Garage ) );