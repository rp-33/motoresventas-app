import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Image    
} from 'react-native';
import { 
    Text,
    Container, 
    Content, 
    Icon, 
    Button, 
    Form, 
    Toast, 
    Spinner
} from 'native-base';
import { Formik } from 'formik';
import { 
    sellersignup,
    getCaptcha
} from '../../services/api';
import { setSeller } from '../../actions/seller';
import { setLoading } from '../../actions/loading';
import { setStatus } from '../../actions/user';
import { Width, SellersignupSchema } from '../../constants';
import color from '../../theme/color';
import Field from '../../presentations/Field';
import FieldButton from '../../presentations/FieldButton';
import ModalBottom from '../../presentations/ModalBottom';
import ModalMap from '../../presentations/ModalMap';
import HeadBack from '../../presentations/HeadBack';
import {setRouterDb} from '../../services/realm';
import { Menu, MenuOptions, MenuOption, MenuTrigger} from "react-native-popup-menu";

class Sellersignup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            geolocation: [],
            errorGeolocation: false,
            avatar: '',
            rifCode: 'V',
            modalMap: false,
            modalAvatar: false,
            imgCaptcha : null
        }
        this.cookie = '';
    }

    componentDidMount(){
        this._Captcha();
    };
    
    // navegacion

    handleBack = () => this.props.navigation.goBack();

    // pedir captcha
    
    _Captcha = async() =>{
        if(this.state.imgCaptcha) this.setState({ imgCaptcha: null });
        
        let error = '';
        try{
            let {status, data} = await getCaptcha();
            if(status ===200){
                this.setState({ imgCaptcha:data.image });
                this.cookie = data.cookie
            } else{             
                error = data.error;              
            }
        } catch(err){
            error = 'Error en el servidor';
        } finally {
            if(error === '' || error === undefined) return;
            
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

    // geolocalizacion
    setGeolocation = (geolocation=null) => this.setState(previosState=>{
        let newState = {...previosState};
        let newGeolocation = [];
        if(geolocation) {
            newGeolocation.push(geolocation);
            newState.errorGeolocation = false;
        } else {
            newState.errorGeolocation = true;
        }
        newState.geolocation = newGeolocation;
        return newState
    });

    // modales

    handleModal = (modal) => () => this.setState(previosState=>({ [modal] : !previosState[modal] }));

    // registro de vendedor

    setAvatar = (avatar) => this.setState({ avatar });

    handleSubmit = (submit) => {
        if(this.state.geolocation.length===0) this.setState({ errorGeolocation: true });
        submit();
    };

    handleSellersignup = async (values, actions) => {
        const { geolocation, avatar, rifCode } = this.state;
        if(avatar==='') {
            actions.setSubmitting(false);
            return Toast.show({
                text: 'Foto de perfil es requerido',
                textStyle: { fontSize: 15  },
                buttonTextStyle: { color: '#000000', fontSize: 15 },
                buttonText: "Cerrar",
                duration: 3000,
                type: "danger"
            })
        }
        let error = '';
        const { setLoading, setStatusSeller, setSeller, user, navigation } = this.props;
        const { name, rif, captcha, phone } = values;
        const { latitude, longitude } = geolocation[0];
        const { email, displayName } = user;
        setLoading(true)
        try {
            let { status, data } = await sellersignup(displayName,email,avatar,name,rifCode,rif,phone,latitude,longitude,captcha,this.cookie);
            if(status === 201) {
                setSeller(data);
                setStatusSeller('sent');
                setRouterDb('SellerDashboard');
                navigation.navigate('SellerDashboard');
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

    render() {
        const { avatar, rifCode, imgCaptcha, geolocation, errorGeolocation, modalAvatar, modalMap } = this.state;
        return (
            <Container>
                <HeadBack 
                    title='Registro de tienda'
                    handleBack={this.handleBack}
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
                            initialValues={{ name: '', rif: '', captcha: '', phone: '' }}
                            onSubmit={this.handleSellersignup}
                            validationSchema = {SellersignupSchema}
                        >
                            {formikProps => (
                                <Form>
                                    <Field 
                                        formikProp={formikProps}
                                        type='name'
                                        title='Nombre'
                                        iconType='FontAwesome5' 
                                        iconName='store'
                                    />
                                    <Field
                                        formikProp={formikProps}
                                        type='rif'
                                        title='RIF'
                                        keyboardType='numeric'
                                        Component={()=>
                                                <Menu style={{height:35,justifyContent:'center'}} onSelect={rifCode => this.setState({ rifCode })}>
                                                    <MenuTrigger style={{flexDirection:'row',marginTop:3}} >
                                                        <Text style={{fontSize:20,lineHeight:20,alignSelf:'center', fontWeight: "bold",textAlign:'center'}}>
                                                            {rifCode}
                                                        </Text>
                                                        <Icon name='md-arrow-dropdown' type='Ionicons' style={{color:color.secondary,right:3}} />
                                                    </MenuTrigger  >
                                                    <MenuOptions optionsContainerStyle={{width:40,borderRadius:3}}>
                                                        <MenuOption value='V'>
                                                            <Text style={{fontSize:20,fontWeight:'bold',textAlign:'center',padding:3}}>V</Text>
                                                        </MenuOption>
                                                        <MenuOption value='J'>
                                                            <Text style={{fontSize:20,fontWeight:'bold',textAlign:'center',padding:3}}>J</Text>
                                                        </MenuOption>
                                                        <MenuOption value='E'>
                                                            <Text style={{fontSize:20,fontWeight:'bold',textAlign:'center',padding:3}}>E</Text>
                                                        </MenuOption>
                                                    </MenuOptions>
                                                </Menu>
                                        }
                                    />
                                    <Field 
                                        formikProp={formikProps}
                                        type='phone'
                                        title='Nº Telefonico'
                                        iconType='FontAwesome5' 
                                        iconName='phone'
                                        keyboardType='numeric'
                                    />
                                    <FieldButton 
                                        handlePress={this.handleModal('modalMap')}
                                        text={geolocation.length===0?'':geolocation[0].address}
                                        error={errorGeolocation}
                                        messageError='Ubicación de la tienda es requerido'
                                        title='Ubicación'
                                        iconType='FontAwesome5' 
                                        iconName='map-marker-alt'
                                    />
                                    <Field
                                        formikProp={formikProps}
                                        type='captcha'
                                        title='Captcha'
                                        last
                                        Component={()=>
                                            <TouchableOpacity onPress={this._Captcha} style={styles.imgCaptcha}>
                                                {imgCaptcha ?
                                                    <Image 
                                                        source={{uri:imgCaptcha}} 
                                                        resizeMode='stretch' 
                                                        style={{height:'100%',width:'100%',borderRadius:5}} 
                                                    />
                                                    :
                                                    <Spinner style={{flex:1}} size={25} color='black' />
                                                }
                                            </TouchableOpacity>
                                        }
                                    />
                                    <Button onPress={()=>this.handleSubmit(formikProps.handleSubmit)} block full disabled={formikProps.isSubmitting}> 
                                        <Text style={styles.btnText}>Enviar</Text>
                                    </Button>
                                </Form> 
                            )}
                        </Formik>
                    </View>
                </Content>
                <ModalBottom 
                    modal={modalAvatar}
                    setAvatar={this.setAvatar}
                    handleModal={this.handleModal('modalAvatar')}
                />
                <ModalMap 
                    modal={modalMap}
                    geolocation={geolocation}
                    setGeolocation={this.setGeolocation}
                    handleModal={this.handleModal('modalMap')}
                />
            </Container>
        );
    }
};

const styles = StyleSheet.create({
    map: {
        display:'flex',
        flex:1
    },
    contentAvatar: {
        marginTop: 15,
        flex: 1,
        width: 0.4*Width, 
        height: 0.4*Width, 
        borderRadius: (0.4*Width)/2,
        borderWidth: 1,
        borderColor: color.primary,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
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
    imgCaptcha: {
        borderRadius: 10,
        height:35,
        width:140,
        marginRight:3,
        left: -9,
        backgroundColor:'#D9D5DC'
    }
});

const mapDispatchToProps = dispatch => ({
    setLoading: value => dispatch(setLoading(value)),
    setStatusSeller: value => dispatch(setStatus(value)),
    setSeller : value => dispatch(setSeller(value))
});

const mapStateToProps = state => ({
    user: state.user,
});

export default connect(mapStateToProps, mapDispatchToProps)(Sellersignup);