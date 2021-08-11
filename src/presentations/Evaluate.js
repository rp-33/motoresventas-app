import React,{Component} from 'react'
import {
    View,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import { 
    Form, 
    Item, 
    Input, 
    Text, 
    Icon,
} from 'native-base';
import PropTypes from 'prop-types';
import color from '../theme/color';

class Evaluate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            rating: null,
        }
    }

    componentDidMount() {
        const { text='', rating=null } = {...this.props.comment};
        this.setState({ text, rating });
    };

    handleRating = (rating) => this.setState({ rating });

    handleChangeText = (text) => this.setState({ text });

    handleValorate = () => {
        if(this.state.text==='') this.setState({ rating: null });
        else this.props.handleSendValorate({...this.state})
    };

    render() {
        const { text, rating } = this.state;

        return(
			<View style={{paddingBottom:10,paddingTop:7}}>
				<View style={{flexDirection:'row',justifyContent:'center'}}>
					{[1,2,3,4,5].map((item,i)=>
						<TouchableOpacity key={i} onPress={()=>this.handleRating(i + 1)}>
                            {i < rating ?
                                <Icon name="ios-star" type='Ionicons' style={{marginHorizontal:6,color:color.primary,fontSize:35}} />
                                :
                                <Icon name="ios-star" type='Ionicons' style={{marginHorizontal:6,color:'black',fontSize:35}} />
                            }	
    					</TouchableOpacity> 				
					)}
				</View>
				{rating ?
                    <Form style={{paddingHorizontal:15,marginTop:10}}>
                        <Item last regular>
                            <Input
                                multiline 
                                placeholder='Escribe un comentario'
                                onChangeText = {this.handleChangeText}
                                value={text}
                                style={{paddingHorizontal:20}}
                            />
                        </Item>
                        <TouchableOpacity style={[styles.btn,{backgroundColor: text !== '' ? '#5cb85c' : '#d9534f'}]} onPress = {this.handleValorate} >
                            <Icon 
                                style={{fontSize:30,color:'white'}} 
                                type={text !== '' ? 'FontAwesome' : 'FontAwesome5'} 
                                name={text !== '' ? 'check' : 'times'}   
                            />
                        </TouchableOpacity>
                    </Form>
                    :
                    <Text style={{alignSelf:'center',marginTop:5,color:'#575757'}}>Califíca este producto</Text>
            	}           
			</View>
		)
    }
		
};

Evaluate.proptypes = {
	handleSendValorate: PropTypes.func.isRequired,
    comment: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
    btn:{
        marginTop:10,
        width:50, 
        height:50,  
        borderRadius: 25,  
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf:'flex-end'
    }
});

export default Evaluate;