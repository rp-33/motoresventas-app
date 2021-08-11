import React, { Fragment } from 'react';
import { connect } from "react-redux";
import { Toast } from "native-base";
import stripe from 'tipsi-stripe';
import { suscription } from '../services/api';
import { setSuscription } from '../actions/seller';
import { setLoading } from '../actions/loading';
import ModalCongratulation from '../presentations/ModalCongratulation';

stripe.setOptions({
    publishableKey: 'pk_test_gETCXWGKE9paN6HUXZt3L6Sr'
});

export const withSubscription = Component => {

    class WithSubscription extends React.Component {

        state = {
            modal: false
        }
        
        handleChoose = async ({ duration, price, value }) => {
            let error = '';
            try{
                let { tokenId } = await stripe.paymentRequestWithCardForm();
                if(tokenId){
                    this.handleSuscription(tokenId, duration, price, value);
                } else{
                    error = 'Numero de tarjeta no existe';
                }
            } catch(err){
                error = 'Tarjeta no valida';
            } finally {
                if(error === '') return;
                Toast.show({
                    text: error,
                    textStyle: { fontSize: 15  },
                    buttonTextStyle: { color: '#000000', fontSize: 15 },
                    buttonText: "Cerrar",
                    duration: 3000,
                    type: "danger"
                });
            }
        };
    
        handleSuscription = async (tokenId, duration, price, value)=>{
            let error = '';
            let { setLoading, setSuscription } = this.props;
            setLoading(true);
            try{
                let {status,data} = await suscription(tokenId,duration,price,value);
                if(status === 201){
                    setSuscription(data);
                    this.setState({ modal: true });
                } else{
                    error = data.error || 'Error en el servidor';  
                }
            } catch(err){
                error = 'Error en el servidor';
            } finally{
                setLoading(false);
                if(error === '') return;
                Toast.show({
                    text: error,
                    textStyle: { fontSize: 15  },
                    buttonTextStyle: { color: '#000000', fontSize: 15 },
                    buttonText: "Cerrar",
                    duration: 3000,
                    type: 'danger'
                });
            }
        };

        handleModal = () => this.setState({modal: false});

        handleAccept = () => {
            this.handleModal();
            const { routeName } = this.props.navigation.state;
            if(routeName === 'subscription') this.props.navigation.goBack();
        };

        handleLink = () => {
            this.handleModal();
            const { routeName } = this.props.navigation.state;
            if(routeName === 'subscription') this.props.navigation.goBack();
            this.props.navigation.navigate('addproduct');
        };

        render() {
            return(
                <Fragment>
                    <Component 
                        {...this.props}
                        handleChoose={this.handleChoose}
                    />
                    { this.state.modal && 
                        <ModalCongratulation 
                            modal={this.state.modal}
                            handleModal={this.handleModal}
                            link='Crear productos'
                            handleLink={this.handleLink}
                            message='Su pago se ha completado correctamente, ya puedes crear tus productos'
                            handleAccept={this.handleAccept}
                        />
                    }
                </Fragment>
            );
        }
    };

    const mapDispatchToProps = dispatch => ({
        setLoading: value => dispatch(setLoading(value)),
        setSuscription : value => dispatch(setSuscription(value))
    });

    return connect(null, mapDispatchToProps)(WithSubscription);
}