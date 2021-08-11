import React, { Fragment } from 'react';
import { connect } from "react-redux";
import { Toast } from "native-base";
import { buyProduct } from '../services/api';
import { setLoading } from '../actions/loading';
import ModalCongratulation from '../presentations/ModalCongratulation';
import { BUYER } from '../constants/userTypes';

export const withBuy = Component => {

    class WithBuy extends React.Component {
        state = {
            buying: false,
            product: null,
            modal: false
        }

        handleModal = () => this.setState({modal: false});

        handleBuy = (product) => () => {
            this.setState({ 
                buying: true
            },
            async () => {
                let error = '';
                const { seller, _id, name, quantity=1, images, price, serial, location } = product;
                const { setLoading, emitter } = this.props;
                setLoading(true);
                try {
                    let { status, data } = await buyProduct(seller._id, _id, name, quantity, images[0], price, serial);
                    if(status === 201) {
                        this.setState({ 
                            product: {
                                name, 
                                emitter,
                                receiver: seller._id,
                                image: images[0],
                                _id: data._id,
                                type: BUYER,
                                location: location.coordinates
                            },
                            modal: true
                        })
                    } else{ 
                        error = data.error || 'Error en el servidor'; 
                    }  
                } catch (err) {
                    error = 'Error en el servidor';
                } finally {
                    this.setState({ buying: false });              
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
            })
        };

        handleAccept = () => {
            this.handleModal();
            this.props.navigation.navigate('chat', { product: this.state.product })
        };

        handleLink = () => {
            this.handleModal();
            this.props.navigation.navigate('purchases');
        };

        render() {
            return(
                <Fragment>
                    <Component 
                        {...this.props}
                        buying={this.state.buying}
                        handleBuy={this.handleBuy}
                    />
                    { this.state.modal && 
                        <ModalCongratulation 
                            modal={this.state.modal}
                            handleModal={this.handleModal}
                            link='Ver Todas mis compras'
                            handleLink={this.handleLink}
                            message='Su solicitud de compra ha sido procesada exitosamente, ya puede retirar su producto'
                            handleAccept={this.handleAccept}
                        />
                    }
                </Fragment>
            );
        }
    };

    const mapDispatchToProps = dispatch => ({
        setLoading: value => dispatch(setLoading(value)),
    });

    const mapStateToProps = state => ({
        emitter: state.user._id
    });

    return connect(mapStateToProps, mapDispatchToProps)(WithBuy);
}