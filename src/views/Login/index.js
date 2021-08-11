import React,{Component} from 'react';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';
import {
    View,
    Image,
    Text as OtherText, 
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import {
    Text,
    Container,
    Content,
    Form,
    Button,
    Toast
} from 'native-base';
import { Formik } from 'formik';
import { SignInSchema, Width } from '../../constants';
import Field from '../../presentations/Field';
import color from '../../theme/color';
import { setLoading } from '../../actions/loading';
import { setAuth } from '../../actions/user';
import { addGarage } from '../../actions/garage';
import { setSeller } from '../../actions/seller';
import { addFavorite } from '../../actions/cart';
import { 
    loginnormal,
    loginGg,
    loginFb
} from '../../services/api';
import Social from './Social';
import notification from '../../services/notification';

class Login extends Component{

    //handleNotification
    handleNotification = ()=>notification.checkPermission();

    // navegacion

    handleNav = router => () => this.props.navigation.navigate(router);

    // iniciar session

    handleLogin = async (values, actions) => {
        let { setLoading, navigation, setAuth,addGarage,setSeller,addFavorite } = this.props;
        let { email, password } = values;
        let error = '';
        setLoading(true);
        try{            
            let { status, data } = await loginnormal(email, password);
            if(status === 200) {
                let {garage,seller,favorite,...rest} = data;
                if(garage.length>0) addGarage(garage);
                if(seller) setSeller(seller);
                if(favorite.length>0) addFavorite(favorite);
                setAuth(rest);
                notification.checkPermission()
                this.handleNotification();
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

    handleLoginGg = async ({ email, name, photo }) => {
        let { setLoading, navigation, setAuth,addGarage,setSeller,addFavorite } = this.props;
        let error = '';
        setLoading(true);
        try{            
            let { status, data } = await loginGg(email,name,photo);
            if(status === 201){
                let {garage,seller,favorite,...rest} = data;
                if(garage.length>0) addGarage(garage);
                if(seller) setSeller(seller);
                if(favorite.length>0) addFavorite(favorite);
                setAuth(rest);    
                this.handleNotification();
                navigation.navigate('BuyerDashboard');
            } else{             
                error = data.error || 'Error en el servidor';             
            }
        } catch(err){
            error = 'Error en el servidor';
        } finally{
            setLoading(false);
            if(error === '') return;
            
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

    handleLoginFb = async ({ email, name, photo }) => {
        let { setLoading, navigation, setAuth,addGarage,setSeller,addFavorite } = this.props;
        let error = '';
        setLoading(true);  
        try{            
            let { status, data } = await loginFb(email,name,photo);
            if(status === 201){
                let {garage,seller,favorite,...rest} = data;
                if(garage.length>0) addGarage(garage);
                if(seller) setSeller(seller);
                if(favorite.length>0) addFavorite(favorite);
                setAuth(rest);   
                this.handleNotification();
                navigation.navigate('BuyerDashboard');
            } else{             
                error = data.error || 'Error en el servidor';                  
            }
        } catch(err){
            error = 'Error en el servidor';
        } finally{
            setLoading(false);
            if(error === '') return;
            
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
        return(
            <Container>
                <Content>
                    <View style={styles.contentLogo}>
                        <Image style={styles.img} source={require("../../assets/images/carro.png")}  />
                        <Text style={styles.title}>Bienvenido</Text>
                    </View>
                    <View style={styles.contentForm}>
                        <Formik
                            initialValues={{ email: '', password: '' }}
                            onSubmit={(values, actions) => {this.handleLogin(values, actions)}}
                            validationSchema = {SignInSchema}
                        >
                            {formikProps => (
                                <Form style={{flex: 1}} >
                                    <Field 
                                        formikProp={formikProps}
                                        type='email'
                                        title='Correo electrónico'
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
                                        button
                                    />
                                    <TouchableOpacity style={{paddingVertical:5, alignSelf:'flex-end',marginTop:-5,marginBottom:2}} onPress={this.handleNav('forgotpassword')}>
                                        <Text style={styles.btnText}>Recuperar contraseña</Text>
                                    </TouchableOpacity>
                                    <Button onPress={formikProps.handleSubmit} block full disabled={formikProps.isSubmitting}>
                                        <Text style={styles.btnEnter}>Entrar</Text>
                                    </Button>
                                </Form> 
                            )}
                        </Formik>
                        <View style={styles.singUp}>
                            <Text  style={[styles.note, { marginRight: 5}]}>¿Aún no tienes una cuenta?</Text>
                            <TouchableOpacity style={{paddingVertical:5, alignSelf:'flex-end',marginBottom:5,marginTop:3}} onPress = {this.handleNav('signup')}>
                                <Text style={styles.btnText}>Registrate ahora</Text>
                            </TouchableOpacity>
                        </View>
                        <Social 
                            handleLoginGg = {this.handleLoginGg}
                            handleLoginFb = {this.handleLoginFb}
                        />
                    </View>
                </Content>
            </Container>
        )
    }
};

Login.proptypes = {
    setLoading : Proptypes.func.isRequired,
    setAuth : Proptypes.func.isRequired,
};

const styles = StyleSheet.create({
    contentForm: {
        alignSelf: 'center',
        width: Width,
        alignItems: 'stretch',
        flex: 1,
        paddingLeft: 20,
        paddingRight: 20,
    },
    contentLogo: {
        alignSelf: 'center',
        alignItems: 'center',
        marginBottom: 5,
        width: Width,
        flex: 1,
    },
    title: {
        marginTop: 5,
        fontSize: Width/16,
        fontWeight: 'bold',
    },
    img: {
        width: 0.6*Width,
        height: 0.6*Width,
    },
    btnText: {
        color: color.primary,
        fontSize: Width < 360 ? Width/21.175: 17,       
    },
    btnEnter: {
        fontSize: 20,
        color:'black'
    },
    singUp: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnSingUp: {
        color: color.primary,
        marginHorizontal: 5,
        fontSize: Width < 360 ? Width/21.175: 17,
    },
    note: {
        fontSize :Width < 360 ? Width/24: 15,
    }
});

const mapDispatchToProps = dispatch => ({
    setLoading: value => dispatch(setLoading(value)),
    setAuth: value => dispatch(setAuth(value)),
    addGarage : value => dispatch(addGarage(value)),
    setSeller : value => dispatch(setSeller(value)),
    addFavorite : value => dispatch(addFavorite(value))
});

export default connect(null, mapDispatchToProps)(Login);
