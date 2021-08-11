import React from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text, 
    StyleSheet
} from 'react-native';
import {
    Content,
    Form,
    Button,
    Icon
} from 'native-base';
import { Formik } from 'formik';
import { FargotPasswordSchema, Width } from '../../constants';
import Field from '../../presentations/Field';
import color from '../../theme/color';

const Sendcode = ({ handleCheckCode, handleResend }) => (
    <Content>
        <View style={styles.contentLogo}>
            <Icon style={{fontSize: Width/2.1, color:'#D9D5DC'}} type='MaterialCommunityIcons' name='lock-open' />
            <Text style={styles.title}>Ingrese su código de verificación</Text>
            <Text style={styles.note}>Hemos enviado un código de verificación a su correo electrónico de registro</Text>
        </View>
        <View style={styles.contentForm}>
            <Formik
                initialValues={{ code: '' }}
                onSubmit={handleCheckCode}
                validationSchema = {FargotPasswordSchema.code}
            >
                {formikProp => (
                    <Form style={{flex: 1}} >
                        <Field 
                            formikProp={formikProp}
                            type='code'
                            title='Código de verificación'
                            iconType='MaterialCommunityIcons' 
                            iconName='pencil-lock'
                            last
                        />
                        <Button onPress={formikProp.handleSubmit} block full>
                            <Text style={styles.btnEnter}>Verificar</Text>
                        </Button>
                    </Form> 
                )}
            </Formik>
            <View style={styles.resend}>
                <Text  style={[styles.note, { marginRight: 5}]}>¿No recibiste el código de verificación?</Text>
                <Button transparent secundary onPress = {handleResend}>
                    <Text style={styles.btnResend}>Reenviar código</Text>
                </Button>
            </View>
                        
        </View>
    </Content>
);

Sendcode.proptypes = {
    handleCheckCode: PropTypes.func.isRequired,
    handleResend: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
    contentForm: {
        alignSelf: 'center',
        width: Width,
        alignItems: 'stretch',
        flex: 1,
        paddingLeft: 20,
        paddingRight: 20,
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
        textAlign: 'center',
        marginTop: 5,
        fontSize: Width/16,
        fontWeight: 'bold',
    },
    btnEnter: {
        fontSize: 22,
    },
    resend: {
        width: '100%',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 5,
        justifyContent: 'center',
    },
    btnResend: {
        color: color.primary,
        marginHorizontal: 5,
        fontSize: 17,
    },
    note: {
        fontSize: 15,
        textAlign: 'center',
        color: color.secondary
    },
});

export default Sendcode;