import React from 'react';
import PropTypes from 'prop-types';
import { FlatList, RefreshControl } from 'react-native';
import { Container } from 'native-base';
import Product from '../../presentations/Product';
import Head from './Head';
import FilterForOption from '../../presentations/FilterForOption';
import { connect } from 'react-redux';
import FilterTag from './FilterTag';
import FilterCar from './FilterCar';
import { getProductsMarketplace, getProductsForName, getProductsForSerial } from '../../services/api';
import color from '../../theme/color';
import { cancellablePromise } from '../../utils/cancellablePromise';
import { newPageState } from '../../utils/newPageState';
import { myLocation } from '../../utils/myLocation';
import { withFavorite } from '../../hoc/withFavorite';
import DataPage from '../../classes/DataPage';

class Marketplace extends DataPage{
    constructor(props){
        super(props);
        this.productsForSerial = cancellablePromise(getProductsForSerial, 200);
        this.productsForName = cancellablePromise(getProductsForName, 200);
        this.productsMarketplace = cancellablePromise(getProductsMarketplace, 200);
        this.userLocation = myLocation();
        this.state = {
            ...this.state,
            filterOption:null,
            filterTag:null,
            currentCar: null,
            currentdistance: 0,
            myLocation: null
        }
    };

    async componentDidMount() {
        const { currentCar, distance } = this.props.user;
        const location = await this.userLocation.get();
        if(!location) return;

        this.setState({ 
            currentCar: this.getCurrentCar(currentCar), 
            currentdistance: distance, 
            myLocation: location.data 
        },this.requestData);
    };
    
    componentDidUpdate(prevProps, prevState) {
        if(prevProps.garage !== this.props.garage) return;

        const { navigation, user } = this.props;
        const { currentdistance, currentCar, filterTag } = this.state;
        const tag = navigation.getParam('tag', null);
        const distance = navigation.getParam('distance', user.distance);
        let car = navigation.getParam('car', null);
        if(!car) car = this.getCurrentCar(user.currentCar);
        if(distance !== currentdistance) {
            this.setState({ currentdistance: distance });
        }
        if(tag && tag !== filterTag) {
            delete navigation.state.params['tag'];
            this.handleRefresh({ data: [], filterTag: tag, filterOption: null });
        }
        if(!this.carEqualCar(car, currentCar)) {
            this.handleRefresh({ data: [], currentCar: car });
        }
    };

    componentWillUnmount() {
        this.productsForSerial.cancel();
        this.productsForName.cancel();
        this.productsMarketplace.cancel();
        this.userLocation.cancel();
    }

    getCurrentCar = (id) => {
        if(!id) return null;
        const { _id = null } = {...this.state.currentCar};
        if(_id === id) return this.state.currentCar;
        
        return [...this.props.garage].filter(car => car._id === id)[0] || null
    };

    carEqualCar = (car1, car2) => {        
        if(!car1 && !car2) return true;
        if(!car1 || !car2) return false;

        return (car1._id === car2._id)
    };

    // cargar productos

    requestData = async () => {        
        const { page, filterOption, filterTag, currentCar, currentdistance, myLocation } = this.state;
        const { distance } = this.props.user;
        const { mark = null, model = null, year = null } = {...currentCar};
        const { latitude = null, longitude = null } = {...myLocation};
        let response = null;
        if(filterTag) {
            if(currentdistance === -1) 
                response = await this.productsForSerial.get(page, mark, model, year, distance, filterTag, latitude, longitude);
            else 
                response = await this.productsForName.get(page, mark, model, year, currentdistance, filterTag, latitude, longitude);
        } else {
            response = await this.productsMarketplace.get(page, mark, model, year, currentdistance, filterOption, latitude, longitude);
        }
        if(!response) return null // la respuesta es nula si se desmontó la vista
        
        const newState = newPageState(this.state, response, 'No se encontró productos');
        this.setState({...newState});
    };

    // navegacion

    handleGarage = () => this.props.navigation.navigate('garage');

    handleSearch = () => this.props.navigation.navigate('filterForWord');

    handleSerial = () => this.props.navigation.navigate('filterForSerial');

    handleProductDetails = (id) => () => this.props.navigation.navigate('productDetailsBuyer', { id });

    // filtro

    handleDeleteTag = () => {
        const { user, navigation } = this.props;
        delete navigation.state.params['distance'];
        this.handleRefresh({ data: [], filterTag: null, currentdistance: user.distance });
    };

    handleFilterOption = (filterOption) => {
        if(this.state.filterOption===filterOption)  return this.handleRefresh({ data: [], filterOption: null });

        const { user, navigation } = this.props;
        const distance = navigation.getParam('distance', null);
        if(distance) delete navigation.state.params['distance'];

        this.handleRefresh({ data: [], filterOption, filterTag: null, currentdistance: user.distance });
    };

    handleDeleteCar = () => {
        const { navigation, user } = this.props;
        delete navigation.state.params['car'];
        const currentCar = this.getCurrentCar(user.currentCar);
        this.handleRefresh({ data: [], currentCar });
    };
    
    // render

    render(){
        const { data, filterTag = null, filterOption, currentCar = null, currentdistance, loading, myLocation } = this.state;
        const { handleAddToCart, handleRemoveToCart, isFavorite } = this.props;

        return(
            <Container>
                <Head 
                    handleSearch={this.handleSearch}
                    handleGarage={this.handleGarage}
                    handleSerial={this.handleSerial}
                />
                <FilterForOption
                    handleFilter={this.handleFilterOption}
                    option={filterOption}
                />
                {currentCar &&   
                    <FilterCar 
                        currentCar={currentCar}
                        defaultCar={this.props.user.currentCar}
                        handleDelete={this.handleDeleteCar}
                    />
                }
                {filterTag &&
                    <FilterTag 
                        tag={filterTag}
                        currentDistance={currentdistance}
                        defaultDistance={this.props.user.distance}
                        handleDelete={this.handleDeleteTag}
                    />
                }
                <FlatList
                    data={data}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem = {({item,index})=>(
                        <Product 
                            key={item._id}
                            item={item}
                            handleDetails={this.handleProductDetails(item._id)}
                            handleAddToCart={handleAddToCart(item)}
                            handleRemoveToCart={handleRemoveToCart(item)}
                            favorite={isFavorite(item._id)}
                            userLocation={myLocation}
                        />     
                    )}
                    refreshControl={<RefreshControl colors={[color.primary]} refreshing={loading} onRefresh={this.handleRefresh}/>}
                    onEndReached={this.handleLoadMore}
                    onEndReachedThreshold={0.1}
                />
            </Container>
        )
    }
};

Marketplace.proptypes = {
    handleAddToCart: PropTypes.func.isRequired, 
    handleRemoveToCart: PropTypes.func.isRequired, 
    isFavorite: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    garage: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
    user: state.user,
    garage: state.garage
});

export default connect(mapStateToProps, null)(withFavorite(Marketplace));
