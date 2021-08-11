import React from 'react';
import { connect } from "react-redux";
import { Toast } from "native-base";
import { addFavorite, deleteFavorites } from '../services/api';
import { addToCart, removeToCart } from '../actions/cart';

export const withFavorite = Component => {

    class WithFavorite extends React.Component {
        
        handleAddToCart = (product) => async () => {
            let error = '';
            product.quantity = 1;
            const { addToCart, removeToCart } = this.props;     
            addToCart(product);
            try {
                const { status, data } = await addFavorite(product._id);
                if(status !== 201) error = data.error || 'Error en el servidor';
            } catch (error) {
                error = 'Error en el servidor';  
            } finally{
                if(error === '') return;
                removeToCart([product._id]);
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
    
        handleRemoveToCart = (product) => async () => {
            let error = '';
            const { addToCart, removeToCart } = this.props;       
            removeToCart([product._id]);
            try {
                const { status, data } = await deleteFavorites([product._id]);
                if(status !== 201) error = data.error || 'Error en el servidor';
            } catch (error) {
                error = 'Error en el servidor';  
            } finally{
                if(error === '') return;
                product.quantity = 1;
                addToCart(product);
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
    
        isFavorite = (id) =>  this.props.cart.find(item => item._id===id);
    
        render() {
            return(
                <Component 
                    {...this.props}
                    isFavorite={this.isFavorite} 
                    handleAddToCart={this.handleAddToCart}
                    handleRemoveToCart={this.handleRemoveToCart}
                />
            );
        }
    };

    const mapStateToProps = state => ({
        cart: state.cart
    });
    
    const mapDispatchToProps = dispatch => ({
        addToCart: product => dispatch(addToCart(product)),
        removeToCart: id => dispatch(removeToCart(id)),
    });

    return connect(mapStateToProps, mapDispatchToProps)(WithFavorite);
}
