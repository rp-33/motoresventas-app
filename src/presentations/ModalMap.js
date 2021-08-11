import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import { Spinner, Icon, Text } from 'native-base';
import MapView, { Marker, Callout } from 'react-native-maps';
import Modal from 'react-native-modal';
import color from '../theme/color';
import { Width } from '../constants';
import { myLocation } from '../utils/myLocation';
import { reverseLocation } from '../utils/reverseLocation';

class ModalMap extends Component {
    constructor(props) {
        super(props);
        this.myLocation = myLocation();
        this.reverseLocation = reverseLocation();
        this.state = {
            loading: true,
            editMarket: false,
            btnSecondary: false,
            calloutIsRendered:false,
            region: {},
            marketOld: null
        }
    }

    async componentDidMount () {
        if(this.props.geolocation.length===0) {
            let coord = await this.getPosition();
            if(!coord) return;

            const { longitude, latitude } = coord;
            const region = {
                longitude,
                latitude,
                longitudeDelta: 1,
                latitudeDelta: 1  
            }
            this.setState({ region, loading: false });
        } else {
            const { longitude, latitude, address } = this.props.geolocation[0];
            if(Boolean(address)) return;
            this.getGeolocation(longitude, latitude);
        }
    };

    componentWillUnmount(){
        this.myLocation.cancel();
        this.reverseLocation.cancel();
    };

    getGeolocation = async (longitude, latitude) => {
        let geo = await this.reverseLocation.get(longitude, latitude);
        if(!geo) return;

        const { street = '', adminArea5, adminArea3 } = geo.data;
        const newAddress = street === '' ? 'Dirección no valida' : `${street}, ${adminArea5}, ${adminArea3}`;
        
        this.props.setGeolocation({ longitude, latitude, address: newAddress })
        this.setState({ 
            loading: false, 
            region: { longitude, latitude, longitudeDelta: 0.007, latitudeDelta: 0.007 } 
        });
    };

    getPosition = async () => {
        const response = await this.myLocation.get();
        if(!response) return null;

        let { success, data } = response;
        if(!success) return {
            longitude: -66.902,
            latitude: 10.491
        }
        return data;
    };

    // editar y colocar point

    handleMarket = () => this.setState({ editMarket: true, btnSecondary: true });

    handleTapMarket = (e) => {
        const { longitude, latitude } = e.nativeEvent.coordinate;
        if(!this.state.editMarket || this.props.geolocation.length > 0) return
        this.props.setGeolocation({ longitude, latitude, address: '' });
    };

    handleEndDragMarket = (e) => {
        const { longitude, latitude } = e.nativeEvent.coordinate;
        const marketOld = this.props.geolocation[0];
        this.props.setGeolocation({ longitude, latitude, address: '' });
        if(marketOld.address !== '') this.setState({ marketOld });
    };

    // localizacion rapida

    handleMyLocation = async () => {
        let { address } = {...this.props.geolocation[0]};
        const marketOld = Boolean(address) ? this.props.geolocation[0] : null;
        this.setState({ loading: true, calloutIsRendered: false, btnSecondary: true, marketOld })
        let coord = await this.getPosition();
        if(!coord) return;

        const { longitude, latitude } = coord;
        this.getGeolocation(longitude, latitude);
    };

    // salir del mapa

    handleGoOut = () => {
        if(this.props.geolocation.length===0) this.props.setGeolocation();
        this.setState({ calloutIsRendered: false, btnSecondary: false, })
        this.props.handleModal();
    };

    // acaptar o cancelar point

    handleSuccess = () => {
        let { address } = {...this.props.geolocation[0]};
        if(!Boolean(address) && this.props.geolocation.length>0) {
            this.setState({ loading: true, calloutIsRendered: false })
            const { longitude, latitude } = this.props.geolocation[0];
            this.getGeolocation(longitude, latitude);
            this.setState({
                editMarket: false,
                btnSecondary: false
            })
        } else {
            this.handleGoOut();
        } 
    };

    handleCancel = () => {
        if(!this.state.marketOld){
            this.props.setGeolocation(null);
            this.setState(prevState => {
                let region = {...prevState.region, latitudeDelta: 1, longitudeDelta: 1 };
                return {...prevState, region, editMarket: false, btnSecondary: false }
            })
        } else {
            this.props.setGeolocation(this.state.marketOld);
            this.setState(prevState => {
                let { longitude, latitude } = prevState.marketOld;
                let region = {...prevState.region, longitude, latitude };
                return {...prevState, region, calloutIsRendered: false, editMarket: false, btnSecondary: false }
            })
        }
    };

    // mostrar o ocultar direccion

    showCallout = () => {
        if (this.state.calloutIsRendered === true) return;
        this.setState ({ calloutIsRendered: true });
        this.marker.showCallout ();
    };

    hideCallout = () => {
        if(this.marker) this.marker.hideCallout();
    }

    // region

    regionChange = (region) => {
        
        this.setState({ region });
        const { address } = {...this.props.geolocation[0]};
        if(Boolean(address)){
            if(this.marker) this.showCallout()
        };
       
    }

