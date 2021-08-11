import React from 'react';
import Proptypes from 'prop-types';
import Modal from 'react-native-modal';
import {
    View,
    TouchableOpacity,
    StyleSheet,
    Text,
    PixelRatio
} from 'react-native';
import {
    Icon
} from 'native-base';
import color from '../../theme/color';

const ModalCategory = ({ modal, handleModal, handleSet }) => (
    <Modal animationIn='zoomIn' animationOut='zoomOut' isVisible={modal} onBackdropPress={handleSet('',true)} onBackButtonPress ={handleModal}>
        <Text style={{alignSelf:'center',fontSize:17,fontWeight:'bold',paddingVertical:10,color:color.secondary}}>Categorias</Text>
        <View style={styles.content}>
            <TouchableOpacity style={[styles.btnItem,styles.boder]} onPress={handleSet('Accesorios')}>
                <Icon style={{fontSize:30}} type='Ionicons' name='ios-speedometer' />
                <Text style={{fontSize:17,marginLeft:10,color:color.primary}}>Accesorios</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.btnItem,styles.boder]} onPress={handleSet('Carroceria')}>
                <Icon style={{fontSize:30}} type='MaterialCommunityIcons' name='car-door' />
                <Text style={{fontSize:17,marginLeft:10,color:color.primary}}>Carroceria</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.btnItem,styles.boder]} onPress={handleSet('Mecánica')}>
                <Icon style={{fontSize:30}} type='FontAwesome' name='gears' />
                <Text style={{fontSize:17,marginLeft:10,color:color.primary}}>Mecánica</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.btnItem,styles.boder]} onPress={handleSet('Partes eléctricas')}>
                <Icon style={{fontSize:30}} type='MaterialCommunityIcons' name='car-battery' />
                <Text style={{fontSize:17,marginLeft:10,color:color.primary}}>Partes eléctricas</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.btnItem,styles.boder]} onPress={handleSet('Suspensión')}>
                <Icon style={{fontSize:30}} type='MaterialCommunityIcons' name='car-brake-abs' />
                <Text style={{fontSize:17,marginLeft:10,color:color.primary}}>Suspensión</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnItem} onPress={handleSet('Tren delantero')}>
                <Icon style={{fontSize:30}} type='MaterialCommunityIcons' name='car' />
                <Text style={{fontSize:17,marginLeft:10,color:color.primary}}>Tren delantero</Text>
            </TouchableOpacity>
        </View>
    </Modal>
);

ModalCategory.proptypes = {
    modal: Proptypes.bool.isRequired,
    handleSet: Proptypes.func.isRequired,
    handleModal: Proptypes.func.isRequired
};

const styles = StyleSheet.create({
    content: {
        backgroundColor:'white',
        borderRadius:15,
    },
    btnItem: {
        flexDirection:'row',
        alignItems:'center',
        paddingVertical: 10,
        paddingHorizontal: 10
    },
    boder: {
        borderBottomWidth:1/PixelRatio.getPixelSizeForLayoutSize(1),
		borderColor:color.secondary	
    }
});

export default ModalCategory;