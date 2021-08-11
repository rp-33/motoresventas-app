import React from 'react';
import Proptypes from 'prop-types';
import {
    View,
    Text, 
    StyleSheet
} from 'react-native';
import {
    Icon
} from 'native-base';

const Sectiontitle = ({ title, iconType, iconName, first }) => (
    <View style={first ? [styles.content,styles.first] : styles.content}>                      
        <View style={{marginRight: 10}}>
            <Icon type={iconType} name={iconName} />
        </View>                    
        <Text style={styles.title}>{title}</Text>
    </View>
);

Sectiontitle.proptypes = {
    title : Proptypes.string.isRequired,
    iconType : Proptypes.string.isRequired,
    iconName : Proptypes.string.isRequired,
    first : Proptypes.bool,
};

const styles = StyleSheet.create({
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 15,
        marginTop: 5,
        marginBottom: 5
    },
    first: {
        marginTop: 10
    },
    title: {
        fontSize:16,
    }
});

export default Sectiontitle;