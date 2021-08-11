import React from 'react';
import PropTypes from 'prop-types';
import { View, ImageBackground, StyleSheet } from 'react-native';
import { Text, Button, Icon } from 'native-base';
import color from '../../theme/color';
import { subscriptions } from '../../constants/subscriptions';
import { COIN } from '../../constants';

const Option = ({type, handleChoose}) => {
    const option = subscriptions[type];
    if(!option) return null;
    
    return (
        <View style={styles.container}>
            <ImageBackground 
                style={{paddingVertical: 20}}
                imageStyle={{borderRadius:15}} 
                resizeMode='stretch' 
                source={option.background} 
            >
                <Text style={styles.title}>{option.name}</Text>
                <Text style={styles.subtitle}>{option.duration[0]}</Text>
                <Text style={styles.price}>
                    {`${COIN} ${option.price}`}
                    <Text style={styles.time}>/{option.duration[1]}</Text>
                </Text>
                <Button style={{backgroundColor:'rgb(51,51,51)',width:150,alignSelf:'center'}} onPress={handleChoose} block full> 
                    <Text style={{fontSize:17}}>Adquirir</Text>
                </Button>
                <View style={{marginVertical:10,paddingHorizontal:30}}>
                    { option.benefits.map((benefit, index)=>
                        <View key={index} style={styles.benefit}>
                            <Icon style={{color:color.primary,fontSize:20}} name='check-circle' type='FontAwesome' />
                            <Text style={{marginLeft:5}}>{benefit}</Text>
                        </View>
                    )}
                </View>
            </ImageBackground>
        </View>
    );
};

Option.propTypes = {
    type: PropTypes.string.isRequired, 
    handleChoose: PropTypes.func.isRequired, 
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        paddingHorizontal:25,
        marginTop:10,
    },
    title: {
        textTransform: 'uppercase',
        color: 'rgb(51,51,51)',
        fontSize: 25,
        textAlign: 'center',
        lineHeight:25,
        
    },
    subtitle: {
        textTransform: 'lowercase',
        color: 'black',
        fontSize: 22,
        textAlign: 'center',
        lineHeight:22,
        bottom:5,
    },
    price: {
        fontSize: 33,
        lineHeight: 33,
        textAlign: 'center',
        color:'white',
        marginVertical: 10,
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: {width: -2, height: 2},
        textShadowRadius: 10
    },
    time: {
        color:'white',
        fontSize: 20 
    },
    benefit: {
        flexDirection:'row',
        marginTop:5,
       // justifyContent:'center',
        alignItems:'center'
    }
});
  

export default Option;