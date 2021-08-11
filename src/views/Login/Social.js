import React, { Component } from 'react';
import {
    View,
    Text, 
    StyleSheet,
    TouchableOpacity,
    PixelRatio
} from 'react-native';
import {
    Icon,
    Toast
} from 'native-base';
import { 
    LoginManager, 
    AccessToken, 
    GraphRequestManager, 
    GraphRequest 
} from 'react-native-fbsdk';
import { 
    GoogleSignin, 
    statusCodes 
} from '@react-native-community/google-signin';
import PropTypes from 'prop-types';
import { Avatar } from 'react-native-paper';
import { google } from '../../constants/configure';

class Social extends Component {

    componentDidMount() {
        GoogleSignin.configure(google);
    };

    signInGoogle = async () => {
        try {
            await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
            const {idToken,user} = await GoogleSignin.signIn();
            this.props.handleLoginGg(user)
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                console.log('El usuario cancelo el inicio de sesión con google');
            } else if (error.code === statusCodes.IN_PROGRESS) {
                console.log('El inicio de sesión ya está en progreso');
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                console.log('Play Services no disponibles u obsoletos');
            } else {
                console.log('Ocurrió otro error');
            }
            console.log(error);
        }
    };

    signInFacebook = async () => {
        try {
            let result = await LoginManager.logInWithPermissions(['public_profile','email']);
            if(result.isCancelled) {
                Toast.show({
                    text: 'Inicio de sesión con Facebook cancelado',
                    textStyle: { fontSize: 15 },
                    buttonTextStyle: { color: '#000000', fontSize: 15 },
                    buttonText: "Cerrar",
                    duration: 3000,
                    type: "danger"
                }) 
            } else {
                let data = await AccessToken.getCurrentAccessToken();
                let accessToken = data.accessToken;
                let facebookId = data.userID;

                const responseInfoCallback = (error, response) => {
                    if (error) {
                        console.log(`Error al recuperar datos: ${error.toString()}`);
                    } else {
                        let user = {
                            email: response.email,
                            name: response.name,
                            photo: response.picture.data.url
                        }
                        this.props.handleLoginFb(user)
                    }
                };

                const infoRequest = new GraphRequest('/me', {
                    accessToken: accessToken, 
                    parameters: { 
                        fields: {string: 'name,picture.type(large),email'}
                    }
                }, responseInfoCallback);

                new GraphRequestManager().addRequest(infoRequest).start();
            }
        } catch (error) {
            console.log(`Ha ocurrido un error: ${error}`);
        }
    };

    render() {
        return (
            <View style={styles.contentSocial}>
                <Text style={styles.note}>Inicia sesión con:</Text>
                <TouchableOpacity onPress={this.signInGoogle} style={[styles.btnSocial,{marginLeft:7.5}]}>
                    <Avatar.Image style={{backgroundColor:'transparent'}} size={45} source={require('../../assets/icons/google.png')} />
                </TouchableOpacity>
                <TouchableOpacity onPress={this.signInFacebook} style={[styles.btnSocial,{marginLeft:15}]}>
                    <Avatar.Image style={{backgroundColor:'transparent'}} size={45} source={require('../../assets/icons/facebook.png')} />
                </TouchableOpacity>
            </View>
        )
    }
};

Social.propTypes = {
    handleLoginFb: PropTypes.func.isRequired,
    handleLoginGg: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
    note: {
        fontSize: 15,
        marginRight: 7.5
    },
    contentSocial: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 5,
        padding: 10,
        borderWidth: 1/PixelRatio.getPixelSizeForLayoutSize(1),
        borderColor: 'black',//'#D9D5DC',
        borderRadius: 15,
    }
});

export default Social;
