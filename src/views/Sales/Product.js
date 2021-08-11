import React from 'react';
import PropTypes from 'prop-types';
import {
	View,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import {
    Icon
} from 'native-base';
import color from '../../theme/color';
import CardProduct from '../../presentations/CardProduct';

const Product = ({ item, handleQRscanner, handleChat, handleDetails, disabled=false }) => {
	const { product, date, buyer_user } = item;
	return (
		<CardProduct
			product={product}
			date={date}
			displayName={buyer_user.displayName}
			handleDetails={handleDetails}
		>
			<View>
				<TouchableOpacity style={styles.btn} onPress={handleChat}>
					<Icon style={{fontSize:30,color:'white'}} type='Ionicons' name='md-chatbubbles'/>
				</TouchableOpacity>
				<TouchableOpacity style={[styles.btn,{marginTop:5}]} onPress={handleQRscanner}>
					<Icon style={{fontSize:30,color:'white'}} type='MaterialCommunityIcons' name="qrcode-scan"/>
				</TouchableOpacity>
			</View>
		</CardProduct>
)};

Product.proptypes = {
	item: PropTypes.object.isRequired,
	handleQRscanner: PropTypes.func.isRequired,
	handleDetails: PropTypes.func.isRequired,
	handleChat: PropTypes.func.isRequired,
	disabled: PropTypes.bool
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