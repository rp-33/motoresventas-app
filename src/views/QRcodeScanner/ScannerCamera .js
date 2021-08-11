import React from 'react';
import PropTypes from 'prop-types';
import { RNCamera } from 'react-native-camera';
import { View, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable'

const ScannerCamera = ({ handleBarcodesDetected }) => (
    <RNCamera
        captureAudio={false}
        style={styles.camera}
        onBarCodeRead={handleBarcodesDetected}
        barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
    >
        <View style={styles.hudCamera}>
            <Animatable.View 
                animation={{from:{bottom:'2.5%'},to:{bottom:'97.5%'}}} 
                direction='alternate'
                duration={3000} 
                easing='linear'   
                style={styles.anim}
                iterationCount={Infinity}
            />
        </View>
    </RNCamera> 
);

ScannerCamera.propTypes = {
    
};

const styles = StyleSheet.create({
    camera: {
        flex: 1,
        width: '100%',
        height:'100%',
        justifyContent:'center',
        alignItems:'center'
    },
    hudCamera: {
        borderWidth:2,
        borderColor:'red',
        height:'80%',
        width:'80%',
        borderRadius:15,
        position:'relative'
    },
    anim: {
        backgroundColor:'green',
        height:3,
        width:'100%',
        position:'absolute',
        borderRadius:15
    }
})

export default ScannerCamera;