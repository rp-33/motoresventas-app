import React from 'react';
import PropTypes from 'prop-types';
import {
    View,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import {
    Label,
    Input,
    Item,
    Icon,
    Text
} from 'native-base';

const FieldButton = ({ handlePress, text, title, iconType, iconName, iconSize=21, error, messageError, last }) => (
    <View style={last ? [styles.contentInput, styles.lastInput]:styles.contentInput}>
        <View style={styles.label}>                                        
            <Label>{error ? <Text style={styles.error}>{messageError}</Text>: title}</Label>
        </View>
        <Item regular last error={error} >
            <View style={{justifyContent:'flex-end',paddingBottom:12,alignSelf:'stretch'}}>
                <Icon style={[styles.icon,{color:error?'#ed2f2f':'black',fontSize:iconSize}]} type={iconType} name={iconName} />
            </View>
            <TouchableOpacity style={{flex:1}} onPress={handlePress}>
                <Input 
                    disabled
                    multiline
                    value={text}
                />
            </TouchableOpacity>     
        </Item>
    </View>
);

FieldButton.proptypes = {
    handlePress: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    iconType: PropTypes.string.isRequired,
    iconName: PropTypes.string.isRequired,
    error: PropTypes.bool.isRequired,
    messageError: PropTypes.string,
    text: PropTypes.string,
    last: PropTypes.bool,
    iconSize: PropTypes.number
};

const styles = StyleSheet.create({
    contentInput: {
        flex: 1,
        marginBottom: 5
    },
    lastInput: {
        marginBottom: 25,
    },
    label: {
        marginTop: 5,
        marginBottom: 5
    },
    error: {
        fontStyle: 'italic',
        color: '#ed2f2f',
        fontSize: 15,
        marginTop: 3,
        marginLeft: 15,
    },
    icon: {
        fontSize:21,
        left:-10,
        marginRight:-3
    }
});

export default FieldButton;