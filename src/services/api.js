import axios from 'axios';
import endpointBase from '../configuration/endPoint';
import {findUserDb} from './realm';

const apiMapKey = 'F8qSYMDysvWhNC0LTKKOkYlw13hYmhGw';

const reverseGeolocation = (lon,lat)=>{
	const url = `http://www.mapquestapi.com/geocoding/v1/reverse?key=${apiMapKey}&location=${lat},${lon}&outFormat=json`
	
	return axios.get(url)
		.then((response)=>{return response.data})
		.catch((err)=>{return err.response.data})
};

// autenticacion

const signup = (displayName,email,password,uri)=>{
	let formData = new FormData();
	formData.append('displayName',displayName);
	formData.append('email',email);
	formData.append('password',password);
	formData.append('file',{
        uri:uri,
        name:uri,
        type:'image/jpeg'
    });

    return axios({
		method:'post',
		url : `${endpointBase}/signup`,
		data : formData,
		headers:{'content-type':'multipart/form-data'}
	})
	.then((response)=>{return response})
	.catch((err)=>{return err.response})
};

const loginnormal = (email,password)=>{
	return axios({
		method:'post',
		url:`${endpointBase}/login/normal`,
		data: {email,password}
	})
	.then((response)=>{return response})
	.catch((err)=>{return err.response})
};

const sendemail = (email)=>{
	return axios({
		method:'post',
		url:`${endpointBase}/password/recover`,
		data:{
			email,
		}
	})
	.then((response) => {return response})
	.catch((err) => {return err.response})
};

const sendcode = (email, code)=>{
	return axios({
		method:'get',
		url:`${endpointBase}/password/code`,
		params:{
			email,
			code
		}
	})
	.then((response) => {return response})
	.catch((err) => {return err.response})
};

const changepassword = (email, password)=>{
	return axios({
		method:'put',
		url:`${endpointBase}/password/reset`,
		data:{
			email,
			password
		}
	})
	.then((response) => {return response})
	.catch((err) => {return err.response})
};

const loginGg = (email,displayName,avatar)=>{
	return axios({
		method:'post',
		url:`${endpointBase}/login/google`,
		data: {
			email,
			displayName,
			avatar
		}
	})
	.then((response)=>{return response})
	.catch((err)=>{return err.response})
};

const loginFb = (email,displayName,avatar)=>{
	return axios({
		method:'post',
		url:`${endpointBase}/login/facebook`,
		data: {
			email,
			displayName,
			avatar
		}
	})
	.then((response)=>{return response})
	.catch((err)=>{return err.response})
};

const logout = () => {
	return axios({
		method:'put',
		url:`${endpointBase}/logout`,
		headers:{'content-type':'multipart/form-data','Authorization': "bearer " + findUserDb().token}
	})
	.then((response) => {return response})
	.catch((err) => {return err.response})
};

// consfiguracion de usuario

const changeavatar = (uri)=>{
	let formData = new FormData();
	formData.append('file',{
        uri:uri,
        name:uri,
        type:'image/jpeg'
    });

    return axios({
		method:'put',
		url : `${endpointBase}/user/edit/avatar`,
		data : formData,
		headers:{'content-type':'multipart/form-data','Authorization': "bearer " + findUserDb().token}
	})
	.then((response)=>{return response})
	.catch((err)=>{return err.response})
};

const changedisplayname = (displayName)=>{
	return axios({
		method:'put',
		url:`${endpointBase}/user/edit/displayName`,
		params:{
			displayName
		},
		headers:{'content-type':'multipart/form-data','Authorization': "bearer " + findUserDb().token}
	})
	.then((response) => {return response})
	.catch((err) => {return err.response})
};

const changenotifications = (active)=>{
	return axios({
		method:'put',
		url:`${endpointBase}/user/edit/notifications`,
		params:{
			active
		},
		headers:{'content-type':'multipart/form-data','Authorization': "bearer " + findUserDb().token}
	})
	.then((response) => {return response})
	.catch((err) => {return err.response})
};

const changedistance = (distance)=>{
	return axios({
		method:'put',
		url:`${endpointBase}/user/edit/distance`,
		params:{
			distance
		},
		headers:{'content-type':'multipart/form-data','Authorization': "bearer " + findUserDb().token}
	})
	.then((response) => {return response})
	.catch((err) => {return err.response})
};

// registro de vendedor

