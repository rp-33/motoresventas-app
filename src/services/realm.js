import Database from '../realm/';

export const saveUserDb = (user)=>{
	Database.write(() => {
		Database.create('User', user);	
	})
}

export const findUserDb = ()=>{
	if(Database.objects('User').length ===0) return false;
	return Database.objects('User')[0];
}

export const logoutDb = ()=>{
	let models = ['User','Seller','Garage','Favorite'];
	Database.write(() => {
		models.forEach((model,i)=>{
			Database.delete(Database.objects(model));
		})
	})
}

export const updateDisplayNameDb = (displayName)=>{
	Database.write(() => {
		let user = Database.objects('User')[0];
		user.displayName = displayName;
	})
}


export const updateAvatarDb = (uri)=>{
	Database.write(() => {
		let user = Database.objects('User')[0];
		user.avatar = uri;
	})
}

export const updateNotificationsDb = (active)=>{
	Database.write(() => {
		let user = Database.objects('User')[0];
		user.notifications = active;
	})
}

export const updateDistanceDb = (distance)=>{
	Database.write(() => {
		let user = Database.objects('User')[0];
		user.distance = distance;
	})
}

export const setRouterDb = (router)=>{
	Database.write(() => {
		let user = Database.objects('User')[0];
		user.router = router;
	})
}

export const setCurrentCarDb = (car)=>{
	Database.write(() => {
		let user = Database.objects('User')[0];	
		user.currentCar = car;
	})
}

//seller

export const saveSellerDb = (_id,name,rifCode,rif,phone,image,geo,suscription)=>{


	Database.write(() => {
		if(suscription)
		{
			Database.create('Seller',{
			  	_id,
				name,
				rifCode,
				rif,
				phone,
                image,
                location : geo,
                plan : suscription.plan,
                init_date : suscription.init_date,
                expired_date : suscription.expired_date
			});
		}
		else
		{
			Database.create('Seller', 
			{
			  	_id,
				name,
				rifCode,
				rif,
				phone,
                image,
                location : geo
			}
		);
		}
		
	})
}

export const findSellerDb = ()=>{
	if(Database.objects('Seller').length ===0) return false;
	return Database.objects('Seller')[0];
}

export const updateImageSellerDb = (uri)=>{
	Database.write(() => {
		let seller = Database.objects('Seller')[0];
		seller.image = uri;
	})
}

export const updateNameSellerDb = (name)=>{
	Database.write(() => {
		let seller = Database.objects('Seller')[0];
		seller.name = name;
	})
}

export const updateLocationSellerDb = (location)=>{
	Database.write(() => {
		let seller = Database.objects('Seller')[0];
		seller.location = location;
	})
}


export const updatePhoneSellerDb = (phone)=>{
	Database.write(() => {
		let seller = Database.objects('Seller')[0];
		seller.phone = phone;
	})
}

export const updateSuscriptionSellerDb = (plan,init_date,expired_date)=>{
	console.log(plan,init_date,expired_date)
	Database.write(() => {
		let seller = Database.objects('Seller')[0];
		seller.plan = plan;
        seller.init_date = init_date;
        seller.expired_date = expired_date;
	})
}

//garage

export const saveGarageDb = (cars)=>{
	Database.write(() => {
		cars.forEach((car,index)=>{
			Database.create('Garage',car);
		})	
	})
}

export const findGarageDb = ()=>{
	if(Database.objects('Garage').length ===0) return false;
	return Database.objects('Garage');
}

export const saveCarDb = (car)=>{
	Database.write(() => {
		Database.create('Garage',car);	
	})
}

export const deleteCarDb = (cars)=>{
	Database.write(() => {
		Database.delete(Database.objects('Garage'));
		cars.forEach((car,index)=>{
			Database.create('Garage',car);
		})	
	})	
}

/*favorite*/

export const saveFavoriteDb = (favorites)=>{
	Database.write(()=>{
		favorites.forEach((item,i)=>{
			Database.create('Favorite',{
				_id: item._id,
				name : item.name,
				images : item.images,
				coordinates : item.location.coordinates,
				price : item.price,
				serial : item.serial,
				name_seller : item.seller.name,
				id_seller : item.seller._id
			});
		})
	})
}

export const findFavoriteDb = ()=>{
	let data = Database.objects('Favorite');
	let favorites = [];
	data.forEach((item,i)=>{
		favorites.push({
			_id : item._id,
			name : item.name,
			images : item.images,
			price: item.price,
			quantity : item.quantity,
			serial : item.serial,
			location : {
				coordinates : item.coordinates
			},
			seller : {
				_id : item.id_seller,
				name : item.name_seller
			}
		})
	})

	return favorites;

}

export	const saveCartDb = (cart)=>{
	Database.write(()=>{
		Database.create('Favorite',{
			_id: cart._id,
			name : cart.name,
			images : cart.images,
			serial : cart.serial,
			coordinates : cart.location.coordinates,
			price : cart.price,
			name_seller : cart.seller.name,
			id_seller : cart.seller._id
		});
	})
}

export const deleteFavoriteDb = (favorites)=>{

	Database.write(()=>{
		Database.delete(Database.objects('Favorite'));
		favorites.forEach((item,index)=>{
			Database.create('Favorite',{
				_id: item._id,
				name : item.name,
				images : item.images,
				coordinates : item.location.coordinates,
				price : item.price,
				serial : item.serial,
				name_seller : item.seller.name,
				id_seller : item.seller._id
			});
		})	
	})
}
