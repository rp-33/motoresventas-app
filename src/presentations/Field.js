import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text, 
    StyleSheet
} from 'react-native';
import {
    Label,
    Input,
    Item,
    Icon
} from 'native-base';

const Field = ({ type, title, iconType, iconName, iconSize, secureTextEntry, formikProp, last, Component, keyboardType, multiline }) => {
    const { handleChange, handleBlur, values, errors, touched } = formikProp;
    return (
        <View style={last ? [styles.contentInput, styles.lastInput]:styles.contentInput}>
            <View style={styles.label}>                           
                <Label>{errors[type] && touched[type] ? <Text style={styles.error}>{errors[type]}</Text>: title}</Label>
            </View>
            <Item regular last error={errors[type] && touched[type]}>
                {Component?
                    <Component />
                    :
                    <View style={{justifyContent:'flex-end',paddingBottom:11,alignSelf:'stretch'}}>
                        <Icon style={[styles.icon,{color:(errors[type] && touched[type])?'#ed2f2f':'black',fontSize:iconSize}]} type={iconType} name={iconName} />
                    </View>
                }
                <Input 
                    multiline={multiline}
                    onChangeText={handleChange(type)}
                    onBlur={handleBlur(type)}
                    value={values[type]}
                    secureTextEntry={secureTextEntry}
                    keyboardType={keyboardType}
                    autoCapitalize='none'
                />                    
            </Item>
        </View>
    )
};

Field.defaultProps = {
    iconSize: 21,
    multiline: false
}

Field.proptypes = {
    type: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    iconType: PropTypes.string,
    iconName: PropTypes.string,
    formikProp: PropTypes.object.isRequired,
    secureTextEntry: PropTypes.bool,
    keyboardType: PropTypes.string,
    last: PropTypes.bool,
    iconSize: PropTypes.number,
    multiline: PropTypes.bool
};

const styles = StyleSheet.create({
    contentInput: {
        flex: 1,
        marginBottom: 5,
        
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
        marginRight:-3,
    }
});

export default Field;