import React from 'react';
import { TouchableOpacity } from 'react-native';
import {
	Header,
	Button,
	Item,
	Input,
	Icon,
	Right,
	Body
} from 'native-base';
import PropTypes from 'prop-types';
import color from '../../theme/color';

const HeadSearch = ({ value, changeTextSearch, handleSearch })=>(
	<Header noShadow style={{backgroundColor:'white',borderBottomColor:color.secondary,borderBottomWidth:1}} iosBarStyle='dark-content' androidStatusBarColor='white'>
		<Body style={Platform.OS==='android'?{flex:4}:null}>
			<Input placeholder="Buscar"
            	value = {value}
				onChangeText={(text)=>changeTextSearch(text)} 
				autoFocus
            />
        </Body>
        <Right style={Platform.OS==='android'?{flex:1,marginRight:5}:null}>
            <TouchableOpacity onPress={handleSearch}>
                <Icon 
                    style={{color:'#ed2f2f',fontSize:30}} 
                    type="Ionicons" 
                    name='md-close' 
                />
            </TouchableOpacity>
        </Right>
		
		
	</Header>
);

HeadSearch.proptypes = {
	value: PropTypes.string.isRequired,
	handleSearch: PropTypes.func.isRequired,
	handleTextSearch: PropTypes.func.isRequired
};

export default HeadSearch;