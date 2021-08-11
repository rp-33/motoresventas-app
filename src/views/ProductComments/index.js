import React from 'react';
import {
    StyleSheet,
    PixelRatio,
    View,
    FlatList,
    RefreshControl
} from 'react-native';
import { Container } from 'native-base';
import HeadBack from '../../presentations/HeadBack';
import Comment from '../../presentations/Comment';
import color from '../../theme/color';
import { getProductComments } from '../../services/api';
import { newPageState } from '../../utils/newPageState';
import DataPage from '../../classes/DataPage';

class ProductComments extends DataPage {
    constructor(props) {
        super(props, getProductComments, 200);
    };

    requestData = async () => {
        const id = this.props.navigation.getParam('id', null);
        const { page } = this.state; 
        const response = await this.apiData.get(page, id);
        
        if(!response) return null;

        const {data: { comments = [] }, success} = response;
        const newState = newPageState(this.state, {data: comments, success}, 'No hay comentarios');
        this.setState({...newState});
    };

    handleBack = () => this.props.navigation.goBack();

    render() {
        return (
            <Container>
                <HeadBack 
                    title='Comentarios'
                    handleBack={this.handleBack}
                />   
                <FlatList
                    data={this.state.data}
                    keyExtractor={(item, index) => item.user._id}
                    renderItem = {({item,index})=>(
                        <View style={index===0?null:styles.comment}>
                            <Comment
                                comment={item}
                            />
                        </View>
                    )}
                    refreshControl={<RefreshControl colors={[color.primary]} refreshing={this.state.loading} onRefresh={this.handleRefresh}/>}
                />
            </Container>
        );
    }
};

const styles = StyleSheet.create({
    comment:{
        borderColor:color.secondary,
        borderTopWidth:1 / PixelRatio.getPixelSizeForLayoutSize(1),
    },
});

export default ProductComments;