const sellersignup = (displayName, email, uri, name, rifCode, rif, phone, latitude, longitude, captcha, cookie)=>{
	let formData = new FormData();
	formData.append('displayName',displayName);
	formData.append('email',email);
	formData.append('file',{
        uri:uri,
        name:uri,
        type:'image/jpeg'
	});
	formData.append('name',name);
	formData.append('rifCode',rifCode);
	formData.append('rif',rif);
	formData.append('phone',phone);
	formData.append('latitude',latitude);
	formData.append('longitude',longitude);
	formData.append('captcha',captcha);
	formData.append('cookie',cookie);

    return axios({
		method:'post',
		url: `${endpointBase}/signup/seller`,
		data: formData,
		headers:{'content-type':'multipart/form-data','Authorization': "bearer " + findUserDb().token}
	})
	.then((response)=>{return response})
	.catch((err)=>{return err.response})
};

const getCaptcha = ()=>{
	return axios({
		method:'get',
		url:`${endpointBase}/seniat/captcha`,
		headers:{'content-type':'multipart/form-data','Authorization': "bearer " + findUserDb().token}
	})
	.then((response) => {return response})
	.catch((err) => {return err.response})
};

// marcketplace

const getWordsForSearch = (name)=>{
	return axios({
		method:'get',
		url:`${endpointBase}/marketplace/filter/name`,
		params:{
			name
		},
		headers:{'content-type':'multipart/form-data','Authorization': "bearer " + findUserDb().token}
	})
	.then((response) => {return response})
	.catch((err) => {return err.response})
};

const getSerialsForSearch = (serial)=>{
	return axios({
		method:'get',
		url:`${endpointBase}/marketplace/filter/serial`,
		params:{
			serial
		},
		headers:{'content-type':'multipart/form-data','Authorization': "bearer " + findUserDb().token}
	})
	.then((response) => {return response})
	.catch((err) => {return err.response})
};

const getProductsMarketplace = (page, mark, model, year, distance, category, latitude, longitude)=>{
	return axios({
		method:'get',
		url:`${endpointBase}/marketplace/find/products`,
		params:{
			page,
			mark, 
			model, 
			year,
			distance,
			category,
			latitude,
			longitude
		},
		headers:{'content-type':'multipart/form-data','Authorization': "bearer " + findUserDb().token}
	})
	.then((response) => {return response})
	.catch((err) => {return err.response})
};

const getProductsForName = (page, mark, model, year, distance, {name}, latitude, longitude)=>{
	return axios({
		method:'get',
		url:`${endpointBase}/marketplace/find/products/name`,
		params:{
			page,
			mark, 
			model, 
			year,
			distance,
			name,
			latitude, 
			longitude
		},
		headers:{'content-type':'multipart/form-data','Authorization': "bearer " + findUserDb().token}
	})
	.then((response) => {return response})
	.catch((err) => {return err.response})
};

const getProductsForSerial = (page, mark, model, year, distance, {serial}, latitude, longitude)=>{
	return axios({
		method:'get',
		url:`${endpointBase}/marketplace/find/products/serial`,
		params:{
			page,
			mark, 
			model, 
			year,
			distance,
			serial, 
			latitude, 
			longitude
		},
		headers:{'content-type':'multipart/form-data','Authorization': "bearer " + findUserDb().token}
	})
	.then((response) => {return response})
	.catch((err) => {return err.response})
};

const getProductForBuyer = (id)=>{
	return axios({
		method:'get',
		url:`${endpointBase}/buyer/details/product`,
		params:{
			id
		},
		headers:{'content-type':'multipart/form-data','Authorization': "bearer " + findUserDb().token}
	})
	.then((response) => {return response})
	.catch((err) => {return err.response})
};

const getProductFromSeller = (page, _id)=>{
	return axios({
		method:'get',
		url:`${endpointBase}/business/products/find`,
		params:{
			page,
			_id
		},
		headers:{'content-type':'multipart/form-data','Authorization': "bearer " + findUserDb().token}
	})
	.then((response) => {return response})
	.catch((err) => {return err.response})
};

// comentarios

const createComment = (_id, text, rating)=>{
	return axios({
		method:'put',
		url:`${endpointBase}/product/comment/create`,
		params:{
			_id, 
			text, 
			rating
		},
		headers:{'content-type':'multipart/form-data','Authorization': "bearer " + findUserDb().token}
	})
	.then((response) => {return response})
	.catch((err) => {return err.response})
};

const getComment = (_id)=>{
	return axios({
		method:'get',
		url:`${endpointBase}/product/comment/verified`,
		params:{
			_id
		},
		headers:{'content-type':'multipart/form-data','Authorization': "bearer " + findUserDb().token}
	})
	.then((response) => {return response})
	.catch((err) => {return err.response})
};

