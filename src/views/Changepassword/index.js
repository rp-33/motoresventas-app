import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Container,
    Toast
} from 'native-base';
import HeadBack from '../../presentations/HeadBack';
import Change from './Change';
import Success from './Success';
import { setLoading } from '../../actions/loading';
import { connect } from 'react-redux';
import { changepassword } from '../../services/api';

class Changepassword extends Component{

    constructor(props) {
        super(props);
        this.state = {
            success: false,
        }
    }

    // navegacion

    handleBack = () => this.props.navigation.goBack();

    handleSuccess = () => this.props.navigation.popToTop();

    // cambiar contraseña

    handleChange = async (values, actions) => {
        let error = '';
        const { navigation, setLoading } = this.props;
        const email = navigation.getParam('email');
        setLoading(true);
        const { password } = values;
        try{            
            let { status, data } = await changepassword(email,password)
            if(status === 201) this.setState({ success: true });
            else error = data.error || 'Error en el servidor';          
        } catch(err){
            error = 'Error en el servidor';
        } finally{
            setLoading(false);
            if(error === '') return;
            actions.setSubmitting(false);
            Toast.show({
                text: error,
                textStyle: { fontSize: 15  },
                buttonTextStyle: { color: '#000000', fontSize: 15 },
                buttonText: "Cerrar",
                duration: 3000,
                type: "danger"
            });
        }
    };

    // render
    
    render() {
        return (
            <Container>
                <HeadBack 
                    title = "Cambia tu contraseña"
                    handleBack = {this.handleBack}
                />
                {this.state.success ? 
                    <Success handleSuccess={this.handleSuccess}/> 
                    : 
                    <Change handleChange={this.handleChange}/> 
                }
            </Container>
        )
    }
};

Changepassword.proptypes = {
    setLoading: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
    setLoading: value => dispatch(setLoading(value))
})

export default connect(null, mapDispatchToProps)(Changepassword);