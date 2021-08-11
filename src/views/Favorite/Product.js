import React from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
	PixelRatio,
	TouchableWithoutFeedback
} from 'react-native';
import {
    Icon
} from 'native-base';
import color from '../../theme/color';
import { firstLetterCapitalize } from '../../utils/firstLetterCapitalize';
import { getKm } from '../../utils/getKm';
import { COIN } from '../../constants';

const Product = ({ product, handleUpdate, handleDetails, handleToDelete, handleLongToDelete, toDelete, userLocation, handleBuy, buying }) => {
	const disable = toDelete.includes(product._id);
	const { longitude: lon1 = null, latitude: lat1 = null } = {...userLocation};
    const [ lon2, lat2 ] = product.location.coordinates;
    const distance = (lon1 && lat1) ? getKm(lon1, lat1, lon2, lat2) : null;
	return (
	<TouchableWithoutFeedback onPress={handleToDelete} onLongPress={handleLongToDelete}>
		<View style={disable?[styles.content,{backgroundColor:'rgb(232,232,232)',}]:styles.content}>
			<TouchableOpacity disabled={disable} style={styles.contentImg} onPress={handleDetails}>
				<Image style={styles.img} source={{uri:product.images[0]}} />
			</TouchableOpacity>
			<View style={styles.ContentQuantity}>
				<TouchableOpacity disabled={disable} onPress={()=>handleUpdate(product._id,true)}>
					<Icon style={{fontSize:30,color:'black'}} type="FontAwesome" name='plus-circle'/>
				</TouchableOpacity>
				<Text style={{fontWeight:'bold',fontSize:17}}>{product.quantity}</Text>
				<TouchableOpacity disabled={disable} onPress={()=>{if(product.quantity>1)handleUpdate(product._id,false)}}>
					<Icon style={{fontSize:30,color:'black'}} type="FontAwesome" name='minus-circle'/>	
				</TouchableOpacity>
			</View>
			<View style={styles.contentDetail}>
				<View style={{flex:1,alignSelf:'center'}}>
					<Text numberOfLines={1} style={{fontWeight:'bold',fontSize:17,lineHeight:17}}>{firstLetterCapitalize(product.name)}</Text>
					<Text style={{fontSize:15,lineHeight:15,color:'gray',textTransform:'uppercase'}}>SN: {product.serial}</Text>
					<Text numberOfLines={1} style={{fontSize:17,lineHeight:19,marginTop:4}}>{`${COIN} ${product.price*product.quantity}`}</Text>
					<Text numberOfLines={1} style={{fontSize:15,lineHeight:15,textTransform:'capitalize'}}>Por {product.seller.name}</Text>
					{distance &&
                        <View style={{flexDirection:'row'}}>
                            <Icon style={{fontSize:15,color:'rgb(51,51,51)'}} type="Ionicons" name='md-pin' />
                            <Text style={{fontSize:13,marginLeft:4,color:'rgb(51,51,51)'}}>{`A ${distance} `}</Text>
                        </View>
                    }
				</View>
				<TouchableOpacity disabled={disable || buying} style={styles.btn} onPress={handleBuy}>
					<Icon style={{fontSize:30,color:'white'}} type='FontAwesome5' name="hand-holding-usd"/>
				</TouchableOpacity>
			</View>
		</View>
	</TouchableWithoutFeedback>
)};

Product.proptypes = {
	/*product: PropTypes.object.isRequired,
	handleUpdate: PropTypes.func.isRequired,
	handleDetails: PropTypes.func.isRequired,
	handleToDelete: PropTypes.func.isRequired,
	handleLongToDelete: PropTypes.func.isRequired,
	toDelete: PropTypes.array.isRequired,
	userLocation: PropTypes.object,
	handleBuy: PropTypes.func.isRequired,
	buying: PropTypes.bool.isRequired*/
};

const styles = StyleSheet.create({
	content:{
		marginTop:10,
		flexDirection:'row',
		paddingVertical:10,
		backgroundColor: 'white',
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.5,
		shadowRadius: 3.84,
		elevation: 5,
		borderWidth:1/PixelRatio.getPixelSizeForLayoutSize(1),
		borderColor:color.secondary	
	},
	contentImg:{
		width:80,
		height:80,
		marginLeft:10,
		alignSelf:'center'	
	},
	img:{
		width:'100%',
        height:'100%',
        borderRadius:3,	
	},
	contentDetail:{
        flex:1,
        paddingRight:10,
        flexDirection:'row',
        alignItems:'flex-start',
	},
	ContentQuantity:{
		alignItems:'center',
		justifyContent:'center',
		marginHorizontal:10,
	},
	btn:{
		justifyContent:'center',
		alignItems:'center',
        backgroundColor: color.primary,
        borderRadius:5,
        paddingVertical: 5,
		paddingHorizontal: 7,
		alignSelf:'center'
	}
});

export default Product;