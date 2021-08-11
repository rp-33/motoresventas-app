import React from 'react';
import Proptypes from 'prop-types';
import Modal from 'react-native-modal';
import {
    View,
    TouchableOpacity,
    FlatList,
    StyleSheet,
    Text,
    PixelRatio,
    TextInput
} from 'react-native';
import {
    Icon
} from 'native-base';
import color from '../theme/color';

const ModalList = ({ modal, handleModal, handleSet, data }) => (
    <Modal isVisible={modal} style={{paddingVertical:20}} onBackdropPress={()=>handleModal()} onBackButtonPress ={()=>handleModal()}>
        <View style={styles.content}>
            <View style={styles.contentSearch}>
                <Icon type='FontAwesome' name="search" style={{fontSize:25,color:color.primary}} />
                <TextInput  style={{fontSize:15,paddingLeft:7,flex:1}} placeholder="Buscador" />
            </View>
            <FlatList 
                style={{paddingHorizontal:10}}
                data={data}
                keyExtractor={(item, index) => index.toString()}
                renderItem = {({item,index})=>(
                    <TouchableOpacity style={styles.btnItem} onPress={()=>{handleSet(item);handleModal()}}>
                        <Text style={{fontSize:15}}>{item}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    </Modal>
);

ModalList.proptypes = {
    modal: Proptypes.bool.isRequired,
    handleSet: Proptypes.func.isRequired,
    handleModal: Proptypes.func.isRequired,
    data: Proptypes.object.isRequired
};

const styles = StyleSheet.create({
    content: {
        backgroundColor:'white',
        borderRadius:3,
    },
    contentSearch: {
        flexDirection:'row',
        paddingHorizontal:10,
        alignItems:'center',
        borderBottomWidth:1/PixelRatio.getPixelSizeForLayoutSize(1),
		borderColor:color.secondary		
    },
    btnItem: {
        paddingVertical: 10,
        paddingHorizontal: 5,
        borderBottomWidth:1/PixelRatio.getPixelSizeForLayoutSize(1),
		borderColor:color.secondary		
    },
});

export default ModalList;