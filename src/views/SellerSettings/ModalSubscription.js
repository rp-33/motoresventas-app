import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal';
import color from '../../theme/color';
import { StyleSheet, View } from 'react-native';
import { Width, COIN } from '../../constants';
import { subscriptions, BASICO, PREMIUN } from '../../constants/subscriptions';
import { 
    Text,
    Icon, 
    Button,
    Picker
} from 'native-base';

class ModalSubscription extends Component {

    state = {
        choose: { 
            value: '' 
        }
    }

    componentDidMount() {
        const choose = this.props.currentType===PREMIUN.value ? PREMIUN : BASICO;
        this.setState({ choose }); 
    }

    handleSubscription = () => { 
        this.props.handleModal(); 
        this.props.setSubscription(this.state.choose);
    };
    
    render() {
        const { modal, handleModal } = this.props;
        const { choose } = this.state;
        const option = subscriptions[choose.value];
        
        return (
            <Modal animationIn='zoomIn' style={styles.modal} onBackdropPress={handleModal} onBackButtonPress={handleModal} isVisible={modal}>     
                <View style={styles.modalContent}>
                    <View style={styles.imageContent}>
                        <View style={styles.image}>
                            <Icon style={styles.icon} type='FontAwesome5' name='user-clock' />
                        </View>
                    </View>
                    <View style={{alignItems:'center',marginVertical:7}}>
                        <Text style={{fontSize:15,textAlign:'center'}}>¿Quieres adquirir o renovar tu suscripción?</Text>
                    </View>
                    <View  style={{backgroundColor:'rgb(235,232,227)',borderRadius:3,marginBottom:10}}>
                        <Picker
                            mode="dropdown"
                            selectedValue={choose}
                            onValueChange={(choose, index) =>
                                this.setState({ choose })
                            }
                        >
                            <Picker.Item label={BASICO.label} value={BASICO} />
                            <Picker.Item label={PREMIUN.label} value={PREMIUN} />
                        </Picker>
                    </View>
                    { option &&
                        <View>
                            <Text style={styles.subtitle}>{option.duration[0]}</Text>
                            <Text style={styles.price}>
                                {`${COIN} ${option.price}`}
                                <Text style={{color:'rgb(51,51,51)'}}>/{option.duration[1]}</Text>
                            </Text>
                            <View style={{marginTop:-10}}>
                                { option.benefits.map((benefit, index)=>
                                    <View key={index} style={styles.benefit}>
                                        <Icon style={{color:color.primary,fontSize:20}} name='check-circle' type='FontAwesome' />
                                        <Text style={{marginLeft:5}}>{benefit}</Text>
                                    </View>
                                )}
                            </View>
                        </View>
                    }
                    <Button style={{marginTop: 15}} full onPress={this.handleSubscription}>
                        <Text style={{fontSize:17,color:'black'}}>Adquirir</Text>
                    </Button>   
                </View>             
            </Modal>
        )
    }
};

ModalSubscription.proptypes = {
    modal: PropTypes.bool.isRequired,
    handleModal: PropTypes.func.isRequired,
    currentType: PropTypes.string.isRequired, 
    setSubscription: PropTypes.func.isRequired
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
        color: 'white',
        fontSize:25,
        backgroundColor: color.primary,
        width: 50,
        height: 50,
        borderRadius: 25,
        textAlign: 'center',
        textAlignVertical: 'center'
    },
    subtitle: {
        textTransform: 'capitalize',
        fontSize: 20,
        textAlign: 'center',
        lineHeight:20
    },
    price: {
        fontSize: 30,
        lineHeight: 30,
        textAlign: 'center',
        color: 'green',
        marginVertical: 10,
    },
    benefit: {
        flexDirection:'row',
        marginTop:5,
        justifyContent:'center',
        alignItems:'center'
    }
});

export default ModalSubscription;