import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'native-base';

const FilterTag = ({ tag, defaultDistance, currentDistance, handleDelete }) => (
    <View style={{flexDirection:'row',alignItems:'center',marginBottom:3,paddingHorizontal:10,paddingVertical:5,backgroundColor:'rgb(232,232,232)'}}>
        <View style={{flex:1}}>
            {currentDistance !== -1 ?
                <Text numberOfLines={1} style={{textAlign:'center',color:'#575757'}}>
                    {`Buscar ${tag.name} a ${currentDistance} km`}
                </Text>
                :
                <Text numberOfLines={1} style={{textAlign:'center',color:'#575757'}}>
                    Buscar por serial <Text style={{textTransform:'uppercase'}}>{tag.serial}</Text> {`a ${defaultDistance} km`}
                </Text>
            }
        </View>
        <TouchableOpacity onPress={handleDelete}>
            <Icon 
                style={{fontSize:25,color:'#d9534f'}} 
                type='Ionicons' 
                name="ios-close-circle"
            />
        </TouchableOpacity>
    </View>
);

FilterTag.propTypes = {
    tag: PropTypes.object.isRequired,
    currentDistance: PropTypes.number.isRequired,
    defaultDistance: PropTypes.number.isRequired,
    handleDelete: PropTypes.func.isRequired
};

export default FilterTag;