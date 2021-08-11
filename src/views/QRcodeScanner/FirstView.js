import React from 'react';
import PropTypes from 'prop-types';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Text } from 'native-base';
import color from '../../theme/color';

const iconQR = require('../../assets/images/phone-code-qr.png');

const FirstView = ({ handleScanner }) => (
    <View style={styles.content}>
        <View style={styles.background}>  
            <View style={styles.contentImg}>
                <Image style={styles.img} resizeMode='contain' source={iconQR} />
            </View>
            <TouchableOpacity style={styles.btn} onPress={handleScanner}>
                <Text style={styles.textBtn}>LISTO</Text>
            </TouchableOpacity>
        </View>
    </View>
);

FirstView.propTypes = {
    handleScanner: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
    content: {
        flex:1,
        backgroundColor:'rgba(0,0,0,.7)',
        justifyContent:'center',
        alignItems:'center'
    },
    background: {
        backgroundColor:'white',
        height:'80%',
        width:'80%',
        borderRadius:15
    },
    contentImg: {
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    img: {
        height:'80%',
        width:'80%'
    },
    btn: {
        alignSelf:'center',
        marginBottom:20
    },
    textBtn: {
        color:color.primary,
        fontWeight:'bold',
        fontSize:20
    }
})

export default FirstView;