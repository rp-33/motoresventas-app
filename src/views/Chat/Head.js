import React from 'react';
import {
    Text,
    Image,
    Platform,
    TouchableOpacity,
    StyleSheet,
    View
} from 'react-native';
import {
    Header,
    Right,
    Body,
    Button,
    Icon,
	Left
} from 'native-base';
import color from '../../theme/color';
import PropTypes from 'prop-types';
import { Avatar } from 'react-native-paper';

const Head = ({ image, name, handleBack, handleLocation }) => (
	<Header noShadow style={{backgroundColor:color.primary,borderBottomColor:color.secondary,borderBottomWidth:1}} iosBarStyle='dark-content' androidStatusBarColor='white'>
		<Left style={Platform.OS === 'android' ? {flex:1,left:-5} : null}>
            <TouchableOpacity style={{paddingHorizontal:5}} onPress={handleBack}>
                <Icon style={{fontSize:35}} type='Ionicons' name="ios-arrow-back"/>
            </TouchableOpacity>
        </Left>
        <Body style={Platform.OS === 'android' ? {flex:7,marginRight:5} : null}>
			<View style={styles.ctnRow}>
				<Avatar.Image style={{backgroundColor:'#D9D5DC'}} size={35} source={{uri:image}} />       
            	<Text numberOfLines={1} style={styles.name}>{name}</Text>
            </View>
		
		</Body>
        <Right style={Platform.OS === 'android' ? {flex:2.5,justifyContent:handleLocation?'space-between':'flex-end'} : null} >
				{handleLocation &&
					<TouchableOpacity onPress={handleLocation}>
        				<Icon name="ios-pin" type='Ionicons' style={{fontSize:33,paddingHorizontal:5}}/>
        			</TouchableOpacity>
				}
        		<TouchableOpacity>
        			<Icon name="ios-call" type='Ionicons' style={{fontSize:33,paddingHorizontal:3}}/>
        		</TouchableOpacity>
        </Right>
    </Header>
);

Head.propTypes = {
	name :  PropTypes.string.isRequired,
	name : PropTypes.string.isRequired,
	handleBack : PropTypes.func.isRequired,
	handleLocation: PropTypes.func
}

const styles = StyleSheet.create({
	ctnRow:{
		flexDirection:'row',
		alignItems:'center',
		justifyContent:'center'
	},
	image : {
		width:30,
		height:30,
		borderRadius:15,
		marginHorizontal:10
	},
	name :{
		fontSize:15,
		fontWeight:'bold',
		textTransform:'capitalize',
		marginLeft:10
	}
})

export default Head;