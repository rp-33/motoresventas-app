import React from 'react';
import {
    View,
    StyleSheet,
    Image,
    TouchableOpacity,
    PixelRatio
} from 'react-native';
import { Text, Icon } from 'native-base';
import PropTypes from 'prop-types';
import color from '../theme/color';
import { getKm } from '../utils/getKm';
import { firstLetterCapitalize } from '../utils/firstLetterCapitalize';
import { COIN } from '../constants';

const Product =({ item, handleDetails, favorite, handleAddToCart, handleRemoveToCart, userLocation }) => {
    const { longitude: lon1 = null, latitude: lat1 = null } = {...userLocation};
    const [ lon2 = null, lat2 = null ] = item.location ? item.location.coordinates : [];
    const distance = (lon1 && lat1 && lon2 && lat2) ? getKm(lon1, lat1, lon2, lat2) : null;
    return(
        <View style={styles.content}>
            <View style={{flexDirection:'row'}} >
                <TouchableOpacity style={styles.contentImg} onPress={handleDetails}>
                    <Image style={styles.img} source={{uri:item.images[0]}} />
                </TouchableOpacity>
                <View style={styles.contentDetail}>
                    <View style={{flex:1,alignSelf:'flex-start'}}>
                        <Text numberOfLines={1} style={{fontWeight:'bold',fontSize:17,lineHeight:17}}>{firstLetterCapitalize(item.name)}</Text>
                        <Text style={{fontSize:13,color:'rgb(51,51,51)',lineHeight:17,textTransform:'uppercase'}}>SN: {item.serial}</Text>
                        <View style={{flexDirection:'row'}}>
                            <Text numberOfLines={1} style={{fontSize:17,lineHeight:19,marginTop:4,color:'green'}}>
                                {`${COIN} ${item.price}`} 
                            </Text>
                            {item.rating>0 && distance &&
                                <View style={{flexDirection:'row',marginLeft:5}}>
                                    <Icon name="ios-star" type='Ionicons' style={styles.iconStart} />
                                    <Text style={{fontSize:17,lineHeight:20,marginTop:4}}>{` ${item.rating}`}</Text>
                                </View>
                            }
                        </View>
                        {distance ?
                            <View style={{flexDirection:'row'}}>
                                <Icon style={{fontSize:15,color:'rgb(51,51,51)'}} type="Ionicons" name='md-pin' />
                                <Text style={{fontSize:13,marginLeft:4,color:'rgb(51,51,51)'}}>{`A ${distance} `}</Text>
                            </View>
                            :
                           <View>
                                {item.rating>0 &&
                                    <View style={{flexDirection:'row'}}>
                                        <Icon name="ios-star" type='Ionicons' style={[styles.iconStart,{marginLeft:0,top:0}]} />
                                        <Text style={{fontSize:17,lineHeight:20,marginTop:2}}>{` ${item.rating}`}</Text>
                                    </View>
                                }
                           </View>
                        }
                    </View>
                    <View>
                        { favorite ?
                            <TouchableOpacity onPress={handleRemoveToCart}>
                                <Icon type='MaterialIcons' name='favorite' style={styles.iconFav}  />
                            </TouchableOpacity> 
                            :
                            <TouchableOpacity onPress={handleAddToCart}>
                                <Icon type='MaterialIcons' name='favorite-border' style={styles.iconFav}  />
                            </TouchableOpacity> 
                        }
                    </View>
                </View>
            </View>
        </View>
    )
};

Product.proptypes = {
    item: PropTypes.object.isRequired,
    handleDetails: PropTypes.func.isRequired,
    handleAddToCart: PropTypes.func.isRequired,
    handleDeleteToCart: PropTypes.func.isRequired,
    userLocation: PropTypes.object,
    favorite: PropTypes.bool.isRequired
};

const styles = StyleSheet.create({
	content:{
        marginTop:10,
        paddingVertical:10,
		backgroundColor: 'white',
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.5,
		shadowRadius: 3.84,
		elevation: 5,
		borderWidth:1/PixelRatio.getPixelSizeForLayoutSize(1),
        borderColor:color.secondary,
        marginBottom:1/PixelRatio.getPixelSizeForLayoutSize(1),		
	},
	contentImg:{
        width:80,
        height:80,
        marginLeft:10,
        justifyContent:'center',
        alignItems:'center'
	},
	img:{
		width:'100%',
        height:'100%',
        borderRadius:3
	},
	contentDetail:{
        flex:1,
        paddingHorizontal:10,
        flexDirection:'row',
        alignItems:'flex-start',
    },
    iconFav:{
        bottom:3,
        color:color.primary,
        fontSize:25,
        lineHeight:25,
    },
    iconStart:{
        color:color.primary,
        marginLeft:2,
        fontSize:20,
        top:1
    },
});

export default Product;