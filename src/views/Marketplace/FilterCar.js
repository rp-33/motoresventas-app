import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'native-base';

const FilterCar = ({ currentCar, defaultCar = '', handleDelete }) => {
    const withDelete = currentCar._id !== defaultCar;
    return (
        <View style={{flexDirection:'row',alignItems:'center',marginBottom:3,paddingHorizontal:10,paddingVertical:5,height:35,backgroundColor:'rgb(232,232,232)'}}>
            <View style={{flex:1}}>
                <Text numberOfLines={1} style={{textAlign:'center',color:withDelete?'#575757':'black'}}>
                    {`${currentCar.mark} ${currentCar.model} ${currentCar.year}`}
                </Text>
            </View>
            {withDelete &&
                <TouchableOpacity onPress={handleDelete}>
                    <Icon 
                        style={{fontSize:25,color:'#d9534f'}} 
                        type='Ionicons' 
                        name="ios-close-circle"
                    />
                </TouchableOpacity>
            }
        </View>
    )
};

FilterCar.propTypes = {
    currentCar: PropTypes.object.isRequired,
    defaultCar: PropTypes.string,
    handleDelete: PropTypes.func.isRequired,
};

export default FilterCar;