import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import { 
    View,
    TouchableOpacity,
    StyleSheet 
} from 'react-native';
import { Text, Icon } from 'native-base';
import color from '../theme/color';

const HudMap = ({ editMarket, btnSecondary, withGeolocation, handleCancel, handleSuccess, handleGoOut, handleMarket, handleMyLocation }) => {
    return (
        <Fragment>
            <View style={styles.btnsTop}>
                {btnSecondary ?
                    <View>
                        <TouchableOpacity onPress={handleCancel} style={[styles.btn,{marginTop:15,backgroundColor:'#d9534f'}]}>
                            <Icon 
                                style={styles.icon} 
                                type='FontAwesome5'
                                name='times'
                            />
                        </TouchableOpacity>
                        {withGeolocation &&
                            <TouchableOpacity onPress={handleSuccess} style={[styles.btn,{backgroundColor:'#5cb85c',marginTop:15}]}>
                                <Icon style={[styles.icon,{color:'white'}]} type='FontAwesome' name='check'  />
                            </TouchableOpacity>
                        } 
                    </View>
                    :
                    <View>
                        <TouchableOpacity onPress={handleGoOut} style={[styles.btn,{marginTop:15,backgroundColor:withGeolocation?'#5cb85c':'#d9534f'}]}>
                            <Icon 
                                style={styles.icon} 
                                type={withGeolocation?'FontAwesome':'FontAwesome5'} 
                                name={withGeolocation?'check':'times'}   
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.btn,{ marginTop:15,backgroundColor:color.primary}]} onPress={handleMarket}>
                            <Icon style={styles.icon} type='MaterialIcons' name={withGeolocation?'edit-location':'add-location'}  />
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.btn,{ marginTop:15,backgroundColor:color.primary}]} onPress={handleMyLocation}>
                            <Icon style={styles.icon} type='MaterialIcons' name='my-location'  />
                        </TouchableOpacity>
                    </View>
                }
            </View>
            {editMarket &&
                <View style={styles.message}>
                    <Text style={{flex:1,textAlign:'center',fontSize:15,color:color.primary}}>
                        {withGeolocation?'Mantenga pulsado el marcador para arrastrarlo por el mapa':'Toque el mapa para añadir un marcador'}
                    </Text>
                </View>
            }
        </Fragment>
    );
};

HudMap.proptypes = {
    handleCancel : PropTypes.func.isRequired,
    handleSuccess : PropTypes.func.isRequired,
    handleMarket: PropTypes.func.isRequired,
    handleMyLocation: PropTypes.func.isRequired,
    handleGoOut: PropTypes.func.isRequired,
    withGeolocation: PropTypes.bool.isRequired,
    btnSecondary: PropTypes.bool.isRequired,
    editMarket: PropTypes.bool.isRequired
};

const styles = StyleSheet.create({
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
});

export default HudMap;