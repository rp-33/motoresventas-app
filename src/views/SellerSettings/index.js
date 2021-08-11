import React from 'react';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
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
    Spinner,
} from 'native-base';
import { Avatar } from 'react-native-paper';
import { setLoading } from '../../actions/loading';
import { setLocation, setImage, setName, setPhone } from '../../actions/seller';
import { setLogout, setNotifications } from '../../actions/user';
import { changeLocation, changePhone, changeName, changeImage } from '../../services/api';
import HeadSettings from '../../presentations/HeadSettings';
import ModalAvatar from '../../presentations/ModalAvatar';
import ModalDisplayname from '../../presentations/ModalDisplayname';
import ModalPassword from '../../presentations/ModalPassword';
import color from '../../theme/color';
import ModalMap from '../../presentations/ModalMap';
import { setRouterDb } from '../../services/realm';
import CardSettings, { TouchOption } from '../../presentations/CardSettings';
import Settings from '../../classes/Settings';
import ModalPhone from './ModalPhone';
import ModalSubscription from './ModalSubscription';
import { dateFormat } from '../../utils/date';
import { withSubscription } from '../../hoc/withSubscription';

class SellerSettings extends Settings{

    constructor(props){
        super(props);
        this.state = {
            ...this.state,
            modalImage: false,
            modalName: false,
            modalPassword: false,
            modalMap: false,
            modalPhone: false,
            modalSubscription: false,
            geolocation: [],
            address: ''
        }
    }
    
    componentDidMount() {
        const { notifications } = this.props.user;
        let geolocation = [];
        if(this.props.seller.location.length > 0) {
            const [ longitude, latitude ] = this.props.seller.location;
            geolocation = [{ longitude, latitude, address: '' }];
        }
        this.setState({ notifications, geolocation });
    };  
    
    // edicion

