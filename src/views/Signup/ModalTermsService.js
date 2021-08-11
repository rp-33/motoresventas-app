import React from 'react';
import PropTypes from 'prop-types';
import {
    View,
    StyleSheet,
    Text
} from 'react-native';
import { Spinner, Content, Button } from 'native-base';
import Modal from 'react-native-modal';
import color from '../../theme/color';

const ModalTermsService = ({ text, modal, handleModal, formikProps }) => (
    <Modal isVisible={modal} style={styles.modal} onBackdropPress={handleModal} onBackButtonPress ={handleModal}>
        <View style={styles.content}>
            <Text style={styles.title}>Términos y condiciones</Text>
            { text === '' ?
                <Spinner style={{flex:1}} size={40} color={color.primary} />
                :
                <Content>
                    <Text style={{textAlign:'justify',fontSize:15}}>{text}</Text>
                    <View style={{flexDirection:'row',marginBottom:5}}>
                        <Button onPress={formikProps.handleSubmit} disabled={formikProps.isSubmitting} style={{flex:1,marginRight:10}} block full> 
                            <Text style={{fontSize: 20,color:'black'}}>Aceptar</Text>
                        </Button>
                        <Button onPress={handleModal} disabled={formikProps.isSubmitting} style={{backgroundColor:color.secondary,flex:1}} block full> 
                            <Text style={{fontSize: 20,color:'black'}}>Cancelar</Text>
                        </Button>
                    </View>
                </Content>
            }
        </View>
    </Modal>
)

ModalTermsService.proptypes = {
    modal: PropTypes.bool.isRequired,
    handleModal: PropTypes.func.isRequired,
    text: PropTypes.string
};

const styles = StyleSheet.create({
    modal: {
        marginVertical: 20,
        marginHorizontal: 10,
        flex:1,
    },
    content: {
        flex:1,
        backgroundColor:'#f8f9fa',
        borderRadius:3,
        paddingVertical:20,
        paddingHorizontal:10
    },
    title: {
        textAlign:'center',
        fontWeight:'bold',
        color:color.primary,
        fontSize:17,
        lineHeight:17,
        marginBottom:10
    }
})

export default ModalTermsService;