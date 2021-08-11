import React from 'react';
import {
    Platform,
    TouchableOpacity
} from 'react-native';
import {
    Text,
    Header,
    Left,
    Right,
    Body,
    Icon
} from 'native-base';
import PropTypes from 'prop-types';
import color from  '../../theme/color';

const Head = ({ handleHistory, handleFavorite, handleDelete, toDelete }) => (
	<Header noShadow style={{backgroundColor:'white',borderBottomColor:color.secondary,borderBottomWidth:1}} iosBarStyle='dark-content' androidStatusBarColor='white'>
        <Left style={Platform.OS==='android'?{flex:1}:null}>
            {toDelete.length === 0 &&
                <TouchableOpacity onPress={handleHistory}>
                    <Icon 
                        style={{fontSize:35}} 
                        type='MaterialCommunityIcons' 
                        name="clipboard-text"
                    />
                </TouchableOpacity>
            }
        </Left>
        <Body style={Platform.OS==='android'?{flex:4,alignItems:'center'}:null}>
            <Text style={{color:color.primary,fontWeight:'bold',fontSize:17}}>Favoritos</Text>
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
                <TouchableOpacity onPress={handleFavorite}>
                    <Icon 
                        style={{fontSize:35}} 
                        type="MaterialCommunityIcons" 
                        name='cash-register' 
                    />
        	    </TouchableOpacity>
            }
        </Right>
    </Header>
);

Head.proptypes = {
    handleHistory: PropTypes.func.isRequired,
    handleFavorite: PropTypes.func.isRequired
};

export default Head;