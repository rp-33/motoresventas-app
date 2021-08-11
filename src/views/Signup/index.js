import React, { Component } from 'react';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';
import {
    View,
    Image,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import {
    Container,
    Content,
    Form,
    Button,
    Icon,
    Toast,
    Text, 
} from 'native-base';
import { Formik } from 'formik';
import HeadBack from '../../presentations/HeadBack';
import ModalBottom from '../../presentations/ModalBottom';
import { SignUpSchema, Width } from '../../constants';
import Field from '../../presentations/Field';
import color from '../../theme/color';
import { setLoading } from '../../actions/loading';
import { setAuth } from '../../actions/user';
import { signup } from '../../services/api';
import ModalTermsService from './ModalTermsService';
import notification from '../../services/notification';

class Signup extends Component{
    constructor(props){
        super(props);
        this.state = {
            modalAvatar: false,
            modalTermsService: false,
            text: '1. Your use of the Service is at your sole risk. The service is provided on an "as is" and "as available" basis. 2. Support for Expo services is only available in English, via e-mail. 3. You understand that Expo uses third-party vendors and hosting partners to provide the necessary hardware, software, networking, storage, and related technology required to run the Service. 4. You must not modify, adapt or hack the Service or modify another website so as to falsely imply that it is associated with the Service, Expo, or any other Expo service. 5. You may use the Expo Pages static hosting service solely as permitted and intended to host your organization pages, personal pages, or project pages, and for no other purpose. You may not use Expo Pages in violation of Expo trademark or other rights or in violation of applicable law. Expo reserves the right at all times to reclaim any Expo subdomain without liability to you. 1. Your use of the Service is at your sole risk. The service is provided on an "as is" and "as available" basis. 2. Support for Expo services is only available in English, via e-mail. 3. You understand that Expo uses third-party vendors and hosting partners to provide the necessary hardware, software, networking, storage, and related technology required to run the Service. 4. You must not modify, adapt or hack the Service or modify another website so as to falsely imply that it is associated with the Service, Expo, or any other Expo service. 5. You may use the Expo Pages static hosting service solely as permitted and intended to host your organization pages, personal pages, or project pages, and for no other purpose. You may not use Expo Pages in violation of Expo trademark or other rights or in violation of applicable law. Expo reserves the right at all times to reclaim any Expo subdomain without liability to you. 1. Your use of the Service is at your sole risk. The service is provided on an "as is" and "as available" basis. 2. Support for Expo services is only available in English, via e-mail. 3. You understand that Expo uses third-party vendors and hosting partners to provide the necessary hardware, software, networking, storage, and related technology required to run the Service. 4. You must not modify, adapt or hack the Service or modify another website so as to falsely imply that it is associated with the Service, Expo, or any other Expo service. 5. You may use the Expo Pages static hosting service solely as permitted and intended to host your organization pages, personal pages, or project pages, and for no other purpose. You may not use Expo Pages in violation of Expo trademark or other rights or in violation of applicable law. Expo reserves the right at all times to reclaim any Expo subdomain without liability to you.',
            avatar: '',
            accept: false
        }
    }

    // navegacion

    handleBack = () => this.props.navigation.goBack();

    // modales

    handleModal = (modal) => () => this.setState(previosState=>({ [modal] : !previosState[modal] }));

    // registro

    setAvatar = (avatar) => this.setState({ avatar });

    hanlePress = ({ dirty, errors, handleSubmit }) => () => {

        if(this.state.avatar === '') return Toast.show({
            text: 'Foto de perfil es requerido',
            textStyle: { fontSize: 15  },
            buttonTextStyle: { color: '#000000', fontSize: 15 },
            buttonText: "Cerrar",
            duration: 3000,
            type: "danger"
         })
     
        if(this.state.accept || !dirty || Object.keys(errors).length > 0) return handleSubmit();
        
        this.setState({ modalTermsService: true });

    };

    handleSignup = async (values, actions) => {
        this.setState({ modalTermsService: false, accept: true });
        const { navigation, setAuth, setLoading } = this.props;
        const { displayName, email, password } = values;
        let error = '';
        setLoading(true);
        try{            
            let { status, data } = await signup(displayName,email,password,this.state.avatar)
            if(status === 201){
                setAuth(data);
                notification.checkPermission()
                navigation.navigate('BuyerDashboard');
            } else{             
                error = data.error || 'Error en el servidor';               
            }
        } catch(err){
            error = 'Error en el servidor';
        } finally{
            setLoading(false);
            if(error === '') return;
            
            actions.setSubmitting(false);
            Toast.show({
                text: error,
                textStyle: { fontSize: 15  },
                buttonTextStyle: { color: '#000000', fontSize: 15 },
                buttonText: "Cerrar",
                duration: 3000,
                type: "danger"
            });
        }
    };

    // render
    
    render(){
        const { text, modalAvatar, modalTermsService, avatar } = this.state;
        return(           
            <Container>
                <HeadBack 
                    title = "Regístrate para empezar"
                    handleBack = {this.handleBack}
                />
                <Content>
                    <View style={styles.contentAvatar}>
                        <TouchableOpacity onPress = {this.handleModal('modalAvatar')}>
                            <Image style={styles.img} source={avatar !== '' ? {uri: avatar} : require("../../assets/images/logo.png") }  />
                            <View style={styles.editAvatar}>
                                <Icon size={22} type='FontAwesome5' name='plus'  />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.contentForm}>
                        <Formik
                            initialValues={{ displayName: '', email: '', password: '', repeatPassword: '' }}
                            onSubmit={this.handleSignup}
                            validationSchema = {SignUpSchema}
                        >
                            {formikProps => (
                                <Form>
                                    <Field 
                                        formikProp={formikProps}
                                        type='displayName'
                                        title='Nombre y Apellido'
                                        iconType='FontAwesome5' 
                                        iconName='pencil-alt'
                                    />
                                    <Field 
                                        formikProp={formikProps}
                                        type='email'
                                        title='Correo'
                                        iconType='FontAwesome' 
                                        iconName='envelope'
                                    />
                                    <Field 
                                        formikProp={formikProps}
                                        type='password'
                                        title='Contraseña'
                                        iconType='FontAwesome5' 
                                        iconName='key'
                                        secureTextEntry
                                    />
                                    <Field 
                                        formikProp={formikProps}
                                        type='repeatPassword'
                                        title='Repetir Contraseña'
                                        iconType='FontAwesome5' 
                                        iconName='key'
                                        secureTextEntry
                                        last
                                    />
                                    <Button onPress={this.hanlePress(formikProps)} disabled={formikProps.isSubmitting} block full> 
                                        <Text style={styles.btnText}>Registrarse</Text>
                                    </Button>
                                    <ModalTermsService 
                                        modal={modalTermsService}
                                        handleModal={this.handleModal('modalTermsService')}
                                        text={text}
                                        formikProps={formikProps}
                                    />
                                </Form> 
                            )}
                        </Formik>
                    </View>
                </Content>
                <ModalBottom 
                    modal = {modalAvatar}
                    setAvatar = {this.setAvatar}
                    handleModal = {this.handleModal('modalAvatar')}
                />
                
            </Container>
        )
    }
};

const styles = StyleSheet.create({
    contentAvatar: {
        flex: 1,
        width: 0.4*Width, 
        height: 0.4*Width, 
        borderRadius: (0.4*Width)/2,
        borderWidth: 1,
        borderColor: color.primary,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop:10
    },
    img: {
        width: (0.4*Width)-5, 
        height: (0.4*Width)-5, 
        borderRadius: 100,
    },
    editAvatar: {
        width:Width/8, 
        height:Width/8, 
        backgroundColor: color.primary, 
        borderRadius: (Width/8)/2, 
        position: 'absolute', 
        right: 0, 
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    contentForm: {
        alignSelf: 'center',
        width: Width,
        alignItems: 'stretch',
        flex: 1,
        paddingLeft: 20,
        paddingRight: 20,
        marginBottom: 5,
    },
    btnText: {
        fontSize: 20,
        color:'black'
    },
});

Signup.proptypes = {
    setLoading : Proptypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
    setLoading: value => dispatch(setLoading(value)),
    setAuth: value => dispatch(setAuth((value))),
});

export default connect(null, mapDispatchToProps)(Signup);
