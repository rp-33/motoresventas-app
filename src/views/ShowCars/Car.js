import React from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Image,
    StyleSheet,
	PixelRatio
} from 'react-native';
import { Text } from 'native-base';
import color from '../../theme/color';
import { markIcon } from '../../utils/markIcon';

const Car = ({ car }) => (
	<View style={styles.content}>
		<View style={styles.card}>
			<View style={styles.contentImg}>
				<Image style={styles.img} source={markIcon(car.mark)} />
			</View>
			<View style={styles.contentDetail}>
				<Text style={styles.text}>Marca: <Text style={styles.options}>{car.mark}</Text></Text>
				<Text style={styles.text}>Modelo: <Text style={styles.options}>{car.model}</Text></Text>
				<Text style={styles.text}>Años: <Text style={styles.options}>{`${car.init_year} a ${car.end_year}`}</Text></Text>
			</View>
		</View>
	</View>
);

Car.proptypes = {
	car: PropTypes.object.isRequired,
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
		backgroundColor:color.primary,
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