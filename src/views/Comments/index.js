import React from 'react';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
import {
    StyleSheet,
    PixelRatio,
    View,
    TouchableOpacity,
    FlatList,
    TouchableWithoutFeedback,
    RefreshControl
} from 'react-native';
import { Container, Text, Toast } from 'native-base';
import HeadBack from '../../presentations/HeadBack';
import Evaluate from '../../presentations/Evaluate';
import Comment from '../../presentations/Comment';
import color from '../../theme/color';
import { cancellablePromise } from '../../utils/cancellablePromise';
import { getComment, getProductComments, createComment, editComment, deleteComment } from '../../services/api';
import { newPageState } from '../../utils/newPageState';
import { setLoading } from '../../actions/loading';
import DataPage from '../../classes/DataPage';
import { withToDelete } from '../../hoc/withToDelete';

class Comments extends DataPage {
    constructor(props) {
        super(props);
        this.comment = cancellablePromise(getComment, 200);
        this.productComments = cancellablePromise(getProductComments, 200);
        this.state = {
            ...this.state,
            myComment: null,
            buyed: false,
            toDelete:[],
            edit: false,
            mount: false            
        }
    };

    componentWillUnmount() {
        this.comment.cancel();
        this.productComments.cancel();
    };

    // carga

    requestData = async () => {
        const id = this.props.navigation.getParam('id', null);
        const { page, mount } = this.state;
        let newState = {...this.state};
        if(!mount) {
            const _myComment = await this.requestMyComment(id);
            if(!_myComment) return null 
            const { buyed, myComment } = _myComment;
            newState = {...newState, buyed, myComment };
        }

        const response = await this.productComments.get(page, id);
        if(!response) return null;

        const {data: { comments = [] }, success} = response;
        const data = comments.filter(comment => comment.user._id!==this.props.user._id)
        
        let message = newState.myComment ?  'No hay mas comentarios' : 'No hay comentarios';
        newState = newPageState(newState, {data, success}, message);
        this.setState({...newState});
    };

    requestMyComment = async (id) => {
        const myComment = await this.comment.get(id);
        if(!myComment) return null;

        const { success, data } = myComment;
        const { avatar, displayName, _id } = this.props.user;

        if(success) return {
            buyed: data.verified,
            myComment: data.comment ? {...data.comment, user: { _id, avatar, displayName }} : null
        };

        Toast.show({
            text: data.error,
            textStyle: { fontSize: 15  },
            buttonTextStyle: { color: '#000000', fontSize: 15 },
            buttonText: "Cerrar",
            duration: 3000,
            type: "danger"
        });  
        this.setState({ refreshing: false, loading: false })
        return null;
    };

    // navegacion

    handleBack = () => this.props.navigation.goBack();

    // editar

    handleEdit = () => this.setState({ edit: true });

    // eliminar

    handleDelete = async () => {
        let message = '';
        let type = 'danger';
        const { setLoading, navigation, resetToDelete } = this.props;
        const id = navigation.getParam('id', null);
        setLoading(true);
        try {
            let { status, data } = await deleteComment(id);
            if(status === 201){
                message = data.message;
                type = 'success';
                this.setState({ myComment: null });
                resetToDelete();
            } else message = data.error || 'Error en el servidor';                
        } catch (error) {
            message = 'Error en el servidor';
        } finally{
            setLoading(false);
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
    
    handleSendValorate= async (comment) => {
        const { text='', rating=null } = {...this.state.myComment};
        if(comment.text === text && comment.rating === rating ) return this.setState({ edit: false });

        const { user, setLoading, navigation } = this.props;
        const id = navigation.getParam('id', null);
        let message = '';
        let type = 'danger';
        setLoading(true);
        try {
            let response = {};
            if(this.state.edit) response = await editComment(id, comment.text, comment.rating);
            else response = await createComment(id, comment.text, comment.rating);
            const { status, data } = response;
            if(status === 201) {
                message = data.message;
                type = 'success';
                this.setState({ 
                    edit: false,
                    myComment: {
                        text: comment.text, 
                        rating: comment.rating, 
                        date: Date.now(), 
                        user: { avatar: user.avatar, displayName: user.displayName }
                    }
                });
            } else message = data.error || 'Error del servidor';
        } catch (error) {
            message = 'Error del servidor';
        } finally{
            setLoading(false);
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

    render() {
        const { myComment, edit, data, buyed, loading } = this.state;
        const { toDelete, marketToDelete, activeToDelete } = this.props;

        return (
            <Container>
                <HeadBack 
                    title='Comentarios'
                    handleBack={this.handleBack}
                    toDelete={toDelete}
                    handleDelete={this.handleDelete}
                />   
                <FlatList
                    data={data}
                    keyExtractor={(item, index) => item.user._id}
                    renderItem = {({item,index})=>(
                        <View style={buyed?styles.comment:(index===0?null:styles.comment)}>
                            <Comment
                                comment={item}
                            />
                        </View>
                    )}
                    ListHeaderComponent={buyed &&
                        <View>
                            {(!myComment || edit)?
                                <Evaluate 
                                    comment={myComment}
                                    handleSendValorate={this.handleSendValorate}
                                />
                                :
                                <View>
                                    <View style={{flexDirection:'row'}}>
                                        <Text style={styles.title}>Tú comentario</Text>
                                        <TouchableOpacity style={{paddingHorizontal:10}} onPress={this.handleEdit}>
                                            <Text style={{color:color.primary}}>Editar</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <TouchableWithoutFeedback onPress={marketToDelete('myComment')} onLongPress={activeToDelete('myComment')}>
                                        <View style={toDelete.length>0?{backgroundColor:'rgb(232,232,232)'}:{backgroundColor:'white'}}>
                                            <Comment 
                                                comment={myComment}
                                            />
                                        </View>
                                    </TouchableWithoutFeedback>
                                </View>
                            }
                        </View>
                    }
                    refreshControl={<RefreshControl progressViewOffset={buyed ? 83 : 0} colors={[color.primary]} refreshing={loading} onRefresh={this.handleRefresh}/>}
                />
            </Container>
        );
    }
};

Comments.proptypes = {
    user: Proptypes.object.isRequired,
    setLoading: Proptypes.func.isRequired,
    toDelete: Proptypes.array.isRequired, 
    marketToDelete: Proptypes.func.isRequired, 
    activeToDelete: Proptypes.func.isRequired,
    resetToDelete: Proptypes.func.isRequired
};

const styles = StyleSheet.create({
    title: {
        marginLeft:10,
        fontWeight:'bold',
        flex:1,
        color:'#575757'
    },
    comment:{
        borderColor:color.secondary,
        borderTopWidth:1 / PixelRatio.getPixelSizeForLayoutSize(1),
    },
});

const mapStateToProps = state => ({
    user: state.user
});

const mapDispatchToProps = dispatch => ({
    setLoading: value => dispatch(setLoading(value))
});

export default connect(mapStateToProps, mapDispatchToProps)( withToDelete( Comments ) );