import React from 'react';
import Proptypes from 'prop-types';
import {
    View,
    TouchableOpacity,
    StyleSheet,
    Image,
    Dimensions,
    PixelRatio
} from 'react-native';
import { Text, Icon } from 'native-base';
import { markIcon } from '../../utils/markIcon';
import color from '../../theme/color';

let { width } = Dimensions.get('window');
let	SCREEN_WIDTH = (width - 80)/3;

const Option = ({option, handleSelect, optionActive, image}) => {
    return (
        <TouchableOpacity onPress={handleSelect}>
            {image ?
                <View style={optionActive===option?[styles.card,{backgroundColor:color.primary}]:styles.card}>
                    <Image
                        style={styles.image}
                        source={markIcon(option)}
                    />
                </View>
                :
                <View style={styles.content}>
                    <Text style={styles.text}>{option.toUpperCase()}</Text>
                    {optionActive===option ?
                        <Icon style={[styles.icon,{color:'#5cb85c'}]} type='MaterialCommunityIcons' name='check-circle-outline' />
                        :
                        <Icon style={styles.icon} type='MaterialCommunityIcons' name='checkbox-blank-circle-outline' />
                    }
                </View>
            }
        </TouchableOpacity>
    );
};

Option.proptypes = {
    option: Proptypes.string.isRequired,
    optionActive: Proptypes.string.isRequired,
    handleSelect: Proptypes.func.isRequired,
    image: Proptypes.bool
};

const styles = StyleSheet.create({
    card:{
        backgroundColor:'rgb(232,232,232)',
        width : SCREEN_WIDTH,
        height: SCREEN_WIDTH,
        justifyContent:'center',
        alignItems:'center',
        marginVertical: 10,
        marginHorizontal: 10,
		borderWidth:1/PixelRatio.getPixelSizeForLayoutSize(1),
        borderColor:'rgb(232,232,232)',
        borderRadius:15,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.1,
		shadowRadius: 15,
        elevation: 3,
    },
    image: {
        width:'80%',
        height:'80%'
    },
    content: {
        paddingVertical:5,
        paddingHorizontal:20,
        flexDirection:'row',
        alignItems:'center',
    },
    text: {
        flex:1,
        fontWeight:'bold',
        fontSize:20,
        textAlign:'left',
    },
    icon: {
        fontSize:40,
        textAlign:'right',
    }
});

export default Option;