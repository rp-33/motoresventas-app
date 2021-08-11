import React, { Component } from 'react';
import { changepassword, changenotifications, logout } from '../services/api';
import { Toast } from 'native-base';
import { 
    LoginManager, 
    AccessToken, 
    GraphRequestManager, 
    GraphRequest 
} from 'react-native-fbsdk';
import { GoogleSignin } from '@react-native-community/google-signin';
import { google } from '../constants/configure';

class Settings extends Component{

    constructor(props) {
        super(props);
        this.state = {
            notifications: true
        }
    };

    componentDidMount() {
        const { notifications } = this.props.user;
        this.setState({ notifications })
    }; 

    changeAvatar = (changeavatar) => async (avatar) => {
        let message = '';
        let type = 'danger';
        let { setAvatar, setLoading } = this.props;
        setLoading(true);
        try{            
            let { status, data } = await changeavatar(avatar);
            if(status === 201){
                setAvatar(data.avatar);
                message = data.message;
                type = 'success';  
            } else{   
                message = data.error || 'Error en el servidor'; 
            }
        } catch(err){
            message = 'Error en el servidor';
        } finally{
            setLoading(false);
            Toast.show({
                text: message,
                textStyle: { fontSize: 15  },
                buttonTextStyle: { color: '#000000', fontSize: 15 },
                buttonText: "Cerrar",
                duration: 3000,
                type
            }); 
        }
    };

    changeDisplayName = (changedisplayname) => async (value) => {
        if(value.displayName === this.props.user.displayName) return;
        let message = '';
        let type = 'danger';
        let { setDisplayName, setLoading } = this.props;
        setLoading(true);
        try{            
            let { status, data } = await changedisplayname(value.displayName)
            if(status === 201){
                setDisplayName(value.displayName);
                message = data.message;
                type = 'success';  
            } else{             
                message = data.error || 'Error en el servidor';                
            }
        } catch(err){
            message = 'Error en el servidor';
        } finally{
            setLoading(false);
            Toast.show({
                text: message,
                textStyle: { fontSize: 15  },
                buttonTextStyle: { color: '#000000', fontSize: 15 },
                buttonText: "Cerrar",
                duration: 3000,
                type
            }); 
        }
    };

    changePassword = async (values) => {
        let message = '';
        let type = 'danger';
        const { setLoading, user } = this.props;
        setLoading(true);
        try{            
            let { status, data } = await changepassword(user.email, values.password)
            if(status === 201){
                message = data.message;
                type = 'success';
            } else{  
                message = data.error || 'Error en el servidor';                          
            }
        } catch(err){
            message = 'Error en el servidor';
        } finally{
            setLoading(false);
            Toast.show({
                text: message,
                textStyle: { fontSize: 15  },
                buttonTextStyle: { color: '#000000', fontSize: 15 },
                buttonText: "Cerrar",
                duration: 3000,
                type
            }); 
        }
    };

    changeNotifications = () => {
        let notifications = !this.state.notifications;
        this.setState({ notifications },
        async () => {
            let message = '';
            let type = 'danger';
            const { setNotifications } = this.props;
            try {            
                let { status, data } = await changenotifications(notifications)
                if(status === 201){
                    setNotifications(notifications);
                    message = data.message;
                    type = 'success';  
                } else{         
                    message = data.error || 'Error en el servidor';         
                }
            } catch(err) {
                message = 'Error en el servidor';
            } finally {
                if(type === 'danger') this.setState({notifications: !notifications});
                Toast.show({
                    text: message,
                    textStyle: { fontSize: 15  },
                    buttonTextStyle: { color: '#000000', fontSize: 15 },
                    buttonText: "Cerrar",
                    duration: 3000,
                    type
                }); 
            }
        })
    };

    handleLogout = async () => {
        let error = '';
        let { navigation, setLogout, user, setLoading } = this.props;
        setLoading(true);
        try {
            const { status, data } = await logout(); 
            if(status === 201) {
                if(user.method === 'facebook'){
                    let data = await AccessToken.getCurrentAccessToken();
                    let accessToken = data.accessToken;
                    let logout = new GraphRequest('/me/permissions/', {
                        accessToken,
                        httpMethod: 'DELETE'
                    }, (error, response) => {
                        if (error) {
                            error = `Error al recuperar datos: ${error.toString()}`
                        } else {
                            LoginManager.logOut();
                            navigation.navigate('LoginNavigator');
                            setLogout();
                        }
                    });
                    new GraphRequestManager().addRequest(logout).start();
                } else if(user.method === 'google'){
                    GoogleSignin.configure(google);
                    await GoogleSignin.revokeAccess();
                    await GoogleSignin.signOut();
                    navigation.navigate('LoginNavigator');
                    setLogout();
                } else {
                    navigation.navigate('LoginNavigator');
                    setLogout();
                }
            } else {
                error = data.error || 'Error en el servidor';
            }
        } catch (error) {
            error = 'Error en el servidor';
        } finally {
            setLoading(false);
            if(error === '') return;
            Toast.show({
                text: error,
                textStyle: { fontSize: 15  },
                buttonTextStyle: { color: '#000000', fontSize: 15 },
                buttonText: "Cerrar",
                duration: 3000,
                type: 'danger'
            }); 
        }
    }
};

export default Settings;