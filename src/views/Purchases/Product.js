import React from 'react';
import PropTypes from 'prop-types';
import {
    View,
    StyleSheet,
    TouchableOpacity,
	TouchableWithoutFeedback
} from 'react-native';
import {
    Icon
} from 'native-base';
import color from '../../theme/color';
import CardProduct from '../../presentations/CardProduct';

const Product = ({ item, handleDetails, handleChat, handleToDelete, handleLongToDelete, toDelete, handleQRcode, handleLocation }) => {
	const { product, date, _id, seller_user } = item;
	const disabled = toDelete.includes(_id);
	
	return (
		<TouchableWithoutFeedback onPress={handleToDelete} onLongPress={handleLongToDelete} >
			<View>
				<CardProduct
					product={product}
					date={date}
					displayName={seller_user.name}
					disabled={disabled}
					handleDetails={handleDetails}
					handleLocation={handleLocation}
				>
					<View>
						<TouchableOpacity disabled={disabled} style={disabled?[styles.btn,{backgroundColor:color.secondary}]:styles.btn} onPress={handleChat}>
							<Icon style={{fontSize:30,color:'white'}} type='Ionicons' name='md-chatbubbles'/>
						</TouchableOpacity>
						
						<TouchableOpacity disabled={disabled} style={disabled?[styles.btn,{backgroundColor:color.secondary,marginTop:5}]:[styles.btn,{marginTop:5}]} onPress={handleQRcode}>
							<Icon style={{fontSize:30,color:'white'}} type='MaterialCommunityIcons' name="qrcode"/>
						</TouchableOpacity>
					</View>
				</CardProduct>
			</View>
		</TouchableWithoutFeedback>
)};

Product.proptypes = {
	item: PropTypes.object.isRequired,
	handleDetails: PropTypes.func.isRequired,
	handleToDelete: PropTypes.func.isRequired,
	handleLongToDelete: PropTypes.func.isRequired,
	toDelete: PropTypes.array.isRequired,
	handleChat: PropTypes.func.isRequired,
	handleQRcode: PropTypes.func.isRequired,
	handleLocation: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
	btn:{
		justifyContent:'center',
		alignItems:'center',
        backgroundColor: color.primary,
        borderRadius:5,
        paddingVertical: 5,
        paddingHorizontal: 12,
	}
});

export default Product;