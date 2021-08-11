import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { Text, Button, Icon } from 'native-base';
import { Width } from '../constants';
import color from '../theme/color';

const ModalCongratulation = ({ modal, handleModal, link, handleLink, message, btnName='Aceptar', handleAccept }) => {

    return (
        <Modal animationIn='zoomIn' style={styles.modal} onBackdropPress={handleModal} onBackButtonPress={handleModal} isVisible={modal}>     
            <View style={styles.modalContent}>
                <View style={styles.imageContent}>
                    <View style={styles.image}>
                        <Icon style={styles.icon} type='Entypo' name='new' />
                    </View>
                </View>
                <View style={{alignItems:'center',marginVertical:7}}>
                    <Text style={{fontSize:15,textAlign:'center',fontWeight:'bold'}}>
                        ¡Felicitaciones!
                    </Text>
                    <Text style={{fontSize:15,textAlign:'center'}}>
                        {message}
                    </Text>
                </View>
                <TouchableOpacity style={{alignSelf:'flex-start',paddingHorizontal:5}} onPress={handleLink}>
                    <Text style={{fontSize:14,color:'rgb(28,118,238)'}}>{link}</Text>
                </TouchableOpacity>
                <Button style={{marginTop: 15}} full onPress={handleAccept}>
                    <Text style={{fontSize:17,color:'black'}}>{btnName}</Text>
                </Button>
            </View>         
        </Modal>
    )
};

ModalCongratulation.proptypes = {
    modal: PropTypes.bool.isRequired,
    link: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    handleModal: PropTypes.func.isRequired,
    handleLink: PropTypes.func.isRequired,
    btnName: PropTypes.string,
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
    },
    icon: {
        color: 'white',
        fontSize:25,
        backgroundColor: color.primary,
        width: 50,
        height: 50,
        borderRadius: 25,
        textAlign: 'center',
        textAlignVertical: 'center'
    },
});

export default ModalCongratulation;