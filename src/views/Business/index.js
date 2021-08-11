import React from 'react';
import PropTypes from 'prop-types';
import {
    Image,
    StyleSheet,
    FlatList,
    View,
    PixelRatio,
    Animated,
    Dimensions,
    RefreshControl
} from 'react-native';
import {
    Container,
    Button,
    Icon,
    Text
} from 'native-base';
import color from '../../theme/color';
import Head from './Head';
import Product from '../../presentations/Product';
import { getProductFromSeller } from '../../services/api';
import { newPageState } from '../../utils/newPageState';
import { withFavorite } from '../../hoc/withFavorite';
import DataPage from '../../classes/DataPage';

let { height } = Dimensions.get('window');
const IMG = parseInt(height*0.265);
const BTNS = 65;
const HEADER_MIN_HEIGHT = 55+BTNS;
const HEADER_MAX_HEIGHT = IMG+BTNS;

class Business extends DataPage{
	constructor(props){
        super(props, getProductFromSeller, 200);
        this.scrollYAnimatedValue = new Animated.Value(0);
    };

    // cargar productos

    requestData = async () => {
        const { seller } = this.props.navigation.getParam('info', {});
        const response = await this.apiData.get(this.state.page, seller._id);

        if(!response) return;
        
        const newState = newPageState(this.state, response, 'No hay productos');
        this.setState({...newState});
    };

    // navegacion

    handleBack = () => this.props.navigation.goBack();
   
    handleProductDetails = (id) => () => this.props.navigation.push('productDetailsBuyer', { id });
   
    handleComments = (id) => () => this.props.navigation.navigate('comments',{ id });

    // render

    render(){
        const info = this.props.navigation.getParam('info', {});
        const { seller, distance } = info;
        const { data, loading } = this.state;
        const { handleAddToCart, handleRemoveToCart, isFavorite } = this.props;
        
        const headerHeight = this.scrollYAnimatedValue.interpolate({
            inputRange: [0, (HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT)],
            outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
            extrapolate: 'clamp'
        });
          
        return(
            <Container>
                <Animated.View style={[styles.contentHead,{height:headerHeight}]}>
                    <Image style={styles.image} source={{uri:seller.image}} />
                    <Head 
                        handleBack={this.handleBack}
                        name={seller.name}
                        handleLocation={this.handleModal}
                    />
                    <View style={styles.contentBtn}>
                        { distance &&
                            <View style={{flexDirection:'row',alignSelf:'center'}}>
                                <Icon style={{fontSize:30,color:'rgb(51,51,51)'}} type="Ionicons" name='md-pin' />
                                <Text style={{fontSize:15,marginLeft:5,color:'rgb(51,51,51)',alignSelf:'center'}}>{`A ${distance}`}</Text>
                            </View>
                        }
                        <Button onPress={this.handleComments(seller._id)} style={[styles.btn,{backgroundColor:'rgb(28,118,238)',marginRight:5}]}>
                            <Icon 
                                type='Ionicons'
                                name='md-chatbubbles'
                                style={{fontSize:30}}
                            />
                        </Button>
                    </View>
                </Animated.View>
                <FlatList
                    contentContainerStyle={{paddingTop:HEADER_MAX_HEIGHT+5,paddingBottom:5}}
                    scrollEventThrottle={16}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { y: this.scrollYAnimatedValue } } }]
                    )}
                    data={data}
                    keyExtractor={(item, index) => item._id}
                    renderItem = {({item,index})=> (
                        <Product 
                            key={item._id}
                            item={item}
                            handleDetails={this.handleProductDetails(item._id)}
                            handleAddToCart={handleAddToCart(item)}
                            handleRemoveToCart={handleRemoveToCart(item)}
                            favorite={isFavorite(item._id)}
                        />
                    )}
                    refreshControl={<RefreshControl colors={[color.primary]} refreshing={loading} onRefresh={this.handleRefresh}/>}
                    onEndReached={this.handleLoadMore}
                    onEndReachedThreshold={0.1}
                />
            </Container>
        )
}};

Business.proptypes = {
    handleAddToCart: PropTypes.func.isRequired, 
    handleRemoveToCart: PropTypes.func.isRequired, 
    isFavorite: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
    contentHead:{
        backgroundColor:'white',
        width:'100%',
        position:'absolute',
        top:0,
        zIndex:1000,
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
    image :{
		width:'100%',
		height:IMG,
        position:'absolute',
        bottom:BTNS,
	},
    contentBtn: {
        flexDirection:'row',
        padding:10,
        backgroundColor:'rgb(232,232,232)',
        justifyContent:'space-between',
        flex:1,
        height:BTNS,
        position:'absolute',
        bottom:0,
        width:'100%',
    },
    btn:{
		justifyContent:'center',
		alignItems:'center',
        borderRadius:15,
    }
});

export default withFavorite(Business);