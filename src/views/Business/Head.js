import React from 'react';
import {
    TouchableOpacity,
    Platform
} from 'react-native';
import {
    Text,
    Header,
    Body,
    Left,
    Right,
    Icon
} from 'native-base';
import PropTypes from 'prop-types';
import color from '../../theme/color';

const Head = ({ handleBack, name })=>(
	<Header noShadow style={{backgroundColor:'transparent'}} iosBarStyle='dark-content' androidStatusBarColor='white'>
       <Left style={Platform.OS === 'android' ? {flex:1,left:-5} : null}>
            <TouchableOpacity style={{paddingHorizontal:5}} onPress={handleBack}>
                <Icon style={{fontSize:35,textShadowColor:'rgba(255, 255, 255, 0.2)',textShadowOffset:{width:-1,height:1},textShadowRadius:3}} type='Ionicons' name="ios-arrow-back"/>
            </TouchableOpacity>
        </Left>
        <Body style={Platform.OS==='android'?{flex:5,alignItems:'center'}:null}>
            <Text numberOfLines={1} style={{fontSize:17,fontWeight:'bold',textTransform:'capitalize',textShadowColor:'rgba(255, 255, 255, 0.2)',textShadowOffset:{width:-1,height:1},textShadowRadius:3,}}>{name}</Text>
        </Body>
        <Right style={Platform.OS==='android'?{flex:1}:null} />
    </Header>
);

Head.proptypes = {
    handleBack:PropTypes.func.isRequired,
    name: PropTypes.string.isRequired
};

export default Head;