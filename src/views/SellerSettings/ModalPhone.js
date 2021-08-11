import React from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    View,
} from 'react-native';
import Modal from 'react-native-modal';
import { 
    Text,
    Icon, 
    Form, 
    Item, 
    Input, 
    Button 
} from 'native-base';
import color from '../../theme/color';
import { Formik } from 'formik';
import { Width, ChangePhoneSchema } from '../../constants';

const ModalPhone = ({ modal, handleModal, phone, setPhone }) => {

    const handlePhone = (values) => { 
        handleModal(); 
        setPhone(values);
    };

    return (
        <Modal animationIn='zoomIn' style={styles.modal} onBackdropPress={handleModal} onBackButtonPress={handleModal} isVisible={modal}>     
            <View style={styles.modalContent}>
                <View style={styles.imageContent}>
                    <View style={styles.image}>
                        <Icon style={styles.icon} type='FontAwesome5' name='phone' />
                    </View>
                </View>
                <View style={{alignItems:'center',marginVertical:7}}>
                    <Text style={{fontSize:15,textAlign:'center'}}>¿Quieres cambiar tu teléfono de contacto?</Text>
                </View>
                <Formik
                    initialValues={{ phone: phone.toString() }}
                    onSubmit={handlePhone}
                    validationSchema={ChangePhoneSchema}
                >
                    {({ handleChange, handleBlur, values, errors, touched, handleSubmit, isSubmitting }) => (
                        <Form style={{paddingHorizontal:10, marginTop:5}}>
                            <Item last regular error={errors.phone && touched.phone}>
                                <Input  
                                    onChangeText={handleChange('phone')}
                                    onBlur={handleBlur('phone')}
                                    value={values.phone}
                                    type='phone'
                                    keyboardType='numeric'
                                />
                                {errors.phone && touched.phone && <Icon type='MaterialIcons' name='error' />}
                            </Item>
                            <Button style={{marginTop: 15}} full onPress={handleSubmit} disabled={isSubmitting}>
                                <Text style={{fontSize:17,color:'black'}}>Aceptar</Text>
                            </Button>
                        </Form>
                    )}
                </Formik>
                    
            </View>             
        </Modal>
    )
};

ModalPhone.proptypes = {
    modal: PropTypes.bool.isRequired,
    handleModal: PropTypes.func.isRequired,
    setPhone: PropTypes.func.isRequired,
    phone: PropTypes.number.isRequired,
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
    btnContent: {
        marginTop:10,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection:'row'
    },
    btn: {
        width:50,
        height:50,
        borderRadius:25, 
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:color.primary
    },
});

export default ModalPhone;