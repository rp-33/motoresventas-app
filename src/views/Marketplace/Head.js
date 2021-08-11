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

const Head = ({ handleSearch, handleGarage, handleSerial }) => (
	<Header noShadow style={{backgroundColor:'white',borderBottomColor:color.secondary,borderBottomWidth:1}} iosBarStyle='dark-content' androidStatusBarColor='white'>
        <Left style={Platform.OS==='android'?{flex:1}:null}>
        	<TouchableOpacity onPress={handleGarage}>
                <Icon 
                    style={{fontSize:30}} 
                    type='FontAwesome5' 
                    name="car"
                />
        	</TouchableOpacity>
        </Left>
        <Body style={Platform.OS==='android'?{flex:4,alignItems:'center'}:null}>
            <TouchableOpacity onPress={handleSearch} style={{flexDirection:'row',justifyContent:'center',alignItems:'center',flex:1}}>
                <Icon 
                    style={{color:color.secondary,fontSize:15}} 
                    type="FontAwesome5" 
                    name='search' 
                />
                <Text style={{color:color.secondary,marginLeft:5,fontSize:15,textAlignVertical:'center'}}>Buscar en Motoresventas</Text>
            </TouchableOpacity>
        </Body>
        <Right style={Platform.OS==='android'?{flex:1}:null}>
            <TouchableOpacity onPress={handleSerial}>
                <Icon 
                    style={{fontSize:35}} 
                    type="MaterialCommunityIcons" 
                    name='matrix' 
                />
            </TouchableOpacity>
        </Right>
    </Header>
);

Head.proptypes = {
    handleSearch: PropTypes.func.isRequired,
    handleGarage: PropTypes.func.isRequired,
    handleSerial: PropTypes.func.isRequired
};

export default Head;