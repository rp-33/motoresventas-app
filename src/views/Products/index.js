import React from 'react';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';
import { Container, Toast } from 'native-base';
import Head from './Head';
import HeadSearch from './HeadSearch';
import Product from './Product';
import { FlatList, RefreshControl } from 'react-native';
import { changeAvailability, deleteProducts, getProducts, getSearchProducts } from '../../services/api';
import { setLoading } from '../../actions/loading';
import color from '../../theme/color';
import { cancellablePromise } from '../../utils/cancellablePromise';
import { newPageState } from '../../utils/newPageState';
import DataPage from '../../classes/DataPage';
import { withToDelete } from '../../hoc/withToDelete';
import {timeDay} from '../../utils/date';

class Products extends DataPage {

    constructor(props){
        super(props);
        this.defaultsProducts = cancellablePromise(getProducts, 200);
        this.searchProducts = cancellablePromise(getSearchProducts, 200);
        this.editAvailability = cancellablePromise(changeAvailability, 201);
        this.timeOut = null;
        this.state = {
            ...this.state,
            search: false,
            textSearch: '',
            filter: false 
        }
    };

    componentDidUpdate() {
        const refresh = this.props.navigation.getParam('refresh', false);
        if(refresh || this.state.filter) {
            this.props.navigation.state.params = null;
            this.handleRefresh({ data: [], filter: false })
        }
    };

    componentWillUnmount() {
        if(this.timeOut) clearTimeout(this.timeOut)
        this.defaultsProducts.cancel();
        this.searchProducts.cancel();
        this.editAvailability.cancel();
    };

    requestData = async () => {
        let response = null;
        const { page, textSearch } = this.state;
        if(textSearch === '') response = await this.defaultsProducts.get(page);
        else response = await this.searchProducts.get(page, textSearch);

        if(!response) return null // la respuesta es nula si se desmontó la vista
        
        const newState = newPageState(this.state, response, 'No tienes productos');
        this.setState({...newState});
    };

    // navegacion

    handleAdd = () => {
        let { navigation, expired_date } = this.props;
        if(expired_date === null || timeDay(expired_date)<0){
            navigation.navigate('subscription'); 
        } else{
            navigation.navigate('addproduct'); 
        }
    };

    handleEdit = (product) => () => this.props.navigation.navigate('addproduct', { product });

    handleDetails = (id) => () => this.props.navigation.navigate('productDetailsSeller', { id });

    handleShowCars = (cars) => () => this.props.navigation.navigate('showcars', { cars });

    // borrador

    handleDelete = async () => {
        let message = '';
        let type = 'danger';
        const { setLoading, resetToDelete, toDelete } = this.props;
        const { data } = this.state;
        setLoading(true);
        try {
            let { status, data: newData } = await deleteProducts(toDelete);
            if(status === 201){
                const newProducts = data.filter(product => !toDelete.includes(product._id));
                message = newData.message;
                type = 'success';
                this.setState({ data: newProducts });
                resetToDelete();
            } else{             
                message = newData.error || 'Error en el servidor';                
            }
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

    // filtro

    handleSearch = () => this.setState(prevState=>{
        let filter = false;
        if(prevState.textSearch !== '') filter = true;
        return { search:!prevState.search, textSearch:'', filter };
    });

    changeTextSearch = (textSearch) => this.setState({textSearch}, () => {
         // debounce
        if(this.timeOut) clearTimeout(this.timeOut);
         
        this.timeOut = setTimeout(() => {
            if (textSearch === this.state.textSearch) {
               this.setState({ filter:true });
            }
        }, 600)
         
    });

    // desactivador

    setAvailable = (id, callBack = null) => {
        let available = true;
        const data = this.state.data.reduce((accu, product) => {            
            if (product._id === id) {
                product.available = !product.available;
                available = product.available;
                return [...accu, product]
            } else {
                return [...accu, product]
            }
        }, []);
        this.setState({ data });
        if(callBack) callBack(id, available);
    };

    changeAvailability = async (id, available) => {
        let response = await this.editAvailability.get(id, available);
        if(!response) return null;
        
        const { success, data } = response;
        let message = '';
        let type = 'danger';
        if(success) {
            message = data.message;
            type = 'success';
        } else {
            message = data.error;  
            this.setAvailable(id);
        }
        Toast.show({
            text: message,
            textStyle: { fontSize: 15  },
            buttonTextStyle: { color: '#000000', fontSize: 15 },
            buttonText: "Cerrar",
            duration: 3000,
            type
        });
    };
    
    setAvailability = (id) => () => this.setAvailable(id, this.changeAvailability);
    
    // Render

    render() {
        const { search, textSearch, data, loading } = this.state;
        const { toDelete, marketToDelete, activeToDelete } = this.props;
        
        return (
            <Container>
                {(search && toDelete.length===0) ?
                    <HeadSearch 
                        value={textSearch}
                        changeTextSearch={this.changeTextSearch}
                        handleSearch={this.handleSearch}
                    />
                    :
                    <Head 
                        handleAdd={this.handleAdd}
                        handleSearch={this.handleSearch}
                        toDelete={toDelete}
                        handleDelete={this.handleDelete}
                    />
                }
                <FlatList
                    data={data}
                    keyExtractor={(item, index) => item._id}
                    renderItem={({item,index})=>(
                        <Product 
                            key={index}
                            product={item}
                            toDelete={toDelete}
                            setAvailable={this.setAvailability(item._id)}
                            handleDetails={this.handleDetails(item._id)}
                            handleToDelete={marketToDelete(item._id)}
                            handleLongToDelete={activeToDelete(item._id)}
                            handleShowCars={this.handleShowCars(item.filter_car)}
                            handleEdit={this.handleEdit(item)}
                        />
                    )}
                    refreshControl={<RefreshControl colors={[color.primary]} refreshing={loading} onRefresh={this.handleRefresh}/>}
                    onEndReached={this.handleLoadMore}
                    onEndReachedThreshold={0.1}
                />
            </Container>
        );
    }
};

Products.proptypes = {
    setLoading : Proptypes.func.isRequired,
    toDelete: Proptypes.array.isRequired, 
    marketToDelete: Proptypes.func.isRequired, 
    activeToDelete: Proptypes.func.isRequired,
    resetToDelete: Proptypes.func.isRequired
};

const mapStateToProps = state => ({
    expired_date: state.seller.expired_date
});

const mapDispatchToProps = dispatch => ({
    setLoading: value => dispatch(setLoading(value))
});

export default connect(mapStateToProps, mapDispatchToProps)( withToDelete( Products ) );