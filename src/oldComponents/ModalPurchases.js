import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { Text, Button } from 'native-base';
import { Width } from '../constants';
import { Avatar } from 'react-native-paper';

const ModalPurchases = ({ modal, handleModal, navigation, product }) => {
    
    const handlePurchases = () => {
        if(!navigation) return;
        handleModal();
        navigation.navigate('purchases');
    }

    const handleChat = () => {
        if(!navigation) return;
        handleModal();
        navigation.navigate('chat', { product })
    };

    return (
        <Modal animationIn='zoomIn' style={styles.modal} onBackdropPress={handleModal} onBackButtonPress={handleModal} isVisible={modal}>     
            <View style={styles.modalContent}>
                <View style={styles.imageContent}>
                    <View style={styles.image}>
                        { product &&
                            <Avatar.Image style={{backgroundColor:'#D9D5DC'}} size={50} source={{uri: product.image}} />
                        } 
                    </View>
                </View>
                <View style={{alignItems:'center',marginVertical:7}}>
                    <Text style={{fontSize:15,textAlign:'center'}}>
                        ¡Su solicitud de compra ha sido procesada exitosamente, ya puede retirar su producto!
                    </Text>
                </View>
                <TouchableOpacity style={{alignSelf:'flex-start',paddingHorizontal:5}} onPress={handlePurchases}>
                    <Text style={{fontSize:13,color:'rgb(28,118,238)'}}>Ver Todas mis compras</Text>
                </TouchableOpacity>
                <Button style={{marginTop: 15}} full onPress={handleChat}>
                    <Text style={{fontSize:17,color:'black'}}>Contactar</Text>
                </Button>
                
            </View>         
        </Modal>
    )
};

ModalPurchases.proptypes = {
    modal: PropTypes.bool.isRequired,
    handleModal : PropTypes.func.isRequired,
    product: PropTypes.object
};

const styles = StyleSheet.create({
    modal:{
        justifyContent:'center',
        alignItems:'center'
    },
    modalContent:{
        width: Width-40,
        backgroundColor:'white',
        borderRadius:3,
        paddingVertical:20,
        paddingHorizontal:10
    },
    imageContent:{
        width:'100%',
        height:5,
        alignItems:'center'
    },
    image: {
        justifyContent:'center',
        alignItems:'center',
        top:-50,
        width:55,
        height:55,
        borderRadius:27,
        borderWidth:5,
        borderColor:'white',
    }
});

export default ModalPurchases;