import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import Modal from 'react-native-modal';
import { Icon } from 'native-base';
import Proptypes from 'prop-types';
import themeColor from '../theme/color'
import { galery, camera } from '../utils/imagepicker';

const ModalBox = ({ modal, handleModal, setAvatar, multipleImage })=>{

  const handleCamera = () => {
    handleModal();
    camera(setAvatar);
  };

  const handleGalery = () => {
    handleModal();
    galery(setAvatar, multipleImage);
  };

  return (
    <Modal isVisible={modal} style={styles.bottomModal} onBackdropPress={handleModal} onBackButtonPress ={handleModal}>
      <View style={styles.modalContent}> 
        <TouchableOpacity onPress = {handleCamera}>
          <View style={styles.item}>
              <Icon
                  type='Ionicons' 
                  name='md-camera' 
                  style={{color:'black',fontSize:30}}
              />
          </View>
        </TouchableOpacity> 
        <TouchableOpacity onPress = {handleGalery}>
          <View style={styles.item}>
              <Icon  
                  type='Ionicons' 
                  name='ios-images'  
                  style={{color:'black',fontSize:30}}
              />
          </View>
        </TouchableOpacity>  
      </View>
    </Modal>
  )
};

ModalBox.defaultProps = {
  multipleImage: false,
};

ModalBox.proptypes = {
  modal: Proptypes.bool.isRequired,
  setAvatar: Proptypes.func.isRequired,
  handleModal: Proptypes.func.isRequired,
  multipleImage: Proptypes.bool
};

const styles = StyleSheet.create ({
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    flexDirection:'row'
  },
  item:{
    width:70,
    height:70,
    borderRadius:35, 
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:themeColor.primary
  },
  img:{
    width:35,
    height:35
  }
});

export default ModalBox;