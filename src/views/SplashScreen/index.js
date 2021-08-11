import React, { Component } from 'react';
import * as Animatable from 'react-native-animatable';
import { View, Image, Dimensions, StyleSheet } from 'react-native';
import color from '../../theme/color';
import { findUserDb } from '../../services/realm';

let { width } = Dimensions.get('window');

let	SCREEN_WIDTH = width*0.6;
let	BAR_WIDTH = (width*.7)-22;

class SplashScreen extends Component {
    sliderBar = {
        from: {
          width: 0,
        },
        to: {
          width: BAR_WIDTH,
        },
    };
    
    handleFinished = ({finished}) => {
        const router = findUserDb().isAuthenticated ? findUserDb().router : 'LoginNavigator' // SellerDashboard BuyerDashboard
        if(finished) this.props.navigation.navigate(router);
    };
    render() {
        return (
            <View style={styles.content}>
                <Image style={{width:SCREEN_WIDTH,height:SCREEN_WIDTH}} source={require('../../assets/images/logo.png')} />
                <View style={styles.sliderContent}>
                    <Animatable.View 
                        delay={500} 
                        onAnimationEnd={this.handleFinished} 
                        animation={this.sliderBar} 
                        duration={2500} 
                        easing='linear'   
                        style={styles.slider}
                    />
                </View>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    content: {
        flex:1,
        justifyContent:'center',
        alignContent:'center',
        alignItems:'center',
        padding:20
    },
    sliderContent: {
        marginTop:50,
        width:width*.7,
        height:40,
        borderRadius:20,
        borderColor:color.secondary,
        padding: 10,
        borderWidth: 1
    },
    slider: {
        backgroundColor:color.primary,
        width:0,
        height:'100%',
        borderRadius:25
    }
})

export default SplashScreen;