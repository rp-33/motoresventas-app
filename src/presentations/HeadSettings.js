import React from 'react';
import { Platform, TouchableOpacity } from 'react-native';
import {
    Header,
    Body,
    Right,
    Left,
    Text,
    Icon
} from 'native-base';
import PropTypes from 'prop-types';
import color from  '../theme/color';

const HeadSettings = ({ title, handleLogout }) => (
	<Header noShadow style={{backgroundColor:'white',borderBottomColor:color.secondary,borderBottomWidth:1}} iosBarStyle='dark-content' androidStatusBarColor='white'>
        <Left style={Platform.OS==='android'?{flex:1}:null} />
        <Body style={Platform.OS === 'android' ? {flex:5,alignItems: 'center'} : null}>
            <Text style = {{color:color.primary,fontWeight:'bold',fontSize:17}}>{title}</Text>
        </Body>
        <Right style={Platform.OS==='android'?{flex:1}:null}>
            <TouchableOpacity onPress={handleLogout}>
                <Icon 
                    style={{color:'#ed2f2f',fontSize:35}} 
                    type="MaterialCommunityIcons" 
                    name='logout' 
                />
            </TouchableOpacity>
        </Right>
    </Header>
);

HeadSettings.proptypes = {
    title: PropTypes.string.isRequired,
    handleLogout: PropTypes.func.isRequired
};

export default HeadSettings;