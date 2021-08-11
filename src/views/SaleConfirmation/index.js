import React, { Component } from 'react';
import { Container, Button, Text, Content, Toast } from 'native-base';
import Ticket from '../../presentations/Ticket';
import HeadBack from '../../presentations/HeadBack';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { sellProduct } from '../../services/api';
import { setLoading } from '../../actions/loading';

class SaleConfirmation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            processing: false,
        }
    };

    // navegacion

    handleBack = () => !this.state.processing && this.props.navigation.goBack();

    // confirmacion

    handleConfirmation = async (id) => {
        this.setState({processing : true});
        let message = '';
        let type = 'danger';
        const { setLoading, navigation } = this.props;
        setLoading(true);
        try {
            let { status, data } = await sellProduct(id);
            if(status === 201){
                type = 'success';
                message = data.message;
                navigation.navigate('sales', { refresh: true });
            } else{
                message = data.error || 'Error en el servidor';
            }   
        } catch (err) {
            message = 'Error en el servidor';
        } finally {
            setLoading(false);
            if(type === 'danger') this.setState({ processing: false });
            Toast.show({
                text: message,
                textStyle: { fontSize: 15  },
                buttonTextStyle: { color: '#000000', fontSize: 15 },
                buttonText: "Cerrar",
                duration: 3000,
                type
            }); 
        } 
    }

    // render

    render() {
        const { product, date, ticket, id } = {...this.props.navigation.state.params};
        return (
            <Container>
                <HeadBack 
                    title='Confirmación de Venta'
                    handleBack={this.handleBack}
                />
                <View style={{paddingVertical:10,flex:1}}>
                    <Ticket 
                        product={product}
                        date={date}
                        ticket = {ticket}
                        seller = {this.props.seller}
                    />
                    <Button onPress={()=>this.handleConfirmation(id)} disabled={this.state.processing} block full style={{marginHorizontal:10}} > 
                        <Text style={{fontSize: 20,color:'black'}}>Confirmar</Text>
                    </Button>
                </View>
            </Container>
        );
    }
};

const mapStateToProps = state => ({
    seller: state.seller
});

const mapDispatchToProps = dispatch => ({
    setLoading: value => dispatch(setLoading(value))
});

export default  connect(mapStateToProps, mapDispatchToProps)(SaleConfirmation);