    changeMyPhone = async (value) => {
        if(value.phone === this.props.seller.phone) return;
        let message = '';
        let type = 'danger';
        let { setPhone, setLoading } = this.props;
        setLoading(true);
        try{            
            let { status, data } = await changePhone(value.phone)
            if(status === 201){
                setPhone(parseInt(value.phone));
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

    changetLocation = async (longitude, latitude, address) => {
        let { setLocation, setLoading } = this.props;
        let message = '';
        let type = 'danger';
        let success = false;
        setLoading(true);
        try{            
            let { status, data } = await changeLocation(longitude, latitude);
            if(status === 201){
                success = true;
                this.setState({ address });
                setLocation([longitude, latitude]);
                message = data.message;
                type = 'success';  
            } else{             
                message = data.error || 'Error en el servidor';               
            }
        } catch(err){
            message = 'Error en el servidor';
        } finally{
            if(!success) {
                const [ longitude, latitude ] = this.props.seller.location;
                const geolocation = [{ longitude, latitude, address:this.state.address }];
                this.setState({ geolocation });
            }
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

    setGeolocation = (geolocation=null) => this.setState(previosState => {
        let newState = {...previosState};
        let newGeolocation = [];
        if(geolocation) {
            const { address = '' } = geolocation;
            if(newState.address === '') newState.address = address;
            newGeolocation = [geolocation]
        }
        newState.geolocation = newGeolocation;
                
        return newState
    });

    changeSubscription = (choose) => this.props.handleChoose(choose);

    // modales

    handleModalMap = () => {
        this.setState(previosState=>({
            modalMap : !previosState.modalMap
        }), () => {
            const { location } = this.props.seller;
            const { longitude, latitude, address } = this.state.geolocation[0];
            const lon1 = Number(location[0].toFixed(4));
            const lat1 = Number(location[1].toFixed(4));
            const lon2 = Number(longitude.toFixed(4));
            const lat2 = Number(latitude.toFixed(4));
            if(lon1!==lon2 || lat1!==lat2)
                this.changetLocation(longitude, latitude, address);
        })
    };

    handleModal = (modal) => () => {
        this.setState(previosState=>({
            [modal] : !previosState[modal]
        }))
    };

    // navegacion
    
    handleBuyer = () => {
        setRouterDb('BuyerDashboard');
        this.props.navigation.navigate('BuyerDashboard');
    };

    // render

    render(){
        const { image, name, rifCode, rif, phone, plan, expired_date } = this.props.seller;
        const { modalImage, modalName, modalPassword, modalMap, modalPhone, geolocation, notifications, address, modalSubscription } = this.state;
        const subscription = plan === 'gold' ? 'Premium' : (plan === 'silver' ? 'Básico' : 'Sin suscripción');
        const expired = Boolean(expired_date) ? `vence el ${dateFormat(expired_date, 'l')}` : '';
       
        return(
            <Container>
                <HeadSettings title='Configuración' handleLogout={this.handleLogout} />
                <Content>
                    <CardSettings title='Rol del usuario' >
                        <View style={{flexDirection:'row',marginVertical:3}}>
                            <Text style={{flex:1,color:color.secondary,textAlign:'right',marginRight:10}}>Comprador</Text>
                            <Text style={{flex:1,marginLeft:10}}>Vendedor</Text>
                        </View>
                        <TouchableOpacity onPress={this.handleBuyer}>
                            <Text style={{color:color.primary}}>Ser Comprador</Text>
                        </TouchableOpacity>
                    </CardSettings>
                    <CardSettings title='Perfil de Usuario' >
                        <TouchOption
                            subtitle='Imagen de Perfil'
                            handlePress={this.handleModal('modalImage')}
                        >
                            <Avatar.Image size={50} style={{backgroundColor:'#D9D5DC'}} source={{uri:image}} />
                        </TouchOption>
                        <TouchOption
                            subtitle='Nombre de la tienda'
                            icon={{ name: 'store', type: 'FontAwesome5' }}
                            handlePress={this.handleModal('modalName')}
                        >
                            <Text numberOfLines={1} style={{flex:1,textAlign:'right',textTransform:'capitalize'}}>{name}</Text>
                        </TouchOption>
                        <TouchOption
                            subtitle='RIF'
                            icon={{ name: 'id-card', type: 'FontAwesome5' }}
                            disable={true}
                        >
                            <Text numberOfLines={1} style={{flex:1,textAlign:'right',color:'gray'}}>{`${rifCode}-${rif}`}</Text>
                        </TouchOption>
                        <TouchOption
                            subtitle='Teléfono'
                            icon={{ name: 'phone', type: 'FontAwesome5' }}
                            handlePress={this.handleModal('modalPhone')}
                        >
                            <Text numberOfLines={1} style={{flex:1,textAlign:'right'}}>{phone}</Text>
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
                        <TouchOption
                            subtitle={`Suscripción`}
                            icon={{ name: 'user-clock', type: 'FontAwesome5' }}
                            handlePress={this.handleModal('modalSubscription')}
                        >
                            <Text numberOfLines={1} style={{flex:2,textAlign:'right'}}>{subscription}</Text>
                        </TouchOption>
                        {Boolean(expired) &&
                            <Text 
                                style={{alignSelf:'flex-end',paddingHorizontal:10,fontSize:13,lineHeight:13,marginBottom:-5,bottom:5,color:'rgb(51,51,51)'}}
                            >
                                {expired}
                            </Text>
                        }
                    </CardSettings>
                    <CardSettings title='Dirección' >
                        <TouchOption
                            subtitle='Dirección'
                            icon={{ name: 'md-pin', type: 'Ionicons', size: 25 }}
                            handlePress={this.handleModal('modalMap')}
                            style={{flex:1,alignSelf:'flex-start',flexDirection:'column',}}
                            disabled={address===''}
                        >
                            {address==='' ?
                                <Spinner color={color.primary} />
                                :
                                <Text style={{flex:1,textAlign:'center',paddingHorizontal:10}}>{address}</Text>
                            }
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
                { modalImage &&
                    <ModalAvatar 
                        image={image}
                        modal={modalImage}
                        handleModal={this.handleModal('modalImage')}
                        setAvatar={this.changeAvatar(changeImage)}
                    />
                }
                { modalName &&
                    <ModalDisplayname 
                        displayName={name}
                        modal={modalName}
                        handleModal={this.handleModal('modalName')}
                        setDisplayName={this.changeDisplayName(changeName)}
                        note='¿Quiere cambiar el nombre de tu tienda?'
                        icon={{ type:'FontAwesome5', name:'store' }}
                    />
                }
                { modalPassword &&
                    <ModalPassword 
                        modal={modalPassword}
                        handleModal={this.handleModal('modalPassword')}
                        setPassword={this.changePassword}
                    />
                }
                { geolocation[0] && 
                    <ModalMap 
                        modal={modalMap}
                        geolocation={geolocation}
                        setGeolocation={this.setGeolocation}
                        handleModal={this.handleModalMap}
                    />
                }
                { modalPhone &&
                    <ModalPhone 
                        phone={phone}
                        modal={modalPhone}
                        handleModal={this.handleModal('modalPhone')}
                        setPhone={this.changeMyPhone}
                    />
                }
                { modalSubscription &&
                    <ModalSubscription 
                        modal={modalSubscription}
                        handleModal={this.handleModal('modalSubscription')}
                        currentType={plan} 
                        setSubscription={this.changeSubscription}
                    />
                }
            </Container>
        )
    }
};

SellerSettings.proptypes = {
    setLoading: Proptypes.func.isRequired,
    setLogout: Proptypes.func.isRequired,
    setImage: Proptypes.func.isRequired,
    setName: Proptypes.func.isRequired,
    setNotifications: Proptypes.func.isRequired,
    setLocation: Proptypes.func.isRequired,
    setPhone: Proptypes.func.isRequired,
    user: Proptypes.object.isRequired,
    seller: Proptypes.object.isRequired
};

const mapDispatchToProps = dispatch => ({
    setLoading: value => dispatch(setLoading(value)),
    setLogout: () => dispatch(setLogout()),
    setAvatar: value => dispatch(setImage(value)),
    setDisplayName: value => dispatch(setName(value)),
    setNotifications: value => dispatch(setNotifications(value)),
    setLocation: value => dispatch(setLocation(value)),
    setPhone: value => dispatch(setPhone(value))
});

const mapStateToProps = state => ({
    user: state.user,
    seller: state.seller
})

export default connect(mapStateToProps, mapDispatchToProps)(withSubscription(SellerSettings));