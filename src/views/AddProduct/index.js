import React, { Component } from 'react';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';
import { 
    Container, 
    Text, 
    Content, 
    Form, 
    Button,
    Toast
} from 'native-base';
import HeadBack from '../../presentations/HeadBack';
import { View, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import Field from '../../presentations/Field';
import FieldButton from '../../presentations/FieldButton';
import { AddProductSchema, Width } from '../../constants';
import color from '../../theme/color';
import Car from './Car';
import FieldAdd from './FieldAdd';
import ModalBottom from '../../presentations/ModalBottom';
import Image from './Image';
import ModalCategory from './ModalCategory';
import { createProduct, editProduct } from '../../services/api';
import { setLoading } from '../../actions/loading';

class AddProduct extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modalCategory:false,
            category:'',
            errorCategory:false,
            cars:[],
            errorCars:'',
            modalImage:false,
            images:[],
            errorImages:'',
            addedProduct: false,
            name: '', 
            serial: '', 
            price: '', 
            description: '',
            _id: ''
        }
    };

    componentDidMount() {
        const product = this.props.navigation.getParam('product', null);
        if(!product) return;

        const { 
            images, 
            name, 
            serial, 
            price, 
            description, 
            category, 
            filter_car: cars,
            _id 
        } = product;
        this.setState({ images, name, serial, price, description, category, cars, _id});
        //delete this.props.navigation.state.params['product'];
    }

    componentDidUpdate(previosProps, previosState) {
        const options = this.props.navigation.getParam('options', null);
        if(options) {
            const init = Number(options[2]);
            const end = Number(options[3]);
            const car = {
                mark: options[0],
                model: options[1],
                init_year: init < end ? init : end,
                end_year: end > init ? end : init, 
                _id:Date.now()
            }
            const cars = [...previosState.cars, car];
            this.setState({cars, errorCars:''});
            delete this.props.navigation.state.params['options'];
        }
    };

    // navegacion

    handleBack = () => {
        if(this.state.addedProduct)
            this.props.navigation.navigate('products', { refresh: true });
        else 
            this.props.navigation.goBack();
    };

    // modales

    handleModal = (modal) => () => this.setState(previosState=>({ [modal]:!previosState[modal] }));

    // elegir categoria, imagenes y autos

    setCategory = (category, errorCategory=false) => () => this.setState(prevState=>{
        if(category === '' && prevState.category !== '') return { modalCategory: false }; 

        return { category, errorCategory, modalCategory: false };
    });

    addImages = (data) => {
        let images = [...this.state.images];
        if(typeof data === 'string'){
            images.push(data)
        } else {
            images = [...images, ...data];
        }
        this.setState({ images, errorImages: '' });
    };

    deleteImage = (index) => () => {
        const images = this.state.images.filter((image, i)=> i !== index);
        this.setState({ images });
    };

    addCar = () => this.props.navigation.navigate('garageOptions', {pages:4, endPage:'addproduct'});

    deleteCar = (id) => () => {
        const cars = this.state.cars.filter(car => car._id !== id);
        this.setState({ cars })
    };

    // registrar producto

    handleSubmit = (submit) => () => {
        if(this.state.cars.length===0) this.setState({errorCars:'Debes añadir los autos que usan tu producto'});
        if(this.state.images.length===0) this.setState({errorImages:'Debes añadir como minimo una imagen de tu producto'});
        if(this.state.category==='') this.setState({errorCategory:true});
        submit();
    };

    handleProduct = async (values, actions) => {
        const {cars, images, category, _id} = this.state;
        if(cars.length===0||images.length===0||category==='') return actions.setSubmitting(false);

        let message = '';
        let type = 'danger';
        let { setLoading, location, idSeller, navigation } = this.props;
        let { name, serial, description, price } = values;
        let [ longitude = null, latitude = null ] = location;
        setLoading(true);
        const filter_car = cars.map(car=>{
            let item = {...car};
            delete item._id; 
            return item;
        });
        try{            
            let response = null;
            if(_id) response = await editProduct(name, serial, description, price, category, filter_car, images, _id);
            else response = await createProduct(name, serial, description, price, category, filter_car, images, latitude, longitude, idSeller);
            let { status, data } = response;
            if(status === 201){
                message = data.message;  
                type = 'success'; 
                if(_id){
                    navigation.navigate('products', { refresh: true });
                } else {
                    actions.resetForm();
                    this.setState({ category: '', cars: [], images: [], addedProduct: true });
                }
            } else{             
                message = data.error || 'Error en el servidor';                 
            }
        } catch(err){
            message = 'Error en el servidor';
        } finally{
            if(!_id || type !== 'success') actions.setSubmitting(false);
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

    // render

    render() {
        const { category, errorCategory, cars, errorCars, images, errorImages, name, serial, price, description, _id, modalImage, modalCategory } = this.state;
        
        return (
            <Container style={{paddingVertical:5}}>
                <HeadBack 
                     handleBack={this.handleBack}
                     title={_id ? 'Editar Producto' : 'Nuevo Producto'}
                />
                <Content>
                <View style={styles.contentForm}>
                        <Formik
                            enableReinitialize={_id!==''}
                            initialValues={{ name, serial, price: price.toString(), description }}
                            onSubmit={this.handleProduct}
                            validationSchema = {AddProductSchema}
                        >
                            {formikProps => (
                                <Form>
                                    <Field 
                                        formikProp={formikProps}
                                        type='name'
                                        title='Nombre'
                                        iconType='Foundation' 
                                        iconName='clipboard-pencil'
                                        iconSize={25}
                                    />
                                    <Field 
                                        formikProp={formikProps}
                                        type='serial'
                                        title='Serial/Número de pieza'
                                        iconType='AntDesign' 
                                        iconName='barcode'
                                        iconSize={22}
                                    />
                                    <Field 
                                        formikProp={formikProps}
                                        type='description'
                                        title='Descripción'
                                        iconType='MaterialCommunityIcons' 
                                        iconName='book-open-page-variant'
                                        iconSize={25}
                                        multiline
                                    />
                                   <Field 
                                        formikProp={formikProps}
                                        type='price'
                                        title='Precio'
                                        iconType='FontAwesome5' 
                                        iconName='money-bill-wave'
                                        keyboardType='numeric'
                                    />
                                    <FieldButton 
                                        handlePress={this.handleModal('modalCategory')}
                                        text={category}
                                        error={errorCategory}
                                        messageError='La categoria es obligatoria'
                                        title='Categoria'
                                        iconType='FontAwesome5' 
                                        iconName='box-open'
                                    />
                                    <FieldAdd handleAdd={this.addCar} title='Añadir Marca/Modelo/Años' error={errorCars}>
                                        {cars.map((car, index)=>(
                                            <Car car={car} key={`${car._id}`} index={index} deleteCar={this.deleteCar(car._id)} />
                                        ))}
                                    </FieldAdd>
                                    <FieldAdd handleAdd={this.handleModal('modalImage')} title='Añadir Imagenes' error={errorImages} >
                                        {images.map((image, index)=>(
                                            <Image image={image} key={`${image}-${index}`} index={index} deleteImage={this.deleteImage(index)} />
                                        ))}
                                    </FieldAdd>
                                    <Button style={{marginTop:10}} onPress={this.handleSubmit(formikProps.handleSubmit)} block full disabled={formikProps.isSubmitting}> 
                                        <Text style={styles.btnText}>{_id ? 'Editar' : 'Crear'}</Text>
                                    </Button>
                                </Form> 
                            )}
                        </Formik>
                    </View>
                </Content>
                { modalCategory &&
                    <ModalCategory 
                        modal={modalCategory}
                        handleModal={this.handleModal('modalCategory')}
                        handleSet={this.setCategory}
                    />
                }
                { modalImage &&
                    <ModalBottom 
                        modal={modalImage}
                        setAvatar={this.addImages}
                        handleModal={this.handleModal('modalImage')}
                        multipleImage={true}
                    />
                }
            </Container>
        );
    }
};

AddProduct.proptypes = {
    setLoading: Proptypes.func.isRequired,
    location: Proptypes.array.isRequired
};

const styles = StyleSheet.create({
    map: {
        display:'flex',
        flex:1
    },
    contentAvatar: {
        marginTop: 15,
        flex: 1,
        width: 0.4*Width, 
        height: 0.4*Width, 
        borderRadius: (0.4*Width)/2,
        borderWidth: 1,
        borderColor: color.primary,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
    },
    img: {
        width: (0.4*Width)-5, 
        height: (0.4*Width)-5, 
        borderRadius: 100,
    },
    editAvatar: {
        width:Width/8, 
        height:Width/8, 
        backgroundColor: color.primary, 
        borderRadius: (Width/8)/2, 
        position: 'absolute', 
        right: 0, 
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    contentForm: {
        alignSelf: 'center',
        width: Width,
        alignItems: 'stretch',
        flex: 1,
        paddingLeft: 20,
        paddingRight: 20,
        marginVertical: 5,
    },
    btnText: {
        fontSize: 20,
        color:'black',
    },
    imgCaptcha: {
        borderRadius: 10,
        height:35,
        width:140,
        marginRight:3,
        left: -9,
        backgroundColor:'#D9D5DC'
    }
});

const mapStateToProps = state => ({
    location: state.seller.location,
    idSeller : state.seller._id
});

const mapDispatchToProps = dispatch => ({
    setLoading: value => dispatch(setLoading(value))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddProduct);