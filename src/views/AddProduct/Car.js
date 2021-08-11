import React from 'react';
import Proptypes from 'prop-types';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Avatar } from 'react-native-paper';
import { Text, Icon } from 'native-base';
import { markIcon } from '../../utils/markIcon';

const Car = ({ car, index, deleteCar }) => (
    <View style={index===0?styles.content:[styles.content,{marginLeft:10}]}>
        <Avatar.Image size={40} style={{backgroundColor:'white'}} source={markIcon(car.mark)} />
        <View style={{marginHorizontal:10}}>
            <Text style={styles.textModel}>{car.model}</Text>
            <Text style={styles.textYears}>{`${car.init_year} - ${car.end_year}`}</Text>
        </View>
        <TouchableOpacity style={styles.btnDelete} onPress={deleteCar}>
            <Icon 
                style={styles.icon} 
                type="Ionicons" 
                name='md-close' 
            />
        </TouchableOpacity>
    </View>
);

Car.proptypes = {
    car: Proptypes.object.isRequired,
    index: Proptypes.number.isRequired,
    deleteCar: Proptypes.func.isRequired
};

const styles = StyleSheet.create({
    content: {
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:'#D9D5DC',
        paddingVertical:3,
        paddingHorizontal:4,
        borderRadius:25,
    },
    textModel: {
        fontWeight:'bold',
        fontSize:15,
        lineHeight:17,
        textAlign:'center'
    },
    textYears: {
        fontSize:13,
        lineHeight:15
    },
    btnDelete: {
        backgroundColor:'#ed2f2f',
        borderRadius:25,
        height:30,
        width:30,
        justifyContent:'center'
    },
    icon: {
        color:'white',
        fontSize:20,
        padding:5,
        alignSelf:'center'
    }
})

export default  Car;