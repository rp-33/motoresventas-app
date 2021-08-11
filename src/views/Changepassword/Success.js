import React from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text, 
    StyleSheet
} from 'react-native';
import {
    Content,
    Button,
    Icon
} from 'native-base';
import { Width } from '../../constants';
import color from '../../theme/color';

const Success = ({ handleSuccess }) => (
    <Content>
        <View style={styles.contentLogo}>
            <Icon style={{fontSize: Width/2.1, color:'#5cb85c'}} type='MaterialCommunityIcons' name='shield-check' />
            <Text style={styles.title}>Contraseña restablecida</Text>
            <Text style={styles.note}>Su contraseña ha sido actualizada exitosamente, inicie sessión para ingresar a la aplicación</Text>
        </View>
        <View style={styles.btn_content}>
            <Button onPress={handleSuccess} block full>
                <Text style={styles.btnEnter}>Ir a Inicio de Sessión</Text>
            </Button>                       
        </View>
    </Content>
);

Success.proptypes = {
    handleSuccess: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
    btn_content: {
        marginTop: 25,
        alignSelf: 'center',
        width: Width,
        alignItems: 'stretch',
        flex: 1,
        paddingLeft: 20,
        paddingRight: 20,
        marginBottom: 5
    },
    contentLogo: {
        alignSelf: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 5,
        width: Width,
        flex: 1,
        paddingLeft: 20,
        paddingRight: 20,
    },
    title: {
        marginTop: 5,
        fontSize: Width/16,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    btnEnter: {
        fontSize: 22,
    },
    note: {
        fontSize: 15,
        textAlign: 'center',
        color: color.secondary
    },
});

export default Success;