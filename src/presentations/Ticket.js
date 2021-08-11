import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, PixelRatio } from 'react-native';
import { Text } from 'native-base';
import { dateFormat } from '../utils/date';
import { COIN } from '../constants';

const Ticket= ({ product, date, ticket, seller }) => (
    <View style={styles.content}>
        <Text style={[styles.text,{ fontWeight:'bold',marginVertical:10}]}>{dateFormat(date)}</Text>
        <View>
            <Text style={[styles.text,{textTransform:'capitalize'}]}>{seller.name}</Text>
            <Text style={[styles.text,{fontWeight:'bold'}]}>{`RIF: ${seller.rifCode}-${seller.rif}`}</Text>
        </View>
        <Text style={[styles.text,{marginVertical:10}]}>Ticket Nº {ticket}</Text>
        <View style={styles.contentTitle}>
            <Text style={[styles.text,{flex:1}]}>DETALLES</Text>
            <Text style={[styles.text,{flex:1}]}>CANTIDAD</Text>
            <Text style={[styles.text,{flex:1}]}>PRECIO</Text>
        </View>
        <View style={{flex:1,width:'100%'}}>
            <View style={{flex:3}}>
                <View style={{flexDirection:'row'}}>
                    <View style={{flex:1}}>
                        <Text style={[styles.text,{fontWeight:'bold',textTransform:'capitalize'}]}>{product.name}</Text>
                        <Text style={[styles.text,{color:'grey',textTransform:'uppercase'}]}>{product.serial}</Text>
                    </View>
                    <Text style={[styles.text,{flex:1}]}>{product.quantity}</Text>
                    <Text style={[styles.text,{flex:1}]}>{`${COIN} ${product.price}`}</Text>
                </View>
            </View>
            <View style={styles.contentTotal}>
                <Text style={[styles.text,{width:`${100/3}%`}]}>TOTAL</Text>
                <Text style={[styles.text,{width:`${100/3}%`,color:'green',fontWeight:'bold'}]}>{`${COIN} ${product.quantity*product.price}`}</Text>
            </View>
        </View>
    </View>
);

Ticket.propTypes = {
    product: PropTypes.object.isRequired,
    seller: PropTypes.object.isRequired,
    date: PropTypes.string.isRequired,
    ticket: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
    content: {
        flex:1,
        marginTop:15,
        marginBottom:25,
        alignItems:'center',
        padding:10,       
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 3,
        borderTopWidth: 1/PixelRatio.getPixelSizeForLayoutSize(1),
		borderBottomWidth: 1/PixelRatio.getPixelSizeForLayoutSize(1),
		borderColor:'white'
    },
    text: {
        textAlign:'center',
        fontSize:15
    },
    contentTitle: {
        flexDirection:'row',
        width:'100%',
        borderBottomWidth:1/PixelRatio.getPixelSizeForLayoutSize(1),
        paddingBottom:3,
        marginBottom:3
    },
    contentTotal: {
        flex:1,
        flexDirection:'row',
        borderTopWidth:1/PixelRatio.getPixelSizeForLayoutSize(1),
        justifyContent:'space-between',
        paddingTop:3,
        marginTop:3
    }
})

export default Ticket;