import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    TextInput
} from 'react-native';
import Modal from 'react-native-modal';
import { 
    Text,
    Icon, 
    Button 
} from 'native-base';
import color from '../../theme/color';
import { Width } from '../../constants';

class ModalDistance extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            distance:0,
        }
    }

    componentDidMount() {
        this.setState({distance:this.props.distance});
    };

    handleChangeDistance = (text) => {
        let distance = Number(text);
        if(distance.toString() === 'NaN') return;
        if(distance>1000) distance = 1000;
        if(distance<=0) distance = 1;
        this.setState({distance});
    };

    handleCancel = () => {
        this.setState({distance:this.props.distance});
        this.props.handleModal();
    }

    handleAccept = () => {
        const { handleModal, setDistance } = this.props;
        handleModal();
        setDistance(this.state.distance)
    }

    render() {
        return (
            <Modal animationIn='zoomIn' style={styles.modal} onBackdropPress={this.handleCancel} onBackButtonPress={this.handleCancel} isVisible={this.props.modal}>     
                <View style={styles.modalContent}>
                    <View style={styles.imageContent}>
                        <View style={styles.image}>
                            <Icon style={styles.icon} type='Ionicons' name='md-pin' />
                        </View>
                    </View>
                    <View style={{alignItems:'center',marginVertical:7}}>
                        <Text style={{fontSize:15,textAlign:'center'}}>Mostrar los resultados en un radio de distancia de:</Text>
                    </View>
                    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                        <TouchableOpacity onPress={()=>this.handleChangeDistance(this.state.distance-1)}>
                            <Icon style={{fontSize:35,paddingHorizontal:10}} type="Ionicons" name='ios-arrow-back'/>
                        </TouchableOpacity>
                        <TextInput 
                            onChangeText={this.handleChangeDistance} 
                            keyboardType='numeric' 
                            style={styles.input} 
                            value={this.state.distance.toString()}  
                        />
                        <TouchableOpacity onPress={()=>this.handleChangeDistance(this.state.distance+1)}>
                            <Icon style={{fontSize:35,paddingHorizontal:10}} type="Ionicons" name='ios-arrow-forward'/>
                        </TouchableOpacity>
                    </View>
                    <Button style={{marginTop: 15}} full onPress={this.handleAccept} >
                        <Text style={{fontSize:17,color:'black'}}>Aceptar</Text>
                    </Button>
                </View>             
            </Modal>
        )
    }
    
};

ModalDistance.proptypes = {
    modal: PropTypes.bool.isRequired,
    handleModal : PropTypes.func.isRequired,
    setDistance : PropTypes.func.isRequired,
    distance : PropTypes.number.isRequired
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
        paddingHorizontal:20
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
        color:'white',
        fontSize:25,
        backgroundColor:color.primary,
        width:50,
        height:50,
        borderRadius:25,
        textAlign:'center',
        textAlignVertical:'center'
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
    input: {
        fontSize:17,
        paddingHorizontal:10,
        textAlign:'center'
    }
});

export default ModalDistance;