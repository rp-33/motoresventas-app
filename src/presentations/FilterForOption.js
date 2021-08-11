import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import { Text } from 'native-base'
import FilterOption from './FilterOption';

const FilterForOption = ({ handleFilter, option }) => (
    <View style={styles.content}>
        <Text style={styles.text}>Categorias</Text>
        <View style={styles.contentOptions}>
            <FilterOption 
                title='Mecánica'
                active={option}
                option='mecánica'
                icon={{
                    type:'FontAwesome',
                    name:'gears'
                }}
                handlePress={handleFilter}
            />
             <FilterOption 
                title='Suspensión'
                active={option}
                option='suspensión'
                icon={{
                    type:'MaterialCommunityIcons',
                    name:'car-brake-abs'
                }}
                handlePress={handleFilter}
            />
             <FilterOption 
                title='Carroceria'
                active={option}
                option='carroceria'
                icon={{
                    type:'MaterialCommunityIcons', 
                    name:'car-door'
                }}
                handlePress={handleFilter}
            />
             <FilterOption 
                title='Tren delantero'
                active={option}
                option='tren delantero'
                icon={{
                    type:'MaterialCommunityIcons', 
                    name:'car'
                }}
                handlePress={handleFilter}
            />
             <FilterOption 
                title='Partes eléctricas'
                active={option}
                option='partes eléctricas'
                icon={{
                    type:'MaterialCommunityIcons', 
                    name:'car-battery'
                }}
                handlePress={handleFilter}
            />
            <FilterOption 
                title='Accesorios'
                active={option}
                option='accesorios'
                icon={{
                    type:'Ionicons', 
                    name:'ios-speedometer'
                }}
                handlePress={handleFilter}
            />
        </View>
    </View>
);

FilterForOption.proptypes = {
    handleFilter: PropTypes.func.isRequired,
    option: PropTypes.string
}

const styles = StyleSheet.create({
    content:{
        alignItems:'center', 
        paddingVertical:5,
    },
    text: {
        marginBottom:5
    },
    contentOptions: {
        alignItems:'center', 
        alignContent:'center', 
        flexDirection:'row',
        paddingRight:5,
    },
});

export default FilterForOption;