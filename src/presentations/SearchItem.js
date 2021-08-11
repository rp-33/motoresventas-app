import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Text } from 'native-base';
import { TouchableOpacity } from 'react-native';
import color from '../theme/color';

const SearchItem = ({item, handleItem, textTransform = 'capitalize'}) => (
    <TouchableOpacity 
        style={{flexDirection:'row',paddingVertical:5,paddingHorizontal:5,alignItems:'center'}}
        onPress={handleItem}
    >
        <Icon 
            style={{fontSize:25,color:color.secondary}} 
            type="MaterialCommunityIcons" 
            name='arrow-top-right-thick' 
        />
        <Text style={{flex:1,fontSize:17,textTransform}}>{item}</Text>  
    </TouchableOpacity>
)

SearchItem.propTypes = {
    item: PropTypes.string.isRequired,
    handleItem: PropTypes.func.isRequired,
    textTransform: PropTypes.oneOf(['uppercase','none','capitalize','lowercase'])
};

export default SearchItem;