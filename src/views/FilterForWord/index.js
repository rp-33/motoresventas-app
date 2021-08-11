import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { 
    Container, 
    Content,
    Toast
} from 'native-base';
import { connect } from 'react-redux';
import ModalDistance from '../../presentations/ModalDistance';
import { getWordsForSearch } from '../../services/api';
import Head from './Head';
import SearchItem from '../../presentations/SearchItem';
import { cancellablePromise } from '../../utils/cancellablePromise';

class FilterForWord extends Component {
    constructor(props) {
        super(props);
        this.wordsForSearch = cancellablePromise(getWordsForSearch, 200);
        this.timeOut = null;
        this.state = {
            text: '',
            tags: [],
            distance: 0,
            modalDistance: false
        }
    }

    componentDidMount() {
        this.setState({ distance: this.props.distance });
    };

    componentWillUnmount() {
        if(this.timeOut) clearTimeout(this.timeOut);
        this.wordsForSearch.cancel();
    }

    // palabras claves

    requestName = async () => {
        if(this.state.text === '') return;

        let response = await this.wordsForSearch.get(this.state.text);

        if(!response) return;

        const { success, data } = response;
        if(success) this.setState({ tags: data });
        else Toast.show({
            text: data.error,
            textStyle: { fontSize: 15 },
            buttonTextStyle: { color: '#000000', fontSize: 15 },
            buttonText: "Cerrar",
            duration: 3000,
            type: "danger"
        });
    };

    handleChangeText = (text) => this.setState({ text }, () => {
        // debounce
        if(this.timeOut) clearTimeout(this.timeOut);
         
        this.timeOut = setTimeout(() => {
            if (text === this.state.text) this.requestName();
        }, 600)
   });

    // navegacion

    handleBack = () => this.props.navigation.goBack();

    handleWord = (tag) => () => this.props.navigation.navigate('marketplace', {
        tag,
        distance:this.state.distance
    });

    // modificar distancia

    handleModal = () => this.setState(preState=>({modalDistance:!preState.modalDistance}));

    setDistance = (text) => {
        let distance = Number(text);
        if(distance.toString() === 'NaN') return;
        if(distance>1000) distance = 1000;
        if(distance<=0) distance = 1;
        this.setState({distance});
    };

    // render

    render() {
        const { tags, modalDistance, distance, text } = this.state;

        return (
            <Container style={{backgroundColor:'rgb(232,232,232)'}}>
                <Head 
                    handleBack={this.handleBack}
                    text={text}
                    handleChangeText={this.handleChangeText}
                    handleDistance={this.handleModal}
                />
                <Content style={{padding:10}}>
                    {tags.map((tag, index)=>(
                        <SearchItem 
                            key={index.toString()}
                            item={tag.name}
                            handleItem={this.handleWord(tag)}
                        /> 
                    ))}
                </Content>
                <ModalDistance 
                    modal={modalDistance}
                    handleModal={this.handleModal}
                    distance={distance}
                    setDistance={this.setDistance}
                />
            </Container>
        );
    }
};

FilterForWord.proptypes = {
    distance: PropTypes.number.isRequired
};

const mapStateToProps = state => ({
    distance: state.user.distance
})

export default connect(mapStateToProps)(FilterForWord);