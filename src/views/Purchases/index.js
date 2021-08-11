import React from 'react';
import PropTypes from 'prop-types';
import { Container, Toast } from 'native-base';
import ModalLocation from '../../presentations/ModalLocation';
import { FlatList, RefreshControl } from 'react-native';
import Product from './Product';
import { connect } from 'react-redux';
import { setLoading } from '../../actions/loading';
import HeadBack from '../../presentations/HeadBack';
import { getPurchases, deletePurchases } from '../../services/api';
import color from '../../theme/color';
import DataPage from '../../classes/DataPage';
import { withToDelete } from '../../hoc/withToDelete';
import { BUYER } from '../../constants/userTypes';

class Purchases extends DataPage{

    constructor(props) {
        super(props, getPurchases, 200, 'No hay compras en proceso');
        this.state={
            ...this.state,
            modalMap: false,
            location: null
        }
    };

    componentDidUpdate() {
        const refresh = this.props.navigation.getParam('refresh', false);
        if(refresh) {
            this.props.navigation.state.params = null;
            this.handleRefresh({ data: [] });
        }
    };

    // eliminar 

    handleDelete = async () => {
        let message = '';
        let type = 'danger';
        const { setLoading, resetToDelete, toDelete } = this.props;
        const { data } = this.state;
        setLoading(true);
        try {
            let { status, data: newData } = await deletePurchases(toDelete);
            if(status === 201){
                const newProducts = data.filter(product => !toDelete.includes(product._id));
                message = newData.message;
                type = 'success';
                this.setState({ data: newProducts });
                resetToDelete();
            } else{             
                message = newData.error || 'Error en el servidor';                
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

    // navegacion

    handleDetails = (id) => () => this.props.navigation.navigate('productDetailsBuyer', { id }); // id del producto

    handleBack = () => this.props.navigation.goBack();

    handleQRcode = (id) => () => this.props.navigation.navigate('qrcode', { id });

    handleChat = ({ _id, product, seller_user }) => () => {
        const { name, image } = product;
        const { emitter } = this.props;
        const { _id: receiver, geo: location } = seller_user;
        this.props.navigation.navigate('chat', { product: { emitter,  type: BUYER, receiver, _id, name, image, location } });
    };

    // localizacion

    handleLocation = (location) => async () => this.setState({ modalMap: true, location });

    handleModal = () => this.setState(previosState=>({ modalMap : !previosState.modalMap }));

    // render

    render(){
        const { data, modalMap, location, loading } = this.state;
        const { toDelete, marketToDelete, activeToDelete } = this.props;
        
        return(
            <Container>
                <HeadBack 
                    handleBack={this.handleBack}
                    title='Compras Activas'
                    toDelete={toDelete}
                    handleDelete={this.handleDelete}
                />
                 <FlatList
                    data={data}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item,index})=>(
                        <Product 
                            key={index}
                            item={item}
                            handleDetails={this.handleDetails(item.product._id)}
                            handleChat={this.handleChat(item)}
                            handleLocation={this.handleLocation(item.seller_user.geo)}
                            handleToDelete={marketToDelete(item._id)}
                            handleLongToDelete={activeToDelete(item._id)}
                            handleQRcode={this.handleQRcode(item._id)}
                            toDelete={toDelete}
                        />
                    )}
                    refreshControl={<RefreshControl colors={[color.primary]} refreshing={loading} onRefresh={this.handleRefresh}/>}
                />
                {modalMap &&
                    <ModalLocation 
                        modal={modalMap}
                        handleModal={this.handleModal}
                        location={location}
                    />
                }
            </Container>
        )
    }
};

Purchases.proptypes = {
    setLoading: PropTypes.func.isRequired,
    toDelete: PropTypes.array.isRequired, 
    marketToDelete: PropTypes.func.isRequired, 
    activeToDelete: PropTypes.func.isRequired,
    resetToDelete: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
    setLoading: value => dispatch(setLoading(value)),
});

const mapStateToProps = state => ({
    emitter: state.user._id
});

export default connect(mapStateToProps, mapDispatchToProps)( withToDelete( Purchases ) );