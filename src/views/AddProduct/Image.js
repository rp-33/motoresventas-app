import React from 'react';
import Proptypes from 'prop-types';
import { 
    View, 
    TouchableOpacity, 
    StyleSheet, 
    Image as Img 
} from 'react-native';
import { Icon } from 'native-base';

const Image = ({ image, index, deleteImage }) => (
    <View style={index===0?styles.content:[styles.content,{marginLeft:10}]}>
        <Img style={styles.image} source={{uri:image}} />
        <TouchableOpacity style={styles.btnDelete} onPress={deleteImage}>
            <Icon 
                style={styles.icon} 
                type="Ionicons" 
                name='md-close' 
            />
        </TouchableOpacity>
    </View>
);

Image.proptypes = {
    image: Proptypes.object.isRequired,
    index: Proptypes.number.isRequired,
    deleteImage: Proptypes.func.isRequired
};

const styles = StyleSheet.create({
    content: {
        position:'relative',
        flexDirection:'row',
        alignItems:'center', 
        justifyContent:'center',      
        paddingRight:8,
        paddingTop:8
    },
    image: {
        width:70,
        height:70,
        borderRadius:15,
        borderWidth:1,
        borderColor:'#D9D5DC',
    },
    btnDelete: {
        backgroundColor:'#ed2f2f',
        borderRadius:25,
        height:25,
        width:25,
        justifyContent:'center',
        position:'absolute',
        top:0,
        right:0
    },
    icon: {
        color:'white',
        fontSize:20,
        padding:5,
        alignSelf:'center'
    }
})

export default  Image;