const editComment = (_id, text, rating)=>{
	return axios({
		method:'put',
		url:`${endpointBase}/product/comment/edit`,
		params:{
			_id, 
			text, 
			rating
		},
		headers:{'content-type':'multipart/form-data','Authorization': "bearer " + findUserDb().token}
	})
	.then((response) => {return response})
	.catch((err) => {return err.response})
};

const deleteComment = (_id)=>{
	return axios({
		method:'put',
		url:`${endpointBase}/product/comment/delete`,
		params:{
			_id
		},
		headers:{'content-type':'multipart/form-data','Authorization': "bearer " + findUserDb().token}
	})
	.then((response) => {return response})
	.catch((err) => {return err.response})
};

const getProductComments = (page, _id)=>{
	return axios({
		method:'get',
		url:`${endpointBase}/product/comment/find`,
		params:{
			page,
			_id
		},
		headers:{'content-type':'multipart/form-data','Authorization': "bearer " + findUserDb().token}
	})
	.then((response) => {return response})
	.catch((err) => {return err.response})
};
 
// garage

const createCar = ({mark,model,year}, garageLength)=>{
	return axios({
		method:'put',
		url:`${endpointBase}/buyer/garage/create`,
		params:{
			mark,
			model, 
			year,
			garageLength
		},
		headers:{'content-type':'multipart/form-data','Authorization': "bearer " + findUserDb().token}
	})
	.then((response) => {return response})
	.catch((err) => {return err.response})
};

const deleteCars = (currentCar, garage)=>{
	return axios({
		method:'put',
		url:`${endpointBase}/buyer/garage/delete`,
		params:{
			currentCar,
			garage :  JSON.stringify(garage)	
		},
		headers:{'content-type':'multipart/form-data','Authorization': "bearer " + findUserDb().token}
	})
	.then((response) => {return response})
	.catch((err) => {return err.response})
};

const updateCar = (currentCar)=>{
	return axios({
		method:'put',
		url:`${endpointBase}/buyer/garage/select`,
		params:{
			currentCar
		},
		headers:{'content-type':'multipart/form-data','Authorization': "bearer " + findUserDb().token}
	})
	.then((response) => {return response})
	.catch((err) => {return err.response})
};

// favorito

const addFavorite = (product)=>{
	return axios({
		method:'put',
		url:`${endpointBase}/buyer/favorite/create`,
		params:{
			product
		},
		headers:{'content-type':'multipart/form-data','Authorization': "bearer " + findUserDb().token}
	})
	.then((response) => {return response})
	.catch((err) => {return err.response})
};

const deleteFavorites = (array_id)=>{
	return axios({
		method:'put',
		url:`${endpointBase}/buyer/favorite/delete`,
		params:{
			array_id
		},
		headers:{'content-type':'multipart/form-data','Authorization': "bearer " + findUserDb().token}
	})
	.then((response) => {return response})
	.catch((err) => {return err.response})
};

const buyProduct = (seller, _id, name, quantity, image, price, serial)=>{
	return axios({
		method:'post',
		url:`${endpointBase}/buyer/shopping/create`,
		params:{
			seller,
			_id,
			name,
			quantity,
			image,
			price,
			serial
		},
		headers:{'content-type':'multipart/form-data','Authorization': "bearer " + findUserDb().token}
	})
	.then((response) => {return response})
	.catch((err) => {return err.response})
};

// compras

const getPurchases = (page)=>{
	return axios({
		method:'get',
		url:`${endpointBase}/buyer/shopping/find/active`,
		params:{
			page
		},
		headers:{'content-type':'multipart/form-data','Authorization': "bearer " + findUserDb().token}
	})
	.then((response) => {return response})
	.catch((err) => {return err.response})
};

const deletePurchases = (array_id)=>{
	return axios({
		method:'delete',
		url:`${endpointBase}/buyer/shopping/delete`,
		params:{
			array_id
		},
		headers:{'content-type':'multipart/form-data','Authorization': "bearer " + findUserDb().token}
	})
	.then((response) => {return response})
	.catch((err) => {return err.response})
};

const purchasesHistory = (page)=>{
	return axios({
		method:'get',
		url:`${endpointBase}/buyer/shopping/find/historial`,
		params:{
			page
		},
		headers:{'content-type':'multipart/form-data','Authorization': "bearer " + findUserDb().token}
	})
	.then((response) => {return response})
	.catch((err) => {return err.response})
};

