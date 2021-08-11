import React,{Component} from 'react';
import PropTypes from 'prop-types';
import {
    Container,
    Toast
} from 'native-base';
import HeadBack from '../../presentations/HeadBack';
import Sendemail from './Sendemail';
import Sendcode from './Sendcode';
import { connect } from 'react-redux';
import { setLoading } from '../../actions/loading';
import { sendemail, sendcode } from '../../services/api';

class Forgotpassword extends Component{

    constructor(props) {
        super(props);
        this.state = {
            email: '',
        }
    }

    // navegacion

    handleBack = () => this.props.navigation.goBack();

    // chequear codigo

    handleCheckCode = async (values, actions) => {
        const { setLoading, navigation } = this.props;
        setLoading(true);
        const { code } = values;
        let error = '';
        try{            
            let { status, data } = await sendcode(this.state.email, code);
            if(status === 200) navigation.navigate('changepassword', { email: this.state.email });
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

    // pedir codigo

    handleSend = async (values, actions) => {
        this.props.setLoading(true);
        const { email } = values;
        let message = '';
        let type = 'danger';
        try{            
            let { status, data } = await sendemail(email);
            if(status === 201){
                if(this.state.email=='') {
                    this.setState({ email });
                } else {
                    message = data.message;
                    type = "success";
                }
            } else{             
                message = data.error || 'Error en el servidor';                  
            }
        } catch(err){
            message = 'Error en el servidor';
        } finally{
            this.props.setLoading(false);
            if(message === '') return;
            if(actions) actions.setSubmitting(false);
            Toast.show({
                text: message,
                textStyle: { fontSize: 15  },
                buttonTextStyle: { color: '#000000', fontSize: 15 },
                buttonText: "Cerrar",
                duration: 3000,
                type
            });
        }
    };

    handleResend = async () => this.handleSend({ email: this.state.email }, null);

    // render
    
    render() {
        return (
            <Container>
                <HeadBack 
                    title = "Recupera tu contraseña"
                    handleBack = {this.handleBack}
                />
                {this.state.email==='' ? 
                    <Sendemail handleSend={this.handleSend} /> 
                    : 
                    <Sendcode handleCheckCode={this.handleCheckCode} handleResend={this.handleResend} /> 
                }
            </Container>
        )
    }
};

Forgotpassword.propTypes = {
    setLoading: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
    setLoading: value => dispatch(setLoading(value))
});

export default connect(null, mapDispatchToProps)(Forgotpassword);