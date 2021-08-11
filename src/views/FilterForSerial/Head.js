import React from 'react';
import { Platform, TouchableOpacity } from 'react-native';
import {
    Header,
    Left,
    Body,
    Icon,
    Input
} from 'native-base';
import PropTypes from 'prop-types';
import color from  '../../theme/color';

const Head = ({ handleBack, text, handleChangeText }) => (
	<Header noShadow style={{backgroundColor:'white',borderBottomColor:color.secondary,borderBottomWidth:1}} iosBarStyle='dark-content' androidStatusBarColor='white'>
        <Left style={Platform.OS === 'android' ? {flex:1,left:-5} : null}>
            <TouchableOpacity style={{paddingHorizontal:5}} onPress={handleBack}>
                <Icon style={{fontSize:35}} type='Ionicons' name="ios-arrow-back"/>
            </TouchableOpacity>
        </Left>
        <Body style={Platform.OS==='android'?{flex:6}:null}>
            <Input 
                placeholder='Serial'
                autoFocus
                value={text}
                onChangeText={handleChangeText}
            />
        </Body>
    </Header>
);

Head.proptypes = {
    handleBack: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
    handleChangeText: PropTypes.func.isRequired
};

export default Head;