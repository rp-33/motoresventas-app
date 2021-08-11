import React from 'react';
import Proptypes from 'prop-types';
import Modal from 'react-native-modal';
import {
    View,
    TouchableOpacity,
    StyleSheet,
    TextInput
} from 'react-native';
import {
    Text,
    Icon, 
    Button
} from 'native-base';

const ModalDistance = ({ modal, handleModal, distance, setDistance }) => (
    <Modal isVisible={modal} onBackdropPress={()=>handleModal()} onBackButtonPress ={()=>handleModal()} style={{margin:0}}>
        <View style={styles.content}>
            <View style={styles.body}>
                <Icon style={{fontSize:30}} type="Ionicons" name='md-pin'/>
                <Text style={styles.text}>Mostrar los resultados en un radio de distancia de:</Text>
                <TouchableOpacity onPress={()=>setDistance(distance+1)}>
                    <Icon style={{fontSize:30}} type="Ionicons" name='ios-arrow-up'/>
                </TouchableOpacity>
                <TextInput onChangeText={setDistance} keyboardType='numeric' style={styles.input} value={distance.toString()}  />
                <TouchableOpacity onPress={()=>setDistance(distance-1)}>
                    <Icon style={{fontSize:30}} type="Ionicons" name='ios-arrow-down'/>
                </TouchableOpacity>
            </View>
            <Button full block style={{marginVertical:20}} onPress={handleModal}>
                <Text>Listo</Text>
            </Button>
        </View>
    </Modal>
);

ModalDistance.proptypes = {
    modal: Proptypes.bool.isRequired,
    handleModal: Proptypes.func.isRequired,
    distance: Proptypes.number.isRequired,
    setDistance: Proptypes.func.isRequired
};

const styles = StyleSheet.create({
    content: {
        backgroundColor:'rgb(232,232,232)',
        borderRadius:3,
        flex:1,
        paddingHorizontal:20
    },
    body: {
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    text: {
        textAlign:'center',
        color:'rgb(107,107,107)',
        marginVertical:20
    },
    input: {
        fontSize:17,
        paddingHorizontal:0,
        textAlign:'center'
    }
});

export default ModalDistance;