// productos

const createProduct = (name, serial, description, price, category, filter_car, images, latitude, longitude,seller)=>{
	let formData = new FormData();
	formData.append('name',name);
	formData.append('serial',serial);
	formData.append('price',price);
	formData.append('description',description);
	formData.append('category',category);
	formData.append('seller',seller);
	formData.append('filter_car',JSON.stringify(filter_car));

	images.forEach((image,index) => formData.append(`file`,{
        uri:image,
        name:image,
        type:'image/jpeg'
	}))
	formData.append('latitude',latitude);
	formData.append('longitude',longitude);

    return axios({
		method:'post',
		url: `${endpointBase}/seller/create/product`,
		data: formData,
		headers:{'content-type':'multipart/form-data','Authorization': "bearer " + findUserDb().token}
	})
	.then((response)=>{return response})
	.catch((err)=>{return err.response})
};

const editProduct = (name, serial, description, price, category, filter_car, images, _id)=>{
	let formData = new FormData();
	formData.append('name',name);
	formData.append('serial',serial);
	formData.append('price',price);
	formData.append('description',description);
	formData.append('category',category);
	formData.append('filter_car',JSON.stringify(filter_car));
	images.forEach((image,index) => formData.append(`file`,{
        uri:image,
        name:image,
        type:'image/jpeg'
	}))
	formData.append('_id',_id);

    return axios({
		method:'put',
		url: `${endpointBase}/seller/edit/product`,
		data: formData,
		headers:{'content-type':'multipart/form-data','Authorization': "bearer " + findUserDb().token}
	})
	.then((response)=>{return response})
	.catch((err)=>{return err.response})
};

const getProducts = (page)=>{
	return axios({
		method:'get',
		url:`${endpointBase}/seller/find/products`,
		params:{
			page
		},
		headers:{'content-type':'multipart/form-data','Authorization': "bearer " + findUserDb().token}
	})
	.then((response) => {return response})
	.catch((err) => {return err.response})
};

const getSearchProducts = (page, value)=>{
	return axios({
		method:'get',
		url:`${endpointBase}/seller/filter/products`,
		params:{
			page,
			value
		},
		headers:{'content-type':'multipart/form-data','Authorization': "bearer " + findUserDb().token}
	})
	.then((response) => {return response})
	.catch((err) => {return err.response})
};

const changeAvailability = (_id, status)=>{
	return axios({
		method:'put',
		url:`${endpointBase}/seller/edit/statusProduct`,
		params:{
			_id,
			status
		},
		headers:{'content-type':'multipart/form-data','Authorization': "bearer " + findUserDb().token}
	})
	.then((response) => {return response})
	.catch((err) => {return err.response})
};

const deleteProducts = (array_id)=>{
	return axios({
		method:'delete',
		url:`${endpointBase}/seller/delete/product`,
		params:{
			array_id
		},
		headers:{'content-type':'multipart/form-data','Authorization': "bearer " + findUserDb().token}
	})
	.then((response) => {return response})
	.catch((err) => {return err.response})
};

const getProductForSeller = (id)=>{
	return axios({
		method:'get',
		url:`${endpointBase}/seller/details/product`,
		params:{
			id
		},
		headers:{'content-type':'multipart/form-data','Authorization': "bearer " + findUserDb().token}
	})
	.then((response) => {return response})
	.catch((err) => {return err.response})
};

// configuracion 'vendedor'

const changeImage = (uri)=>{
	let formData = new FormData();
	formData.append('file',{
        uri:uri,
        name:uri,
        type:'image/jpeg'
    });

    return axios({
		method:'put',
		url : `${endpointBase}/seller/edit/avatar`,
		data : formData,
		headers:{'content-type':'multipart/form-data','Authorization': "bearer " + findUserDb().token}
	})
	.then((response)=>{return response})
	.catch((err)=>{return err.response})
};

const changeName = (name)=>{
	return axios({
		method:'put',
		url:`${endpointBase}/seller/edit/name`,
		params:{
			name
		},
		headers:{'content-type':'multipart/form-data','Authorization': "bearer " + findUserDb().token}
	})
	.then((response) => {return response})
	.catch((err) => {return err.response})
};

const changeLocation = (longitude, latitude)=>{
	return axios({
		method:'put',
		url:`${endpointBase}/seller/edit/location`,
		params:{
			longitude,
			latitude
		},
		headers:{'content-type':'multipart/form-data','Authorization': "bearer " + findUserDb().token}
	})
	.then((response) => {return response})
	.catch((err) => {return err.response})
};

