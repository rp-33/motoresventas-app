import React from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    TouchableOpacity,
    Text
} from 'react-native';

const Swipebutton = ({ handleDelete }) =>  (
    <TouchableOpacity style={styles.content} onPress={handleDelete}>
        <Text style={styles.text}>Eliminar</Text>
    </TouchableOpacity>
);

Swipebutton.proptypes = {
    handleDelete: PropTypes.func.isRequired
};

const styles =  StyleSheet.create({
    content: {
        flex:1,
		paddingTop:10,
		paddingHorizontal:10,
        backgroundColor: '#d9534f', //'#D9D5DC',
        alignItems:'flex-end',
    },
    text: {
        flex:1,
        textAlignVertical:'center',
        fontSize: 15,
        paddingBottom:10,
        color: 'white'
    }
});

export default Swipebutton;