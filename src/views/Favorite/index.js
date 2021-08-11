import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removeToCart, updateProduct } from '../../actions/cart';
import { FlatList } from 'react-native';
import { Container, Toast } from 'native-base';
import Product from './Product';
import { deleteFavorites } from '../../services/api';
import { setLoading } from '../../actions/loading';
import Head from './Head';
import { withBuy } from '../../hoc/withBuy';
import { withToDelete } from '../../hoc/withToDelete';
import { myLocation } from '../../utils/myLocation';

class Favorite extends Component{

    constructor(props) {
        super(props);
        this.userLocation = myLocation();
        this.state = {
            userLocation: null
        }
    }

    async componentDidMount() {
        const location = await this.userLocation.get();
        if(!location) return;

        this.setState({ userLocation: location.data });
    };

    componentWillUnmount() {
        this.userLocation.cancel();
    };

    // eliminar

    handleDelete = async () => {
        let message = '';
        let type = 'danger';
        const { setLoading, removeToCart, resetToDelete, toDelete } = this.props;    
        setLoading(true);
        try {
            const { status, data } = await deleteFavorites(toDelete);
            if(status === 201) {
                message = data.message;
                type = 'success';
                removeToCart(toDelete)
                resetToDelete();
            } else{ 
                message = data.error || 'Error en el servidor'; 
            }  
        } catch (error) {
            message = 'Error en el servidor';  
        } finally{
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

    // aumentar/disminuir cantidad
    
    handleUpdate = (id, add) => this.props.updateProduct(id, add);

    // navegacion

    handleDetails = (id) => () => this.props.navigation.navigate('productDetailsBuyer', { id });

    handleHistory = () => this.props.navigation.navigate('buyerHistory');

    handlePurchases = () => this.props.navigation.navigate('purchases');

    // render

    render(){
        const { buying, handleBuy, toDelete, marketToDelete, activeToDelete, cart } = this.props;
        
        return(
            <Container>
                <Head 
                    handleHistory={this.handleHistory}
                    handleFavorite={this.handlePurchases}
                    handleDelete={this.handleDelete}
                    toDelete={toDelete}
                />
                <FlatList
                    data={cart}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item,index})=>(
                        <Product 
                            key={index}
                            product={item}
                            toDelete={toDelete}
                            handleUpdate={this.handleUpdate}
                            handleDetails={this.handleDetails(item._id)}
                            handleToDelete={marketToDelete(item._id)}
                            handleLongToDelete={activeToDelete(item._id)}
                            handleBuy={handleBuy(item)}
                            userLocation={this.state.userLocation}
                            buying={buying}
                        />
                    )}
                />
            </Container>
        )
    }
};

Favorite.proptypes = {
    cart: PropTypes.array.isRequired,
    removeToCart: PropTypes.func.isRequired,
    updateProduct: PropTypes.func.isRequired,
    setLoading: PropTypes.func.isRequired,
    buying: PropTypes.bool.isRequired, 
    handleBuy: PropTypes.func.isRequired,
    toDelete: PropTypes.array.isRequired, 
    marketToDelete: PropTypes.func.isRequired, 
    activeToDelete: PropTypes.func.isRequired,
    resetToDelete: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    cart: state.cart,
});

const mapDispatchToProps = dispatch => ({
    removeToCart: id => dispatch(removeToCart(id)),
    updateProduct: (id, add) => dispatch(updateProduct(id, add)),
    setLoading: value => dispatch(setLoading(value)),
})

export default connect(mapStateToProps, mapDispatchToProps)( withBuy( withToDelete( Favorite ) ) );