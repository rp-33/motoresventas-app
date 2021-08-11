import React, { Component } from 'react';
import { 
    Container, 
    Content,
    Toast
} from 'native-base';
import { getSerialsForSearch } from '../../services/api';
import Head from './Head';
import SearchItem from '../../presentations/SearchItem';
import { cancellablePromise } from '../../utils/cancellablePromise';

class FilterForSerial extends Component {
    constructor(props) {
        super(props);
        this.serialsForSearch = cancellablePromise(getSerialsForSearch, 200);
        this.timeOut = null;
        this.state = {
            tags:[],
            text:''
        }
    }

    componentWillUnmount() {
        if(this.timeOut) clearTimeout(this.timeOut);
        this.serialsForSearch.cancel();
    }

    // seriales

    requestSerial = async () => {
        if(this.state.text === '') return;

        let response = await this.serialsForSearch.get(this.state.text);

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
            if (text === this.state.text) this.requestSerial();
        }, 600)
        
   });

    // navegacion

    handleBack = () => this.props.navigation.goBack();

    handleWord = (tag) => () => this.props.navigation.navigate('marketplace', { 
        tag, 
        distance: -1 
    });

    // render
   
    render() {
        const { tags, text } = this.state;
        
        return (
            <Container style={{backgroundColor:'rgb(232,232,232)'}}>
                <Head 
                    handleBack={this.handleBack}
                    text={text}
                    handleChangeText={this.handleChangeText}
                />
                <Content style={{padding:10}}>
                    {tags.map((tag, index)=>(
                        <SearchItem 
                            key={index.toString()}
                            item={tag.serial}
                            handleItem={this.handleWord(tag)}
                            textTransform='uppercase'
                        /> 
                    ))}
                </Content>
            </Container>
        );
    }
};

export default FilterForSerial;