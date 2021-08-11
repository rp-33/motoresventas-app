import React from 'react';
import PropTypes from 'prop-types';
import { Platform, TouchableOpacity } from 'react-native';
import {
    Header,
    Left,
    Right,
    Body,
    Icon,
    Text
} from 'native-base';
import color from  '../../theme/color';

const Head = ({ handleBack, handleForward, title, value}) => (
	<Header noShadow style={{backgroundColor:'white',borderBottomColor:color.secondary,borderBottomWidth:1}} iosBarStyle='dark-content' androidStatusBarColor='white'>
        <Left style={Platform.OS === 'android' ? {flex:1,left:-5} : null}>
            <TouchableOpacity style={{paddingHorizontal:5}} onPress={handleBack}>
                <Icon style={{fontSize:35}} type='Ionicons' name="ios-arrow-back"/>
            </TouchableOpacity>
        </Left>
        <Body style={Platform.OS === 'android' ? {flex:6,alignItems: 'center'} : null}>
            <Text style = {{color:color.primary,fontWeight:'bold',fontSize:17}}>{title}</Text>
        </Body>
        <Right style={Platform.OS==='android'?{flex:1,right:-5}:null}>
            {value !== '' &&
                <TouchableOpacity onPress={handleForward} style={{paddingHorizontal:5}}>
                    <Icon 
                        style={{fontSize:35}} 
                        type="Ionicons" 
                        name='ios-arrow-forward' 
                    />
                </TouchableOpacity>
            }
        </Right>
    </Header>
);

Head.proptypes = {
    handleBack: PropTypes.func.isRequired,
    handleForward: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired
};

export default Head;