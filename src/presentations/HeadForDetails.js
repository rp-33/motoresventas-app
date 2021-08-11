import React, { Fragment } from 'react';
import {
    TouchableOpacity,
    Platform,
    View
} from 'react-native';
import {
    Text,
    Header,
    Body,
    Left,
    Right,
    Icon
} from 'native-base';
import PropTypes from 'prop-types';
import color from '../theme/color';
import { firstLetterCapitalize } from '../utils/firstLetterCapitalize';
import { COIN } from '../constants';

const HeadForDetails = ({ handleBack, price, name, rating })=>(
	<Header noShadow style={{backgroundColor:'white',borderBottomColor:color.secondary,borderBottomWidth:1}} iosBarStyle='dark-content' androidStatusBarColor='white'>
        <Left style={Platform.OS === 'android' ? {flex:1,left:-5} : null}>
            <TouchableOpacity style={{paddingHorizontal:5}} onPress={handleBack}>
                <Icon style={{fontSize:35}} type='Ionicons' name="ios-arrow-back"/>
            </TouchableOpacity>
        </Left>
        <Body style={Platform.OS==='android'?{flex:5,alignItems:'center',right:rating>0?10:0}:null}>
            {price === '' ?
                <Text style = {{color:color.primary,fontWeight:'bold',fontSize:17}}>{name}</Text>
                :
                <Fragment>
                    <Text numberOfLines={1} style={{fontSize:17,lineHeight:19}}>{firstLetterCapitalize(name)}</Text>
                    <Text numberOfLines={1} style={{fontSize:17,lineHeight:19,color:color.primary,fontWeight:'bold'}}>{`${COIN} ${price}`}</Text>
                </Fragment>
            }
        </Body>
        <Right style={Platform.OS==='android'?{flex:1}:null}>
            {price!=='' && rating>0 && 
                <View style={{width:'100%',flexDirection:'row',justifyContent:'center',alignItems:'center',borderRadius:20}}> 
                    <Icon name="ios-star" type='Ionicons' style={{color:color.primary,fontSize:30}} />   
                    <Text style={{color:'black',marginLeft:3,fontSize:25,alignSelf:'center',fontWeight:'900'}}>{rating}</Text>
                </View>
            } 
        </Right>
    </Header>
);

HeadForDetails.proptypes = {
    handleBack:PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number,
    rating :PropTypes.number
};

export default HeadForDetails;