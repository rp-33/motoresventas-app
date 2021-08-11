import React from 'react';
import { StyleSheet } from 'react-native';
import {
    Header as Content,
    Left,
    Right,
    Body,
} from 'native-base';
import PropTypes from 'prop-types';
import color from '../theme/color';

const Header = ({ renderLeft, renderCenter, renderRight }) => (
	<Content noShadow style={styles.content} iosBarStyle='dark-content' androidStatusBarColor='white'>
        <Left style={styles.left}>{renderLeft}</Left>
        <Body style={styles.center}>{renderCenter}</Body>
        <Right style={styles.right}>{renderRight}</Right>
    </Content>
);

Header.proptypes = {
    renderLeft : PropTypes.node,
    renderCenter : PropTypes.node,
    renderRight : PropTypes.node,
};

const styles = StyleSheet.create({
    content: {
        borderBottomWidth: 0,
        backgroundColor: 'white',
        flexDirection:'row'
    },
    left: {
        flex:1
    },
    center: {
        flex:2,
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
        borderBottomColor:color.primary,
        borderBottomWidth:2,
        height:'100%'
    },
    right: {
        flex:1
    },
});

export default Header;