import React from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Image,
    StyleSheet,
    TouchableOpacity,
	PixelRatio,
	TouchableWithoutFeedback,
    
} from 'react-native';
import {
    Icon,
    Text,
    Switch
} from 'native-base';
import color from '../../theme/color';
import { firstLetterCapitalize } from '../../utils/firstLetterCapitalize';
import { COIN } from '../../constants';

const Product = ({ product, setAvailable, handleShowCars, handleEdit, handleDetails, handleToDelete, handleLongToDelete, toDelete }) => {
	const disable = toDelete.includes(product._id);
	return (
	<TouchableWithoutFeedback onPress={handleToDelete} onLongPress={handleLongToDelete}>
		<View style={disable?[styles.content,{backgroundColor:'rgb(232,232,232)',}]:styles.content}>
			<TouchableOpacity disabled={disable} style={styles.contentImg} onPress={handleDetails}>
				<Image style={styles.img} source={{uri:product.images[0]}} />
			</TouchableOpacity>
			<View style={styles.contentDetail}>
				<View style={{flex:1,alignSelf:'center'}}>
					<Text numberOfLines={1} style={product.available?styles.textName:[styles.textName,{color:'rgb(179,179,179)'}]}>{firstLetterCapitalize(product.name)}</Text>
					<Text style={product.available?styles.textSerial:[styles.textSerial,{color:'rgb(179,179,179)'}]}>{product.serial}</Text>
					<Text numberOfLines={1} style={product.available?styles.textPrice:[styles.textPrice,{color:'rgb(179,179,179)'}]}>{`${COIN} ${product.price}`}</Text>
                    <TouchableOpacity onPress={handleShowCars} disabled={disable} style={{backgroundColor: 'rgb(28,118,238)',borderRadius:10,alignSelf:'flex-start'}}>
                        <Icon style={{fontSize:25,color:'white',paddingHorizontal:15,paddingVertical:3}} type='FontAwesome5' name="car"/>
                    </TouchableOpacity>
				</View>
				<View>
					<TouchableOpacity onPress={handleEdit} style={{flex:1,alignSelf:'center'}}>
						<Text style={styles.textEdit}>Editar</Text>
					</TouchableOpacity>
					<View style={{alignItems:'center',alignSelf:'center',width:81}}>
						<Switch
							disabled={disable}
							onValueChange={setAvailable} 
							value={product.available} 
							thumbColor={product.available?'rgb(54,165,0)':'#D9D5DC'}
							trackColor={{true:'rgba(38,119,0, 1)',false:color.secondary}}
						/>
						<Text numberOfLines={1} style={{fontSize:13,marginTop:5}}>{product.available ? 'Disponible' : 'No disponible'}</Text>
					</View>
				</View>
				
			</View>
		</View>
	</TouchableWithoutFeedback>
)};

Product.proptypes = {
	product: PropTypes.object.isRequired,
	setAvailable: PropTypes.func.isRequired,
	handleShowCars: PropTypes.func.isRequired,
	handleEdit: PropTypes.func.isRequired,
	handleDetails: PropTypes.func.isRequired,
	handleToDelete: PropTypes.func.isRequired,
	handleLongToDelete: PropTypes.func.isRequired,
	toDelete: PropTypes.array.isRequired,
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
        paddingHorizontal:10,
        flexDirection:'row',
        alignItems:'flex-start',
	},
	textName:{
        fontWeight:'bold',
        fontSize:17,
        lineHeight:17
    },
    textSerial:{
        fontSize:15,
        lineHeight:15,
		color:'rgb(51,51,51)',
		textTransform:'uppercase'
	},
	textPrice:{
        fontSize:15,
        lineHeight:17,
	},
	textEdit: {
		textAlign:'right',
		paddingHorizontal:10,
		paddingVertical:2,
		color:'rgb(28,118,238)',
		fontSize:15,
		lineHeight:15
	}
});

export default Product;