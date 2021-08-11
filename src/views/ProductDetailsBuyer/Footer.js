import React from 'react';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { Footer as FooterView, Button, Icon, Text } from 'native-base';
import color from '../../theme/color';

const Footer = ({ handleComments, handleShowCars, handleBuy, buying })=>(
    <FooterView style={styles.footer}>
		<Button disabled={buying} onPress={handleShowCars} style={[styles.btn,{backgroundColor:'rgb(28,118,238)',marginRight:10}]}>
			<Icon 
				type='FontAwesome5'
				name='car'
				style={{fontSize:30}}
			/>
		</Button>
		<Button disabled={buying} onPress={handleComments} style={[styles.btn,{backgroundColor:'rgb(28,118,238)',marginRight:5}]}>
			<Icon 
				type='Ionicons'
				name='md-chatbubbles'
				style={{fontSize:30}}
			/>
		</Button>
		<Button disabled={buying} onPress={handleBuy} style={[styles.btn,{backgroundColor:color.primary,marginLeft:5,width:'50%'}]} >
			<Text style={{color:'black',fontSize:15}}>Comprar</Text>
		</Button>
	</FooterView>
);

Footer.proptypes = {
	handleComments: PropTypes.func.isRequired,
	handleBuy: PropTypes.func.isRequired,
	buying: PropTypes.bool.isRequired
};

const styles = StyleSheet.create({
	footer:{
		flexDirection:'row',
        paddingHorizontal:10,
        backgroundColor: 'white',
        height:60,
		elevation:0,
		justifyContent:'flex-start'
	},
	btn:{
		justifyContent:'center',
		alignItems:'center',
		borderRadius:15,
        marginTop:5,
        marginBottom:10
	}
});

export default Footer;