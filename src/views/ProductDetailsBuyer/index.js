import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    PixelRatio,
    RefreshControl,
} from 'react-native';
import { 
    Content, 
    Container, 
    Text, 
    Icon, 
    Toast 
} from 'native-base';
import SliderGallery from '../../presentations/SliderGallery';
import Footer from './Footer';
import color from '../../theme/color';
import { getProductForBuyer } from '../../services/api';
import { cancellablePromise } from '../../utils/cancellablePromise';
import HeadForDetails from '../../presentations/HeadForDetails';
import { withFavorite } from '../../hoc/withFavorite';
import { myLocation } from '../../utils/myLocation';
import { getKm } from '../../utils/getKm';
import { withBuy } from '../../hoc/withBuy';

class ProductDetailsBuyer extends Component {
    constructor(props) {
        super(props);
        this.product = cancellablePromise(getProductForBuyer, 200);
        this.userLocation = myLocation();
        this.state = {
            data: {},
            loading: true,
            userLocation: null
        }
    }

    async componentDidMount() {
        const location = await this.userLocation.get();
        if(!location) return;

        this.setState({ userLocation: location.data });
        this.loadDetails();
    };

    componentWillUnmount() {
        this.product.cancel();
        this.userLocation.cancel();
    };

    handleRefresh = () => this.setState({
        loading: true,
    }, this.loadDetails);

    loadDetails = async () => {
        const id = this.props.navigation.getParam('id');
        const response = await this.product.get(id);
        if(!response) return;

        const { success, data } = response;
        if(success) return this.setState({data, loading: false});
        
        this.setState({data, loading: false});
        Toast.show({
            text: data.error,
            textStyle: { fontSize: 15  },
            buttonTextStyle: { color: '#000000', fontSize: 15 },
            buttonText: "Cerrar",
            duration: 3000,
            type: "danger"
        });
    };

    // navegacion

    handleComments = (id) => () => this.props.navigation.navigate('comments',{ id });

    handleBack = () => this.props.navigation.goBack();
    
    handleSeePlus = (info) => () => this.props.navigation.navigate('business', { info });

    handleShowCars = (cars) => () => this.props.navigation.navigate('showcars', { cars });

    // render

    render() {
        const { handleAddToCart, handleRemoveToCart, isFavorite, buying, handleBuy } = this.props;
        const { data, loading, userLocation } = this.state;
        const { _id, name = 'Detalles del Producto', images, description, price = '', rating, serial, seller, location, filter_car } = data;
        const { longitude: lon1 = null, latitude: lat1 = null } = {...userLocation};
        const [ lon2 = null, lat2 = null ] = location ? location.coordinates : [];
        const distance = (lon1 && lat1 && lon2 && lat2) ? getKm(lon1, lat1, lon2, lat2) : null;
    
        return(
            <Container>
                <HeadForDetails 
                    handleBack={this.handleBack}
                    price={price}
                    name={name}
                    rating={rating}
                />
                <Content refreshControl={<RefreshControl colors={[color.primary]} refreshing={loading} onRefresh={this.handleRefresh}/>}>
                    {price !== '' &&
                        <Fragment>
                            <View style={styles.contentTop}>
                                <SliderGallery data={images} />
                                <View style={styles.contentInfo}>
                                    { distance &&
                                        <View style={{flexDirection:'row',alignSelf:'center'}}>
                                            <Icon style={{fontSize:30,color:'rgb(51,51,51)'}} type="Ionicons" name='md-pin' />
                                            <Text style={{fontSize:15,marginLeft:5,color:'rgb(51,51,51)',alignSelf:'center'}}>{`A ${distance}`}</Text>
                                        </View>
                                    }
                                    { isFavorite(_id) ?
                                        <TouchableOpacity  disabled={buying} onPress={handleRemoveToCart(data)}>
                                            <Icon type='MaterialIcons' name='favorite' style={{fontSize:35,color:color.primary}}  />
                                        </TouchableOpacity> 
                                        :
                                        <TouchableOpacity  disabled={buying} onPress={handleAddToCart(data)}>
                                            <Icon type='MaterialIcons' name='favorite-border' style={{fontSize:35,color:color.primary}}  />
                                        </TouchableOpacity> 
                                    }
                                </View>
                            </View>
                            <View style={{padding:10}}>
                                <Text style={{fontWeight:'bold'}}>
                                    Número de pieza: <Text style={{fontWeight:'normal',color:'rgb(51,51,51)',textTransform:'uppercase'}}>{serial}</Text>
                                </Text>
                                <Text style={{fontWeight:'bold',textAlign:'justify'}}>
                                    Detalles del producto: <Text style={{fontWeight:'normal',color:'rgb(51,51,51)'}}>{description}</Text>
                                </Text>
                                <TouchableOpacity disabled={buying} style={{marginTop:10}} onPress={this.handleSeePlus({seller, distance})}>
                                    <Text style={{color:'rgb(28,118,238)'}}>Ver mas productos de <Text style={{fontWeight:'bold',color:'rgb(28,118,238)',textTransform:'capitalize'}}>{seller.name}</Text></Text>
                                </TouchableOpacity>
                            </View>
                        </Fragment>
                    }
                </Content>
                {price !== '' &&
                    <Fragment>
                        <Footer 
                            handleComments={this.handleComments(_id)}
                            handleShowCars={this.handleShowCars(filter_car)}
                            handleBuy={handleBuy(data)}
                            buying={buying}
                        />
                    </Fragment>
                }
            </Container>
        )
    }
};

ProductDetailsBuyer.proptypes = {
	handleAddToCart: PropTypes.func.isRequired, 
    handleRemoveToCart: PropTypes.func.isRequired, 
    isFavorite: PropTypes.func.isRequired,
    buying: PropTypes.bool.isRequired, 
    handleBuy: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
    contentTop: {
        backgroundColor:'rgb(51,51,51)',
        shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.5,
		shadowRadius: 3,
		elevation: 3,
		borderBottomWidth:1/PixelRatio.getPixelSizeForLayoutSize(1),
		borderBottomColor:color.secondary	
    },
    contentInfo: {
        flexDirection:'row',
        padding:10,
        backgroundColor:'rgb(232,232,232)',
        justifyContent:'space-between'
    },
    barge: {
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:color.primary,
        paddingHorizontal:15,
        borderRadius:20,
    },
    textBadge: {
        color:'white',
        marginLeft:5,
        fontSize:21,
        textAlignVertical:'center',
        fontWeight:'bold'
    }
})

export default withFavorite( withBuy( ProductDetailsBuyer ) );
