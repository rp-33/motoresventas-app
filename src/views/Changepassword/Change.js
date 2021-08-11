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
import { ChangePasswordSchema, Width } from '../../constants';
import Field from '../../presentations/Field';

const Change = ({ handleChange }) => (
    <Content>
        <View style={styles.contentLogo}>
            <Icon style={{fontSize: Width/2.1, color:'#D9D5DC'}} type='MaterialCommunityIcons' name='cellphone-key' />
            <Text style={styles.title}>Ingrese su nueva Contraseña</Text>
        </View>
        <View style={styles.contentForm}>
            <Formik
                initialValues={{ password: '', confirmPassword: '' }}
                onSubmit={(values, actions) => handleChange(values, actions)}
                validationSchema = {ChangePasswordSchema}
            >
                {formikProp => (
                    <Form style={{flex: 1}} >
                        <Field 
                            formikProp={formikProp}
                            type='password'
                            title='Contraseña'
                            iconType='FontAwesome5' 
                            iconName='key'
                            secureTextEntry
                        />
                        <Field 
                            formikProp={formikProp}
                            type='confirmPassword'
                            title='Repetir Contraseña'
                            iconType='FontAwesome5' 
                            iconName='key'
                             secureTextEntry
                            last
                        />
                        <Button onPress={formikProp.handleSubmit} block full>
                            <Text style={styles.btnEnter}>Cambiar Contraseña</Text>
                        </Button>
                    </Form> 
                )}
            </Formik>          
        </View>
    </Content>
);

Change.proptypes = {
    handleChange: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
    contentForm: {
        alignSelf: 'center',
        width: Width,
        alignItems: 'stretch',
        flex: 1,
        paddingLeft: 20,
        paddingRight: 20,
        marginBottom: 5,
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
    },
    btnEnter: {
        fontSize: 22,
    },
});

export default Change;