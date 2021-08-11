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

const Sendemail = ({ handleSend }) => (
    <Content>
        <View style={styles.contentLogo}>
            <Icon style={{fontSize: Width/2.1, color:'#D9D5DC'}} type='MaterialCommunityIcons' name='cellphone-lock' />
            <Text style={styles.title}>Ingrese su correo electrónico</Text>
            <Text style={styles.note}>Le enviaremos un código de verificación a su correo electrónico de registro</Text>
        </View>
        <View style={styles.contentForm}>
            <Formik
                initialValues={{ email: '' }}
                onSubmit={handleSend}
                validationSchema = {FargotPasswordSchema.email}
            >
                {formikProp => (
                    <Form style={{flex: 1}} >
                        <Field 
                            formikProp={formikProp}
                            type='email'
                            title='Correo electrónico'
                            iconType='FontAwesome' 
                            iconName='envelope'
                            last
                        />
                        <Button onPress={formikProp.handleSubmit} block full>
                            <Text style={styles.btnEnter}>Enviar</Text>
                        </Button>
                    </Form> 
                )}
            </Formik>                        
        </View>
    </Content>
);

Sendemail.proptypes = {
    handleSend: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
    contentForm: {
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

export default Sendemail;