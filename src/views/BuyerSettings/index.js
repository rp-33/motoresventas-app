import React from 'react';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
import { setLoading } from '../../actions/loading';
import { 
    setLogout, 
    setAvatar, 
    setDisplayName, 
    setNotifications, 
    setDistance 
} from '../../actions/user';
import { changedistance, changeavatar, changedisplayname } from '../../services/api';
import { 
    Switch,
    View,
    TouchableOpacity
} from 'react-native';
import {
    Text,
    Container,
    Content,
    Toast,
} from 'native-base';
import { Avatar } from 'react-native-paper';
import HeadSettings from '../../presentations/HeadSettings';
import ModalAvatar from '../../presentations/ModalAvatar';
import ModalDisplayname from '../../presentations/ModalDisplayname';
import ModalPassword from '../../presentations/ModalPassword';
import ModalDistance from './ModalDistance';
import color from '../../theme/color';
import { setRouterDb } from '../../services/realm';
import Settings from '../../classes/Settings';
import CardSettings, { TouchOption } from '../../presentations/CardSettings';

class BuyerSettings extends Settings{

    constructor(props){
        super(props);
        this.state = {
            ...this.state,
            seller: false,
            modalAvatar: false,
            modalDisplayname: false,
            modalPassword: false,
            modalDistance: false
        }
    }
    
    // edicion 

    changeDistance = async (distance) => {
        if(distance===this.props.user.distance) return;
        let message = '';
        let type = 'danger';
        let { setDistance, setLoading } = this.props;     
        setLoading(true);
        try{         
            let { status, data } = await changedistance(distance);
            if(status === 201){
                setDistance(distance);
                message = data.message;
                type = 'success'
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

    // modales

    handleModal = (modal) => () => this.setState(previosState=>({ [modal] : !previosState[modal] }));

    // navegacion
    
    handleSellerSignup = () => this.props.navigation.navigate('sellersignup');

    handleSeller = () => {
        setRouterDb('SellerDashboard');
        this.props.navigation.navigate('SellerDashboard');
    };

    // render
    
    render(){
        const { avatar, displayName, distance, status_seller } = this.props.user;
        const { modalAvatar, modalDisplayname, modalPassword, modalDistance, notifications } = this.state;
        return(
            <Container>
                <HeadSettings title='Configuración' handleLogout={this.handleLogout} />
                <Content>
                    <CardSettings title='Rol del usuario' >
                        <View style={{flexDirection:'row',marginVertical:3}}>
                            <Text style={{flex:1,textAlign:'right',marginRight:10}}>Comprador</Text>
                            <Text style={{flex:1,color:color.secondary,marginLeft:10}}>Vendedor</Text>
                        </View>
                        {status_seller === 'sent' ?
                            <TouchableOpacity onPress={this.handleSeller}>
                                <Text style={{color:color.primary}}>Ser Vendedor</Text>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity onPress={this.handleSellerSignup}>
                                <Text style={{color:color.primary}}>¿Quieres ser Vendedor?</Text>
                            </TouchableOpacity>
                        }
                    </CardSettings>
                    <CardSettings title='Perfil de Usuario' >
                        <TouchOption
                            subtitle='Imagen de Perfil'
                            handlePress={this.handleModal('modalAvatar')}
                        >
                            <Avatar.Image size={50} style={{backgroundColor:'#D9D5DC'}} source={{uri:avatar}} />
                        </TouchOption>
                        <TouchOption
                            subtitle='Nombre y Apellido'
                            icon={{ name: 'user-edit', type: 'FontAwesome5' }}
                            handlePress={this.handleModal('modalDisplayname')}
                        >
                            <Text numberOfLines={1} style={{flex:1,textAlign:'right',textTransform:'capitalize'}}>{displayName}</Text>
                        </TouchOption>
                        <TouchOption
                            subtitle='Contraseña'
                            icon={{ name: 'user-lock', type: 'FontAwesome5' }}
                            handlePress={this.handleModal('modalPassword')}
                        >
                            <Text numberOfLines={1} style={{flex:1,textAlign:'right'}}>******</Text>
                        </TouchOption>
                        <TouchOption
                            subtitle='Notificaciones'
                            icon={{ name: 'user-check', type: 'FontAwesome5' }}
                            disable={true}
                        >
                            <Switch
                                onValueChange={this.changeNotifications} 
                                value={notifications} 
                                thumbColor={notifications?color.primary:color.secondary}
                                trackColor={{true:'rgba(237, 152, 26, 0.4)',false:'#D9D5DC'}}
                                style={{position:'absolute', right:13 }}
                            />
                        </TouchOption>
                    </CardSettings>
                    <CardSettings title='Radio de Busqueda' >
                        <TouchOption
                            subtitle='Distancia'
                            icon={{ name: 'md-pin', type: 'Ionicons', size: 25 }}
                            handlePress={this.handleModal('modalDistance')}
                        >
                            <Text style={{flex:1,textAlign:'right'}}>{distance} Km</Text>
                        </TouchOption>
                        
                    </CardSettings>
                    <CardSettings title='Término y condiciones legales' >
                        <TouchOption
                            subtitle='Terminos y condiciones'
                            icon={{ name: 'user-shield', type: 'FontAwesome5'}}
                        >
                            <Text style={{textAlign:'right'}}>Leer</Text>
                        </TouchOption>
                        <TouchOption
                            subtitle='Política de privacidad'
                            icon={{ name: 'user-secret', type: 'FontAwesome5'}}
                        >
                            <Text style={{textAlign:'right'}}>Leer</Text>
                        </TouchOption>
                    </CardSettings>
                </Content>
                { modalAvatar &&
                    <ModalAvatar 
                        image={avatar}
                        modal={modalAvatar}
                        handleModal={this.handleModal('modalAvatar')}
                        setAvatar={this.changeAvatar(changeavatar)}
                    />
                }
                { modalDisplayname &&
                    <ModalDisplayname 
                        displayName={displayName}
                        modal={modalDisplayname}
                        handleModal={this.handleModal('modalDisplayname')}
                        setDisplayName={this.changeDisplayName(changedisplayname)}
                    />
                }
                { modalPassword &&
                    <ModalPassword 
                        modal={modalPassword}
                        handleModal={this.handleModal('modalPassword')}
                        setPassword={this.changePassword}
                    />
                }
                { modalDistance &&
                    <ModalDistance 
                        modal={modalDistance}
                        handleModal={this.handleModal('modalDistance')}
                        distance={distance}
                        setDistance={this.changeDistance}
                    />
                }
            </Container>
        )
    }
};

BuyerSettings.proptypes = {
    setLoading : Proptypes.func.isRequired,
    setLogout : Proptypes.func.isRequired,
    setAvatar : Proptypes.func.isRequired,
    setDisplayName : Proptypes.func.isRequired,
    setNotifications : Proptypes.func.isRequired,
    setDistance : Proptypes.func.isRequired,
    user: Proptypes.object.isRequired
};

const mapDispatchToProps = dispatch => ({
    setLoading: value => dispatch(setLoading(value)),
    setLogout: () => dispatch(setLogout()),
    setAvatar: value => dispatch(setAvatar(value)),
    setDisplayName: value => dispatch(setDisplayName(value)),
    setNotifications: value => dispatch(setNotifications(value)),
    setDistance: value => dispatch(setDistance(value)),
});

const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps, mapDispatchToProps)(BuyerSettings);


