const FavoriteModel = {
	name: 'Favorite',
	primaryKey : '_id',
	properties: {
		_id: 'string',
		name : 'string',
		images : 'string[]',
		coordinates : 'float[]',
		price : 'int',
		serial : 'string',
		quantity: {
			type : 'int',
			default : 1
		},
		name_seller : 'string',
		id_seller :'string'
    }
};

export default FavoriteModel;
