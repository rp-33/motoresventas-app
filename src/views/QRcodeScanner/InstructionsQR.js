import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import { Text } from 'native-base';

const InstructionsQR = ({instructions}) => (
    <View style={styles.content}>
        <Text style={styles.text}>
            {instructions}
        </Text>
    </View> 
);

InstructionsQR.propTypes = {
    instructions: PropTypes.string.isRequired
};

const styles = StyleSheet.create({
    content: {
        flex:1,
        backgroundColor:'rgb(232,232,232)',
        justifyContent:'center',
        paddingHorizontal:20,
        zIndex:10000
    },
    text: {
        fontSize:20,
        color:'rgb(51,51,51)',
        textAlign:'center'
    },
})

export default InstructionsQR;