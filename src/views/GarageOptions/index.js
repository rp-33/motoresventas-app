import React, { Component } from 'react';
import {
    FlatList,
    View,
} from 'react-native';
import { 
    Container,
    Icon,
    Input 
} from 'native-base';
import Option from './Option';
import color from '../../theme/color';
import Head from './Head';
import { cars } from '../../utils/markIcon';
import CardCar from '../../presentations/CardCar';

class GarageOptions extends Component {

    constructor(props) {
        super(props);
        this.timeOut = null;
        this.state = {
            data: [],
            title: '',
            value: '',
            options: [],
            search: '',
            keyboardType: 'default'
        }
    };

    componentDidMount() {
        const { navigation } = this.props;
        const page = navigation.getParam('page', 0);
        const pages = navigation.getParam('pages', 3);
        const prevOptions = navigation.getParam('prevOptions', []);
        let data = [];
        switch (page) {
            case 0:
                data = this.marks();
                return this.setState({ data, title:'Selecciona la Marca', options: data });
            case 1:
                data = this.models(prevOptions[0]);
                return this.setState({ data, title:'Selecciona el Modelo', options: data});
            case 2:
                data = this.years(prevOptions[0], prevOptions[1]);
                return this.setState({ data, title: pages>3?'Selecciona el Año inicial':'Selecciona el Año', options: data, keyboardType: 'numeric' });
            default:
                data = this.years(prevOptions[0], prevOptions[1]);
                return this.setState({ data, title:'Selecciona el Año final', options: data, keyboardType: 'numeric' });
        }
    };

    componentWillUnmount() {
        if(this.timeOut) clearTimeout(this.timeOut);
    }

    marks = () => (Object.keys(cars).map(mark=>mark));

    models = (mark) => (Object.keys(cars[mark].models).map(model=>model));

    years = (mark, model) => (Object.keys(cars[mark].models[model]).map(model=>model));

    // navegacion

    handleBack = () => this.props.navigation.goBack();

    handleForward = () => {
        const { navigation } = this.props;
        const nextPage = navigation.getParam('page', 0)+1;
        const pages = navigation.getParam('pages', 3);
        const nextOptions = [...navigation.getParam('prevOptions', []), this.state.value];
        const endPage = navigation.getParam('endPage', 'addToGarage');
        if(nextPage===pages) {
            this.props.navigation.navigate(endPage,{
                options:nextOptions,
            });
        } else {
            this.props.navigation.push('garageOptions',{
                page:nextPage,
                prevOptions:nextOptions,
                pages,
                endPage
            });
        };
    };

    // seleccionar

    handleSelect = (option) => () => this.setState({ value:option });

    // filtar

    handleChangeText = (search) => this.setState({ search }, () => {
        // debounce
        if(this.timeOut) clearTimeout(this.timeOut);
         
        this.timeOut = setTimeout(() => {
            if (search === this.state.search){
                const options = this.state.data.filter(element => element.toLowerCase().startsWith(this.state.search.toLowerCase()));
                this.setState({ options });
            };
        }, 250)
   });
 
    // render

    render() {
        const { options, title, value, keyboardType  } = this.state;
        const { navigation } = this.props;
        const prevOptions = navigation.getParam('prevOptions', []);
        const pageMark = navigation.getParam('page', 0) === 0;

        return (
            <Container>
                <Head 
                    handleBack={this.handleBack}
                    handleForward={this.handleForward}
                    title={title}
                    value={value}
                />
                <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',paddingHorizontal:10}}>
                    <Icon 
                        style={{fontSize:35,color:color.primary}} 
                        type="Ionicons" 
                        name='md-search' 
                    />
                    <Input keyboardType={keyboardType} style={{marginLeft:5}} onChangeText={this.handleChangeText} placeholder='Buscar' />
                </View>
                <CardCar style={{backgroundColor:color.primary}} options={prevOptions} />
                <FlatList
                    numColumns={pageMark ? 3 : 1}
                    key={pageMark ? 'tres' : 'uno'}
                    style={{paddingHorizontal:10,marginVertical:10}}
                    data = {options}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem = {({item,index})=>
                        <Option 
                            option={item}
                            optionActive={value}
                            handleSelect={this.handleSelect(item)}
                            image={pageMark}
                            key={item}
                        />
                    }
                />
            </Container>
        );
    }
};

export default GarageOptions;