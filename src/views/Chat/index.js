import React, { Component } from 'react';
import {
    FlatList,
    KeyboardAvoidingView,
    Image
} from 'react-native';
import { 
    Container,
    Toast
} from 'native-base';
import moment from 'moment';
import 'moment/locale/es';
import Head from './Head';
import ChatBubble from './ChatBubble';
import Loading from './Loading';
import InputChat from './InputChat';
import {
    getMessages,
    createMessageText
} from '../../services/api';
import { cancellablePromise } from '../../utils/cancellablePromise';
import ModalLocation from '../../presentations/ModalLocation';

class Chat extends Component {
    constructor(props){
        super(props);
        this.allMessages = cancellablePromise(getMessages, 200);
        this.myMessage = cancellablePromise(createMessageText, 201);
        this.state = {
            loading: false,
            messages : [],
            page: 0,
            noData: false,
            modalLocation: false
        }
    }

    componentDidMount(){
        this.findMessages(this.state.page);
    };

    componentWillUnmount() {
        this.allMessages.cancel();
        this.myMessage.cancel();
    };

    handleLoadMore = ()=>{
        if(!this.state.noData){
            this.findMessages(this.state.page);
        }
    };

    findMessages = async(page)=>{
        const { _id } = this.props.navigation.getParam('product', {});
        this.setState({ loading: true });
        let response = await this.allMessages.get(_id,page);

        if(!response) return;

        const { success, data } = response;
        this.setState({ loading: false })
        if(success) {
            if(data.length===0) return this.setState({ noData: true });
            this.setState(prevState=>{
                return{
                    messages: page === 0 ? data : [...prevState.messages,...data],
                    page : page + 1
                }
            })
        } else {
            Toast.show({
                text: data.error,
                textStyle: { fontSize: 15  },
                buttonTextStyle: { color: '#000000', fontSize: 15 },
                buttonText: "Cerrar",
                duration: 3000,
                type: "danger"
            });
        }
    };  

    handleSendMessage = async(text)=>{
        const { emitter, type, receiver, _id } = this.props.navigation.getParam('product', {});
        const date = new Date();
        let message = {
            emitter,
            receiver,
            text,
            status : 'not-send',
            date
        };
        this.setState(prevState=>{
            return{
                messages : [message,...prevState.messages]
            }
        })
        let response = await this.myMessage.get(_id, emitter, type, receiver, text, date);

        if(!response) return;

        const { success, data } = response;
        if(success){
            let newMessages = this.state.messages.map((item,i)=>(i ==0 ? {...item,status:'sent'} : item));
            this.setState({
                messages : newMessages
            })
        } else {
            Toast.show({
                text: 'Error',
                textStyle: { fontSize: 15  },
                buttonTextStyle: { color: '#000000', fontSize: 15 },
                buttonText: "Ok",
                duration: 3000,
                type:'danger'
            }) 
        }
    };

    handleBack = () => this.props.navigation.goBack();

    // localizacion

    handleLocation = () => this.setState(previosState=>({ modalLocation : !previosState.modalLocation }));

    render() {
        const { emitter, name, image, location } = this.props.navigation.getParam('product', {});
        const { modalLocation } = this.state;
    
        return (
            <Container>
                <Head 
                    name={name}
                    image={image}
                    handleBack={this.handleBack}
                    handleLocation={location && this.handleLocation}
                />
                <Image style={{flex:1,position:'absolute',zIndex:-1}} source={require('../../assets/images/chat-background.jpg')} />
                <KeyboardAvoidingView style={{flex:1}} enabled>
                    <FlatList
                        data = {this.state.messages}
                        keyExtractor={(item, index) => index.toString()}
                        onEndReached={this.state.noData ? null : this.handleLoadMore}
                        onEndReachedThreshold={0.01}
                        initialNumToRender={30}
                        inverted = {true}
                        ListFooterComponent = {
                            <Loading
                                loading = {this.state.loading}
                            />  
                        }
                        renderItem = {({item,index})=>(
                            <ChatBubble 
                                key ={index.toString()}
                                message = {item}
                                myUser = {emitter}
                            />
                        )}
                    />

                    <InputChat 
                        sendMessage = {this.handleSendMessage}
                    />
                </KeyboardAvoidingView>
                {modalLocation &&
                    <ModalLocation 
                        modal={modalLocation}
                        handleModal={this.handleLocation}
                        location={location}
                    />
                }
            </Container>
        );
    }
}


export default Chat;