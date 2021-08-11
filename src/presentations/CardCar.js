import React from 'react';
import PropTypes from 'prop-types';
import { View, Image, StyleSheet } from 'react-native';
import { Text } from 'native-base';
import { markIcon } from '../utils/markIcon';

const CardCar = ({style, options}) => (
    <View style={[styles.card,style]}>
        {options.map((option, index)=>{
            if(index===0) {
                return (
                    <View key={index.toString()} style={styles.contenImg}>
                        <Image source={markIcon(option)} style={styles.img} />
                    </View>
                )
            } else if(index===1) {
                return <Text key={index.toString()} style={styles.textCard}>{option}</Text>
            } else {
                return <Text key={index.toString()} style={[styles.textCard,{marginLeft:10}]}>{option}</Text>
            }
        })}
    </View>
);

CardCar.propTypes = {
    style: PropTypes.object,
    options: PropTypes.array.isRequired
};

const styles = StyleSheet.create({
    card: {
        padding:2,
        backgroundColor:'rgb(56,158,20)',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },
    contenImg: {
        width:80,
        height:80,
        justifyContent:'center'
    },
    img: {
        width:'80%',
        height:'80%'
    },
    textCard: {
        fontSize:20,
        fontWeight:'bold'
    }
});

export default CardCar;