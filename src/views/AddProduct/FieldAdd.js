import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'native-base';
import { View, TouchableOpacity, ScrollView } from 'react-native';
import color from '../../theme/color';

const FieldAdd = ({ handleAdd, error, children, title }) => (
    <View style={{marginTop:13}}>
        <TouchableOpacity onPress={handleAdd}>
            <Text style={{color:color.primary,fontSize:17,lineHeight:17}}>{title}</Text>
        </TouchableOpacity>
        <ScrollView horizontal style={{paddingVertical:10}}>
            {error !== '' ?
                <Text style={{fontStyle: 'italic',color: '#ed2f2f',fontSize: 15}}>
                    {error}
                </Text>
                :
                children 
            }
        </ScrollView>
    </View>
);

FieldAdd.proptypes = {
    handleAdd: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    error: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired
};

export default FieldAdd;