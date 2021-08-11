import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import { 
    Spinner, 
    Text, 
    Icon 
} from 'native-base';
import MapView, { Marker, Callout } from 'react-native-maps';
import Modal from 'react-native-modal';
import color from '../theme/color';
import { Width } from '../constants';
import { myLocation } from '../utils/myLocation';
import { reverseLocation } from '../utils/reverseLocation';

class ModalLocation extends Component {
    constructor(props) {
        super(props);
        this.myLocation = myLocation();
        this.reverseLocation = reverseLocation();
        this.state = {
            calloutIsRendered:false,
            viewBusiness: true,
            loadingMap:true,
            userMarker:null,
            businessMarker:null
        }
    }

    componentDidMount(){
        if(!this.props.location) return;
        this.handleLocation(this.props.location);
    };

    componentWillUnmount(){
        this.myLocation.cancel();
        this.reverseLocation.cancel();
    };
    
    componentDidUpdate(previosProps, previosState){
        if(!this.props.location) return;
        if(previosProps.location&&this.props.location[0]===previosProps.location[0]&&this.props.location[1]===previosProps.location[1]) 
            return;
        
        this.handleLocation(this.props.location);
   };

    handleLocation = async (location) => {
        this.setState({ loadingMap: true });
        let { userLocation = null } = this.props;
        if(!userLocation) {
            let response = await this.myLocation.get();
            if(!response) return;

            let { success, data } = response;
            if(!success) return this.handleGoOut();
            userLocation = {...data};
        }
        const { longitude, latitude } = userLocation;
        const geoUser = await this.reverseLocation.get(longitude, latitude);
        if(!geoUser) return;

        const {street: userStreet = '', adminArea5: userAdminArea5, adminArea3: userAdminArea3 } = geoUser.data;
        const userAddress = userStreet === '' ? 'Dirección no encontrada' : `${userStreet}, ${userAdminArea5}, ${userAdminArea3}`;

        const geoBusiness = await this.reverseLocation.get(location[0], location[1]);
        if(!geoBusiness) return;

        const {street: businessStreet = '', adminArea5: businessAdminArea5, adminArea3: businessAdminArea3 } = geoBusiness.data;
        const businessAddress = businessStreet === '' ? 'Dirección no encontrada' : `${businessStreet}, ${businessAdminArea5}, ${businessAdminArea3}`;
            
        const userMarker ={
            longitude,
            latitude,
            address: userAddress
        }
        const businessMarker ={
            longitude: location[0],
            latitude: location[1],
            address: businessAddress
        }
        this.setState({ userMarker, businessMarker, loadingMap: false }) 
    };

    renderCallout = () => {
        if (this.state.calloutIsRendered === true) return;
        this.setState ({calloutIsRendered: true},()=>{
            if(this.state.viewBusiness)  this.marker1.showCallout();
            else  this.marker2.showCallout();
        });
    };

    handleGoOut = () => {
        this.setState({calloutIsRendered:false,viewBusiness:true})
        this.props.handleModal();
    };

    changeView = () => {
        this.setState(previosState=>({
            viewBusiness : !previosState.viewBusiness,
            calloutIsRendered:false
        }))
    };

    render() {
        const { modal, handleModal } = this.props;
        const { loadingMap, businessMarker, userMarker } = this.state;

        return (
            <Modal isVisible={modal} style={styles.content} onBackdropPress={handleModal} onBackButtonPress ={handleModal}>
                {modal &&
                    <View style={{flex:1, backgroundColor:'#f8f9fa'}}>
                        {loadingMap ?
                            <Spinner style={{flex:1}} size={40} color={color.primary} />
                            :
                            <View style={{flex:1}}>
                                <MapView
                                    onRegionChangeComplete={this.renderCallout}
                                    style = {styles.map}
                                    region={{
                                        latitude: this.state.viewBusiness?businessMarker.latitude:userMarker.latitude,
                                        longitude:  this.state.viewBusiness?businessMarker.longitude:userMarker.longitude,
                                        latitudeDelta: 0.007,
                                        longitudeDelta: 0.007
                                    }}
                                >
                                    <Marker
                                        ref = {marker1 => (this.marker1 = marker1)}
                                        pinColor={color.primary}
                                        coordinate={{
                                            latitude:businessMarker.latitude,
                                            longitude:businessMarker.longitude
                                        }}
                                    >  
                                        <Callout>
                                            <Text style={{fontWeight:'bold',textAlign:'center'}}>Tienda</Text>
                                            <Text style={styles.textAddress}>{businessMarker.address}</Text>
                                        </Callout>
                                    </Marker>
                                    <Marker
                                        ref = {marker2 => (this.marker2 = marker2)}
                                        pinColor='tomato'
                                        coordinate={{
                                            latitude:userMarker.latitude,
                                            longitude:userMarker.longitude
                                        }}
                                    >  
                                        <Callout>
                                            <Text style={{fontWeight:'bold',textAlign:'center'}}>Tú</Text>
                                            <Text style={styles.textAddress}>{userMarker.address}</Text>
                                        </Callout>
                                    </Marker>
                                </MapView>
                            </View>
                        }
                        <View style={styles.contentBtn}>
                            <TouchableOpacity style={styles.btn} onPress={this.handleGoOut}>
                                <Icon 
                                    style={{fontSize:30,color:'white'}} 
                                    type='FontAwesome5'
                                    name='times'  
                                />
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.btn,{backgroundColor:'black'}]} onPress={this.changeView}>
                                <Icon 
                                    style={{fontSize:35,color:this.state.viewBusiness?'#d9534f':color.primary}} 
                                    type='MaterialIcons'
                                    name='location-on'  
                                />
                            </TouchableOpacity>
                            <Text style={styles.btnText}>{this.state.viewBusiness?'Tú':'Tienda'}</Text>
                        </View>
                    </View>
                }
            </Modal>
        )
    }
};

ModalLocation.proptypes = {
    modal: PropTypes.bool.isRequired,
    handleModal : PropTypes.func.isRequired,
    location: PropTypes.array.isRequired,
    userLocation: PropTypes.object
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
    contentBtn: {
        position: 'absolute', 
        right: 10, 
        top: 0,
        alignItems:'center',
    },
    btn: {
        width: 50,
        height:50,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop:15,
        backgroundColor:'#d9534f'
    },
    btnText: {
        fontSize:13,
        fontWeight:'bold',
        textAlign:'center'
    }
});

export default ModalLocation;