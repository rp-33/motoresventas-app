import React from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Image,
    StyleSheet,
	TouchableWithoutFeedback,
	PixelRatio
} from 'react-native';
import { Text } from 'native-base';
import color from '../../theme/color';
import { markIcon } from '../../utils/markIcon';

const Car = ({ car, active, handleActive, handleToDelete, handleLongToDelete, toDelete }) => {

	const disable = toDelete.includes(car._id);
	const onActive = active===car._id;

	const handlePress = () => {
		if(toDelete.length===0) return handleActive();
		handleToDelete()
	}
	
	return (
		<View style={styles.content}>
			<TouchableWithoutFeedback onPress={handlePress} onLongPress={handleLongToDelete} >
				<View style={disable?[styles.card,{backgroundColor:'rgb(232,232,232)',}]:styles.card}>
					<View style={onActive?[styles.contentImg,{backgroundColor:color.primary}]:styles.contentImg}>
						<Image style={styles.img} source={markIcon(car.mark)} />
					</View>
					<View style={styles.contentDetail}>
						<Text style={styles.text}>Marca: <Text style={styles.options}>{car.mark}</Text></Text>
						<Text style={styles.text}>Modelo: <Text style={styles.options}>{car.model}</Text></Text>
						<Text style={styles.text}>Año: <Text style={styles.options}>{car.year}</Text></Text>
					</View>
				</View>
			</TouchableWithoutFeedback>
		</View>
)};

Car.proptypes = {
	car: PropTypes.object.isRequired,
	active: PropTypes.string.isRequired,
	toDelete: PropTypes.array.isRequired,
	handleActive: PropTypes.func.isRequired,
	handleToDelete: PropTypes.func.isRequired,
	handleLongToDelete: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
	content: {
		marginTop:10,
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
		backgroundColor: 'white',
	},
	card:{
		flexDirection:'row',
		paddingVertical:10,	
	},
	contentImg:{
		width:80,
		height:80,
		marginLeft:10,
		alignSelf:'center',
		backgroundColor:'rgb(232,232,232)',
		borderRadius:15,
		justifyContent:'center',
		alignItems:'center'	
	},
	img:{
		width:'80%',
        height:'80%',
	},
	contentDetail:{
        flex:1,
		paddingHorizontal:10,
		alignSelf:'center'
	},
	text: {
		fontWeight:'bold',
		marginLeft:5,
	},
	options: {
        fontWeight: 'normal'
    },
});

export default Car;