    render() {
        const { modal, handleModal, geolocation } = this.props;
        const { loading, editMarket, btnSecondary, region } = this.state; 
        return (
            <Modal isVisible={modal} style={styles.content} onBackdropPress={handleModal} onBackButtonPress ={handleModal}>
                <View style={{flex:1, backgroundColor:'#f8f9fa'}}>
                    {loading ?
                        <Spinner style={{flex:1}} size={40} color={color.primary} />
                        :
                        <View style={{flex:1}}>
                            <MapView
                                onRegionChangeComplete={this.regionChange}
                                style={styles.map}
                                region={region}
                                onPress={this.handleTapMarket}
                            >
                                {geolocation.length > 0 && 
                                    <Marker
                                        ref = {marker => (this.marker = marker)}
                                        pinColor={color.primary}
                                        draggable={editMarket}
                                        coordinate={{
                                            longitude:geolocation[0].longitude,
                                            latitude:geolocation[0].latitude,
                                        }}
                                        onDragStart={this.hideCallout}
                                        onDragEnd={this.handleEndDragMarket}
                                    >
                                        <Callout tooltip={editMarket}>
                                            {!editMarket && <Text style={styles.textAddress}>{geolocation[0].address}</Text>}
                                        </Callout>
                                    </Marker>
                                }
                            </MapView>
                        </View>
                    }
                    {!loading &&
                        <Fragment>
                            <View style={styles.btnsTop}>
                                {btnSecondary ?
                                    <View>
                                        <TouchableOpacity 
                                            onPress={this.handleCancel} 
                                            style={[styles.btn,{marginTop:15,backgroundColor:'#d9534f'}]}
                                        >
                                            <Icon 
                                                style={styles.icon} 
                                                type='FontAwesome5'
                                                name='times'
                                            />
                                        </TouchableOpacity>
                                        {geolocation.length > 0 &&
                                            <TouchableOpacity 
                                                onPress={this.handleSuccess} 
                                                style={[styles.btn,{backgroundColor:'#5cb85c',marginTop:15}]}
                                            >
                                                <Icon 
                                                    style={[styles.icon,{color:'white'}]} 
                                                    type='FontAwesome' 
                                                    name='check'  
                                                />
                                            </TouchableOpacity>
                                        } 
                                    </View>
                                    :
                                    <View>
                                        <TouchableOpacity 
                                            onPress={this.handleGoOut} 
                                            style={[styles.btn,{marginTop:15,backgroundColor:geolocation.length > 0 ? '#5cb85c' : '#d9534f'}]}
                                        >
                                            <Icon 
                                                style={styles.icon} 
                                                type={geolocation.length > 0 ? 'FontAwesome' : 'FontAwesome5'} 
                                                name={geolocation.length > 0 ?'check' : 'times'}   
                                            />
                                        </TouchableOpacity>
                                        <TouchableOpacity 
                                            style={[styles.btn,{ marginTop:15,backgroundColor:color.primary}]} 
                                            onPress={this.handleMarket}
                                        >
                                            <Icon 
                                                style={styles.icon} 
                                                type='MaterialIcons' 
                                                name={geolocation.length > 0 ? 'edit-location' : 'add-location'}  
                                            />
                                        </TouchableOpacity>
                                        <TouchableOpacity 
                                            style={[styles.btn,{marginTop:15,backgroundColor:color.primary}]} 
                                            onPress={this.handleMyLocation}
                                        >
                                            <Icon 
                                                style={styles.icon} 
                                                type='MaterialIcons' 
                                                name='my-location'  
                                            />
                                        </TouchableOpacity>
                                    </View>
                                }
                            </View>
                            {editMarket &&
                                <View style={styles.message}>
                                    <Text 
                                        style={{flex:1,textAlign:'center',fontSize:15,color:color.primary}}
                                    >
                                        {geolocation.length > 0 ?
                                            'Mantenga pulsado el marcador para arrastrarlo por el mapa'
                                            :
                                            'Toque el mapa para añadir un marcador'
                                        }
                                    </Text>
                                </View>
                            }
                        </Fragment>
                    }
                </View>
            </Modal>
        )
    }
};

ModalMap.proptypes = {
    modal: PropTypes.bool.isRequired,
    handleModal : PropTypes.func.isRequired,
    geolocation: PropTypes.array.isRequired,
    setGeolocation : PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
    content: {
        margin: 0,
        flex:1,
    },
    map: {
        display:'flex',
        flex:1,
    },
    textAddress: {
        width:Width/2,
        textAlign:'center',
        fontSize:15
    },
    btnsTop: {
        position: 'absolute', 
        right: 10, 
        top: 0,
    },
    btn: {
        width:50, 
        height:50,  
        borderRadius:25,  
        alignItems: 'center',
        justifyContent: 'center',
    },
    message: {
        paddingVertical:15,
        paddingHorizontal:5,
        backgroundColor: 'white',
        width:'100%',
        position: 'absolute', 
        bottom:0,
        alignSelf:'center',
    },
    icon: {
        fontSize:30,
        color:'white'
    }
})

export default ModalMap;