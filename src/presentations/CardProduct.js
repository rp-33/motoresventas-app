import React from 'react';
import PropTypes from 'prop-types';
import {
    View,
	Image,
	Text,
    StyleSheet,
    TouchableOpacity,
	PixelRatio,
} from 'react-native';
import color from '../theme/color';
import { dateFormat } from '../utils/date';
import { firstLetterCapitalize } from '../utils/firstLetterCapitalize';
import { Icon } from 'native-base';
import { COIN } from '../constants';

const CardProduct = ({ product, date, displayName, handleDetails, disabled=false, children, handleLocation }) => (
    <View style={disabled?[styles.content,{backgroundColor:'rgb(232,232,232)',}]:styles.content}>
		<Text style={{textAlign:'right',paddingHorizontal:10,paddingVertical:2,fontSize:11}}>{dateFormat(date)}</Text>
		<View style={{flexDirection:'row',paddingBottom:10}} >
           {handleDetails ?
			    <TouchableOpacity disabled={disabled} style={styles.contentImg} onPress={handleDetails}>
					<Image style={styles.img} source={{uri:product.image}} />
				</TouchableOpacity>
				:
				<View style={styles.contentImg}>
					<Image style={styles.img} source={{uri:product.image}} />
				</View>
		   }
			<View style={styles.contentDetail}>
				<View style={{flex:1,alignSelf:'center'}}>
					<Text numberOfLines={1} style={{fontWeight:'bold',fontSize:17,lineHeight:17}}>{firstLetterCapitalize(product.name)}</Text>
					<Text style={{fontSize:15,lineHeight:15,color:'rgb(51,51,51)',textTransform:'uppercase'}}>SN:{product.serial}</Text>
					<Text numberOfLines={1} style={{fontSize:17,lineHeight:17,fontWeight:'bold',marginTop:4}}>
						<Text style={{fontSize:13}}>{product.quantity}x </Text>
						{`${COIN} ${product.quantity*product.price}`}
					</Text>
					<Text numberOfLines={1} style={{fontSize:15,lineHeight:15,color:'rgb(51,51,51)',textTransform:'capitalize'}}>Por {displayName}</Text>
					{handleLocation &&
                        <TouchableOpacity disabled={disabled} style={{flexDirection:'row',alignItems:'center'}} onPress={handleLocation}>
                            <Icon style={{fontSize:18,lineHeight:18,color:disabled?color.secondary:'rgb(28,118,238)'}} type="Ionicons" name='md-pin' />
                            <Text style={{fontSize:15,lineHeight:15,marginLeft:4,top:2,color:disabled?color.secondary:'rgb(28,118,238)'}}>Ubicación</Text>
                        </TouchableOpacity>
                    }
				</View>
				{ children }
			</View>
		</View>
	</View>
)

CardProduct.proptypes = {
    product: PropTypes.object.isRequired, 
    date: PropTypes.string.isRequired, 
    displayName: PropTypes.string.isRequired, 
    handleDetails: PropTypes.func, 
	disabled: PropTypes.bool,
	handleLocation: PropTypes.func
};

const styles = StyleSheet.create({
	content:{
		marginTop:10,
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
		borderColor:color.secondary,		
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
        paddingHorizontal:10,
        flexDirection:'row',
        alignItems:'flex-start',
	}
});

export default CardProduct;