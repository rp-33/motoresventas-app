import React from 'react';
import PropTypes from 'prop-types';
import {
    View,
	Image,
	StyleSheet,
    Dimensions
} from 'react-native';
import Swiper from 'react-native-swiper'
import color from '../theme/color';

let {width} = Dimensions.get('window');

const SliderGallery = ({ data })=>(
	<Swiper 
		style={styles.swiper} 
		showsButtons={false} 
		dotStyle={styles.dot}
		activeDotStyle={styles.activeDot}
		autoplay={true}
		autoplayTimeout={5}
	>
		{data.map((item,i)=>
			<View key={i} style={{width:width,height:width * 0.7}}>
				<Image resizeMode='contain' style={{width:'100%',height:'100%'}} source={{uri:item}} /> 
			</View>
		)}
	</Swiper>
);

SliderGallery.proptypes = {
	data:PropTypes.array.isRequired
};

const styles = StyleSheet.create({
	swiper: {
		width:width,
		height:width * 0.7,
		flex:1},
	dot: {
		backgroundColor:'white', 
		width: 10,
		height: 10,
		borderRadius: 5,
		marginLeft: 5, 
		marginRight: 5, 
	},
	activeDot: {
		backgroundColor: color.primary, 
		width: 10, 
		height: 10, 
		borderRadius: 5, 
		marginLeft: 5, 
		marginRight: 5, 
	}
});

export default SliderGallery;