const changePhone = (phone)=>{
	return axios({
		method:'put',
		url:`${endpointBase}/seller/edit/phone`,
		params:{
			phone
		},
		headers:{'content-type':'multipart/form-data','Authorization': "bearer " + findUserDb().token}
	})
	.then((response) => {return response})
	.catch((err) => {return err.response})
};

// ventas

const sellProduct = (_id)=>{
	return axios({
		method:'put',
		url:`${endpointBase}/seller/shopping/processed`,
		params:{
			_id
		},
		headers:{'content-type':'multipart/form-data','Authorization': "bearer " + findUserDb().token}
	})
	.then((response) => {return response})
	.catch((err) => {return err.response})
};

const getSales = (page, _id)=>{
	return axios({
		method:'get',
		url:`${endpointBase}/seller/shopping/find/active`,
		params:{
			page,
			_id
		},
		headers:{'content-type':'multipart/form-data','Authorization': "bearer " + findUserDb().token}
	})
	.then((response) => {return response})
	.catch((err) => {return err.response})
};

const salesHistory = (page, _id)=>{
	return axios({
		method:'get',
		url:`${endpointBase}/seller/shopping/find/historial`,
		params:{
			page,
			_id
		},
		headers:{'content-type':'multipart/form-data','Authorization': "bearer " + findUserDb().token}
	})
	.then((response) => {return response})
	.catch((err) => {return err.response})
};

// chat

const createMessageText = (_id,emitter,type,receiver,text,time)=>{
	return axios({
		method:'put',
		url:`${endpointBase}/message/create/text`,
		params:{
			_id,
			emitter,
			type,
			receiver,
			text,
			time
		},
		headers:{'content-type':'multipart/form-data','Authorization': "bearer " + findUserDb().token}
	})
	.then((response) => {return response})
	.catch((err) => {return err.response})
};

const getMessages = (_id,page)=>{
	return axios({
		method:'get',
		url:`${endpointBase}/message/find`,
		params:{
			_id,
			page
		},
		headers:{'content-type':'multipart/form-data','Authorization': "bearer " + findUserDb().token}
	})
	.then((response) => {return response})
	.catch((err) => {return err.response})
};

// suscripcion

const suscription = (tokenId,duration,price,plan)=>{
	return axios({
		method:'put',
		url:`${endpointBase}/seller/suscription`,
		params:{
			tokenId,
			duration,
			price,
			plan
		},
		headers:{'content-type':'multipart/form-data','Authorization': "bearer " + findUserDb().token}
	})
	.then((response) => {return response})
	.catch((err) => {return err.response})	
};

// notificaciones puh

const saveTokenPush = (tokenPush)=>{
	return axios({
		method:'put',
		url:`${endpointBase}/user/save/tokenPush`,
		params:{
			tokenPush
		},
		headers:{'content-type':'multipart/form-data','Authorization': "bearer " + findUserDb().token}
	})
	.then((response) => {return response})
	.catch((err) => {return err.response})	
};

export {
	// autenticacion
	signup,
	loginnormal,
	sendemail,
	sendcode,
	changepassword,
	loginGg,
	loginFb,
	logout,
	// configuracion 'Comprador'
	changeavatar,
	changedisplayname,
	changenotifications,
	changedistance,
	// registro 'Vendedor'
	reverseGeolocation,
	sellersignup,
	getCaptcha,
	// marcketplace
	getWordsForSearch,
	getSerialsForSearch,
	getProductsMarketplace,
	getProductsForName,
	getProductsForSerial,
	getProductForBuyer,
	getProductFromSeller,
	// comentarios
	createComment,
	getComment,
	editComment,
	deleteComment,
	getProductComments,
	// garaje
	createCar,
	deleteCars,
	updateCar,
	// favoritos
	addFavorite,
	deleteFavorites,
	// compras
	buyProduct,
	getPurchases,
	deletePurchases,
	purchasesHistory,
	// productos
	createProduct,
	editProduct,
	getProducts,
	changeAvailability,
	deleteProducts,
	getSearchProducts,
	getProductForSeller,
	// configuracion 'Vendedor'
	changeImage,
	changeName,
	changeLocation,
	changePhone,
	// ventas
	sellProduct,
	getSales,
	salesHistory,
	//mensajes
	createMessageText,
	getMessages,
	//suscription seller
	suscription,
	//notificaciones push
	saveTokenPush
}