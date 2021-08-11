import React, { Component } from 'react';
import Proptypes from 'prop-types';
import {
    TouchableOpacity,
    View,
    StyleSheet
} from 'react-native';
import { 
    Container,
    Text,
    Toast,
    Button
} from 'native-base';
import { connect } from 'react-redux';
import { setLoading } from '../../actions/loading';
import { addCar } from '../../actions/garage';
import { setCurrentCar } from '../../actions/user';
import HeadBack from '../../presentations/HeadBack';
import CardCar from '../../presentations/CardCar';
import { createCar } from '../../services/api';

class AddToGarage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            options: [],
            disabledeBtn: false
        }
    };

    componentDidMount() {
        const { navigation } = this.props;
        const options = navigation.getParam('options', []);
        this.setState({ options })
    };

    // navegacion

    handleBack = () => this.props.navigation.goBack();

    // añadir al garaje

    handleAddToGarage = async () => {
        let exist = false;
        const { options } = this.state;
        this.props.garage.forEach(car => {
            if(options[0]===car.mark&&options[1]===car.model&&options[2]===car.year) {
               return exist = true;
            }            
        });

        if(exist) return Toast.show({
            text: 'Ya existe este automovil en el garaje',
            textStyle: { fontSize: 15  },
            buttonTextStyle: { color: '#000000', fontSize: 15 },
            buttonText: "Cerrar",
            duration: 3000,
            type: "danger"
        });

        const currentCar = {
            mark: options[0],
            model: options[1],
            year: options[2]
        }
        
        this.setState({ disabledeBtn: true }, this.addToGarage(currentCar))
    };

    addToGarage = (currentCar) => async () => {
        const { addCar, setCurrentCar, setLoading, garage, navigation } = this.props;
        let message = '';
        let type = 'danger';
        setLoading(true);
        try {                 
            let { status, data } = await createCar(currentCar, garage.length);
            if(status === 201) {
                message = 'El automovil ha sido añadido al garaje';
                type = 'success';
                addCar(data);
                setCurrentCar(data._id);
                navigation.navigate('garage');
            } else{  
                message = data.error || 'Error en el servidor';           
            }
        } catch (err) {
            console.log(err)
            message = 'Error en el servidor';
            this.setState({ disabledeBtn: false })
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

    // buscar en marketplace

    handleSearch = () => {
        const mark = this.state.options[0]; 
        const model =  this.state.options[1];
        const year = this.state.options[2];  
        this.props.navigation.navigate('marketplace', { car: { _id:`${mark}${model}${year}`, mark,  model,  year } })
    };

    // render

    render() {
        const { options, disabledeBtn  } = this.state;
        return (
            <Container>
                <HeadBack 
                    handleBack={this.handleBack}
                    title='Confirma la selección'
                />
                <View style={styles.content}>
                    <CardCar style={{backgroundColor:'rgb(56,158,20)',marginVertical:30}} options={options} />
                    <View style={[styles.section,{flex:1}]}>
                        <Text style={styles.note}>¡Añade este automovil al garage para acelerar futuras búsquedas!.</Text>
                    </View>
                    <View style={[styles.section,{flex:1}]}>
                        <Button disabled={disabledeBtn} block full onPress={this.handleAddToGarage}>
                            <Text style={styles.btnEnter}>Añadir</Text>
                        </Button>
                        <TouchableOpacity style={styles.btnSecondary} onPress={this.handleSearch}>
                            <Text style={{color:'rgb(112, 112, 112)',textDecorationLine:'underline'}}>IR DIRECTO A LOS RESULTADOS</Text>
                        </TouchableOpacity>
                    </View>    
                </View>
            </Container>
        );
    }
};

AddToGarage.proptypes = {
    garage: Proptypes.array.isRequired,
    setLoading: Proptypes.func.isRequired,
    addCar: Proptypes.func.isRequired,
    setCurrentCar: Proptypes.func.isRequired
};

const styles = StyleSheet.create({
    content: {
        flex:1,
        flexDirection:'column',
        display:'flex',
        
        alignItems:'stretch',        
    },
    section: {
        alignItems:'center',
        justifyContent:'center',
        paddingHorizontal:20,
    },
    note: {
        alignSelf:'center',
        color: 'rgb(112, 112, 112)',
        textAlign:'center',
    },
    btnEnter: {
        fontSize: 20,
        color:'black'
    },
    btnSecondary: {
        marginTop:10,
        height:45,
        width:'100%',
        alignItems:'center',
        justifyContent:'center'
    }  
});

const mapDispatchToProps = dispatch => ({
    setLoading: value => dispatch(setLoading(value)),
    addCar: value => dispatch(addCar(value)),
    setCurrentCar: value => dispatch(setCurrentCar(value)),
});

const mapStateToProps = state => ({
    garage: state.garage
})

export default connect(mapStateToProps, mapDispatchToProps)(AddToGarage);