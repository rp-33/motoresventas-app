import React from 'react';
import Proptypes from 'prop-types';
import { 
    StyleSheet,
    View,
    TouchableOpacity,
    PixelRatio
} from 'react-native';
import { Text, Icon } from 'native-base';
import color from '../theme/color';

export const TouchOption = ({ children, subtitle, icon, handlePress=null, style, disable=false }) => (
    <TouchableOpacity disabled={disable} style={[styles.touchOption,{...style}]} onPress={handlePress}>
        {icon ? 
            <View style={{flex:2,flexDirection:'row',alignItems:'center'}}>
                <Icon style={[styles.icon,{ fontSize: icon.size ? icon.size : 23 }]} type={icon.type} name={icon.name} />
                <Text style={styles.text}>{subtitle}</Text>
            </View>
            :
            <Text style={styles.text}>{subtitle}</Text>
        }
        { children }
    </TouchableOpacity>
);

TouchOption.proptypes = {
    subtitle: Proptypes.string.isRequired,
    handlePress: Proptypes.func,
    icon: Proptypes.object,
    style: Proptypes.object,
    disable: Proptypes.bool
};

const CardSettings = ({ title, children }) => (
    <View style={styles.content}>
        <Text style={{fontWeight:'bold'}}>{title}</Text>
        { children }
    </View>
);

CardSettings.proptypes = {
    title: Proptypes.string.isRequired,
};

const styles = StyleSheet.create({
    content: {
        marginVertical:7,
        alignItems:'center',
        paddingVertical:10,
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 3,
        borderTopWidth: 1/PixelRatio.getPixelSizeForLayoutSize(1),
		borderBottomWidth: 1/PixelRatio.getPixelSizeForLayoutSize(1),
		borderColor:'white'
    },
    touchOption: {
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingHorizontal:10,
        paddingVertical:5,
    },
    icon:{
        color:color.primary,
        marginRight:5,
        fontSize:23
    },
    text: {
        flex:1,
        color:'gray',
    }
});

export default CardSettings;