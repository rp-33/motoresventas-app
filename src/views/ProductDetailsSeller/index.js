import React, { Component, Fragment } from 'react';
import { View, StyleSheet, PixelRatio, RefreshControl } from 'react-native';
import SliderGallery from '../../presentations/SliderGallery';
import { Content, Container, Text, Icon, Button, Toast } from 'native-base';
import color from '../../theme/color';
import { getProductForSeller } from '../../services/api';
import { cancellablePromise } from '../../utils/cancellablePromise';
import HeadForDetails from '../../presentations/HeadForDetails';

class ProductDetailsSeller extends Component {
    constructor(props) {
        super(props);
        this.product = cancellablePromise(getProductForSeller, 200);
        this.state = {
            data: {},
            loading: true
        }
    };

    componentDidMount() {
        this.loadDetails();
    };

    componentWillUnmount() {
        this.product.cancel();
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

    handleBack = () => this.props.navigation.goBack();

    handleShowCars = (cars) => () => this.props.navigation.navigate('showcars', { cars });

    handleComments = (id) => () => this.props.navigation.navigate('comments', { id });

    // render

    render() {
        const { _id, name = 'Detalles del Producto', images, description, price = '', rating, serial, filter_car } = this.state.data;
        
        return(
            <Container>
                <HeadForDetails 
                    handleBack={this.handleBack}
                    price={price}
                    name={name}
                    rating={rating}
                />
                <Content refreshControl={<RefreshControl colors={[color.primary]} refreshing={this.state.loading} onRefresh={this.handleRefresh}/>}>
                    {price !== '' &&
                        <Fragment>
                            <View style={styles.contentTop}>
                                <SliderGallery data={images} />
                                <View style={styles.contentBtn}>
                                    <Button onPress={this.handleShowCars(filter_car)} style={[styles.btn,{backgroundColor:'rgb(28,118,238)',marginRight:10}]}>
                                        <Icon type='FontAwesome5' name="car" style={{fontSize:25}}/>
                                    </Button>
                                    <Button onPress={this.handleComments(_id)} style={[styles.btn,{backgroundColor:'rgb(28,118,238)',marginRight:5}]}>
                                        <Icon type='Ionicons'name='md-chatbubbles' style={{fontSize:30}}/>
                                    </Button>
                                </View>
                            </View>
                            <View style={{padding:10}}>
                                <Text style={{fontWeight:'bold'}}>
                                    Número de pieza: <Text style={{fontWeight:'normal',color:'rgb(51,51,51)',textTransform:'uppercase'}}>{serial}</Text>
                                </Text>
                                <Text style={{fontWeight:'bold',textAlign:'justify'}}>
                                    Detalles del Producto: <Text style={{fontWeight:'normal',color:'rgb(51,51,51)'}}>{description}</Text>
                                </Text>
                            </View>
                        </Fragment>
                    }
                </Content>
            </Container>
        )
    }
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
    contentBtn: {
        flexDirection:'row',
        padding:10,
        backgroundColor:'rgb(232,232,232)',
        justifyContent:'space-between',
        width:'100%',
    },
    btn:{
		justifyContent:'center',
		alignItems:'center',
        borderRadius:15,
    }
});

export default ProductDetailsSeller;