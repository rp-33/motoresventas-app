import React from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import {
    Icon
} from 'native-base';
import color from '../../theme/color';
import CardProduct from '../../presentations/CardProduct';

const Product = ({ item, handleDetails }) => {
	const { product, date, seller_user } = item;
	return (
		<CardProduct
			product={product}
			date={date}
			displayName={seller_user.name}
		>
			<TouchableOpacity style={styles.btn} onPress={handleDetails}>
                <Icon style={{fontSize:30,color:'white'}} type='MaterialCommunityIcons' name="file-eye"/>
			</TouchableOpacity>
		</CardProduct>
	)
};

Product.proptypes = {
	item: PropTypes.object.isRequired,
	handleDetails: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
	btn:{
		justifyContent:'center',
		alignItems:'center',
        backgroundColor: color.primary,
        borderRadius:5,
        paddingVertical: 6,
        paddingHorizontal: 8,
        alignSelf:'center'
	}
});

export default Product;