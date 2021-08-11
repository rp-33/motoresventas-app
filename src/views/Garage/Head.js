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

const Head = ({ handleBack, handleAdd, handleDelete, toDelete }) => (
	<Header noShadow style={{backgroundColor:'white',borderBottomColor:color.secondary,borderBottomWidth:1}} iosBarStyle='dark-content' androidStatusBarColor='white'>
        <Left style={Platform.OS === 'android' ? {flex:1,left:-5} : null}>
            <TouchableOpacity style={{paddingHorizontal:5}} onPress={handleBack}>
                <Icon style={{fontSize:35}} type='Ionicons' name="ios-arrow-back"/>
            </TouchableOpacity>
        </Left>
        <Body style={Platform.OS === 'android' ? {flex:6,alignItems: 'center'} : null}>
            <Text style = {{color:color.primary,fontWeight:'bold',fontSize:17}}>Garaje</Text>
        </Body>
        <Right style={Platform.OS==='android'?{flex:1}:null}>
            {toDelete.length > 0 ? 
                <TouchableOpacity onPress={handleDelete}>
                    <Icon 
                        style={{fontSize:35}} 
                        type="Ionicons" 
                        name='md-trash' 
                    />
                </TouchableOpacity>
                :
                <TouchableOpacity onPress={handleAdd}>
                    <Icon 
                        style={{fontSize:35}} 
                        type='MaterialCommunityIcons' 
                        name="plus-box"
                    />
        	    </TouchableOpacity>
            }
        </Right>
    </Header>
);

Head.proptypes = {
    handleBack: PropTypes.func.isRequired,
    handleAdd: PropTypes.func.isRequired,
    toDelete: PropTypes.array.isRequired,
    handleDelete: PropTypes.func.isRequired
};

export default Head;