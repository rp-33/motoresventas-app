const SellerModel = {
	name: 'Seller',
	primaryKey : '_id',
	properties: {
		_id: 'string',
		name : 'string',
		image : 'string',
		rifCode : 'string',
		rif : 'int',
		phone : 'int',
		location : 'float[]',
		init_date : 'date?',
		expired_date : 'date?',
		plan : 'string?'
    }
};

export default SellerModel;
