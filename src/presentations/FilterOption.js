import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { Icon, Text } from 'native-base';
import { Width } from '../constants';
import color from '../theme/color';

const FilterOption = ({handlePress, option, title, active, icon}) => (
    <TouchableOpacity style={styles.option} onPress={()=>handlePress(option)}>
        <View style={option===active?[styles.contentIcon,{backgroundColor:color.primary}]:styles.contentIcon}>
            <Icon 
                style={{fontSize:30}} 
                type={icon.type}
                name={icon.name}
            />
        </View>
        <Text style={{fontSize:13}} numberOfLines={1}>{title}</Text>
    </TouchableOpacity>
);

FilterOption.proptypes = {
    handlePress: PropTypes.func.isRequired,
    option: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    active: PropTypes.string,
    icon: PropTypes.object.isRequired,
}

const styles = StyleSheet.create({
	option: {
		justifyContent:'center',
        alignItems:'center',
        flex:1,
        marginLeft:5,
    },
    contentIcon: {
        width:(Width-35)/6,
        height:(Width-35)/6,
        maxWidth:70,
        maxHeight:70,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'rgb(235,232,227)',
        borderRadius:10,
    }
});

export default FilterOption;