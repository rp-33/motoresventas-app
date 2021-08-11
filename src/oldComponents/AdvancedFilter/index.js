import React, { Component } from 'react';
import Proptypes from 'prop-types';
import {
    Text as BtnText, 
    Slider,
    StyleSheet,
} from 'react-native';
import {
    Text, 
    Container,
    Content,
    Card,
    CardItem,
    Icon,
    Toast,
    Input,
    Button,
} from 'native-base';
import { Width } from '../../constants';
import color from '../../theme/color';
import Sectiontitle from '../../presentations/Sectiontitle';
import { connect } from 'react-redux';
import { setLoading } from '../../actions/loading';
import { setDistance } from '../../actions/user';
import { changedistance } from '../../services/api';
import HeadBack from '../../presentations/HeadBack';


class AvancedFilter extends Component{

    constructor(props){
        super(props);
        this.state = {
            previousDistance: 0,
            distance: 0,
        }
    }
    
    componentDidMount() {
        const { distance } = this.props.user;
        this.setState({
            distance
        })
    }; 

    _setDistance = (value) => {   
        let distance =  Math.round(value*1000)/1000;   
        this.setState({distance},
        async () => {
            const { setDistance } = this.props;
            try{         
                let { status, data } = await changedistance(distance);
                if(status === 201)
                {
                    setDistance(distance);
                }
                else{       
                    Toast.show({
                        text: data.error,
                        textStyle: { fontSize: 15  },
                        buttonTextStyle: { color: '#000000', fontSize: 15 },
                        buttonText: "Cerrar",
                        duration: 3000,
                        type: "danger"
                    })
                    this.setState({distance: this.state.previousDistance});            
                }
            }
            catch(err)
            {
                Toast.show({
                    text: 'Error en el servidor',
                    textStyle: { fontSize: 15  },
                    buttonTextStyle: { color: '#000000', fontSize: 15 },
                    buttonText: "Cerrar",
                    duration: 3000,
                    type: "danger"
                })
                this.setState({distance: this.state.previousDistance});
            }
        })
    };

    formatedDistance = (distance) => {
        let split = distance.toString().split('.');
        return `Distancia: ${split.join(',')} km`
    };

    handlePreviousDistance = () => this.setState({previousDistance:this.state.distance});

    handleBack = () => this.props.navigation.goBack();

    render(){
        const { distance } = this.props.user;
        return(
            <Container>
                <HeadBack
                    title='Filtro avanzado'
                    handleBack={this.handleBack}
                />
                <Content style={styles.content}>
                    <Sectiontitle 
                        title='Radio de busqueda'
                        iconType='FontAwesome5'
                        iconName='search-location'
                    />
                    <Card>
                        <CardItem>
                            <Text style={styles.text}>{this.formatedDistance(distance)}</Text>
                            <Icon style={styles.icon} type='FontAwesome5' name='map-marker-alt' />
                        </CardItem>
                        <CardItem>
                            <Slider
                                thumbTintColor={color.primary}
                                minimumTrackTintColor={color.primary}
                                style={{flex:1}}
                                minimumValue={10}
                                maximumValue={50}
                                value={distance}
                                onTouchStart={this.handlePreviousDistance}
                                onSlidingComplete={this._setDistance}
                            />   
                        </CardItem>
                        
                    </Card>
                    <Sectiontitle 
                        title='Busqueda por serial'
                        iconType='FontAwesome5'
                        iconName='barcode'
                    />
                    <Card>
                        <CardItem>
                            <Input 
                                placeholder='Ingrese su numero de serial'
                            />
                            <Button style={{alignSelf:'center'}}>
                                <BtnText style={{paddingHorizontal:20,fontSize:15}}>Buscar</BtnText>
                            </Button>
                        </CardItem>
                    </Card>
                    <Sectiontitle 
                        title='Tipos de Repuestos'
                        iconType='FontAwesome5'
                        iconName='car-side'
                    />
                    <Card>
                        <CardItem bordered button >
                            <Text style={styles.text}>Macánica</Text>
                            <Icon style={styles.icon} type='FontAwesome' name='gears' />
                        </CardItem>
                        <CardItem bordered button >
                            <Text style={styles.text}>Suspensión</Text>
                            <Icon style={styles.icon} type='FontAwesome5' name='car' />
                        </CardItem>
                        <CardItem bordered button >
                            <Text style={styles.text}>Carroceria</Text>
                            <Icon style={styles.icon} type='MaterialCommunityIcons' name='car-door' />
                        </CardItem>
                        <CardItem bordered button >
                            <Text style={styles.text}>Tren delantero</Text>
                            <Icon style={styles.icon} type='FontAwesome5' name='car' />
                        </CardItem>
                        <CardItem bordered button >
                            <Text style={styles.text}>Accesorios</Text>
                            <Icon style={styles.icon} type='Ionicons' name='ios-speedometer' />
                        </CardItem>
                        <CardItem button >
                            <Text style={styles.text}>Partes eléctricas</Text>
                            <Icon style={styles.icon} type='MaterialCommunityIcons' name='car-battery' />
                        </CardItem>
                    </Card>
                </Content>
            </Container>
        )
    }
};

AvancedFilter.proptypes = {
    setLoading : Proptypes.func.isRequired,
    setDistance : Proptypes.func.isRequired,
    use: Proptypes.object.isRequired
};

const styles = StyleSheet.create({
    content: {
        alignSelf:'center',
        width: Width,
        paddingLeft: 20,
        paddingRight: 20,
    },
    icon:{
        color:'#D9D5DC',
        textAlign:'center'
    },
    text: {
        flex:1, 
        fontSize:15
    }
});

const mapDispatchToProps = dispatch => ({
    setLoading: value => dispatch(setLoading(value)),
    setDistance: value => dispatch(setDistance(value)),
});

const mapStateToProps = state => ({
    user: state.user
})

export default connect(mapStateToProps, mapDispatchToProps)(AvancedFilter);